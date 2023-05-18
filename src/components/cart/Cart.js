import styles from "./Cart.module.css";
import PageWrapper from "../Common/PageWrapper";
import CartTable from "./CartTable";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Cart(props) {
  let products = JSON.parse(localStorage.getItem("carts"));
  const [items, setItems] = useState(products ? products : []);

  useEffect(() => {
    let products = JSON.parse(localStorage.getItem("carts"));
    setItems(products ? products : []);
  }, [setItems]);

  let updateItems = (data) => {
    setItems(data);
  };
  let removeItem = (index) => {
    let items1 = [...items];
    items1.splice(index, 1);
    this.props.updateNumber(items1.length);
    updateItems(items);
  };

  let updateCount = (index, value) => {
    let items1 = [...items];
    items1[index].quantity = value;
    console.log(items);
    updateItems(items);
  };

  let getTotalPrice = () => {
    let totalPrice;
    if (items.length) {
      totalPrice = items
        .map((i) => i.quantity * i.price)
        .reduce((a, b) => a + Number(b))
        .toLocaleString("en-US", { style: "currency", currency: "USD" });
    }
    return totalPrice;
  };
  let checkout = () => {
    localStorage.removeItem("carts");
    console.log("Order Placed");
    console.log(items);
    setItems([]);
    props.updateNumber(0);
  };
  return (
    <PageWrapper>
      <div className={styles.wrapper}>
        <div className={styles.cartWrapper}>
          <h2 style={{ marginTop: 0, fontWeight: 600 }}>Cart</h2>
          {
            //Conditionally Render if user has something in the cart
            items.length > 0 && (
              <div>
                <CartTable
                  items={items}
                  updateCount={updateCount}
                  removeItem={removeItem}
                />
                <div className={styles.rightSide}>
                  <div className={styles.subTotal}>
                    <span>Subtotal</span>
                    {getTotalPrice()}
                  </div>
                  <button className={styles.checkout} onClick={checkout}>
                    Check Out
                  </button>
                </div>
              </div>
            )
          }
          {
            //Suggest a product if nothing is in the cart
            items.length === 0 && (
              <p>
                Hmmmmm, there's nothing in your cart yet. May I suggest the{" "}
                <Link to={"/product"} className="hoodieLink">
                  Products
                </Link>
              </p>
            )
          }
        </div>
      </div>
    </PageWrapper>
  );
}
