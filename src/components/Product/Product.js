import styles from "./Product.module.css";
import ProductList from "./ProductList";
import PageWrapper from "../Common/PageWrapper";

export default function Product(props) {
  return (
    <PageWrapper>
      <div>
        <h2 className={styles.heading}>All Products</h2>
        <ProductList cartProducts={props.cartProducts} />
      </div>
    </PageWrapper>
  );
}
