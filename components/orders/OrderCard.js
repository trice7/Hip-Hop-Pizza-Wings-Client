import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteOrder } from '../../api/orderData';

const OrderCard = ({ orderObj, onUpdate }) => {
  const deleteThisOrder = () => {
    if (window.confirm('Cancel this order?')) {
      deleteOrder(orderObj.id).then(onUpdate);
    }
  };
  return (
    <Card className="order-card" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Order Number: {orderObj.id}</Card.Title>
        <Card.Text>Date: {orderObj.date}</Card.Text>
        <Card.Text>Customer: {orderObj.customer}</Card.Text>
        <Card.Text>Total: {orderObj.total}</Card.Text>
        <Link passHref href={orderObj.is_open ? (`/orders/${orderObj.id}`) : (`/orders/closed/${orderObj.id}`)}>
          <Button className="app-button">View Order</Button>
        </Link>
        {orderObj.is_open ? (<Button variant="danger" onClick={deleteThisOrder}>Cancel Order</Button>) : ''}
      </Card.Body>
    </Card>
  );
};

OrderCard.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    customer: PropTypes.string,
    total: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    date: PropTypes.string,
    is_open: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default OrderCard;
