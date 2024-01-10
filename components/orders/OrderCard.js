import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const OrderCard = ({ orderObj }) => (
  <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>Order Number: {orderObj.id}</Card.Title>
      <Card.Text>Date: {orderObj.date}</Card.Text>
      <Card.Text>Customer: {orderObj.customer}</Card.Text>
      <Card.Text>Total: {orderObj.total}</Card.Text>
    </Card.Body>
  </Card>
);

OrderCard.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    customer: PropTypes.string,
    total: PropTypes.number,
    date: PropTypes.string,
  }).isRequired,
};

export default OrderCard;
