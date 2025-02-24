import crypto from "crypto";
import pgPool from "../config/db.js";

export const getAllTodos = async () => {
  const query = {
    name: "get-all-todos",
    text: "SELECT * FROM todos",
  };

  return await pgPool.query(query);
};

export const getTodo = async (id) => {
  const query = {
    name: "get-todo-by-id",
    text: "SELECT * FROM todos WHERE id = $1",
    values: [id],
  };

  return await pgPool.query(query);
};

export const createTodo = async (textBody) => {
  const query = {
    name: "create-new-todo",
    text: "INSERT INTO todos(id, body) VALUES($1, $2) RETURNING *",
    values: [crypto.randomUUID(), textBody],
  };

  return await pgPool.query(query);
};

export const deleteTodo = async (todoId) => {
  const query = {
    name: "delete-todo",
    text: "DELETE FROM todos WHERE id = $1",
    values: [todoId],
  };

  return await pgPool.query(query);
};
