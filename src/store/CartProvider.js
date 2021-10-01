import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  // for add
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.quantity;

    // check whether the item is already present in the cart
    // return true if both id are equal, this will return the index of the itemm if it exists
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    // set the item if exists
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    // if item is already present in the cart
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + action.item.quantity,
      };

      // taking all previous items into array
      updatedItems = [...state.items];

      // override that particular index with this new item
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // item was added first time
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  // to remove
  if (action.type === "REMOVE") {
    // find item index in the cart
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingCartItemIndex];

    // decrease the total amount bill
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    // remove the item from the cart if its is count is 1 and click on - button
    if (existingItem.quantity === 1) {
      // for the REMOVE cartReducer we are just passing only id not the full item
      // keep only in the updatedItems with the items without the action id
      // thats why we are using not equal
      // this will give new array and we are going to store in the updatedItems
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      // if quantity is greater than one, just decrease the quantity count
      // we are just spreding the existingItem object and decrease the quantity count by 1 and store it back into updatedItem
      // this is only for single item
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };

      // now update the whole items
      // save previous state items into a object
      updatedItems = [...state.items];

      // update the array, like repacing the previous object in that index with this updated item
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  // cartState has only two variables - items, totalAmount
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  // add item to cart
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  // remove item from cart
  const removeItemFromCart = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  // this is for intial value to the provider
  // ony items and total items are from cartState
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCart,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
