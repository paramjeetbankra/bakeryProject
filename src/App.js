import "./styles.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing//Landing";
import Product from "./components/Product/Product";
import { useEffect, useState } from "react";
import Header from "./components/Common/Header";
import Cart from "./components/cart/Cart";
import Products from "./components/Product/data";
import ProductItem from "./components/Product/ProductItem";

export default function App() {
  let items = JSON.parse(localStorage.getItem("carts"));
  items = Array.isArray(items) ? items : []
  let quantity1 = items ? items.length : 0;
  const [quantity, setQuantity] = useState(quantity1);
  const [products, setProducts] = useState(items);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("carts"));
    let quantity1 = items ? items.length : 0;
    setQuantity(quantity1);
  }, [setQuantity]);

  let updateNumber = (num) => {
    setQuantity(num);
  };
  let updateItemsInCache = (items) => {
    console.log(items.length);
    if (items.length === 0) {
      localStorage.removeItem("carts");
      return;
    }
    localStorage.setItem("carts", JSON.stringify(items));
    setProducts(items);
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += 1 * items[i]?.quantity;
    }
    updateNumber(total);
  };

  let checkSelected = (product) => {
    console.log(products);
    console.log(product);
    let index = products.findIndex((prod) => prod.name === product.name);
    return index === -1 ? null : products[index];
  };

  return (
    <Router>
      <div className="App">
        <Header quantity={quantity} />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Landing
                updateItemsInCache={updateItemsInCache}
                cartProducts={products}
              />
            )}
          />
          <Route
            exact
            path="/product"
            render={(props) => <Product cartProducts={products}  updateItemsInCache={updateItemsInCache}/>}
          />
          <Route
            exact
            path="/cart"
            render={(props) => <Cart updateNumber={updateNumber} />}
          />
          {Products.map((product, i) => (
            <Route
              exact
              key={`route${i}`}
              path={`/product/${product.url}`}
              render={(props) => (
                <ProductItem
                  product={product}
                  selectedProd={checkSelected(product)}
                  updateItemsInCache={updateItemsInCache}
                />
              )}
            />
          ))}
        </Switch>
      </div>
    </Router>
  );
}
