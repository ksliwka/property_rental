import { useRouter } from "next/router";
import React, { useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import { Button, Col, Row } from "react-bootstrap";
import { BsFillArrowDownRightCircleFill } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import CartContext from "../store/cart-context";

import classes from "./CartItems.module.css";

const CartItems = ({ items, hideModal }) => {
  const router = useRouter();
  const cartCtx = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  const showDetailsHandler = async (itemId) => {
    setIsLoading(true);

    await router.push("/" + itemId);

    setIsLoading(false);
    hideModal();
  };
  const removeItemHandler = (itemId) => {
    cartCtx.removeItem(itemId);
  };

  return (
    <>
      {isLoading ? (
        <p
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100px" }}
        >
          Loading...
        </p>
      ) : (
        <ul>
          {items.map((item) => (
            <Card body key={item.id} className="mb-3 mt-3">
              <Row>
                <Col xs={4} sm={5} md={3} xl={2}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={classes.modalImage}
                  />
                </Col>
                <Col>
                  <h3>{item.title}</h3>
                  <p>${item.price}</p>
                  <p className="text-muted">{item.location}</p>
                </Col>
                <Col className="d-flex align-items-end justify-content-end">
                  <Button onClick={() => removeItemHandler(item.id)} className={classes.remove}>
                    <MdClose className={classes.removeBtn}/>
                  </Button>
                  <a onClick={() => showDetailsHandler(item.id)}>
                    <BsFillArrowDownRightCircleFill className={classes.arrow} />
                  </a>
                </Col>
              </Row>
            </Card>
          ))}
        </ul>
      )}
    </>
  );
};

export default CartItems;
