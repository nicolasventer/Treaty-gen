import { treaty } from "@elysia/eden";
import type { Api } from "./api.gen";

const SRV_URL = "http://localhost:3000";
export const api = treaty(SRV_URL).api as unknown as Api;

const user = await api.get({
	query: {
		name: "John Doe",
	},
});

console.log(user.data?.name);
