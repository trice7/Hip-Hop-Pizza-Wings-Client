import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import MenuModal from '../menu/MenuModal';
import { getMenu } from '../../api/menuData';
import OrderListItem from '../menu/OrderListItem';
import { updateOrder } from '../../api/orderData';
import CustomTip from './CustomTip';

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
    updateOrder(payload).then();
  };

  useEffect(() => {
    getMenu().then(setMenu);
    setOrder(orderObj);
  }, [orderObj]);

  const handleTip = (percentage) => {
    const payload = { ...order };
    const calcTip = (order.subtotal / 100) * percentage;
    const roundedTip = Math.round(calcTip * 100) / 100;
    const calcTotal = Number(order.subtotal) + Number(order.tax) + Number(roundedTip);

    payload.server = order.server.id;
    payload.type = order.type.id;
    payload.payment = order.payment.id;
    payload.total = calcTotal;
    payload.tip = Number(roundedTip);
    payload.isOpen = order.is_open;

    updateOrder(payload).then(() => {
      setChange((prevState) => !prevState);
    });
  };

  const handleTen = () => {
    handleTip(10);
  };

  const handleFifteen = () => {
    handleTip(15);
  };

  const handleTwenty = () => {
    handleTip(20);
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
            <Button variant="success" value="15">Edit Order Details</Button>
          </Link>
        </div>
      </div>

      <div className="calculations">
        <h3>Checkout</h3>
        <section><p>Subtotal: {order.subtotal}</p></section>
        <section><p>Tax: {order.tax}</p></section>

        <section className="tip-container">
          <p>Tip: {order.tip}</p>
          <div className="tip-boxes">
            <Button className="app-button" onClick={handleTen}>10%</Button>
            <Button className="app-button" onClick={handleFifteen}>15%</Button>
            <Button className="app-button" onClick={handleTwenty}>20%</Button>
            <CustomTip order={order} handleCalc={handleCalc} setChange={setChange} />
          </div>
        </section>

        <section><p>Total: {order.total}</p></section>
      </div>

      <Link passHref href={`/orders/close/${order.id}`}>
        <Button className="app-button">Complete Order</Button>
      </Link>
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
