import { Modal, Button } from "react-bootstrap";

const CustomModal = (props) => {
  const { show, onHide, title, body, closeButtonLabel } = props;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {closeButtonLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
