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

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={handleToggleFavorite}>
        {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
      </div>

      <img src={car.img} alt={car.model} className={styles.image} />

      <div className={styles.info}>
        <div className={styles.titleRow}>
          <h3>
            {car.brand} {car.model}
          </h3>
          <span className={styles.price}>${car.rentalPrice}</span>
        </div>

        <p className={styles.description}>
          {car.description.length > 100
            ? `${car.description.slice(0, 100)}...`
            : car.description}
        </p>

        <p className={styles.mileage}>
          Пробіг: {car.mileage.toLocaleString("en-US")} km
        </p>

        <Link to={`/catalog/${car.id}`} className={styles.button}>
          Read more
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
