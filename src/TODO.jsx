/* eslint-disable react/prop-types */
import { useState } from "react";
import "./index.css";

const Todo = ({
  title,
  id,
  status,
  handleDelete,
  handleUpdate,
  handleStatus,
}) => {
  const [editModeOn, setEditModeOn] = useState(false);
  const [todoValue, setTodoValue] = useState(title);

  const updateHandler = () => {
    if (editModeOn) {
      handleUpdate(id, todoValue);
    }
    setEditModeOn(!editModeOn);
  };

  return (
    <div className={!status ? "Todo" : "Todo TodoDone"}>
      {!editModeOn ? (
        <h1>{title}</h1>
      ) : (
        <input
          onChange={(e) => setTodoValue(e.target.value)}
          value={todoValue}
          className="UpdateTodo"
        ></input>
      )}
      <div className="Buttons">
        <button onClick={updateHandler} className="Edit">
          {!editModeOn ? "Edit" : "Update"}
        </button>
        <button onClick={() => handleStatus(id)}>
          {!status ? "Done" : "Pending"}
        </button>
        <button onClick={() => handleDelete(id)} className="Delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
