import { useContext } from "react";
import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
import CartContext from "../../../store/cart-context";

// import images
import mealsImg from "../../../assets/meals.jpg";


const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  // we want to display like $10.24, even if we got like 10.2453442
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (quantity) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      quantity: quantity,
      price: props.price,
    });
  };

  // remove cart item
  const cartItemRemoveHandler = () => {
    cartCtx.removeItem(props.id);
  };

  // add item to cart
  const addItemToCartHandler = () => {
    const item={id: props.id,
      name: props.name,
      quantity: 1,
      price: props.price,}
    cartCtx.addItem({...item, quantity: 1});
  };

  const itemInCartIndex = cartCtx.items.findIndex((item) => item.id === props.id);
  const existingItem = cartCtx.items[itemInCartIndex];
  let itemQuantity = 0;
  if(existingItem){
    itemQuantity = existingItem.quantity;
  }
  



  return (
    // <li className={classes.meal}>
    // <div>
    //   <div>
    //     <h3>{props.name}</h3>
    //     <div className={classes.description}>{props.description} </div>
    //     <div className={classes.price}> {price} </div>
    //   </div>
    //   <div>
    //     <MealItemForm onAddToCart={addToCartHandler} />
    //   </div>

    // {/* /////////////// */}

    <div>
      <div className={`${classes.card} ${classes.center}`}>
        <img src={props.img} className={classes.img} />
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description} </div>
        <div className={classes.price}> {price} </div>

        <div className={classes.actions}>
          {itemQuantity !==0 && <button onClick={cartItemRemoveHandler}>−</button>}
          
          <span className={classes.quantity}>{itemQuantity}</span>
          <button onClick={addItemToCartHandler}>+</button>
        </div>
        <div className={classes.bdr} />
        <div className={classes.dfoot}>
          <MealItemForm onAddToCart={addToCartHandler} />
        </div>
      </div>
    </div>
    // </li>
  );
};

export default MealItem;
