import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import { BACKEND_ENDPOINT } from "./config";
import Todo from "./TODO";

const ENDPOINT = BACKEND_ENDPOINT;

const TodoContainer = () => {
  const [todos, setTodos] = useState([]);
  const [addTodoTitle, setaddTodoTitle] = useState("");

  useEffect(() => {
    getTodos(setTodos);
  }, []);

  const getTodos = async () => {
    const res = await axios.get(`${ENDPOINT}/v1/todo`);
    setTodos(res.data);
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(`${ENDPOINT}/v1/todo/${id}`);
    if (res.status === 200) {
      setTodos(todos.filter((todo) => todo["id"] !== id));
    }
  };

  const handleUpdate = async (id, updatedTitle) => {
    const res = await axios.patch(`${ENDPOINT}/v1/todo/${id}`, {
      title: updatedTitle,
    });
    if (res.status === 200) {
      let index = -1;
      todos.forEach((val, ind) => {
        if (val["id"] === id) {
          index = ind;
        }
      });

      todos[index]["title"] = updatedTitle;
      setTodos([...todos]);
    }
  };

  const handleAdd = async () => {
    const res = await axios.post(`${ENDPOINT}/v1/todo`, {
      title: addTodoTitle,
    });
    if (res.status === 200) {
      setTodos([{ id: res.data.id, title: res.data.title }, ...todos]);
      setaddTodoTitle("");
    }
  };

  const handleStatus = async (id) => {
    let index = -1;
    todos.forEach((val, ind) => {
      if (id === val["id"]) {
        index = ind;
      }
    });
    let currentStatus = todos[index]["status"];
    const res = await axios.patch(`${ENDPOINT}/v1/todo/${id}/status`, {
      status: !currentStatus,
    });
    if (res.status === 200) {
      todos[index]["status"] = !currentStatus;
      setTodos([...todos]);
    }
  };

  return (
    <div className="TodoContainerWrapper">
      <div className="AddTodo">
        <input
          onChange={(e) => setaddTodoTitle(e.target.value)}
          value={addTodoTitle}
          placeholder="Add Todo"
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <div className="TodoContainer">
        {todos.map((todo) => {
          return (
            <Todo
              key={todo["id"]}
              title={todo["title"]}
              id={todo["id"]}
              status={todo["status"]}
              handleStatus={handleStatus}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            ></Todo>
          );
        })}
      </div>
    </div>
  );
};

export default TodoContainer;
