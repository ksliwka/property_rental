import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Calendar from "react-calendar";

function FilterInput({ onSearch }) {
  const [dateRange, setDateRange] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    numOfPeople: "",
  });

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
          <FloatingLabel label="Date" className="mb-3">
            <Calendar
              onChange={handleCalendarChange}
              value={dateRange}
              selectRange={true}
              id="date"
              aria-label="Rental Availability"
            />
          </FloatingLabel>
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
