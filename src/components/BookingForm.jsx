import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/BookingForm.module.css";

const BookingForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("✅ Thank you! Your booking was received.");

    setName("");
    setEmail("");
    setStartDate(null);
    setEndDate(null);
    setComment("");
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className={styles.title}>Book your car now</h3>
        <p className={styles.subtitle}>
          Stay connected! We are always ready to help you.
        </p>

        <input
          className={styles.input}
          type="text"
          placeholder="Name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className={styles.input}
          type="email"
          placeholder="Email*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className={styles.datePickerWrapper}>
          <DatePicker
            selected={startDate}
            onChange={(dates) => {
              const [start, end] = dates;
              setStartDate(start);
              setEndDate(end);
            }}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            placeholderText="Booking date"
            dateFormat="dd.MM.yyyy"
            className={styles.dateInput}
            required
          />
        </div>

        <textarea
          className={styles.textarea}
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button type="submit" className={styles.button}>
          Send
        </button>
      </form>

      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default BookingForm;
