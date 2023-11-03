import { Router } from "express";
import {
  createTodo,
  readAllTodos,
  readTodo,
  updateTodo,
} from "../controller/todoController";
const router: Router = Router();

router.route("/create-todo").post(createTodo);
router.route("/read-todos").get(readAllTodos);
router.route("/read-todo/:todoID").get(readTodo);
router.route("/update-todo/:todoID").patch(updateTodo);

export default router;
