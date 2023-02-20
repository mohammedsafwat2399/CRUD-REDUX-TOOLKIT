import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { addTask } from "../store/taskSlice";

const AddTask = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const addToTask = (e) => {
    e.preventDefault();
    dispatch(addTask({title,description}));
    setTitle("");
    setDescription("");
  };
  return (
    <section className="my-5">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Task Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Task title "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Task Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Task Description "
            value={description}
               
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <div className="text-end">
          <Button variant="primary" type="submit"  onClick={(e) => addToTask(e)}>
            Add Task
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default AddTask;
