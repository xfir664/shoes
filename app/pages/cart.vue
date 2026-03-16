<script setup lang="ts">
import { formatPrice } from "~/utils/mockProducts";

useSeoMeta({
	title: "Корзина",
	description: "Корзина покупок — оформление заказа",
	ogTitle: "Корзина — ShoeStore",
});

const cartStore = useCartStore();
</script>

<template>
	<div class="cart">
		<h1 class="cart__title">Корзина</h1>

		<!-- Пустая корзина -->
		<div v-if="cartStore.isEmpty" class="cart__empty">
			<span class="mdi mdi-cart-off" style="font-size: 64px" />
			<p class="cart__empty-text">Ваша корзина пуста</p>
			<p class="cart__empty-hint">
				Добавьте товары из каталога, чтобы оформить заказ
			</p>
			<NuxtLink to="/catalog" class="cart__empty-link">
				<MyBtn type="button" variant="primary">
					Перейти в каталог
				</MyBtn>
			</NuxtLink>
		</div>

		<!-- Корзина с товарами -->
		<template v-else>
			<div class="cart__list">
				<div
					v-for="item in cartStore.items"
					:key="`${item.product.id}-${item.size}`"
					class="cart__item"
				>
					<div class="cart__item-image-wrap">
						<img
							:src="item.product.images[0]"
							:alt="item.product.name"
							class="cart__item-image"
							loading="lazy"
						/>
					</div>

					<div class="cart__item-info">
						<h3 class="cart__item-name">{{ item.product.name }}</h3>
						<p class="cart__item-size">Размер: {{ item.size }}</p>
					</div>

					<div class="cart__item-controls">
						<button
							class="cart__qty-btn"
							type="button"
							:disabled="item.quantity <= 1"
							@click="cartStore.updateQuantity(item.product.id, item.size, item.quantity - 1)"
						>
							<span class="mdi mdi-minus" />
						</button>
						<span class="cart__qty-value">{{ item.quantity }}</span>
						<button
							class="cart__qty-btn"
							type="button"
							@click="cartStore.updateQuantity(item.product.id, item.size, item.quantity + 1)"
						>
							<span class="mdi mdi-plus" />
						</button>
					</div>

					<div class="cart__item-price">
						{{ formatPrice(item.product.price * item.quantity) }}
					</div>

					<button
						class="cart__remove-btn"
						type="button"
						@click="cartStore.removeItem(item.product.id, item.size)"
					>
						<span class="mdi mdi-delete-outline" />
					</button>
				</div>
			</div>

			<!-- Итого -->
			<div class="cart__footer">
				<div class="cart__total">
					<span class="cart__total-label">
						Итого ({{ cartStore.totalItems }}
						{{ cartStore.totalItems === 1 ? "товар" : "товаров" }}):
					</span>
					<span class="cart__total-price">
						{{ formatPrice(cartStore.totalPrice) }}
					</span>
				</div>
				<MyBtn type="button" variant="primary" class="cart__checkout-btn">
					Оформить заказ
				</MyBtn>
			</div>
		</template>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/var.scss" as *;

.cart {
	max-width: var(--container-max);
	margin: 0 auto;
	padding: var(--spacing-lg) var(--spacing-md) var(--spacing-3xl);

	&__title {
		font-family: var(--font-accent);
		font-size: var(--fs-3xl);
		font-weight: var(--fw-bold);
		color: var(--c-text);
		margin: 0 0 var(--spacing-xl);
	}

	// Пустая корзина
	&__empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-3xl) var(--spacing-lg);
		color: var(--c-text-muted);
		text-align: center;
	}

	&__empty-text {
		font-family: var(--font-accent);
		font-size: var(--fs-xl);
		font-weight: var(--fw-semibold);
		color: var(--c-text);
		margin: var(--spacing-lg) 0 var(--spacing-sm);
	}

	&__empty-hint {
		font-size: var(--fs-base);
		color: var(--c-text-muted);
		margin: 0 0 var(--spacing-lg);
	}

	&__empty-link {
		text-decoration: none;
	}

	// Список товаров
	&__list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
		margin-bottom: var(--spacing-xl);
	}

	&__item {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		background: var(--c-surface);
		border: 1px solid var(--c-border-light);
		border-radius: var(--radius-md);
		padding: var(--spacing-md);
		transition: var(--transition-base);

		&:hover {
			box-shadow: var(--shadow-sm);
		}

		@media (max-width: $breakpoint-tablet) {
			flex-wrap: wrap;
		}
	}

	&__item-image-wrap {
		width: 80px;
		height: 80px;
		flex-shrink: 0;
		border-radius: var(--radius-sm);
		overflow: hidden;
		background: var(--c-beige-100);
	}

	&__item-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	&__item-info {
		flex: 1;
		min-width: 0;
	}

	&__item-name {
		font-family: var(--font-accent);
		font-size: var(--fs-base);
		font-weight: var(--fw-semibold);
		color: var(--c-text);
		margin: 0 0 var(--spacing-xs);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	&__item-size {
		font-size: var(--fs-sm);
		color: var(--c-text-secondary);
		margin: 0;
	}

	// Управление количеством
	&__item-controls {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		flex-shrink: 0;
	}

	&__qty-btn {
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--c-border);
		border-radius: var(--radius-sm);
		background: var(--c-surface);
		color: var(--c-text);
		cursor: pointer;
		transition: var(--transition-base);

		&:hover:not(:disabled) {
			background: var(--c-base-hover);
			border-color: var(--c-primary);
		}

		&:disabled {
			opacity: 0.4;
			cursor: not-allowed;
		}
	}

	&__qty-value {
		font-size: var(--fs-base);
		font-weight: var(--fw-medium);
		min-width: 24px;
		text-align: center;
		color: var(--c-text);
	}

	// Цена
	&__item-price {
		font-family: var(--font-accent);
		font-size: var(--fs-md);
		font-weight: var(--fw-semibold);
		color: var(--c-text);
		white-space: nowrap;
		flex-shrink: 0;
		min-width: 100px;
		text-align: right;
	}

	// Кнопка удаления
	&__remove-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border: none;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--c-text-muted);
		cursor: pointer;
		transition: var(--transition-base);
		flex-shrink: 0;

		&:hover {
			background: rgba(198, 40, 40, 0.08);
			color: var(--c-error);
		}
	}

	// Итого
	&__footer {
		background: var(--c-surface);
		border: 1px solid var(--c-border-light);
		border-radius: var(--radius-md);
		padding: var(--spacing-lg);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--spacing-lg);

		@media (max-width: $breakpoint-tablet) {
			flex-direction: column;
			align-items: stretch;
		}
	}

	&__total {
		display: flex;
		align-items: baseline;
		gap: var(--spacing-md);
	}

	&__total-label {
		font-size: var(--fs-base);
		color: var(--c-text-secondary);
	}

	&__total-price {
		font-family: var(--font-accent);
		font-size: var(--fs-2xl);
		font-weight: var(--fw-bold);
		color: var(--c-text);
	}

	&__checkout-btn {
		flex-shrink: 0;

		@media (max-width: $breakpoint-tablet) {
			width: 100%;
		}
	}
}
</style>
