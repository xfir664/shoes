// ============================================================================
// Middleware: auth — проверка авторизации.
//
// Использование на конкретной странице:
//   <script setup>
//   definePageMeta({ middleware: "auth" });
//   </script>
//
// Использование глобально (для всех страниц):
//   Переименуйте файл в auth.global.ts
//
// Логика:
//   Если пользователь не авторизован (нет accessToken в authStore),
//   происходит редирект на главную страницу.
//   Замените "/" на "/login" когда создадите страницу входа.
// ============================================================================

export default defineNuxtRouteMiddleware((to) => {
	const auth = useAuthStore();

	if (!auth.isAuthenticated) {
		if (to.path !== "/") {
			return navigateTo("/");
		}
	}
});
