import type { CartItem } from "~/types/product";

const STORAGE_KEY = "shoes:cart";

/**
 * Клиентский плагин — восстанавливает корзину из localStorage при загрузке
 * и подписывается на изменения стора для автоматического сохранения.
 */
export default defineNuxtPlugin(() => {
	const cartStore = useCartStore();

	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw) {
			const parsed = JSON.parse(raw) as CartItem[];
			if (Array.isArray(parsed)) {
				cartStore.items = parsed;
			}
		}
	} catch (error) {
		console.warn("[cart-persist] Не удалось восстановить корзину:", error);
	}

	cartStore.$subscribe((_mutation, state) => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
		} catch (error) {
			console.warn("[cart-persist] Не удалось сохранить корзину:", error);
		}
	});
});
