import { Fragment } from "react";
import classes from "./HouseDetail.module.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import { GoLocation } from "react-icons/go";


function HouseDetail(props) {
  return (
    <Fragment>
      <Container className="mt-4">
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
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default HouseDetail;
