import pgPool from "../config/db.js";

import {
  getAllTodos,
  getTodo,
  createTodo,
  deleteTodo,
} from "../models/todo.model.js";

export const todosIndex = async (req, res, next) => {
  try {
    const todos = await getAllTodos();

    res.status(200).json({
      success: true,
      message: "All todos",
      data: {
        todos: todos.rows,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const makeTodo = async (req, res, next) => {
  try {
    const { textBody } = req.body;

    const todo = await createTodo(textBody);

    if (todo.rows[0]) {
      res.status(201).json({
        success: true,
        message: "Todo successfully made",
        data: {
          todo: todo.rows[0],
        },
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const removeTodo = async (req, res, next) => {
  try {
    const todoId = req.params.id;

    await deleteTodo(todoId);

    res.status(200).json({
      success: true,
      message: `Todo ${todoId} successfully removed`,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
