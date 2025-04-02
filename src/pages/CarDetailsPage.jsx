import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "../styles/CarDetailsPage.module.css";
import BookingForm from "../components/BookingForm";

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
        setError("Не вдалося завантажити дані автомобіля.");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleBookingSubmit = (data) => {
    alert(
      `Бронювання успішне!\nІм'я: ${data.name}\nEmail: ${data.email}\nТелефон: ${data.phone}`
    );
  };

  if (loading) return <div>Завантаження деталей автомобіля...</div>;
  if (error) return <div>{error}</div>;
  if (!car) return <div>Автомобіль не знайдено</div>;

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
        <strong>Пробіг:</strong> {car.mileage.toLocaleString("en-US")} km
      </p>
      <p>
        <strong>Аксесуари:</strong> {car.accessories.join(", ")}
      </p>

      {/* Форма бронювання */}
      <h2>Забронювати автомобіль</h2>
      <BookingForm onSubmit={handleBookingSubmit} />
    </div>
  );
};

export default CarDetailsPage;
