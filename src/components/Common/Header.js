import styles from "./Header.module.css";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.appbar}>
        <Link to="/" className={styles.menuButton}>
          <div className="logo" />
          <h3 className={styles.storeName}>Bakery</h3>
        </Link>
        <span className={styles.buttons}>
          <Link
            to="/cart"
            className={styles.menuButton}
            style={{ marginRight: 0, color: "#f0f0f0" }}
          >
            <span className={styles.typeButton}>
              Cart{props.quantity ? ` (${props.quantity})` : ""}
            </span>
          </Link>
        </span>
      </div>
    </div>
  );
}
