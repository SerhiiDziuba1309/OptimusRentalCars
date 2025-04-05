// CarDetailsPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/CarDetailsPage.module.css";
import BookingForm from "../components/BookingForm.jsx";
import SvgIcon from "../components/SvgIcon.jsx";

const CarDetailsPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(
          `https://car-rental-api.goit.global/cars/${id}`
        );
        setCar(response.data);
      } catch (error) {
        console.error("Error loading car:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading || !car) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <img src={car.img} alt={car.model} className={styles.image} />
        <BookingForm />
      </div>

      <div className={styles.right}>
        <h2 className={styles.title}>
          {car.brand} {car.model}, {car.year}
          <span className={styles.id}>Id: {car.id.slice(0, 4)}</span>
        </h2>

        <div className={styles.metaRow}>
          <SvgIcon id="location" className={styles.icon} />
          <span className={styles.address}>
            {car.address.split(", ").slice(-2).join(", ")}
          </span>
          <span className={styles.mileage}>
            Mileage: {car.mileage?.toLocaleString("en-US")} km
          </span>
        </div>

        <p className={styles.price}>${car.rentalPrice}</p>
        <p className={styles.description}>{car.description}</p>

        <div className={styles.block}>
          <h3 className={styles.sectionTitle}>Rental Conditions:</h3>
          <ul className={styles.list}>
            {(Array.isArray(car.rentalConditions)
              ? car.rentalConditions
              : [car.rentalConditions]
            ).map((item, idx) => (
              <li key={idx} className={styles.listItem}>
                <SvgIcon id="check-circle" className={styles.icon} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.block}>
          <h3 className={styles.sectionTitle}>Car Specifications:</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <SvgIcon id="calendar" className={styles.icon} />
              Year: {car.year}
            </li>
            <li className={styles.listItem}>
              <SvgIcon id="car" className={styles.icon} />
              Type: {car.type}
            </li>
            <li className={styles.listItem}>
              <SvgIcon id="fuel-pump" className={styles.icon} />
              Fuel: {car.fuelConsumption}
            </li>
            <li className={styles.listItem}>
              <SvgIcon id="gear" className={styles.icon} />
              Engine: {car.engineSize}
            </li>
          </ul>
        </div>

        <div className={styles.block}>
          <h3 className={styles.sectionTitle}>
            Accessories and functionalities:
          </h3>
          <ul className={styles.list}>
            {car.accessories.map((item, i) => (
              <li key={i} className={styles.listItem}>
                <SvgIcon id="check-circle" className={styles.icon} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
