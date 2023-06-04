import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Dropdown } from "react-bootstrap";
import Calendar from "react-calendar";

function FilterInput({ onSearch }) {
  const [dateRange, setDateRange] = useState([]);
  const [formattedDateRange, setFormattedDateRange] = useState("Start day - End day");
  const [filters, setFilters] = useState({
    location: "",
    numOfPeople: "",
  });

  useEffect(() => {
    const formattedStartDate = formatDate(dateRange[0]);
    const formattedEndDate = formatDate(dateRange[1]);
    if (formattedStartDate && formattedEndDate) {
      setFormattedDateRange(
        `${formattedStartDate} - ${formattedEndDate}`
      );
    } else {
      setFormattedDateRange("Start day - End day");
    }
  }, [dateRange]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formattedStartDate = formatDate(dateRange[0]);
    const formattedEndDate = formatDate(dateRange[1]);
    onSearch({
      ...filters,
      rentalAvailability: { start: formattedStartDate, end: formattedEndDate },
    });
  };

  const formatDate = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    return "";
  };

  const handleCalendarChange = (value) => {
    setDateRange(value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="align-items-center justify-content-center">
        <Col xs="auto">
          <FloatingLabel label="Location" className="mb-3">
            <Form.Control
              className="mb-2"
              id="location"
              name="location"
              value={filters.location}
              onChange={handleInputChange}
              placeholder="Location"
            />
          </FloatingLabel>
        </Col>
        <Col xs="auto">
          <FloatingLabel label="No of people" className="mb-3">
            <Form.Control
              className="mb-2"
              id="numOfPeople"
              name="numOfPeople"
              value={filters.numOfPeople}
              onChange={handleInputChange}
              placeholder="No of people"
            />
          </FloatingLabel>
        </Col>
        <Col xs="auto">
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary">
              {formattedDateRange}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Calendar
                onChange={handleCalendarChange}
                value={dateRange}
                selectRange={true}
                id="date"
                aria-label="Rental Availability"
              />
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs="auto">
          <Button type="submit" className="mb-2">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default FilterInput;
