import styles from "./Landing.module.css";

export default function Hero() {
  return (
    <div className={styles.herobg}>
      <div className={styles.heroDiv}>
        <img alt="" className={styles.img} />
      </div>
    </div>
  );
}
