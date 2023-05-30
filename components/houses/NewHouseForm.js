import { useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Container, Row, Col, Button } from "react-bootstrap";

import classes from "./NewHouseForm.module.css";

function NewHouseForm(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const locationInputRef = useRef();
  const descriptionInputRef = useRef();
  const priceRef = useRef();

  const [dateRange, setDateRange] = useState([]);

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredLocation = locationInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredPrice = priceRef.current.value;

    const formattedStartDate = formatDate(dateRange[0]);
    const formattedEndDate = formatDate(dateRange[1]);

    const houseData = {
      title: enteredTitle,
      image: enteredImage,
      location: enteredLocation,
      rentalAvailability: {
        start: formattedStartDate,
        end: formattedEndDate,
      },
      price: enteredPrice,
      description: enteredDescription,
    };

    props.onAddProperty(houseData);
  }

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleCalendarChange = (value) => {
    setDateRange(value);
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
              <label htmlFor="title">Title</label>
              <input type="text" required id="title" ref={titleInputRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor="image">Image</label>
              <input type="url" required id="image" ref={imageInputRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor="location">Location</label>
              <input
                type="text"
                required
                id="location"
                ref={locationInputRef}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="rentalAvailability">Select Dates</label>
              <Calendar
                onChange={handleCalendarChange}
                value={dateRange}
                selectRange={true}
                id="rentalAvailability"
                aria-label="Rental Availability"
              />
            </div>
            {dateRange.length > 0 ? (
              <p className="text-center">
                <span className="bold">Start:</span> {formatDate(dateRange[0])}
                &nbsp;|&nbsp;
                <span className="bold">End:</span> {formatDate(dateRange[1])}
              </p>
            ) : (
              <p className="text-center">
                <span className="bold">Default selected date:</span>{" "}
                {formatDate(dateRange[0])}
              </p>
            )}
            <label htmlFor="price">Price</label>
            <div className={`input-group ${classes.control}`}>
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>
              <input
                type="text"
                required
                className="form-control"
                id="price"
                ref={priceRef}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                required
                rows="5"
                ref={descriptionInputRef}
              ></textarea>
            </div>
            <div className={classes.formButton}>
            <Button >Add</Button>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default NewHouseForm;
