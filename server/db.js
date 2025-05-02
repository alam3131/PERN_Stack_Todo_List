const { Pool } = require("pg");

// This line loads environment variables from a specific .env file located at "/etc/secrets/.env" into the process environment.
// The dotenv package is used to manage environment variables, making them accessible in the Node.js application via `process.env`.
// By specifying the `path` option, we ensure that dotenv loads variables from the file at this custom location rather than the default `.env` file in the root directory.
require("dotenv").config({ path: "/etc/secrets/.env" });

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
