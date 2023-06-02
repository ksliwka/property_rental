import { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import classes from "./CartModal.module.css";

import CartContext from "../store/cart-context";
import Heart from "../assets/Heart";

function CartModal() {
  const fullscreenOption = true; // Set the desired fullscreen option here
  const [fullscreen, setFullscreen] = useState(fullscreenOption);
  const [show, setShow] = useState(false);

  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.length;

  const cartItems = (
    <ul>
      {cartCtx.items.map((item) => {
        return <li>{item.title}</li>;
      })}
    </ul>
  );

  function handleShow() {
    // setFullscreen(fullscreenOption);
    setShow(true);
  }

  return (
    <>
      <a type="btn" onClick={handleShow} className={`me-2 mb-2 `}>
        <Heart />
      </a>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Number of Cart items: {numberOfCartItems}
          {cartItems}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CartModal;
