import React, { useState } from "react";

export default function CheckBox({ todo, updateTodoInList }) {
  const API_BASE_URL = "https://pern-todo-pdrh.onrender.com" || "http://localhost:8000";
  const [completed, setCompleted] = useState(todo.completed);

  const toggleComplete = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });

      if (response.ok) {
        setCompleted((prev) => !prev);
        updateTodoInList(todo.todo_id, undefined, !completed);
      }

      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={() => toggleComplete()}
      aria-label={
        todo.completed
          ? `Mark ${todo.description} as incomplete`
          : `Mark ${todo.description} as complete`
      }
      style={{ width: "18px", height: "18px", cursor: "pointer" }}
    />
  );
}
