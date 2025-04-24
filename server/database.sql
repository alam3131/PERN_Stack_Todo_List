-- Used to create perntodo database and todo table

CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

-- Used to add the completed column to the todo table

ALTER TABLE todo
ADD completed BOOLEAN DEFAULT FALSE;