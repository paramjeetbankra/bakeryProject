import styles from "./AddMinusButton.module.css";

export default function PageWrapper(props) {
  return (
    <div className={styles.addMinus}>
      <span
        className={styles.minus}
        onClick={props.updateItem}
        data-name={props.name}
        data-type="remove"
      >
        -
      </span>
      <input type="text" value={props.quantity} readOnly />
      <span
        className={styles.plus}
        onClick={props.updateItem}
        data-name={props.name}
        data-type="add"
      >
        +
      </span>
    </div>
  );
}
