import React from "react";
import { FormSelect, Button } from "react-bootstrap";
import Calendar from "react-calendar";
import { Dropdown } from "react-bootstrap";
import { IoIosArrowDown } from "react-icons/io";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "react-calendar/dist/Calendar.css";
import classes from './FilterInput.module.css'

function FilterForm({
  selectedLocation,
  handleLocationChange,
  filters,
  handleInputChange,
  dateRange,
  handleCalendarChange,
  formattedDateRange,
  numOfPeopleError,
  handleSubmit,
  houses,
  today,
}) {
  return (
    <Form onSubmit={handleSubmit} className={`align-items-center justify-content-center ${classes.group}`}>
      <Row className={`align-items-center justify-content-center`}>
        <Col xs="auto">
          <FormSelect
            id="location"
            name="location"
            value={selectedLocation}
            onChange={handleLocationChange}
            placeholder="Select location"
            className={classes.select}
          >
            <option value="">All locations</option>
            {houses.map((house) => (
              <option key={house.location} value={house.location}>
                {house.location}
              </option>
            ))}
          </FormSelect>
        </Col>
        <Col xs="auto">
          <Form.Control
            className={classes.select}
            id="numOfPeople"
            name="numOfPeople"
            type="number"
            min="1"
            max="30"
            value={filters.numOfPeople}
            onChange={handleInputChange}
            placeholder="No of people"
            isInvalid={!!numOfPeopleError}
          />
          <Form.Control.Feedback type="invalid">
            {numOfPeopleError}
          </Form.Control.Feedback>
        </Col>
        <Col xs="auto">
          <Dropdown>
            <Dropdown.Toggle
              variant="outline-secondary"
              className={classes.dropdownToggle}
            >
              {formattedDateRange}
              <IoIosArrowDown className={classes.arrow} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Calendar
                onChange={handleCalendarChange}
                value={dateRange}
                selectRange={true}
                id="date"
                aria-label="Rental Availability"
                minDate={today}
              />
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs="auto" className="mt-sm-0 mt-4 d-md-block">
          <Button type="submit" className={classes.button}>
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default FilterForm;
