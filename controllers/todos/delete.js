import { FILE_PATH } from "../../config.ts";

export default async ({ response, params }) => {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  try {
    const data = await Deno.readFile(FILE_PATH);
    const todos = JSON.parse(decoder.decode(data));
    const newTodos = todos.filter((todo) => todo.id === +params.id);
    await Deno.writeFile(
      FILE_PATH,
      encoder.encode(JSON.stringify(newTodos, null, 2)),
    );
    response.status = 201;
    response.body = { status: "success" };
  } catch (error) {
    response.status = 502;
    response.body = { status: "Failed to delete a todo!", error };
  }
};
