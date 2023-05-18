import { Link } from "react-router-dom";
//import TextField from "@material-ui/core/TextField";
import AddMinusButton from "../Common/AddMinusButton";

import styles from "./Cart.module.css";

export default function CartTable(props) {
  let updateItem = (event) => {
    console.log("vsrf");
    let type = event.target.dataset.type;
    let name = event.target.dataset.name;

    if (type === "add") {
      props.updateCount(name, props.items[name].quantity + 1);
    } else {
      props.updateCount(name, props.items[name].quantity - 1);
    }
  };
  return (
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Total</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {props.items.map((d, i) => {
          let attrs = [];
          let deleteOnKeyDown = (e) => {
            if (e.keyCode === 13) {
              this.props.removeItem(i);
            }
          };
          for (let key in d.attr) {
            attrs.push(`${key.replace("_", " ")}: ${d.attr[key]}`);
          }
          attrs = attrs.join(", ");

          return (
            <tr key={`cart${i}`}>
              <td>
                <div className={styles.flexDiv}>
                  <div
                    className={styles.itemImage}
                    style={{ backgroundImage: `url(${d.image})` }}
                    alt={d.name}
                  />
                  <div className={styles.title}>
                    <div className={styles.name}>
                      <Link to={d.url ? d.url : "/"}>{d.name}</Link>
                    </div>
                    <div className={styles.attrs}>{attrs}</div>
                  </div>
                </div>
              </td>
              <td>
                <AddMinusButton
                  name={i}
                  updateItem={updateItem}
                  quantity={d.quantity}
                />
              </td>
              <td>${(d.quantity * d.price).toFixed(2)}</td>
              <td onKeyDown={deleteOnKeyDown}>
                <div
                  className={styles.remove}
                  tabIndex="0"
                  onClick={() => this.props.removeItem(i)}
                >
                  &#10008;
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
