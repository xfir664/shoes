<script setup lang="ts">
import { formatPrice } from "~/utils/mockProducts";

useSeoMeta({
	title: "Корзина",
	description: "Корзина покупок — оформление заказа",
	ogTitle: "Корзина — ShoeStore",
});

const cartStore = useCartStore();

/** Форма оформления */
const orderForm = reactive({
	name: "",
	phone: "",
	email: "",
	city: "",
	address: "",
	comment: "",
});
const isOrderSubmitted = ref(false);

const submitOrder = () => {
	isOrderSubmitted.value = true;
	cartStore.clearCart();
};
</script>

<template>
	<div class="cart">
		<div class="cart__shell">
			<header class="cart__header">
				<div class="cart__title-group">
					<span class="cart__eyebrow">Оформление заказа</span>
					<h1 class="cart__title">Корзина</h1>
				</div>
				<NuxtLink v-if="!cartStore.isEmpty && !isOrderSubmitted" to="/catalog" class="cart__back">
					<span class="mdi mdi-arrow-left" />
					<span>Продолжить покупки</span>
				</NuxtLink>
			</header>

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
				<span
					class="mdi mdi-check-circle"
					style="font-size: 64px; color: var(--c-success)"
				/>
				<p class="cart__success-title">Заказ оформлен!</p>
				<p class="cart__success-text">Мы свяжемся с вами для подтверждения заказа</p>
				<NuxtLink to="/catalog">
					<MyBtn type="button" variant="primary">
						Вернуться в каталог
					</MyBtn>
				</NuxtLink>
			</div>

			<!-- Две колонки: слева товары + итого, справа форма -->
			<div v-else class="cart__grid">
				<section class="cart__column cart__column--items">
					<div class="cart__section">
						<h2 class="cart__section-title">
							Ваши товары
							<span class="cart__section-count">{{ cartStore.totalItems }}</span>
						</h2>
						<div class="cart__list">
							<div
								v-for="item in cartStore.items"
								:key="`${item.product.id}-${item.size}`"
								class="cart__item"
							>
								<div class="cart__item-image-wrap">
									<img
										:src="item.product.image"
										:alt="item.product.name"
										class="cart__item-image"
										loading="lazy"
									/>
								</div>

								<div class="cart__item-info">
									<h3 class="cart__item-name">{{ item.product.name }}</h3>
									<p class="cart__item-size">Размер: {{ item.size }}</p>
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
								</div>

								<div class="cart__item-aside">
									<div class="cart__item-price">
										{{ formatPrice(item.product.price * item.quantity) }}
									</div>
									<button
										class="cart__remove-btn"
										type="button"
										aria-label="Удалить товар"
										@click="cartStore.removeItem(item.product.id, item.size)"
									>
										<span class="mdi mdi-delete-outline" />
									</button>
								</div>
							</div>
						</div>
					</div>

					<!-- Итого -->
					<div class="cart__summary">
						<div class="cart__summary-row">
							<span>Товары ({{ cartStore.totalItems }})</span>
							<span>{{ formatPrice(cartStore.totalPrice) }}</span>
						</div>
						<div class="cart__summary-row">
							<span>Доставка</span>
							<span class="cart__summary-free">Бесплатно</span>
						</div>
						<div class="cart__summary-divider" />
						<div class="cart__summary-total">
							<span>Итого к оплате</span>
							<span class="cart__summary-price">{{ formatPrice(cartStore.totalPrice) }}</span>
						</div>
					</div>
				</section>

				<section class="cart__column cart__column--form">
					<div class="cart__section cart__section--form">
						<h2 class="cart__section-title">Данные получателя</h2>
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

							<p class="cart__form-hint">
								<span class="mdi mdi-shield-check-outline" />
								Нажимая кнопку, вы соглашаетесь с условиями обработки данных
							</p>
						</form>
					</div>
				</section>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/var.scss" as *;

.cart {
	max-width: var(--container-max);
	margin: 0 auto;
	padding: var(--spacing-lg) var(--spacing-md) var(--spacing-3xl);

	// Обёртка-карточка с градиентом — как в лайтбоксе
	&__shell {
		position: relative;
		background:
			radial-gradient(
				circle at 0% 0%,
				rgba(201, 169, 110, 0.14) 0%,
				transparent 40%
			),
			radial-gradient(
				circle at 100% 100%,
				rgba(201, 169, 110, 0.1) 0%,
				transparent 45%
			),
			linear-gradient(
				135deg,
				var(--c-beige-50) 0%,
				var(--c-surface) 50%,
				var(--c-beige-100) 100%
			);
		border: 1px solid var(--c-border-light);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-xl);
		padding: var(--spacing-xl);

		@media (max-width: $breakpoint-tablet) {
			padding: var(--spacing-lg) var(--spacing-md);
		}
	}

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--spacing-md);
		margin-bottom: var(--spacing-xl);
		padding-bottom: var(--spacing-lg);
		border-bottom: 1px solid var(--c-border-light);

		@media (max-width: $breakpoint-mobile) {
			flex-direction: column;
			align-items: flex-start;
		}
	}

	&__title-group {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	&__eyebrow {
		font-size: var(--fs-xs);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--c-primary);
		font-weight: var(--fw-semibold);
	}

	&__title {
		font-family: var(--font-accent);
		font-size: var(--fs-3xl);
		font-weight: var(--fw-bold);
		color: var(--c-text);
		margin: 0;
	}

	&__back {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xs);
		font-size: var(--fs-sm);
		font-weight: var(--fw-medium);
		color: var(--c-text-secondary);
		text-decoration: none;
		padding: var(--spacing-sm) var(--spacing-md);
		border-radius: var(--radius-full);
		border: 1px solid var(--c-border);
		background: var(--c-surface);
		transition: var(--transition-base);

		.mdi {
			font-size: 18px;
		}

		&:hover {
			background: var(--c-primary);
			border-color: var(--c-primary);
			color: var(--c-primary-text);
		}
	}

	// Пустая корзина
	&__empty,
	&__success {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-3xl) var(--spacing-lg);
		color: var(--c-text-muted);
		text-align: center;
	}

	&__empty-text,
	&__success-title {
		font-family: var(--font-accent);
		font-size: var(--fs-xl);
		font-weight: var(--fw-semibold);
		color: var(--c-text);
		margin: var(--spacing-lg) 0 var(--spacing-sm);
	}

	&__empty-hint,
	&__success-text {
		font-size: var(--fs-base);
		color: var(--c-text-muted);
		margin: 0 0 var(--spacing-lg);
	}

	&__empty-link {
		text-decoration: none;
	}

	// Сетка двух колонок
	&__grid {
		display: grid;
		grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
		gap: var(--spacing-lg);
		align-items: start;

		@media (max-width: $breakpoint-tablet) {
			grid-template-columns: 1fr;
		}
	}

	&__column {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
		min-width: 0;

		&--form {
			position: sticky;
			top: var(--spacing-lg);

			@media (max-width: $breakpoint-tablet) {
				position: static;
			}
		}
	}

	// Блок-секция внутри колонки
	&__section {
		background: var(--c-surface);
		border: 1px solid var(--c-border-light);
		border-radius: var(--radius-lg);
		padding: var(--spacing-lg);
		box-shadow: var(--shadow-sm);
	}

	&__section-title {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		font-family: var(--font-accent);
		font-size: var(--fs-lg);
		font-weight: var(--fw-semibold);
		color: var(--c-text);
		margin: 0 0 var(--spacing-md);
	}

	&__section-count {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 24px;
		height: 24px;
		padding: 0 8px;
		border-radius: var(--radius-full);
		background: var(--c-primary-light);
		color: var(--c-primary-active);
		font-size: var(--fs-xs);
		font-weight: var(--fw-semibold);
	}

	// Список товаров
	&__list {
		display: flex;
		flex-direction: column;
	}

	&__item {
		display: grid;
		grid-template-columns: 88px minmax(0, 1fr) auto;
		align-items: center;
		gap: var(--spacing-md);
		padding: var(--spacing-md) 0;
		border-bottom: 1px solid var(--c-border-light);

		&:last-child {
			border-bottom: none;
			padding-bottom: 0;
		}

		&:first-child {
			padding-top: 0;
		}

		@media (max-width: $breakpoint-mobile) {
			grid-template-columns: 72px minmax(0, 1fr);

			.cart__item-aside {
				grid-column: 1 / -1;
				flex-direction: row;
				justify-content: space-between;
			}
		}
	}

	&__item-image-wrap {
		width: 88px;
		height: 88px;
		border-radius: var(--radius-md);
		overflow: hidden;
		background: var(--c-beige-100);
		border: 1px solid var(--c-border-light);

		@media (max-width: $breakpoint-mobile) {
			width: 72px;
			height: 72px;
		}
	}

	&__item-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	&__item-info {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		min-width: 0;
	}

	&__item-name {
		font-family: var(--font-accent);
		font-size: var(--fs-base);
		font-weight: var(--fw-semibold);
		color: var(--c-text);
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	&__item-size {
		font-size: var(--fs-sm);
		color: var(--c-text-secondary);
		margin: 0;
	}

	&__item-controls {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		margin-top: var(--spacing-xs);
	}

	&__qty-btn {
		width: 30px;
		height: 30px;
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
			background: var(--c-primary);
			border-color: var(--c-primary);
			color: var(--c-primary-text);
		}

		&:disabled {
			opacity: 0.4;
			cursor: not-allowed;
		}
	}

	&__qty-value {
		font-size: var(--fs-base);
		font-weight: var(--fw-semibold);
		min-width: 24px;
		text-align: center;
		color: var(--c-text);
	}

	&__item-aside {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: var(--spacing-sm);
	}

	&__item-price {
		font-family: var(--font-accent);
		font-size: var(--fs-md);
		font-weight: var(--fw-bold);
		color: var(--c-text);
		white-space: nowrap;
	}

	&__remove-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border: none;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--c-text-muted);
		cursor: pointer;
		transition: var(--transition-base);

		&:hover {
			background: rgba(198, 40, 40, 0.08);
			color: var(--c-error);
		}
	}

	// Итого
	&__summary {
		background: var(--c-surface);
		border: 1px solid var(--c-border-light);
		border-radius: var(--radius-lg);
		padding: var(--spacing-lg);
		box-shadow: var(--shadow-sm);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	&__summary-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: var(--fs-base);
		color: var(--c-text-secondary);
	}

	&__summary-free {
		color: var(--c-success);
		font-weight: var(--fw-semibold);
	}

	&__summary-divider {
		height: 1px;
		background: var(--c-border-light);
		margin: var(--spacing-xs) 0;
	}

	&__summary-total {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		font-family: var(--font-accent);
		font-size: var(--fs-md);
		font-weight: var(--fw-semibold);
		color: var(--c-text);
	}

	&__summary-price {
		font-size: var(--fs-2xl);
		font-weight: var(--fw-bold);
		color: var(--c-primary-active);
	}

	// Форма
	&__form {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	&__form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-md);

		@media (max-width: $breakpoint-mobile) {
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
		padding: var(--spacing-sm) var(--spacing-md);
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
		margin-top: var(--spacing-sm);
		width: 100%;
	}

	&__form-hint {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		margin: 0;
		font-size: var(--fs-xs);
		color: var(--c-text-muted);
		text-align: center;
		justify-content: center;

		.mdi {
			font-size: 16px;
			color: var(--c-primary);
		}
	}
}
</style>
