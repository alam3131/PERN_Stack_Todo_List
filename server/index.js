const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// This line loads environment variables from a specific .env file located at "/etc/secrets/.env" into the process environment.
// The dotenv package is used to manage environment variables, making them accessible in the Node.js application via `process.env`.
// By specifying the `path` option, we ensure that dotenv loads variables from the file at this custom location rather than the default `.env` file in the root directory.
require("dotenv").config({ path: "/etc/secrets/.env" });

var allowlist = ["https://pern-stack-todo-list.vercel.app", "https://pern-stack-todo-list-alam3131s-projects.vercel.app", "https://pern-stack-todo-list-git-main-alam3131s-projects.vercel.app"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

// middleware
app.use(cors(corsOptionsDelegate));
// app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

app.get("/", (req, res) => {
  res.send("API is running...");
});

//create a todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    console.log("Received GET /todos request"); // STEP 1
    const allTodos = await pool.query("SELECT * FROM todo");
    console.log("Query successful:", allTodos.rows); // STEP 3
    res.json(allTodos.rows);
  } catch (err) {
    console.error("Database error:", err); // more descriptive
    console.error(err.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, completed } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = COALESCE($1, description), completed = COALESCE($2, completed) WHERE todo_id = $3",
      [description, completed, id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo was deleted");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT || 8000}`);
});
