import React, { useEffect, useState } from "react";
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

  const formatMileage = (value) => {
    if (!value) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const cleanMileage = (value) => {
    return value.replace(/[^\d]/g, "");
  };

  const handleSearch = () => {
    onFilterChange({
      brand,
      price,
      minMileage: cleanMileage(minMileage),
      maxMileage: cleanMileage(maxMileage),
    });
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
          {[30, 40, 50, 60, 70, 80, 90, 100].map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.group}>
        <label>Car mileage / km</label>
        <div className={styles.rangeInputs}>
          <input
            type="text"
            value={minMileage ? `From ${formatMileage(minMileage)}` : ""}
            onChange={(e) =>
              setMinMileage(cleanMileage(e.target.value.replace("From ", "")))
            }
            placeholder="From"
          />
          <input
            type="text"
            value={maxMileage ? `To ${formatMileage(maxMileage)}` : ""}
            onChange={(e) =>
              setMaxMileage(cleanMileage(e.target.value.replace("To ", "")))
            }
            placeholder="To"
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
