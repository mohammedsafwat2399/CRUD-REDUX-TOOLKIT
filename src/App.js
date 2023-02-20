import React from "react";
import Navbar from "./commponents/Navbar";
import "./App.css";
import AddTask from "./commponents/AddTask";
import TasksList from "./commponents/TasksList";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  return (
    <Container>
      <Navbar />
      <Row className="justify-content-md-center">
        <Col lg="6">
          <AddTask />
          <TasksList/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
