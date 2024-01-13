/* eslint-disable react/prop-types */
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MenuListItem from './MenuListItem';

const MenuModal = ({ menu, setOrderItems }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const testItem = () => {
    console.warn('orderItem');
  };

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
              <MenuListItem item={item} setOrderItems={setOrderItems} handleClose={handleClose} />
            </section>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={testItem}>
            Test button
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MenuModal;
