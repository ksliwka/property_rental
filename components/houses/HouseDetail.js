import { Fragment } from "react";
import classes from "./HouseDetail.module.css";
import { Container, Row, Col, Image, Button, Modal } from "react-bootstrap";
import { GoLocation } from "react-icons/go";
import CartContext from "../store/cart-context";
import { useContext, useState } from "react";
import Heart from "../assets/Heart";
import CustomModal from "../modal/CustomModal";

function HouseDetail(props) {
  const cartCtx = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);

  const addItemToCartHandler = (event) => {
    event.preventDefault();

    const existingCartItem = cartCtx.items.find((item) => item.id === props.id);

    if (existingCartItem) {
      setShowModal(true);
      return;
    }

    cartCtx.addItem({
      id: props.id,
      title: props.title,
      price: props.price,
      image: props.image,
      location: props.location,
    });
  };



  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (
    <Fragment>
      <Container className="mt-4">
        <form onSubmit={addItemToCartHandler}>
          <Row>
            <Col md={6} lg={6}>
              <Image
                src={props.image}
                alt={props.title}
                className={classes.image}
                fluid
              ></Image>
            </Col>
            <Col md={6} className="mt-5">
              <h1>{props.title}</h1>
              <address>
                <GoLocation /> {props.location}
              </address>
              <p>{props.price}</p>
              <p className="text-muted">{props.description}</p>
              <Button type="submit" className={classes.heart_btn}>
                <Heart />
              </Button>
            </Col>
          </Row>
        </form>
      </Container>
      <CustomModal
        show={showModal}
        onHide={closeModalHandler}
        title="Product Already in Cart"
        body={<p>This item has already been added to your favorites.</p>}
        closeButtonLabel="Close"
      />
    </Fragment>
  );
}

export default HouseDetail;
