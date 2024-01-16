import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MenuListItem from './MenuListItem';

const MenuModal = ({ menu, orderId, setChange }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Item
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {menu.map((item) => (
            <section key={item.id}>
              <MenuListItem item={item} handleClose={handleClose} orderId={orderId} setChange={setChange} />
            </section>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

MenuModal.propTypes = {
  menu: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  orderId: PropTypes.number.isRequired,
  setChange: PropTypes.func.isRequired,
};

export default MenuModal;
