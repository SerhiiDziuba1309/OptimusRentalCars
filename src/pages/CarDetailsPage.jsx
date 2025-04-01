import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "../styles/CarDetailsPage.module.css";

const CarDetailsPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://car-rental-api.goit.global/cars/${id}`
        );
        setCar(response.data);
      } catch (err) {
        setError("Не удалось загрузить данные автомобиля.");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (loading) return <div>Загрузка деталей автомобиля...</div>;
  if (error) return <div>{error}</div>;
  if (!car) return <div>Автомобиль не найден</div>;

  return (
    <div className={styles.container}>
      <h1>
        {car.brand} {car.model}
      </h1>
      <img src={car.img} alt={car.model} className={styles.image} />
      <p>{car.description}</p>
      <p>
        <strong>Ціна за добу:</strong> ${car.rentalPrice}
      </p>
      <p>
        <strong>Двигун:</strong> {car.engineSize}
      </p>
      <p>
        <strong>Пробіг:</strong> {car.mileage.toLocaleString()} km
      </p>
      <p>
        <strong>Аксесуари:</strong> {car.accessories.join(", ")}
      </p>
    </div>
  );
};

export default CarDetailsPage;
