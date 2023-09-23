import { React, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  // login field set to states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // use to redirect to url in react router dom
  const navigate = useNavigate();

  // login post request to obtain jwt token
  // saves token to session storage
  // redirects to /user page
  const logIn = async () => {
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });
      const response = await res.json();
      if (response.token) {
        sessionStorage.setItem("token", response.token);
        navigate("/users");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // past request to add new user document and new user todo list
  const registerUser = async () => {
    try {
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });
      const result = await res.json();
      if (result.message) {
        alert(result.message);
      }
    } catch (error) {}
  };

  return (
    <div>
      <Container>
        <Row>
          <Col md={4}>
            <h3>ToDo List</h3>
          </Col>
          <Col md={2}>
            <Form.Control
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Button onClick={() => logIn()}>Login</Button>
          </Col>
          <Col md={2}>
            <Button onClick={() => registerUser()}>Register</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Landing;
