// register.jsx
import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/auth/authActions";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(registerUser({ name, email, password }));

      if (response.token) {
        navigate("/login");
      } else {
        setError("Registration failed. Please check your information and try again.");
      }
    } catch (error) {
      setError("An error occurred during registration. Please try again later.");
      console.error(error);
    }
  };

  return (
    <Container className="container p-5 border border-3 rounded-3">
      <h3 className="overflow-hidden text-center mb-3 fw-bold">REGISTER</h3>
      <Row>
        <Col>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <div className="strong" >pasword harus kuat, contoh : Example123$%^</div>
              <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            {error && <p className="text-danger">{error}</p>}

            <Button variant="danger" type="submit" className="d-flex justify-content-center w-100">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
