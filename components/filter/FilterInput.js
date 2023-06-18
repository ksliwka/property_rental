import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import FilterForm from "./FilterForm";

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

  const handleLocationChange = (event) => {
    const location = event.target.value;
    setSelectedLocation(location);
    const locationEvent = { target: { name: "location", value: location } };
    handleInputChange(locationEvent);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formattedStartDate = formatDate(dateRange[0]);
    const formattedEndDate = formatDate(dateRange[1]);

    if (dateRange.length > 0) {
      onSearch(filters, formattedStartDate, formattedEndDate);
    } else {
      onSearch(filters);
    }

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

  const today = new Date();

  return (
    <>
      <FilterForm
        selectedLocation={selectedLocation}
        handleLocationChange={handleLocationChange}
        filters={filters}
        handleInputChange={handleInputChange}
        dateRange={dateRange}
        handleCalendarChange={handleCalendarChange}
        formattedDateRange={formattedDateRange}
        numOfPeopleError={numOfPeopleError}
        handleSubmit={handleSubmit}
        houses={houses}
        today={today}
      />
    </>
  );
}

export default FilterInput;
