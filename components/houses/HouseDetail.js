import { Fragment } from "react";
import classes from "./HouseDetail.module.css";

function HouseDetail(props) {
  return (
    <Fragment>
      <img src={props.image} alt={props.title}></img>
      <h1>{props.title}</h1>
      <address>{props.location}</address>
      <h3>{props.price}</h3>
      <p>{props.rentalAvailability}</p>
      <p>{props.description}</p>
    </Fragment>
  );
}

export default HouseDetail;
