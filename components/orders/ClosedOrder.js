import PropTypes from 'prop-types';

const ClosedOrder = ({ order }) => (
  <div className="receipt black-text">
    <section className="receipt-center">
      <h1>Hip Hop, Pizza, & Wings</h1>
      <p>(816) 555-1234</p>
      <p>123 Sesame St.</p>
      <p>Kansas City, MO 64125</p>
    </section>

    <section className="receipt-center">
      <h4>Receipt</h4>
      <p>Order Number: {order.id}</p>
      <p>Server: {order.server?.first_name} {order.server?.last_name}</p>
      <p>{order.type?.label} Order</p>
      <p>{order.customer}</p>
      <p>{order.phone}</p>
      <p>{order.email}</p>
    </section>

    <section className="receipt-items">
      {order.items?.map((item) => (
        <div key={item.id} className="receipt-row">
          <h6>{item.quantity} X</h6>
          <h6>{item.item.label}</h6>
          <h6>@ {item.item.cost}</h6>
          <h6>CHG  {item.item.cost * item.quantity}</h6>
        </div>
      ))}
    </section>

    <section className="total-area receipt-right">
      <p>Subtotal: {order.subtotal}</p>
      <p>Tax: {order.tax}</p>
      <p>Tip: {order.tip}</p>
      <p>Total: {order.total}</p>
      <p>Payment: {order.payment?.label}</p>
    </section>
  </div>
);

ClosedOrder.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    customer: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    subtotal: PropTypes.oneOf([
      PropTypes.string,
      PropTypes.number,
    ]),
    tax: PropTypes.oneOf([
      PropTypes.string,
      PropTypes.number,
    ]),
    tip: PropTypes.oneOf([
      PropTypes.string,
      PropTypes.number,
    ]),
    total: PropTypes.oneOf([
      PropTypes.string,
      PropTypes.number,
    ]),

    items: PropTypes.shape({
      map: PropTypes.func,
    }).isRequired,

    server: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }).isRequired,

    payment: PropTypes.shape({
      label: PropTypes.string,
    }).isRequired,

    type: PropTypes.shape({
      label: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default ClosedOrder;
