import { Fragment } from "react";
import ReactDom from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  // onClick on the backgroung, cart will be closed
  return <div className={classes.backdrop} onClick={props.onClose}/>;
};

const ModalOverlay = (props) => {
  // here the body of the cart will be there
  return (
    <div className={classes.modal}>
      <div className={classes.context}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDom.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
      {ReactDom.createPortal(<ModalOverlay> {props.children} </ModalOverlay>, portalElement )}
    </Fragment>
  );
};

export default Modal;
