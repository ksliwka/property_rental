import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import CartItems from "./CartItems";
import CartContext from "../store/cart-context";
import Heart from "../assets/Heart";
import { Container } from "react-bootstrap";

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
          </Modal.Body>
        </Container>
      </Modal>
    </>
  );
};

export default CartModal;
