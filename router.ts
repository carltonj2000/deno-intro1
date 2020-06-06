import { Router } from "https://deno.land/x/oak/mod.ts";

import getTodos from "./controllers/todos/get.ts";
import postTodos from "./controllers/todos/post.ts";
import deleteTodos from "./controllers/todos/delete.js";
import putTodos from "./controllers/todos/put.js";

const router = new Router();

router.get("/", ({ response }) => {
  response.body = "Todo List API Using Deno Runtime";
});

router.get("/todos", getTodos);
router.post("/todos", postTodos);
router.delete("/todos/:id", deleteTodos);
router.put("/todos/:id", putTodos);

export default router;
