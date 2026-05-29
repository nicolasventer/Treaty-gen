import { treaty } from "@elysia/eden";
import type { Api } from "./api.gen";

const SRV_URL = "http://localhost:8080";
export const api = treaty(SRV_URL).api as unknown as Api;

// List open tasks
const { data: tasks } = await api.v1.tasks.get({
	query: { completed: false },
});

// Create a task
const { data: created } = await api.v1.tasks.post({
	title: "Write integration tests",
});

// Mark a task complete
if (created) {
	await api.v1.tasks({ id: created.id }).patch({
		completed: true,
	});
}

// Delete a task
if (tasks?.[0]) {
	await api.v1.tasks({ id: tasks[0].id }).delete();
}
