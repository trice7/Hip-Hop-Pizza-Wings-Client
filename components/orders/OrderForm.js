import { useState, useEffect } from 'react';
import {
  Button,
  Col,
  Form,
  Row,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getOrderTypes, getPaymentTypes } from '../../api/orderData';

const initialState = {
  is_open: true,
  subtotal: 0,
  tip: 0,
  tax: 0,
  total: 0,
  customer: '',
  email: '',
  phone: '',
  date: new Date().toDateString(),
  type: '',
  payment: '',
};

const OrderForm = ({ orderObj }) => {
  const [details, setDetails] = useState(initialState);
  const [orderTypes, setOrderTypes] = useState([]);
  const [paymentTypes, setPaymentTypes] = useState([]);

  console.warn(`${orderTypes}, ${paymentTypes}`);

  useEffect(() => {
    if (orderObj) {
      setDetails(orderObj);
    }
  }, [orderObj]);

  useEffect(() => {
    getOrderTypes().then(setOrderTypes);
    getPaymentTypes().then(setPaymentTypes);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.warn(e.target.value);
  };

  const handleSubmit = () => {
    console.warn(details);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="order-details-container">
        <div className="order-details">
          <h3>Order Details</h3>

          <Form.Group as={Row} className="mb-3" controlId="dateControl">
            <Form.Label column sm="2">Date:</Form.Label>
            <Col sm="10">
              <Form.Control column sm="2" plaintext readOnly type="email" value={details.date} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="customerControl">
            <Form.Label column sm="2">Customer:</Form.Label>
            <Col sm="10">
              <Form.Control onChange={handleChange} column sm="2" name="customer" type="string" value={details.customer} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="placeholder">
            <Form.Label column sm="2">Phone:</Form.Label>
            <Col sm="10">
              <Form.Control onChange={handleChange} column sm="2" name="phone" type="string" value={details.phone} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="phoneControl">
            <Form.Label column sm="2">email:</Form.Label>
            <Col sm="10">
              <Form.Control onChange={handleChange} column sm="2" name="email" type="email" value={details.email} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="orderTypeControl">
            <Form.Label column sm="2">Order Channel:</Form.Label>
            <Col sm="10">
              <Form.Control column sm="2" plaintext readOnly type="string" value={details.type} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="paymentTypeControl">
            <Form.Label column sm="2">Payment:</Form.Label>
            <Col sm="10">
              <Form.Control column sm="2" plaintext readOnly type="string" value={details.payment} />
            </Col>
          </Form.Group>
        </div>
      </div>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

OrderForm.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
  }),
};

OrderForm.defaultProps = {
  orderObj: '',
};

export default OrderForm;
