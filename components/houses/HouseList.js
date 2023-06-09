import HouseItem from "./HouseItem";
import classes from "./HouseList.module.css";
import { Container, Row, Col } from "react-bootstrap";
// import Map from "./Map.js";

function HouseList(props) {
  return (
    <>
      <Row>
        
          {props.houses.map((house) => (
            <HouseItem
              key={house.id}
              id={house.id}
              image={house.image}
              title={house.title}
              location={house.location}
              rentalAvailability={house.rentalAvailability}
              price={house.price}
            />
          ))}
        
      </Row>
    </>
  );
}

export default HouseList;
