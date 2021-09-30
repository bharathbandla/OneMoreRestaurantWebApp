import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      {/* for different properties we may get, so use expand props to expand the key value pairs */}
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
