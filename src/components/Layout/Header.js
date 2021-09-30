import React from "react";
import classes from "./Header.module.css";
import HeaderCardButton from "./HeaderCartButton";

// import image
import mealsImg from "../../assets/meals.jpg";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>One More</h1>
        <HeaderCardButton onClick={props.onShowCart} />
      </header>

      <div className={classes["main-image"]}>
        <img src={mealsImg} alt="Delicious food" />
      </div>
    </React.Fragment>
  );
};

export default Header;
