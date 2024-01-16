import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import MenuModal from '../menu/MenuModal';
import { getMenu } from '../../api/menuData';
import OrderListItem from '../menu/OrderListItem';

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

const OpenOrder = ({ orderObj, setChange }) => {
  // Logic that will determine whether certains fields can be edited or not
  // const [active, setActive] = useState(true);
  const [order, setOrder] = useState(initialState);
  const [menu, setMenu] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  // console.warn(`Active: ${active}, newOrder: ${newOrder}, ${orderObj}`);
  console.warn(orderItems);

  useEffect(() => {
    getMenu().then(setMenu);

    if (orderObj.id) {
      setOrder(orderObj);
    }
  }, [orderObj]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setOrder((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.warn(orderItems);
  // };

  const handleTest = () => {
    console.warn(order);
  };

  return (
    <div>
      <h2>Order: {order.id}</h2>
      <div className="order-details-container">
        <div className="cart">
          <h3>Cart</h3>
          <MenuModal menu={menu} setOrderItems={setOrderItems} orderId={order.id} setChange={setChange} />
          <div className="cart-list">
            {order.items?.map((item) => (
              <section key={item.id}>
                <OrderListItem item={item} setChange={setChange} />
              </section>
            ))}
          </div>
        </div>
        <div className="order-details">
          <h3>Order Details</h3>

          <section>
            <p>Date: {order.date}</p>
          </section>

          <section>
            <p>Customer: {order.customer}</p>
          </section>

          <section>
            <p>Phone: {order.phone}</p>
          </section>

          <section>
            <p>Email: {order.email}</p>
          </section>

          <section>
            <p>Order Channel: {order.type.label}</p>
          </section>

          <section>
            <p>Payment: {order.payment.label}</p>
          </section>
        </div>
      </div>

      <div className="calculations">
        <h3>Calculations</h3>
        <section><p>Subtotal: {order.subtotal}</p></section>
        <section><p>Tax: {order.tax}</p></section>
        <section><p>Tip: {order.tip}</p></section>
        <section><p>Total: {order.total}</p></section>
      </div>

      <Button onClick={handleTest}>Submit</Button>
    </div>
  );
};

OpenOrder.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
  }),
  setChange: PropTypes.func.isRequired,
};

OpenOrder.defaultProps = {
  orderObj: {
    id: 0,
  },
};

export default OpenOrder;

// {/* <Form.Group className="mb-3" controlId="placeholder">
//   <Form.Label>PlaceHolder</Form.Label>
//   <Form.Control type="email" />
// </Form.Group> */}
