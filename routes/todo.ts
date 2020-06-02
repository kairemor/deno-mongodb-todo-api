import { Router } from "https://deno.land/x/oak/mod.ts";
// controller
import todoController from "../controllers/todo.ts";

const router = new Router();

router
  .get("/", ({ request, response }: { request: any; response: any }) => {
    response.body = "working";
  })
  .get("/todos", todoController.getAllTodos)
  .post("/todos", todoController.createTodo)
  .get("/todos/:id", todoController.getTodoById)
  .put("/todos/:id", todoController.updateTodoById)
  .delete("/todos/:id", todoController.deleteTodoById);

export default router;
