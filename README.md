# Treaty-gen

A codegen utility that extracts fully typed [Treaty](https://elysiajs.com/eden/treaty) client types from your Elysia server definition. Define routes in `server.ts`, run the generator, and import the `Api` type from `api.gen.ts` in your client code.

## Usage

```bash
git clone git@github.com:nicolasventer/Treaty-gen.git
cd Treaty-gen
bun install
```

Edit `server.ts` with your Elysia app:

```ts
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
```

Generate the typed contract:

```bash
bun index.ts
```

Output (`api.gen.ts`):

```ts
import type { EdenFetchError, Treaty } from "@elysia/eden";

type TreatyResponse<T extends Record<number, unknown>> = Treaty.TreatyResponse<T>;
type ThrowHttpError = boolean | ((error: EdenFetchError<number, unknown>) => boolean);

export type Api = {
	get: ((
		options?:
			| {
					fetch?: RequestInit | undefined;
					throwHttpError?: ThrowHttpError | undefined;
					headers?: Record<string, unknown> | undefined;
					query?: Record<string, unknown> | undefined;
			  }
			| undefined,
	) => Promise<
		TreatyResponse<{
			200: { name: string; age: number };
			422: {
				type: "validation";
				on: string;
				summary?: string | undefined;
				message?: string | undefined;
				found?: unknown;
				property?: string | undefined;
				expected?: string | undefined;
			};
		}>
	>) & { "~path": string };
} & { "~path": string };
```

Use the generated type in `client.ts`:

```ts
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
```
