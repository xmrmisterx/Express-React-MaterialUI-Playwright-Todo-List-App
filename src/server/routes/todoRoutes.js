import express from "express";
import {createTodo, deleteTodo, getAllTodos, getTodoById, updateTodo} from "../controllers/todoController.js";

const router = express.Router();

router.get("/todos", getAllTodos);
router.post("/todos", createTodo);
router.get("/todos/:id", getTodoById);
router.patch("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);

export default router;