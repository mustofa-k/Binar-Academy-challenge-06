// login.jsx
import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/auth/authActions";
import GoogleLogin from "../components/GoogleLogin";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(loginUser(email, password));

      if (response.token) {
        navigate("/");
      } else {
        setError("Login failed. Please check your email and password.");
      }
    } catch (error) {
      setError("An error occurred during login. Please try again later.");
      console.error(error);
    }
  };

  return (
    <Container className="p-5 border border-3 rounded-3">
      <h3 className="overflow-hidden text-center mb-3 fw-bold">LOGIN</h3>
      <Row className="mb-4">
        <Col>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            {error && <p className="text-danger">{error}</p>}

            <Container className="d-flex flex-column gap-3">
              <Button variant="danger" type="submit">
                Submit
              </Button>
              <Form.Text className="text-muted">Don,t have an account yet? Click the button below!</Form.Text>
              <Button variant="dark" onClick={() => navigate("/register")}>
                Register
              </Button>
              <GoogleLogin  buttonText="Login with Google 🚀" />
            </Container>
          </Form>
          
        </Col>
        
        
      </Row>
    </Container>
  );
}

export default Login;
