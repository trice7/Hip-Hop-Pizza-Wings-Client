import {
  Button,
  Col,
  Form,
  Row,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { createOrderItem } from '../../api/orderItemsData';

const initialState = {
  order: '',
  item: '',
  quantity: 1,
};

const MenuListItem = ({
  item,
  handleClose,
  orderId,
  setChange,
}) => {
  const [lineItem, setLineItem] = useState(initialState);

  useEffect(() => {
    setLineItem((prevState) => ({
      ...prevState,
      item: item.id,
      order: orderId,
    }));
  }, [item.id, orderId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLineItem((prevState) => ({
      ...prevState,
      [name]: Number(value),
    }));
  };

  const handleAdd = () => {
    createOrderItem(lineItem).then(() => {
      // setChange is a useState that is initialized on orders/[id]. It's value is a boolean.
      // It's purpose is to detect a data change and refresh the DOM with the updated information.
      // This refreshes the cart on OpenOrder.js when an item is added.

      setChange((prevState) => !prevState);
      handleClose();
    });
  };

  return (
    <Form as={Row} className="menu-modal-items">
      <Col>
        <p>{item.name}</p>
      </Col>

      <Form.Group as={Col} controlId="itemCost" className="mb-3">
        <Col sm={10}>
          <Form.Control name={item.cost} value={item.cost} size="sm" readOnly plaintext />
        </Col>
      </Form.Group>

      <Col>
        <p>Qty</p>
      </Col>

      <Form.Group as={Col} controlId="formQuantity" className="mb-3">
        <Col>
          <Form.Control name="quantity" value={item.quantity} defaultValue={1} size="sm" type="number" onChange={handleChange} />
        </Col>
      </Form.Group>

      <Col>
        <Button onClick={handleAdd}>Add</Button>
      </Col>
    </Form>
  );
};

MenuListItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    cost: PropTypes.number,
    quantity: PropTypes.number,
    id: PropTypes.number,
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
  orderId: PropTypes.number.isRequired,
  setChange: PropTypes.func.isRequired,
};

export default MenuListItem;
