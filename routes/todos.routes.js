import { Router } from "express";

import {
  todosIndex,
  makeTodo,
  removeTodo,
} from "../controllers/todo.controller.js";

const todosRouter = Router();

todosRouter.get("/", todosIndex);

todosRouter.post("/", makeTodo);

todosRouter.delete("/:id", removeTodo);

export default todosRouter;
