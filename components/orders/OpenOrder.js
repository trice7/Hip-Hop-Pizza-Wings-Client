import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import MenuModal from '../menu/MenuModal';
import { getMenu } from '../../api/menuData';
import OrderListItem from '../menu/OrderListItem';
import { updateOrder } from '../../api/orderData';

const OpenOrder = ({ orderObj, setChange }) => {
  const [order, setOrder] = useState({});
  const [menu, setMenu] = useState([]);

  const handleCalc = (obj) => {
    const payload = { ...obj };
    let calcSubTotal = 0;
    payload.items?.forEach((item) => {
      calcSubTotal += (item.item.cost * item.quantity);
    });
    const calcTax = (calcSubTotal / 100) * 8.75;
    const roundedTax = Math.round(calcTax * 100) / 100;
    const calcTotal = calcSubTotal + roundedTax + Number(obj.tip);

    payload.server = obj.server.id;
    payload.type = obj.type.id;
    payload.payment = obj.payment.id;
    payload.subtotal = calcSubTotal;
    payload.tax = roundedTax;
    payload.total = calcTotal;
    payload.tip = Number(obj.tip);
    payload.isOpen = obj.is_open;
    // updateOrder(payload).then(() => {
    //   setChange((prevState) => !prevState);
    // });
    updateOrder(payload).then();
    console.warn(payload);
  };

  useEffect(() => {
    getMenu().then(setMenu);
    setOrder(orderObj);
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
    handleCalc(order);
  };

  return (
    <div>
      <h2>Order: {order.id}</h2>
      <div className="order-details-container">
        <div className="cart">
          <h3>Cart</h3>
          <MenuModal menu={menu} orderId={order.id} setChange={setChange} handleCalc={handleCalc} order={order} />
          <div className="cart-list">
            {order.items?.map((item) => (
              <section key={item.id}>
                <OrderListItem item={item} setChange={setChange} handleCalc={handleCalc} />
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
            <p>Order Channel: {order.type?.label}</p>
          </section>

          <section>
            <p>Payment: {order.payment?.label}</p>
          </section>
          <section>
            <p>Server: {order.server?.first_name}</p>
          </section>
          <Link passHref href={`/orders/edit/${order.id}`}>
            <Button variant="success">Edit Order Details</Button>
          </Link>
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
