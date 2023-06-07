import { useRouter } from "next/router";
import { useContext } from "react";
import classes from "./HouseItem.module.css";
import Card from "react-bootstrap/Card";
import { Col, Button, Row } from "react-bootstrap";

import Heart from "../assets/Heart";
import CartContext from "../store/cart-context";

function HouseItem(props) {
  const router = useRouter();

  const price = `$${props.price}`;

  const cartCtx = useContext(CartContext);

  const addItemToCartHandler = (event) => {
    event.preventDefault();

    cartCtx.addItem({
      id: props.id,
      title: props.title,
      price: props.price,
      image: props.image,
      location: props.location,
    });
  };

  function showDetailsHandler() {
    router.push("/" + props.id);
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3} className={classes.card}>
      <Card className="h-100" key={props.id}>
        <form onSubmit={addItemToCartHandler}>
          <Button type="submit" className={classes.heart_btn}>
            <Heart />
          </Button>
          <Card.Img
            variant="top"
            src={props.image}
            alt={props.title}
            className={classes.cardImage}
          />
          <Card.Body className="d-flex flex-column">
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>{price}</Card.Text>
            <Card.Text>{props.location}</Card.Text>
            <Card.Text>{props.rentalAvailability.start}</Card.Text>
            <Card.Text>{props.rentalAvailability.end}</Card.Text>

            <Button
              className={`mt-auto ${classes.button}`}
              onClick={showDetailsHandler}
            >
              SHOW DETAILS
            </Button>
          </Card.Body>
        </form>
      </Card>
    </Col>
  );
}

export default HouseItem;

//przy button mogę zmienić na Link od next.js to jest lepesze rozwiązanie
