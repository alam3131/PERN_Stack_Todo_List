import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";
import CheckBox from "./CheckBox";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`);
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateTodoInList = (id, newDescription, newCompleted) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.todo_id === id
          ? {
              ...todo,
              description: newDescription ?? todo.description,
              completed: newCompleted ?? todo.completed,
            }
          : todo
      )
    );
  };

  useEffect(() => {
    getTodos();
  }, []);

  console.log(todos);

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th></th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>
                <CheckBox todo={todo} updateTodoInList={updateTodoInList} />
              </td>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} updateTodoInList={updateTodoInList} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
