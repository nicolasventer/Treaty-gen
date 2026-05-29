import type { EdenFetchError, Treaty } from "@elysia/eden";

type TreatyResponse<T extends Record<number, unknown>> = Treaty.TreatyResponse<T>;
type ThrowHttpError = boolean | ((error: EdenFetchError<number, unknown>) => boolean);

export type Api = {
	v1: {
		tasks: ((params: {
			id: string | number;
		}) => {
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
					200: { id: number; title: string; completed: boolean };
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
			patch: ((
				body?: { title?: string | undefined; completed?: boolean | undefined } | undefined,
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
					200: { id: number; title: string; completed: boolean };
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
			delete: ((
				body?: unknown,
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
					200: void;
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
			"~path": string;
		} & {
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
					200: { id: number; title: string; completed: boolean };
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
			patch: ((
				body?: { title?: string | undefined; completed?: boolean | undefined } | undefined,
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
					200: { id: number; title: string; completed: boolean };
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
			delete: ((
				body?: unknown,
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
					200: void;
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
		}) & {
			get: ((
				options?:
					| {
							fetch?: RequestInit | undefined;
							throwHttpError?: ThrowHttpError | undefined;
							headers?: Record<string, unknown> | undefined;
							query?: { completed?: boolean | undefined } | undefined;
					  }
					| undefined,
			) => Promise<
				TreatyResponse<{
					200: { id: number; title: string; completed: boolean }[];
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
			post: ((
				body: { title: string },
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
					200: { id: number; title: string; completed: boolean };
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
	} & { "~path": string };
} & { "~path": string };
