// ============================================================================
// useAuthStore — авторизация и данные пользователя.
//
// Использование:
//   const auth = useAuthStore();
//
//   // Проверка авторизации:
//   if (auth.isAuthenticated) { ... }
//
//   // Вход:
//   await auth.login({ email: "user@test.com", password: "123" });
//
//   // Выход:
//   auth.logout();
//
//   // Данные пользователя:
//   console.log(auth.user?.name);
//
// Токены:
//   accessToken хранится в state (не в localStorage — для безопасности).
//   refreshToken хранится в httpOnly cookie (реализуйте на бэкенде).
//   Здесь показан базовый пример — адаптируйте под свой API.
// ============================================================================

import { defineStore } from "pinia";
import type { User, AuthTokens, LoginCredentials } from "~/types/user";

interface AuthState {
	user: User | null;
	accessToken: string | null;
}

export const useAuthStore = defineStore("auth", {
	state: (): AuthState => ({
		user: null,
		accessToken: null,
	}),

	getters: {
		isAuthenticated: (state) => !!state.accessToken,
	},

	actions: {
		/**
		 * Вход в систему. Замените тело на реальный API-вызов.
		 *
		 * Пример:
		 *   const { post } = useApi();
		 *   const { data } = await post<ApiResponse<{ user: User; tokens: AuthTokens }>>("/auth/login", credentials);
		 *   this.setAuth(data.user, data.tokens.accessToken);
		 */
		async login(credentials: LoginCredentials) {
			const { post } = useApi();

			const response = await post<{ user: User; tokens: AuthTokens }>(
				"/auth/login",
				credentials,
			);

			this.setAuth(response.user, response.tokens.accessToken);
		},

		logout() {
			this.user = null;
			this.accessToken = null;

			navigateTo("/");
		},

		setAuth(user: User, token: string) {
			this.user = user;
			this.accessToken = token;
		},
	},
});
