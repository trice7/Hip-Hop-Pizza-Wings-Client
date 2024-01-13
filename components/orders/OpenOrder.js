import { useState, useEffect } from 'react';
import {
  Button,
  Col,
  Form,
  Row,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import MenuModal from '../menu/MenuModal';
import { getMenu } from '../../api/menuData';

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

// const testInitialState = {
//   is_open: true,
//   subtotal: 23.03,
//   tip: 5.23,
//   tax: 4.37,
//   total: 44.56,
//   customer: 'John Smith',
//   email: 'jsmith@notreal.com',
//   phone: '8165556665',
//   date: new Date().toDateString(),
//   type: '',
//   payment: '',
// };

const OpenOrder = ({ orderObj, newOrder }) => {
  // Logic that will determine whether certains fields can be edited or not
  const [active, setActive] = useState(true);
  const [order, setOrder] = useState(initialState);
  const [menu, setMenu] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  console.warn(`Active: ${active}, newOrder: ${newOrder}, ${orderObj}`);

  useEffect(() => {
    getMenu().then(setMenu);

    if (orderObj.id) {
      setActive(false);
    }
  }, [orderObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.warn(orderItems);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="order-details-container">
        <div className="cart">
          <h3>Cart</h3>
          <MenuModal menu={menu} setOrderItems={setOrderItems} />
        </div>
        <div className="order-details">
          <h3>Order Details</h3>

          <Form.Group as={Row} className="mb-3" controlId="dateControl">
            <Form.Label column sm="2">Date:</Form.Label>
            <Col sm="10">
              <Form.Control column sm="2" plaintext readOnly type="email" value={order.date} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="customerControl">
            <Form.Label column sm="2">Customer:</Form.Label>
            <Col sm="10">
              <Form.Control onChange={handleChange} column sm="2" name="customer" type="string" value={order.customer} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="placeholder">
            <Form.Label column sm="2">Phone:</Form.Label>
            <Col sm="10">
              <Form.Control onChange={handleChange} column sm="2" name="phone" type="string" value={order.phone} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="phoneControl">
            <Form.Label column sm="2">email:</Form.Label>
            <Col sm="10">
              <Form.Control onChange={handleChange} column sm="2" name="email" type="email" value={order.email} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="orderTypeControl">
            <Form.Label column sm="2">Order Channel:</Form.Label>
            <Col sm="10">
              <Form.Control column sm="2" plaintext readOnly type="string" value={order.type} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="paymentTypeControl">
            <Form.Label column sm="2">Payment:</Form.Label>
            <Col sm="10">
              <Form.Control column sm="2" plaintext readOnly type="string" value={order.payment} />
            </Col>
          </Form.Group>
        </div>
      </div>

      <div className="calculations">
        Calculations
      </div>

      <Button type="submit">Submit</Button>
    </Form>
  );
};

OpenOrder.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
  }),
  newOrder: PropTypes.number,
};

OpenOrder.defaultProps = {
  orderObj: {
    id: 0,
  },
  newOrder: '',
};

export default OpenOrder;

// {/* <Form.Group className="mb-3" controlId="placeholder">
//   <Form.Label>PlaceHolder</Form.Label>
//   <Form.Control type="email" />
// </Form.Group> */}
