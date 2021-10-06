import { Fragment, useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  // for to show order form
  const [isCheckout, setIsCheckout] = useState(false);

  // for submiting
  const [isSubmitting, setIsSubmitting] = useState(false);

  // whether data is submitted successfully
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  // we want to display like $12.93 even if we have 12.934534
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  // cart has items or not
  const hasItems = cartCtx.items.length > 0;

  // add in cart item
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, quantity: 1 });
  };

  // remove cart item
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  // order
  const orderHandler = () => {
    setIsCheckout(true);
  };

  // submit data to firebase- carted items + order address details(UserData)
  // userDate - can we get from checkout js
  const submitOrderHandler = async (userData) => {
    // to know for user that data is submittion
    setIsSubmitting(true);

    const dataToSend = {
      userData: userData,
      orderdItems: cartCtx.items,
    };
    const myresponse = await fetch(
      "https://onemorefoodweb-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify(dataToSend),
      }
    );

    setIsSubmitting(false);
    setDidSubmit(true);

    // clear the cart by calling clear cart in cart context provider
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          // bind will pre configure the data, because in cartItemAddHandler we required item and in cartItemRemoveHandler we required item id
          // so we are first binding those before execution
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  // order, cancel buttons
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  // for all cart card required
  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span> Total Amount</span>
        <span> {totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onCloseCart} onConfirm={submitOrderHandler} />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  // this should be shown when we are submitting
  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onCloseCart}>
          Close
        </button>
      </div>
    </Fragment>
  );
  return (
    <Modal onClose={props.onCloseCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
