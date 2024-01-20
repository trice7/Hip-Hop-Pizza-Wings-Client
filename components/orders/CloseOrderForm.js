import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { getPaymentTypes, updateOrder } from '../../api/orderData';
import CustomTip from './CustomTip';

const CloseOrderForm = ({ order, setChange }) => {
  const [input, setInput] = useState({});
  const [paymentTypes, setPaymentTypes] = useState([]);

  const router = useRouter();

  useEffect(() => {
    setInput(order);
    getPaymentTypes().then(setPaymentTypes);
  }, [order]);

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

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: Number(value),
    }));
  };

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

  const closeOrder = (e) => {
    e.preventDefault();
    const payload = { ...input };

    payload.server = input.server.id;
    payload.type = order.type.id;
    // payload.payment = order.payment.id;
    payload.isOpen = false;

    updateOrder(payload).then(router.push(`/orders/closed/${input.id}`));
  };

  return (
    <div>
      <div>
        <h2>Order: {input.id}</h2>
        <h5>For: {input.customer}</h5>
        <h5>Server: {input.server?.first_name} {input.server?.last_name}</h5>
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

      <Form onSubmit={closeOrder}>
        <Form.Group className="mb-3" controlId="paymentTypeControl">
          <Form.Label sm="2">Payment</Form.Label>
          <Form.Select name="payment" value={input.payment} onChange={handleNumberChange} required>
            <option value="">Choose Payment Method</option>
            {paymentTypes?.map((payment) => (
              <option key={payment.id} value={payment.id}>{payment.label}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button className="app-button" type="submit">Close Order</Button>
      </Form>
    </div>
  );
};

CloseOrderForm.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    total: PropTypes.oneOf([
      PropTypes.string,
      PropTypes.number,
    ]),
    tip: PropTypes.oneOf([
      PropTypes.string,
      PropTypes.number,
    ]),
    subtotal: PropTypes.oneOf([
      PropTypes.string,
      PropTypes.number,
    ]),
    tax: PropTypes.oneOf([
      PropTypes.string,
      PropTypes.number,
    ]),
    is_open: PropTypes.bool,

    server: PropTypes.shape({
      id: PropTypes.number,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),

    payment: PropTypes.shape({
      id: PropTypes.number,
    }),

    type: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,

  setChange: PropTypes.func.isRequired,
};

export default CloseOrderForm;
