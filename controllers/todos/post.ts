import { FILE_PATH } from "../../config.ts";

export default async (
  { request, response }: { request: any; response: any },
) => {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  try {
    const { value: {title} } = await request.body();
    const id = Math.floor(Math.random() * 1000000);
    const data = await Deno.readFile(FILE_PATH);
    const todos = JSON.parse(decoder.decode(data));
    todos.push({ id, title, done: false });
    await Deno.writeFile(
      FILE_PATH,
      encoder.encode(JSON.stringify(todos, null, 2)),
    );
    response.status = 201;
    response.body = { status: "success", id };
  } catch (error) {
    response.status = 502;
    response.body = { status: "Failed to create at todo!", error };
  }
};
