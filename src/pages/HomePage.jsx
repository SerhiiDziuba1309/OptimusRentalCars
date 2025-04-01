import { Link } from "react-router-dom";
import styles from "../styles/HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to Optimus Rental Cars</h1>
      <p>Find your perfect car for any journey.</p>
      <Link to="/catalog" className={styles.button}>
        View Catalog
      </Link>
    </div>
  );
};

export default HomePage;
