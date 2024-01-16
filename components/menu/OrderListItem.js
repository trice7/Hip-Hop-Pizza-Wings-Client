import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deleteOrderItem } from '../../api/orderItemsData';

const OrderListItem = ({ item, setChange }) => {
  const handleDelete = () => {
    deleteOrderItem(item.id).then(() => {
      // setChange is a useState that is initialized on orders/[id]. It's value is a boolean.
      // It's purpose is to detect a data change and refresh the DOM with the updated information.
      // This refreshes the cart on OpenOrder.js when an item is deleted.
      setChange((prevState) => !prevState);
    });
  };

  return (
    <Card>
      <Card.Body>
        {item.item.name} -- {item.item.cost} -- Qty {item.quantity} <Button onClick={handleDelete}>Remove</Button>
      </Card.Body>
    </Card>
  );
};

OrderListItem.propTypes = {
  item: PropTypes.shape({
    item: PropTypes.shape({
      name: PropTypes.string,
      cost: PropTypes.number,
    }).isRequired,
    quantity: PropTypes.number,
    id: PropTypes.number.isRequired,
  }).isRequired,
  setChange: PropTypes.func.isRequired,
};

export default OrderListItem;
