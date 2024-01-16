import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  Form,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createOrder, getOrderTypes, getPaymentTypes } from '../../api/orderData';

const initialState = {
  isOpen: true,
  subtotal: 0,
  tip: 0,
  tax: 0,
  total: 0,
  customer: '',
  email: '',
  phone: '',
  type: '',
  payment: '',
};

const OrderForm = ({ orderObj }) => {
  const [details, setDetails] = useState(initialState);
  const [orderTypes, setOrderTypes] = useState([]);
  const [paymentTypes, setPaymentTypes] = useState([]);

  const date = new Date().toDateString();
  const router = useRouter();
  const { user } = useAuth();

  console.warn(`${orderTypes}, ${paymentTypes}`);

  useEffect(() => {
    if (orderObj) {
      setDetails(orderObj);
    } else {
      setDetails((prevState) => ({
        ...prevState,
        server: user.id,
      }));
    }
  }, [orderObj, user.id]);

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

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevState) => ({
      ...prevState,
      [name]: Number(value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createOrder(details).then((order) => {
      router.push(`/orders/${order.id}`);
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <div className="order-details">
          <h3>Order Details</h3>

          <Form.Group className="mb-3" controlId="dateControl">
            <Form.Label sm="2">Date:</Form.Label>
            <Form.Control sm="2" plaintext readOnly type="email" value={date} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="customerControl">
            <Form.Label sm="2">Customer:</Form.Label>
            <Form.Control onChange={handleChange} sm="2" name="customer" type="string" value={details.customer} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="placeholder">
            <Form.Label sm="2">Phone:</Form.Label>
            <Form.Control onChange={handleChange} sm="2" name="phone" type="string" value={details.phone} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="phoneControl">
            <Form.Label sm="2">email:</Form.Label>
            <Form.Control onChange={handleChange} sm="2" name="email" type="email" value={details.email} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="orderTypeControl">
            <Form.Label sm="2">Order Channel</Form.Label>
            <Form.Select name="type" value={details.type} onChange={handleNumberChange} required>
              <option value="">Choose Order Channel</option>
              {orderTypes?.map((orderType) => (
                <option key={orderType.id} value={orderType.id}>{orderType.label}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="paymentTypeControl">
            <Form.Label sm="2">Payment</Form.Label>
            <Form.Select name="payment" value={details.payment} onChange={handleNumberChange} required>
              <option value="">Choose a Payment method.</option>
              {paymentTypes?.map((payment) => (
                <option key={payment.id} value={payment.id}>{payment.label}</option>
              ))}
            </Form.Select>
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
