import { FILE_PATH } from "../../config.ts";

export default async ({ request, response, params }) => {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  try {
    const data = await Deno.readFile(FILE_PATH);
    const todos = JSON.parse(decoder.decode(data));
    const { value: updateTodo } = await request.body();
    const newTodos = todos.map((todo) =>
      todo.id === +params.id ? { ...todo, ...updateTodo } : todo
    );
    console.log(updateTodo, newTodos);
    await Deno.writeFile(
      FILE_PATH,
      encoder.encode(JSON.stringify(newTodos, null, 2)),
    );
    response.status = 201;
    response.body = { status: "success" };
  } catch (error) {
    response.status = 502;
    response.body = { status: "Failed to update a todo!", error };
  }
};
