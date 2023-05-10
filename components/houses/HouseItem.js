import { useRouter } from "next/router";

import classes from "./HouseItem.module.css";
import Card from "react-bootstrap/Card";
import { Col, Button } from "react-bootstrap";

function HouseItem(props) {
  const router = useRouter()
  function showDetailsHandler(){
    router.push('/' + props.id);
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3} className={classes.card}>
      <Card className="h-100" key={props.id}>
        <Card.Img variant="top" src={props.image} alt={props.title} />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.location}</Card.Text>
          <Button className="mt-auto" onClick={showDetailsHandler}>Show Details</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default HouseItem;

//przy button mogę zmienić na Link od next.js to jest lepesze rozwiązanie