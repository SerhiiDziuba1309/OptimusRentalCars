import { Link } from "react-router-dom";
import styles from "../styles/CarCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/favoritesSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CarCard = ({ car }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.includes(car.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(car.id));
  };

  const {
    id,
    img,
    brand,
    model,
    year,
    rentalPrice,
    address,
    rentalCompany,
    type,
    mileage,
  } = car;

  const city = address.split(",")[1]?.trim() || "";
  const country = address.split(",")[2]?.trim() || "";

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={img} alt={model} className={styles.image} />
        <button
          className={styles.favorite}
          onClick={handleToggleFavorite}
          aria-label="Toggle favorite"
        >
          {isFavorite ? <FaHeart color="#3470ff" /> : <FaRegHeart />}
        </button>
      </div>

      <div className={styles.info}>
        <div className={styles.titleRow}>
          <h3>
            {brand} <span className={styles.model}>{model}</span>, {year}
          </h3>
          <span className={styles.price}>
            {rentalPrice.startsWith("$") ? rentalPrice : `$${rentalPrice}`}
          </span>
        </div>

        <ul className={styles.specs}>
          <li>{city}</li>
          <li>{country}</li>
          <li>{rentalCompany}</li>
          <li>{type}</li>
          <li>{Number(mileage).toLocaleString("en-US")} km</li>
        </ul>

        <Link to={`/catalog/${id}`} className={styles.readMore}>
          Read more
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
