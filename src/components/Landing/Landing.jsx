import styles from "./Landing.module.css";
import Hero from "./Hero";
import { Fragment } from "react";
import ProductList from "../Product/ProductList";
import { Link } from "react-router-dom";

export default function Landing(props) {
  return (
    <Fragment>
      <Hero></Hero>
      <div className={styles.mainWrapper}>
        <ProductList
          updateItemsInCache={props.updateItemsInCache}
          cartProducts={props.cartProducts}
        />
        <div className={styles.allProductWrapper}>
          <Link to={"/product"}>{"Let's Go Shopping"}</Link>
          <span>&raquo;</span>
        </div>
      </div>
    </Fragment>
  );
}
