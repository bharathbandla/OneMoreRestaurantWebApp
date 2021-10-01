import { useContext } from "react";
import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
import CartContext from "../../../store/cart-context";

// // import images
// import mealsImg from "../../../assets/meals.jpg";


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

  // remove cart item, remove item requres only item id
  const cartItemRemoveHandler = () => {
    cartCtx.removeItem(props.id);
  };

  // add item to cart
  // this is for + button in each tile of the food in the main view
  const addItemToCartHandler = () => {
    // create an item with this id
    // in the add Item function there is check, whether this is new object or priviously added item
    // based on that there itself can take care, here we have to pass id as correct
    // if this is the new item, then quanitiy as 1, and price are useful
    const item={id: props.id,
      name: props.name,
      quantity: 1,
      price: props.price,}
    cartCtx.addItem(item);
  };


  // this is to update the front view of the teil of the single food item quantity in the each item
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
        <img src={props.img} className={classes.img} alt={props.name}/>
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
