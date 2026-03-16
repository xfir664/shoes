// ============================================================================
// Типы для пользователя и авторизации.
//
// Использование:
//   import type { User, AuthTokens } from "~/types/user";
//
//   const user = ref<User | null>(null);
// ============================================================================

/** Пользователь системы. */
export interface User {
	id: string | number;
	email: string;
	name: string;
	avatar?: string;
	role: UserRole;
	createdAt: string;
	updatedAt: string;
}

/** Роли пользователей. Расширяйте по мере необходимости. */
export type UserRole = "user" | "admin" | "moderator";

/** Токены авторизации, возвращаемые при login/refresh. */
export interface AuthTokens {
	accessToken: string;
	refreshToken: string;
	expiresIn: number;
}

/** Данные для входа. */
export interface LoginCredentials {
	email: string;
	password: string;
}

/** Данные для регистрации. */
export interface RegisterData {
	name: string;
	email: string;
	password: string;
	passwordConfirm: string;
}
