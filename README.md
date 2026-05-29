# Treaty-gen

A codegen utility that extracts fully typed [Treaty](https://elysiajs.com/eden/treaty) client types from your Elysia server definition. Define routes in `server.ts`, run the generator, and import the `Api` type from `api.gen.ts` in your client code.

## Why not just use Treaty?

Treaty is normally typed by passing your Elysia app type: `treaty<typeof app>(url)`. That works when the backend is Elysia and shares the same codebase.

When the backend is **not** Elysia — for example Go, Python, or Rust — there is no `typeof app` to import. Treaty still works at runtime, but you lose end-to-end type safety.

Treaty-gen bridges that gap: you describe your API once in `server.ts` (as a schema mirror of your real backend), generate `api.gen.ts`, and use that `Api` type with Treaty on the client. You get the same typed client experience without running Elysia in production.

## Usage

```bash
git clone git@github.com:nicolasventer/Treaty-gen.git
cd Treaty-gen
bun install
```

Edit `server.ts` with your Elysia app — a schema mirror of your real backend:

```ts
import { treaty } from "@elysia/eden";
import { Elysia, t } from "elysia";

const anyCb = (x: any) => x;

const app = new Elysia()
	.model({
		Task: t.Object({
			id: t.Number(),
			title: t.String(),
			completed: t.Boolean(),
		}),
		CreateTask: t.Object({ title: t.String() }),
		UpdateTask: t.Object({
			title: t.Optional(t.String()),
			completed: t.Optional(t.Boolean()),
		}),
	})
	.group("/api/v1", (app) =>
		app
			.get("/tasks", anyCb, {
				query: t.Object({ completed: t.Optional(t.Boolean()) }),
				response: t.Array(t.Ref("Task")),
			})
			.get("/tasks/:id", anyCb, {
				params: t.Object({ id: t.Numeric() }),
				response: "Task",
			})
			.post("/tasks", anyCb, { body: "CreateTask", response: "Task" })
			.patch("/tasks/:id", anyCb, {
				params: t.Object({ id: t.Numeric() }),
				body: "UpdateTask",
				response: "Task",
			})
			.delete("/tasks/:id", anyCb, {
				params: t.Object({ id: t.Numeric() }),
				response: t.Void(),
			}),
	);

type App = typeof app;
const api = treaty<App>("").api;
```

Generate the typed contract:

```bash
bun index.ts
```

Output (`api.gen.ts`):

```ts
export type Api = {
	v1: {
		tasks: {
			get: (options?: { query?: { completed?: boolean } }) => Promise<...>;
			post: (body: { title: string }) => Promise<...>;
			(id: { id: number }): {
				get: () => Promise<...>;
				patch: (body?: { title?: string; completed?: boolean }) => Promise<...>;
				delete: () => Promise<...>;
			};
		};
	};
};
```

Use the generated type in `client.ts`:

```ts
import { treaty } from "@elysia/eden";
import type { Api } from "./api.gen";

const SRV_URL = "http://localhost:8080";
export const api = treaty(SRV_URL).api as unknown as Api;

const { data: tasks } = await api.v1.tasks.get({
	query: { completed: false },
});

const { data: created } = await api.v1.tasks.post({
	title: "Write integration tests",
});

if (created) {
	await api.v1.tasks({ id: created.id }).patch({ completed: true });
}
```
