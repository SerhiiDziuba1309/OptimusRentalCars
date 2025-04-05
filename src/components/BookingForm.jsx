import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import styles from "../styles/BookingForm.module.css";

const BookingForm = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const initialValues = {
    name: "",
    email: "",
    comment: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    if (!startDate || !endDate) {
      toast.error("Please select a booking date range.");
      return;
    }

    toast.success("✅ Thank you! Your booking was received.");

    resetForm();
    setDateRange([null, null]);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          <h3 className={styles.title}>Book your car now</h3>
          <p className={styles.subtitle}>
            Stay connected! We are always ready to help you.
          </p>

          <div>
            <Field
              name="name"
              type="text"
              placeholder="Name*"
              className={styles.input}
            />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.error}
            />
          </div>

          <div>
            <Field
              name="email"
              type="email"
              placeholder="Email*"
              className={styles.input}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.datePickerWrapper}>
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              className={styles.dateInput}
              placeholderText="Booking date"
              dateFormat="dd.MM.yyyy"
              required
            />
          </div>

          <Field
            as="textarea"
            name="comment"
            placeholder="Comment"
            className={styles.textarea}
          />

          <button type="submit" className={styles.button}>
            Send
          </button>
        </Form>
      </Formik>

      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default BookingForm;
