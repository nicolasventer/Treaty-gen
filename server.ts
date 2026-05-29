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
		CreateTask: t.Object({
			title: t.String(),
		}),
		UpdateTask: t.Object({
			title: t.Optional(t.String()),
			completed: t.Optional(t.Boolean()),
		}),
	})
	.group("/api/v1", (app) =>
		app
			.get("/tasks", anyCb, {
				query: t.Object({
					completed: t.Optional(t.Boolean()),
				}),
				response: t.Array(t.Ref("Task")),
			})
			.get("/tasks/:id", anyCb, {
				params: t.Object({ id: t.Numeric() }),
				response: "Task",
			})
			.post("/tasks", anyCb, {
				body: "CreateTask",
				response: "Task",
			})
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
