import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

function FilterInput() {
  return (
    <Form>
      <Row className="align-items-center justify-content-center">
        <Col xs="auto">
          <Form.Label htmlFor="inlineFormInput" visuallyHidden>
            Location
          </Form.Label>
          <Form.Control
            className="mb-2"
            id="inlineFormInput"
            placeholder="Location"
          />
        </Col>
        <Col xs="auto">
          <Form.Label htmlFor="inlineFormInput" visuallyHidden>
            No of people
          </Form.Label>
          <Form.Control
            className="mb-2"
            id="inlineFormInput"
            placeholder="No of people"
          />
        </Col>
        <Col xs="auto">
          <Form.Label htmlFor="inlineFormInput" visuallyHidden>
            Date
          </Form.Label>
          <Form.Control
            className="mb-2"
            id="inlineFormInput"
            placeholder="Date"
          />
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
