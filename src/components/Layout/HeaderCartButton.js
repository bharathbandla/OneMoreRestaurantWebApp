import classes from "./HeaderCardButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import { useContext, useEffect, useState } from "react";

const HeaderCardButton = (props) => {
  // to save the state of the button is highlighted or not
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const cartCtx = useContext(CartContext);
  
  // this will go to each item in the array and add the each item amount to curNum
  // initially curNum is 0
  const numberOfCartItems = cartCtx.items.reduce((curNum, item) => {
    return curNum + item.quantity;
  }, 0);

  // this is for animation for the button
  // bump is added only if btn is highlighted
  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''} `;

  // total cart items value class
  const totItmClasses = `${classes.badge} ${btnIsHighlighted ? classes.ping : ''} `;

  // derefference cartCtx, in that items is assigned to store in contItems
  const {items: contItems} = cartCtx;

  // this will be called when ever contItems is updated
  useEffect(() =>{
    // this animation will be effect only if the cart contains one item atleast
    if(cartCtx.items.length === 0){
      return;
    }
    setBtnIsHighlighted(true);

    // after 300ms, we are removing the animation
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    // clear the timer before the next time useEffect starts
    return () =>{
      clearTimeout(timer);
    };
  }, [contItems]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>

      <span>Your Cart</span>

      <span className={totItmClasses}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCardButton;
