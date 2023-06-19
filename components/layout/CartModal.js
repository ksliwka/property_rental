import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import CartItems from "./CartItems";
import CartContext from "../store/cart-context";
import Heart from "../assets/Heart";
import { Button, Container } from "react-bootstrap";
import classes from './CartModal.module.css'

const CartModal = () => {
  const fullscreenOption = true; // Set the desired fullscreen option here
  const [fullscreen, setFullscreen] = useState(fullscreenOption);
  const [show, setShow] = useState(false);

  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.length;

  function handleShow() {
    setShow(true);
  }

  const hideModal = () => {
    setShow(false);
  };

  const clearCartHandler = () => {
    cartCtx.clearCart();
  };

  return (
    <>
      <a type="btn" onClick={handleShow} className={`me-2 mb-2 `}>
        <Heart />
      </a>
      <Modal show={show} fullscreen={fullscreen} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Wishlist</Modal.Title>
        </Modal.Header>
        <Container>
          <Modal.Body>
            Number of wishlist items: {numberOfCartItems}
            <CartItems items={cartCtx.items} hideModal={hideModal} />
            <Button onClick={clearCartHandler} className={classes.clear}>Clear</Button>
          </Modal.Body>
        </Container>
      </Modal>
    </>
  );
};

export default CartModal;
