import { treaty } from "@elysia/eden";
import { Elysia, t } from "elysia";

const app = new Elysia()
	.model(
		"User",
		t.Object({
			name: t.String(),
			age: t.Number(),
		}),
	)
	.get(
		"/api",
		() => ({
			name: "John Doe",
			age: 30,
		}),
		{
			response: "User",
		},
	);

type App = typeof app;
const api = treaty<App>("").api;
