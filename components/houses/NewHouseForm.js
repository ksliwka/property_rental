import { useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";

import classes from "./NewHouseForm.module.css";

function NewHouseForm(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const locationInputRef = useRef();
  const descriptionInputRef = useRef();
  const priceRef = useRef();
  const noPeopleRef = useRef();

  const [dateRange, setDateRange] = useState([]);

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredLocation = locationInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredPrice = priceRef.current.value;
    const enteredNoPeople = noPeopleRef.current.value;

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
      noPeople: enteredNoPeople,
      description: enteredDescription,
    };

    props.onAddProperty(houseData);
  }

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  const handleCalendarChange = (value) => {
    setDateRange(value);
  };

  const today = new Date();

  return (
    <Container>
      <Row>
        <Col md={5}></Col>
        <Col md={7}>
          <Form className={classes.form} onSubmit={submitHandler}>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="title">Title</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    id="title"
                    ref={titleInputRef}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="location">Location</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    id="location"
                    ref={locationInputRef}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="title">No of people</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    id="title"
                    ref={noPeopleRef}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="price">Price</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control
                      type="text"
                      required
                      id="price"
                      ref={priceRef}
                      pattern="[0-9]*"
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label htmlFor="image">Image</Form.Label>
              <Form.Control
                type="url"
                required
                id="image"
                ref={imageInputRef}
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="rentalAvailability">
                    Select Dates
                  </Form.Label>
                  <Calendar
                    onChange={handleCalendarChange}
                    value={dateRange}
                    selectRange={true}
                    id="rentalAvailability"
                    aria-label="Rental Availability"
                    minDate={today}
                  />

                  {dateRange.length > 0 ? (
                    <p className="text-center">
                      <span className="bold">Start:</span>{" "}
                      {formatDate(dateRange[0])}
                      &nbsp;|&nbsp;
                      <span className="bold">End:</span>{" "}
                      {formatDate(dateRange[1])}
                    </p>
                  ) : (
                    <p className="text-center">
                      <span className="bold">Default selected date:</span>{" "}
                      {formatDate(dateRange[0])}
                    </p>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="description">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    id="description"
                    required
                    rows="10"
                    ref={descriptionInputRef}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <div className={classes.formButton}>
              <Button type="submit">Add</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default NewHouseForm;
