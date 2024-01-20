import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deleteOrderItem } from '../../api/orderItemsData';
import { getSingleOrder } from '../../api/orderData';

const OrderListItem = ({ item, setChange, handleCalc }) => {
  const handleDelete = () => {
    deleteOrderItem(item.id).then(() => {
      // setChange is a useState that is initialized on orders/[id]. It's value is a boolean.
      // It's purpose is to detect a data change and refresh the DOM with the updated information.
      // This refreshes the cart on OpenOrder.js when an item is deleted.
      getSingleOrder(item.order.id).then((data) => {
        handleCalc(data);
        setChange((prevState) => !prevState);
      });
    });
  };

  return (
    <Card className="black-text">
      <Card.Body className="black-text">
        {item.item.name} -- {item.item.cost} -- Qty {item.quantity} <Button className="app-button" onClick={handleDelete}>Remove</Button>
      </Card.Body>
    </Card>
  );
};

OrderListItem.propTypes = {
  item: PropTypes.shape({
    item: PropTypes.shape({
      name: PropTypes.string,
      cost: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    }).isRequired,
    order: PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
    quantity: PropTypes.number,
    id: PropTypes.number.isRequired,
  }).isRequired,
  setChange: PropTypes.func.isRequired,
  handleCalc: PropTypes.func.isRequired,
};

export default OrderListItem;
