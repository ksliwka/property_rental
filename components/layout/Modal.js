import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiOutlineHeart } from "react-icons/ai";

import CartContext from "../store/cart-context";

function Example() {
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
      <Button onClick={handleShow} className="me-2 mb-2">
        <AiOutlineHeart />
      </Button>
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

export default Example;
