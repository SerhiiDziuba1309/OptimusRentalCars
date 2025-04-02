import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars, setFilters, nextPage } from "../store/carsSlice.js";
import FilterBar from "../components/FilterBar.jsx";
import CarCard from "../components/CarCard.jsx";
import styles from "../styles/CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { list, status, error, filters, page, hasMore } = useSelector(
    (state) => state.cars
  );

  useEffect(() => {
    dispatch(fetchCars());
  }, [filters, page, dispatch]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  const handleLoadMore = () => {
    dispatch(nextPage());
  };

  return (
    <div className={styles.container}>
      <FilterBar onFilterChange={handleFilterChange} />

      {status === "loading" && list.length === 0 && <div>Loading...</div>}
      {error && <div>{error}</div>}

      <div className={styles.grid}>
        {list.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {hasMore && (
        <button className={styles.loadMore} onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </div>
  );
};

export default CatalogPage;
