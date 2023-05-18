import styles from "./ProductItem.module.css";
import PageWrapper from "../Common/PageWrapper";
import AddMinusButton from "../Common/AddMinusButton";
import { useState } from "react";

export default function Product({ product, updateItemsInCache, selectedProd }) {
  const [selected, setSelected] = useState(selectedProd == null ? false : true);
  const [quantity, setQuantity] = useState(
    selectedProd ? selectedProd.quantity : 0
  );
  const [selectedSize, setSelectedSize] = useState(
    selectedProd ? selectedProd.size : 0
  );

  let addTocart = (type = "add") => {
    let items = JSON.parse(localStorage.getItem("carts"));

    items = Array.isArray(items) ? items : [];
    let item;

    let index = items.findIndex((ele) => ele.name === product.name);
    if (index === -1) {
      item = {
        name: product.name,
        price: product.sizes[selectedSize].price,
        image: `../photos/${product.url}/${product.image}`,
        quantity: 1,
        size: selectedSize
      };
      setSelected(true);
      setQuantity(1);
      items.push(item);
    } else {
      if (type === "add") {
        items[index].quantity += 1;
        setSelected(true);
        setQuantity(items[index].quantity);
      } else {
        items[index].quantity -= 1;
        setQuantity(items[index].quantity);
        if (!items[index].quantity) items.splice(index, 1);
        setSelected(false);
      }
    }
    updateItemsInCache(items);
  };

  let updateItem = (event) => {
    let type = event.target.dataset.type;
    addTocart(type);
  };
  let setSize = (event) => {
    let val = event.target.index;
    if (val !== selectedSize) {
      setSelected(false);
      let items = JSON.parse(localStorage.getItem("carts"));

      items = Array.isArray(items) ? items : [];

      let index = items.findIndex((ele) => ele.name === product.name);
      if (index !== -1) {
        items.splice(index, 1);
        updateItemsInCache(items);
      }
    }
    setSelectedSize(val);
  };

  return (
    <PageWrapper>
      <div className={styles.itemWrapper}>
        <div className={styles.imgWrapper}>
          <img
            src={`../photos/${product.url}/${product.image}`}
            alt={product.name}
          />
        </div>
        <div className={styles.productDetails}>
          <p> {product.details[0]}</p>
          <select name="size" onChange={setSize}>
            {product.sizes.map((obj, index) => {
              return (
                <option
                  value={obj.label}
                  index={index}
                  selected={selectedSize === obj.label}
                >
                  {obj.label}
                </option>
              );
            })}
          </select>
          <div className={styles.addTocartWrapper}>
            {!selected && <button onClick={addTocart}>Add to Cart </button>}
            {selected && (
              <AddMinusButton
                name={product.name}
                updateItem={updateItem}
                quantity={quantity}
              />
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
