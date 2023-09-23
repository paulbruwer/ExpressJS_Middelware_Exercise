import { React, useState } from "react";
import { Button, Container, Form, Tab, Tabs } from "react-bootstrap";

const Users = () => {
  // all fields are set to states
  const [newTask, setNewTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [taskNr, setTaskNr] = useState("");

  // get request to get all tasks
  const getTasks = async () => {
    try {
      const res = await fetch("/users/", {
        headers: { token: sessionStorage.getItem("token") },
      });
      const result = await res.json();
      if (result.list) {
        setTaskList(result.list);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // post request to add new task to user list
  const addTask = async () => {
    try {
      const res = await fetch("/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: sessionStorage.getItem("token"),
        },
        body: JSON.stringify({ task: newTask }),
      });
      const result = await res.json();
      alert(result.message);
    } catch (error) {
      console.log(error);
    }
  };

  // post request to edit specified item in list
  const editTask = async () => {
    try {
      const res = await fetch("/users/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: sessionStorage.getItem("token"),
        },
        body: JSON.stringify({ task: newTask, taskNr: taskNr }),
      });
      const result = await res.json();
      alert(result.message);
    } catch (error) {
      console.log(error);
    }
  };

  // delete request to remove specific task
  const removeTask = async () => {
    try {
      const res = await fetch("/users/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: sessionStorage.getItem("token"),
        },
        body: JSON.stringify({ taskNr: taskNr }),
      });
      const result = await res.json();
      alert(result.message);
    } catch (error) {
      console.log(error);
    }
  };

  // render function to display list with all tasks
  const viewTasks = () => {
    const list = taskList.map((item, index) => (
      <li key={index}>
        {item}
        <hr />
      </li>
    ));
    return (
      <div>
        <ol>{list}</ol>
      </div>
    );
  };

  // render function to display form to add task
  const addForm = () => {
    return (
      <div>
        <Form>
          <Form.Group>
            <Form.Label>Enter task description here</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <Button onClick={() => addTask()}>Add</Button>
          </Form.Group>
        </Form>
      </div>
    );
  };

  // render function to display form to edit task
  const editForm = () => {
    return (
      <div>
        <Form>
          <Form.Group>
            <Form.Label>Enter task number here</Form.Label>
            <Form.Control onChange={(e) => setTaskNr(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Enter new task description here</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <Button onClick={() => editTask()}>Edit</Button>
          </Form.Group>
        </Form>
      </div>
    );
  };

  // render function to display form to remove task
  const removeForm = () => {
    return (
      <div>
        <Form>
          <Form.Group>
            <Form.Label>Enter task number here</Form.Label>
            <Form.Control onChange={(e) => setTaskNr(e.target.value)} />
            <Button onClick={() => removeTask()}>remove</Button>
          </Form.Group>
        </Form>
      </div>
    );
  };

  // render all functions in tabs
  return (
    <div>
      <Container>
        <Tabs
          className="mb-3"
          onSelect={() => {
            getTasks();
          }}
        >
          <Tab eventKey="viewAll" title="View All">
            {viewTasks()}
          </Tab>
          <Tab eventKey="add" title="Add">
            {addForm()}
          </Tab>
          <Tab eventKey="edit" title="Edit">
            {editForm()}
          </Tab>
          <Tab eventKey="remove" title="Remove">
            {removeForm()}
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default Users;
