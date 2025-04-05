import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars, setFilters, nextPage } from "../store/carsSlice.js";
import FilterBar from "../components/FilterBar.jsx";
import CarCard from "../components/CarCard.jsx";
import styles from "../styles/CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { list, status, error, filters, page, hasMore, noMatchReason } =
    useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(setFilters({}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCars({ filters, page }));
  }, [filters, page, dispatch]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  const handleLoadMore = () => {
    dispatch(nextPage());
  };

  const uniqueCars = list.filter(
    (car, index, self) => index === self.findIndex((c) => c.id === car.id)
  );

  const isFiltered =
    Object.keys(filters).length > 0 &&
    Object.values(filters).some((val) => val !== "");

  return (
    <div className={styles.container}>
      <FilterBar onFilterChange={handleFilterChange} />

      {status === "loading" && list.length === 0 && (
        <div className={styles.loading}>Loading...</div>
      )}

      {status === "succeeded" && list.length === 0 && isFiltered && (
        <div className={styles.noResults}>{noMatchReason}</div>
      )}

      {status === "succeeded" && list.length === 0 && !isFiltered && (
        <div className={styles.noResults}>No cars available at the moment.</div>
      )}

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.grid}>
        {uniqueCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {list.length > 0 && hasMore && (
        <div className={styles.loadMoreWrapper}>
          <button
            className={styles.loadMoreButton}
            onClick={handleLoadMore}
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <span className={styles.spinner}></span>
            ) : (
              <span className={styles.loadMoreText}>Load more</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
