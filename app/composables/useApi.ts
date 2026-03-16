// ============================================================================
// useApi — типизированная обёртка над $fetch с базовым URL из runtimeConfig.
//
// Использование:
//   const { get, post, put, del } = useApi();
//
//   // GET запрос
//   const users = await get<User[]>("/users");
//
//   // POST запрос
//   const created = await post<User>("/users", { name: "John", email: "john@test.com" });
//
//   // С Nuxt useFetch (SSR-совместимо):
//   const { data, error, pending } = useApiFetch<User[]>("/users");
//
// Базовый URL берётся из runtimeConfig.public.apiUrl (nuxt.config.ts).
// ============================================================================

import type { ApiResponse } from "~/types/api";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions {
	headers?: Record<string, string>;
	query?: Record<string, unknown>;
}

export function useApi() {
	const config = useRuntimeConfig();
	const baseURL = config.public.apiUrl as string;

	async function request<T>(
		method: HttpMethod,
		url: string,
		body?: unknown,
		options: RequestOptions = {},
	): Promise<T> {
		return $fetch<T>(url, {
			baseURL,
			method,
			body: body ?? undefined,
			headers: {
				"Content-Type": "application/json",
				...options.headers,
			},
			query: options.query,
		});
	}

	return {
		get: <T>(url: string, options?: RequestOptions) =>
			request<T>("GET", url, undefined, options),

		post: <T>(url: string, body?: unknown, options?: RequestOptions) =>
			request<T>("POST", url, body, options),

		put: <T>(url: string, body?: unknown, options?: RequestOptions) =>
			request<T>("PUT", url, body, options),

		patch: <T>(url: string, body?: unknown, options?: RequestOptions) =>
			request<T>("PATCH", url, body, options),

		del: <T>(url: string, options?: RequestOptions) =>
			request<T>("DELETE", url, undefined, options),
	};
}

/**
 * SSR-совместимый fetch с автоподстановкой baseURL.
 * Обёртка над useFetch из Nuxt — поддерживает серверный рендеринг.
 *
 * Пример:
 *   const { data, error, pending, refresh } = useApiFetch<ApiResponse<User[]>>("/users");
 */
export function useApiFetch<T>(url: string, options: Parameters<typeof useFetch>[1] = {}) {
	const config = useRuntimeConfig();

	return useFetch<T>(url, {
		baseURL: config.public.apiUrl as string,
		...options,
	});
}
