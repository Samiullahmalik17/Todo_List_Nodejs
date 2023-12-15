const express = require("express");
const { createTodo, getTodo, updateTodo , deleteTodo} = require("../controllers/todoController");
const  auth  = require("../middlewares/auth");
const todoRouter = express.Router();

todoRouter.get("/", auth , getTodo);

todoRouter.post("/", auth , createTodo);

todoRouter.put("/:id", auth , updateTodo);

todoRouter.delete("/:id", auth , deleteTodo);

module.exports = todoRouter;