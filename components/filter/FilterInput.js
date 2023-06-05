import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Dropdown } from "react-bootstrap";
import Calendar from "react-calendar";
import Select from "react-select";

function FilterInput({ onSearch, houses }) {
  const [dateRange, setDateRange] = useState([]);
  const [formattedDateRange, setFormattedDateRange] = useState(
    "Start day - End day"
  );
  const [filters, setFilters] = useState({
    location: "",
    numOfPeople: "",
  });

  useEffect(() => {
    const formattedStartDate = formatDate(dateRange[0]);
    const formattedEndDate = formatDate(dateRange[1]);
    if (formattedStartDate && formattedEndDate) {
      setFormattedDateRange(`${formattedStartDate} - ${formattedEndDate}`);
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
    console.log(formattedStartDate);
    onSearch(filters, [formattedStartDate, formattedEndDate]);
  };
  const formatDate = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
    }
    return "";
  };

  const handleCalendarChange = (value) => {
    setDateRange(value);
  };

  const locationOptions = [
    { value: "", label: "Select location" },
    { value: "", label: "All locations" },
    ...houses.map((house) => ({
      value: house.location,
      label: house.location,
    })),
  ];

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="align-items-center justify-content-center">
        <Col xs="auto">
          <Select
            className="mb-2"
            id="location"
            name="location"
            value={
              filters.location
                ? { value: filters.location, label: filters.location }
                : null
            }
            onChange={(selectedOption) =>
              handleInputChange(
                "location",
                selectedOption ? selectedOption.value : ""
              )
            }
            options={locationOptions}
            placeholder="Select location"
            isClearable
            isSearchable
          />
        </Col>
        <Col xs="auto">
          <FloatingLabel label="No of people" className="mb-3">
            <Form.Control
              className="mb-2"
              id="numOfPeople"
              name="numOfPeople"
              type="number" // Add type="number" to input field
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
