import { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  // we want to display like $12.93 even if we have 12.934534
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  // cart has items or not
  const hasItems = cartCtx.items.length > 0;

  // add in cart item
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, quantity: 1});
  };

  // remove cart item
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          quantity = {item.quantity}
          // bind will pre configure the data, because in cartItemAddHandler we required item and in cartItemRemoveHandler we required item id
          // so we are first binding those before execution
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        <span> Total Amount</span>
        <span> {totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseCart}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
