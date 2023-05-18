import styles from "./Product.module.css";
import { Link } from "react-router-dom";
import Products from "./data";
import { useState } from "react";
import AddMinusButton from "../Common/AddMinusButton";

export default function ProductList(props) {
  const [selected, setSelected] = useState({});

  const addTocart = (event) => {
    let id = event.target.dataset.id;
    let product = Products[id];
    let item = {
      name: product.name,
      price: product.sizes[0].price,
      image: `../photos/${product.url}/${product.image}`,
      quantity: 1
    };

    let cartProducts = [...props.cartProducts];
    cartProducts.push(item);
    selected[product.name] = { selected: true, quantity: 1 };

    props.updateItemsInCache(cartProducts);
  };

  let updateItem = (event) => {
    let cartProducts = [...props.cartProducts];
    let selected1 = { ...selected };

    let name = event.target.dataset.name;
    let type = event.target.dataset.type;

    let index = cartProducts.findIndex((ele) => ele.name === name);
    if (index === -1) return;
    if (type === "add") {
      console.log(cartProducts[index]);
      cartProducts[index].quantity += 1;
      selected1[name].quantity += 1;
    } else {
      if (cartProducts[index].quantity === 1) {
        delete selected1[name];

        cartProducts.splice(index, 1);
      } else {
        cartProducts[index].quantity -= 1;
        selected1[name].quantity -= 1;
      }
    }
    setSelected(selected1);
    props.updateItemsInCache(cartProducts);
  };

  return (
    <div className={styles.productList}>
      {Products.map((product, i) => {
        return (
          <div key = {`product_{${i}}`}>
          <Link key={i} to={`/product/${product.url}`}>
            <div className={styles.imgWrapper}>
              <div
                className={styles.largeImg}
                style={{
                  backgroundImage: `url(../photos/${product.url}/${product.image})`
                }}
                alt={product.name}
              />
            </div>
            </Link>
            <div className={styles.title}>
              {product.name}
              <div className={styles.price}>Rs {product.sizes[0].price}</div>
            </div>
            <div className={styles.addTocartWrapper}>
              {!selected[product.name] && (
                <button onClick={addTocart} data-id={i}>
                  Add to Cart{" "}
                </button>
              )}
              {selected[product.name] && (
                <AddMinusButton
                  name={product.name}
                  updateItem={updateItem}
                  quantity={selected[product.name].quantity}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
