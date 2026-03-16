// ============================================================================
// Типы для работы с API.
//
// Использование:
//   import type { ApiResponse, ApiError, PaginatedResponse } from "~/types/api";
//
//   const { data } = await useApi<ApiResponse<User[]>>("/users");
// ============================================================================

/** Стандартный ответ API — обёртка вокруг данных. */
export interface ApiResponse<T> {
	data: T;
	message?: string;
	success: boolean;
}

/** Ответ API с пагинацией. */
export interface PaginatedResponse<T> {
	data: T[];
	meta: {
		page: number;
		perPage: number;
		total: number;
		totalPages: number;
	};
}

/** Структура ошибки API. */
export interface ApiError {
	statusCode: number;
	message: string;
	errors?: Record<string, string[]>;
}

/** Параметры запроса с пагинацией. */
export interface PaginationParams {
	page?: number;
	perPage?: number;
	sort?: string;
	order?: "asc" | "desc";
}
