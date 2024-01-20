import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MenuListItem from './MenuListItem';

const MenuModal = ({
  menu,
  orderId,
  setChange,
  handleCalc,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="app-button" onClick={handleShow}>
        Add Item
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="black-text">Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {menu.map((item) => (
            <section className="black-text" key={item.id}>
              <MenuListItem item={item} handleClose={handleClose} orderId={orderId} setChange={setChange} handleCalc={handleCalc} />
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
  handleCalc: PropTypes.func.isRequired,
};

export default MenuModal;
