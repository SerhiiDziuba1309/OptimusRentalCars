import React, { useState, useEffect } from "react";
import { getBrands } from "../services/api";
import styles from "../styles/FilterBar.module.css";

const FilterBar = ({ onFilterChange }) => {
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const brandsList = await getBrands();
        setBrands(brandsList);
      } catch (err) {
        setError("Не удалось загрузить бренды.");
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const handleApplyFilters = () => {
    onFilterChange({ brand, minMileage, maxMileage });
  };

  if (loading) return <div>Загрузка фильтров...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <select value={brand} onChange={(e) => setBrand(e.target.value)}>
        <option value="">Все бренды</option>
        {brands.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Минимальный пробег"
        value={minMileage}
        onChange={(e) => setMinMileage(e.target.value)}
      />
      <input
        type="number"
        placeholder="Максимальный пробег"
        value={maxMileage}
        onChange={(e) => setMaxMileage(e.target.value)}
      />

      <button onClick={handleApplyFilters}>Применить фильтры</button>
    </div>
  );
};

export default FilterBar;
