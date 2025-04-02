import { Link } from "react-router-dom";
import styles from "../styles/HomePage.module.css";

const HomePage = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1>Find your perfect car</h1>
          <p>Explore our catalog and rent the best car for your journey</p>
          <Link to="/catalog" className={styles.ctaButton}>
            View Catalog
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
