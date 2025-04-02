import { useEffect, useState } from "react";
import styles from "../styles/FilterBar.module.css";
import { getBrands } from "../services/api";

const FilterBar = ({ onFilterChange }) => {
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");

  useEffect(() => {
    const fetchBrands = async () => {
      const list = await getBrands();
      setBrands(list);
    };
    fetchBrands();
  }, []);

  const handleSearch = () => {
    onFilterChange({ brand, price, minMileage, maxMileage });
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.group}>
        <label>Car brand</label>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option value="">Choose a brand</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.group}>
        <label>Price / 1 hour</label>
        <select value={price} onChange={(e) => setPrice(e.target.value)}>
          <option value="">Choose a price</option>
          <option value="30">up to $30</option>
          <option value="50">up to $50</option>
          <option value="100">up to $100</option>
        </select>
      </div>

      <div className={styles.group}>
        <label>Car mileage / km</label>
        <div className={styles.range}>
          <input
            type="number"
            placeholder="From"
            value={minMileage}
            onChange={(e) => setMinMileage(e.target.value)}
          />
          <input
            type="number"
            placeholder="To"
            value={maxMileage}
            onChange={(e) => setMaxMileage(e.target.value)}
          />
        </div>
      </div>

      <button className={styles.searchButton} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default FilterBar;
