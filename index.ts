import { Application } from "https://deno.land/x/oak/mod.ts";

import { PORT } from "./config.ts";

import router from "./router.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server is running. Open http://localhost:${PORT}`);

await app.listen({ port: PORT });
