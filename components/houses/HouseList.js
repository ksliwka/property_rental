import HouseItem from './HouseItem';
import classes from './HouseList.module.css';
import { Container, Row } from 'react-bootstrap';


function HouseList(props) {
  return (
    <Row>
      {props.houses.map((house) => (
        <HouseItem
          key={house.id}
          id={house.id}
          image={house.image}
          title={house.title}
          location={house.location}
        />
      ))}
    </Row>
  );
}

export default HouseList;