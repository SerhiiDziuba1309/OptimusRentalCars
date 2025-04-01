import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars, setFilters } from "../store/carsSlice.js";
import FilterBar from "../components/FilterBar.jsx";
import { Link } from "react-router-dom";
import styles from "../styles/CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { list, status, error, filters } = useSelector((state) => state.cars);

  // Вызываем fetchCars при изменении фильтров
  useEffect(() => {
    dispatch(fetchCars(filters));
  }, [filters, dispatch]);

  // Функция для обработки изменений фильтров
  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };
  <FilterBar onFilterChange={handleFilterChange} />;
  return (
    <div className={styles.container}>
      <h1>Car Catalog</h1>
      {/* Передаем handleFilterChange в FilterBar */}
      <FilterBar onFilterChange={handleFilterChange} />
      {status === "loading" && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <div className={styles.grid}>
        {list.map((car) => (
          <div key={car.id} className={styles.card}>
            <h2>
              {car.brand} {car.model}
            </h2>
            <p>{car.description}</p>
            <Link to={`/catalog/${car.id}`} className={styles.detailsButton}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
