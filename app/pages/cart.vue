<script setup lang="ts">
import { formatPrice } from "~/utils/mockProducts";

useSeoMeta({
	title: "Корзина",
	description: "Корзина покупок — оформление заказа",
	ogTitle: "Корзина — ShoeStore",
});

const cartStore = useCartStore();

/** Форма оформления */
const isCheckoutOpen = ref(false);
const orderForm = reactive({
	name: "",
	phone: "",
	email: "",
	city: "",
	address: "",
	comment: "",
});
const isOrderSubmitted = ref(false);

const checkoutRef = ref<HTMLElement | null>(null);

const scrollToCheckout = () => {
	nextTick(() => {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				const el = checkoutRef.value;
				if (!el) return;
				const header = document.querySelector(".header") as HTMLElement | null;
				const headerH = header ? header.offsetHeight : 0;
				const top = el.getBoundingClientRect().top + window.scrollY - headerH - 20;
				window.scrollTo({ top, behavior: "smooth" });
			});
		});
	});
};

const toggleCheckout = () => {
	isCheckoutOpen.value = !isCheckoutOpen.value;
	if (isCheckoutOpen.value) {
		scrollToCheckout();
	}
};

const submitOrder = () => {
	isOrderSubmitted.value = true;
	cartStore.clearCart();
};
</script>

<template>
	<div class="cart">
		<h1 class="cart__title">Корзина</h1>

		<!-- Пустая корзина -->
		<div v-if="cartStore.isEmpty && !isOrderSubmitted" class="cart__empty">
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

		<!-- Успешное оформление -->
		<div v-else-if="isOrderSubmitted" class="cart__success">
			<span class="mdi mdi-check-circle" style="font-size: 64px; color: var(--c-success)" />
			<p class="cart__success-title">Заказ оформлен!</p>
			<p class="cart__success-text">Мы свяжемся с вами для подтверждения заказа</p>
			<NuxtLink to="/catalog">
				<MyBtn type="button" variant="primary">
					Вернуться в каталог
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
				<MyBtn
					type="button"
					variant="primary"
					class="cart__checkout-btn"
					@click="toggleCheckout"
				>
					{{ isCheckoutOpen ? "Скрыть форму" : "Оформить заказ" }}
				</MyBtn>
			</div>

			<!-- Форма оформления заказа -->
			<div v-if="isCheckoutOpen" ref="checkoutRef" class="cart__checkout">
				<h2 class="cart__checkout-heading">Оформление заказа</h2>

				<form class="cart__form" @submit.prevent="submitOrder">
					<div class="cart__form-row">
						<div class="cart__form-field">
							<label class="cart__form-label">Имя *</label>
							<MyInput
								v-model="orderForm.name"
								variant="base"
								placeholder="Иван Иванов"
								required
							/>
						</div>
						<div class="cart__form-field">
							<label class="cart__form-label">Телефон *</label>
							<MyInput
								v-model="orderForm.phone"
								variant="base"
								type="tel"
								placeholder="+7 (999) 123-45-67"
								required
							/>
						</div>
					</div>

					<div class="cart__form-row">
						<div class="cart__form-field">
							<label class="cart__form-label">Email</label>
							<MyInput
								v-model="orderForm.email"
								variant="base"
								type="email"
								placeholder="email@example.com"
							/>
						</div>
						<div class="cart__form-field">
							<label class="cart__form-label">Город *</label>
							<MyInput
								v-model="orderForm.city"
								variant="base"
								placeholder="Москва"
								required
							/>
						</div>
					</div>

					<div class="cart__form-field">
						<label class="cart__form-label">Адрес доставки *</label>
						<MyInput
							v-model="orderForm.address"
							variant="base"
							placeholder="Улица, дом, квартира"
							required
						/>
					</div>

					<div class="cart__form-field">
						<label class="cart__form-label">Комментарий</label>
						<textarea
							v-model="orderForm.comment"
							class="cart__form-textarea"
							placeholder="Пожелания к заказу..."
							rows="3"
						/>
					</div>

					<MyBtn type="submit" variant="primary" class="cart__form-submit">
						Подтвердить заказ
					</MyBtn>
				</form>
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

	// Успешное оформление
	&__success {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-3xl) var(--spacing-lg);
		text-align: center;
	}

	&__success-title {
		font-family: var(--font-accent);
		font-size: var(--fs-xl);
		font-weight: var(--fw-semibold);
		color: var(--c-text);
		margin: var(--spacing-lg) 0 var(--spacing-sm);
	}

	&__success-text {
		font-size: var(--fs-base);
		color: var(--c-text-muted);
		margin: 0 0 var(--spacing-lg);
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

	// Форма оформления
	&__checkout {
		margin-top: var(--spacing-xl);
		padding: var(--spacing-lg);
		background: var(--c-surface);
		border: 1px solid var(--c-border-light);
		border-radius: var(--radius-md);

	}

	&__checkout-heading {
		font-family: var(--font-accent);
		font-size: var(--fs-xl);
		font-weight: var(--fw-semibold);
		color: var(--c-text);
		margin: 0 0 var(--spacing-lg);
	}

	&__form {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	&__form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-md);

		@media (max-width: $breakpoint-tablet) {
			grid-template-columns: 1fr;
		}
	}

	&__form-field {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	&__form-label {
		font-size: var(--fs-sm);
		font-weight: var(--fw-medium);
		color: var(--c-text-secondary);
	}

	&__form-textarea {
		width: 100%;
		padding: var(--spacing-sm);
		border: 1px solid var(--c-border);
		border-radius: var(--radius-md);
		background: var(--c-input-bg);
		font-family: var(--font-base);
		font-size: var(--fs-base);
		color: var(--c-text);
		resize: vertical;
		transition: var(--transition-base);

		&:focus {
			outline: none;
			border-color: var(--c-primary);
			box-shadow: 0 0 0 3px var(--c-focus-ring);
		}

		&::placeholder {
			color: var(--c-text-muted);
		}
	}

	&__form-submit {
		align-self: flex-start;
		margin-top: var(--spacing-sm);

		@media (max-width: $breakpoint-tablet) {
			width: 100%;
		}
	}
}
</style>
