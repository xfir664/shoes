import type { CartItem, Product } from "~/types/product";

/**
 * Стор корзины — управление товарами, количеством, итоговой суммой.
 * Каждая пара size + product.id — отдельный элемент корзины.
 */
export const useCartStore = defineStore("cart", {
	state: () => ({
		items: [] as CartItem[],
	}),

	getters: {
		/** Общее количество товаров */
		totalItems(): number {
			return this.items.reduce((sum, item) => sum + item.quantity, 0);
		},

		/** Общая сумма */
		totalPrice(): number {
			return this.items.reduce(
				(sum, item) => sum + item.product.price * item.quantity,
				0,
			);
		},

		/** Пуста ли корзина */
		isEmpty(): boolean {
			return this.items.length === 0;
		},
	},

	actions: {
		/** Добавить товар в корзину */
		addItem(product: Product, size: string) {
			const existing = this.items.find(
				(item) => item.product.id === product.id && item.size === size,
			);

			if (existing) {
				existing.quantity++;
			} else {
				this.items.push({ product, size, quantity: 1 });
			}
		},

		/** Удалить товар из корзины */
		removeItem(productId: number, size: string) {
			this.items = this.items.filter(
				(item) => !(item.product.id === productId && item.size === size),
			);
		},

		/** Изменить количество */
		updateQuantity(productId: number, size: string, quantity: number) {
			const item = this.items.find(
				(i) => i.product.id === productId && i.size === size,
			);
			if (item) {
				item.quantity = Math.max(1, quantity);
			}
		},

		/** Очистить корзину */
		clearCart() {
			this.items = [];
		},
	},
});
