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
