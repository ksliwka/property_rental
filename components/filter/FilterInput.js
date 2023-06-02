import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function FilterInput() {
  return (
    <Form>
      <Row className="align-items-center justify-content-center">
        <Col xs="auto">
          <FloatingLabel
            controlId="floatingTextarea"
            label="Location"
            className="mb-3"
          >
            <Form.Control
              className="mb-2"
              id="floatingTextarea"
              placeholder="Location"
            />
          </FloatingLabel>
        </Col>
        <Col xs="auto">
          <FloatingLabel
            controlId="floatingTextarea"
            label="No of people"
            className="mb-3"
          >
            <Form.Control
              className="mb-2"
              id="floatingTextarea"
              placeholder="No of people"
            />
          </FloatingLabel>
        </Col>
        <Col xs="auto">
          <FloatingLabel
            controlId="floatingTextarea"
            label="Date"
            className="mb-3"
          >
            <Form.Control
              className="mb-2"
              id="floatingTextarea"
              placeholder="Date"
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
