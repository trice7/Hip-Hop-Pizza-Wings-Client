import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import { Row, Col } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import { Col } from 'react-bootstrap'
import { registerUser } from '../utils/auth'; // Update with path to registerUser

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    first_name: '',
    uid: user.uid,
    last_name: '',
    is_admin: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.uid));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group className="mb-3" controlId="formBasicEmail" as={Col}>
          <Form.Label>First Name</Form.Label>
          <Form.Control name="first_name" required placeholder="Enter your first name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
        </Form.Group>

        <Form.Group className="mb-3" as={Col}>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            name="last_name"
            required
            placeholder="Enter your last name"
            onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
          />
        </Form.Group>
      </Row>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

// onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.first_name]: target.value }))}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
