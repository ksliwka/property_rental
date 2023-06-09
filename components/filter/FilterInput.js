import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Dropdown, InputGroup } from "react-bootstrap";
import Calendar from "react-calendar";
import Select from "react-select";
import classes from "./FilterInput.module.css";

function FilterInput({ onSearch, houses }) {
  const [dateRange, setDateRange] = useState([]);
  const [formattedDateRange, setFormattedDateRange] = useState(
    "Start day - End day"
  );
  const [filters, setFilters] = useState({
    location: "",
    numOfPeople: "",
  });
  const [numOfPeopleError, setNumOfPeopleError] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

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

    if (name === "numOfPeople") {
      const intValue = parseInt(value);
      const isValid =
        Number.isInteger(intValue) && intValue > 0 && intValue <= 30;

      if (isValid) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [name]: intValue,
        }));
        setNumOfPeopleError("");
      } else {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [name]: value,
        }));
        setNumOfPeopleError("Please enter a valid number of people (1-30).");
      }
    } else if (name === "location") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  };

  const handleLocationChange = (selectedOption) => {
    const location = selectedOption ? selectedOption.value : "";
    setSelectedLocation(location);
    const event = { target: { name: "location", value: location } };
    handleInputChange(event);
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
    { value: "", label: "All locations" },
    ...houses.map((house) => ({
      value: house.location,
      label: house.location,
    })),
  ];

  const today = new Date();

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="align-items-center justify-content-center">
        <InputGroup className={classes.group}>
          <Col xs="auto">
            <Select
              // className={`mb-2 ${classes.select}`}
              id="location"
              name="location"
              value={locationOptions.find(
                (option) => option.value === selectedLocation
              )}
              onChange={handleLocationChange}
              options={locationOptions}
              placeholder="Select location"
              isClearable
              isSearchable
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  border: "none",
                }),
              }}
            />
          </Col>
          <Col xs="auto">
            <FloatingLabel label="No of people" className="mb-3">
              <Form.Control
                className={`mb-2 ${classes.input}`}
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
            </FloatingLabel>
          </Col>
          <Col xs="auto">
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-secondary"
                className={classes.dropdownToggle}
              >
                {formattedDateRange}
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
          <Col xs="auto">
              <Button type="submit" className={classes.button}>
                Search
              </Button>
          </Col>
        </InputGroup>
      </Row>
    </Form>
  );
}

export default FilterInput;
