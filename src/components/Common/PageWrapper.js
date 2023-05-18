import styles from "./PageWrapper.module.css";

export default function PageWrapper(props) {
  return <div className={styles.pageWrapper}>{props.children}</div>;
}
