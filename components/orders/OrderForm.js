import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  Form,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import {
  createOrder,
  getOrderTypes,
  updateOrder,
} from '../../api/orderData';

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
  payment: 1,
};

const OrderForm = ({ orderObj }) => {
  const [details, setDetails] = useState(initialState);
  const [orderTypes, setOrderTypes] = useState([]);
  // const [paymentTypes, setPaymentTypes] = useState([]);

  const date = new Date().toDateString();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (orderObj) {
      const obj = { ...orderObj };
      obj.type = orderObj.type?.id;
      obj.payment = orderObj.payment?.id;
      setDetails(obj);
    } else {
      setDetails((prevState) => ({
        ...prevState,
        server: user.id,
      }));
    }
  }, [orderObj, user.id]);

  useEffect(() => {
    getOrderTypes().then(setOrderTypes);
    // getPaymentTypes().then(setPaymentTypes);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
    if (orderObj) {
      details.isOpen = true;
      const updatedServer = details.server.id;
      details.server = updatedServer;
      updateOrder(details).then((order) => {
        router.push(`/orders/${order.id}`);
      });
    } else {
      createOrder(details).then((order) => {
        router.push(`/orders/${order.id}`);
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <div className="order-details">
          <h3>Order Details</h3>

          <Form.Group className="mb-3" controlId="dateControl">
            <Form.Label sm="2">Date:</Form.Label>
            <Form.Control className="form-text" sm="2" plaintext readOnly type="string" value={date || ''} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="customerControl">
            <Form.Label sm="2">Customer:</Form.Label>
            <Form.Control onChange={handleChange} sm="2" name="customer" type="string" value={details.customer || ''} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="placeholder">
            <Form.Label sm="2">Phone:</Form.Label>
            <Form.Control onChange={handleChange} sm="2" name="phone" type="string" value={details.phone || ''} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="phoneControl">
            <Form.Label sm="2">email:</Form.Label>
            <Form.Control onChange={handleChange} sm="2" name="email" type="email" value={details.email || ''} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="orderTypeControl">
            <Form.Label sm="2">Order Channel</Form.Label>
            <Form.Select name="type" onChange={handleNumberChange} value={details.type || ''} required>
              <option value="">Please Choose Order Type</option>
              {orderTypes?.map((orderType) => (
                <option key={orderType.id} value={orderType.id}>{orderType.label}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>
      </div>
      <Button className="app-button" type="submit">Submit</Button>
    </Form>
  );
};

OrderForm.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    payment: PropTypes.shape({
      id: PropTypes.number,
    }),
    type: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
  }),
};

OrderForm.defaultProps = {
  orderObj: '',
};

export default OrderForm;
