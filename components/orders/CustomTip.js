import { useState } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CustomTip = ({ order, handleCalc, setChange }) => {
  const [show, setShow] = useState(false);
  const [customTip, setCustomTip] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    // const { name, value } = e.target;
    setCustomTip(e.target.value);
  };

  const handleSubmit = () => {
    const payload = { ...order };
    payload.tip = Number(customTip);
    handleCalc(payload);
    setChange((prevState) => !prevState);
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Custom Tip
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Select Tip Amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="tipControl">
              <Form.Label sm="2">Select Tip Amount</Form.Label>
              <Form.Control onChange={handleChange} sm="2" name="tip" type="string" value={customTip} required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>Submit</Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

CustomTip.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  handleCalc: PropTypes.func.isRequired,
  setChange: PropTypes.func.isRequired,
};

export default CustomTip;
