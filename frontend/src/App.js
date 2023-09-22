import './App.css';
import { React, useState } from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [jwt, setJwt] = useState("");

  const logIn = async() => {
    try {
      const res = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({username:username, password:password}),
        });
      const response = await res.json();
      if (response.token) {
        setJwt(response.token);
      }else{
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const registerUser = async () => {
    try {
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username:username, password:password}),
      });
      const result = await res.json();
      if (result.message) {
        alert(result.message)
      }
    } catch (error) {
      
    }
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col md={4}><h3>ToDo List</h3></Col>
          <Col md={2}>
            <Form.Control placeholder='Username' onChange={(e)=>setUsername(e.target.value)}/>
          </Col>
          <Col md={2}>
            <Form.Control type='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
          </Col>
          <Col md={2}>
            <Button onClick={()=>logIn()}>Login</Button>
          </Col>
          <Col md={2}>
            <Button onClick={()=>registerUser()}>Register</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
