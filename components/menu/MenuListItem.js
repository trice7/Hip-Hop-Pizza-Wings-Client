import {
  Button,
  Col,
  Form,
  Row,
} from 'react-bootstrap';
import propTypes from 'prop-types';
import { useEffect, useState } from 'react';

const initialState = {
  order: '',
  item: '',
  quantity: 1,
};

const MenuListItem = ({ item, setOrderItems, handleClose }) => {
  const [lineItem, setLineItem] = useState(initialState);

  useEffect(() => {
    setLineItem((prevState) => ({
      ...prevState,
      item: item.id,
    }));
  }, [item.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLineItem((prevState) => ({
      ...prevState,
      [name]: Number(value),
    }));
  };

  const handleAdd = () => {
    setOrderItems((prevState) => ([
      ...prevState,
      lineItem,
    ]));
    handleClose();
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
  item: propTypes.shape({
    name: propTypes.string,
    cost: propTypes.number,
    quantity: propTypes.number,
    id: propTypes.number,
  }).isRequired,
  setOrderItems: propTypes.func.isRequired,
  handleClose: propTypes.func.isRequired,
};

export default MenuListItem;
