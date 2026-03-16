<script setup lang="ts">
useSeoMeta({
	title: "Доставка и оплата",
	description: "Условия доставки, способы оплаты и политика возврата",
	ogTitle: "Доставка и оплата — ShoeStore",
});
</script>

<template>
	<div class="delivery">
		<h1 class="delivery__title">Доставка и оплата</h1>

		<!-- Доставка -->
		<section class="delivery__section">
			<h2 class="delivery__subtitle">Способы доставки</h2>

			<div class="delivery__cards">
				<div class="delivery__card">
					<div class="delivery__card-icon">
						<span class="mdi mdi-truck-fast-outline delivery__card-mdi" />
					</div>
					<h3 class="delivery__card-title">Бесплатная доставка</h3>
					<p class="delivery__card-text">
						При заказе от 5 000 ₽ по Москве и Московской области.
						Доставка в день заказа или на следующий день.
					</p>
				</div>

				<div class="delivery__card">
					<div class="delivery__card-icon">
						<span class="mdi mdi-package-variant delivery__card-mdi" />
					</div>
					<h3 class="delivery__card-title">Доставка по России</h3>
					<p class="delivery__card-text">
						От 290 ₽, срок доставки 3–7 рабочих дней.
						Отправляем транспортными компаниями.
					</p>
				</div>

				<div class="delivery__card">
					<div class="delivery__card-icon">
						<span class="mdi mdi-store delivery__card-mdi" />
					</div>
					<h3 class="delivery__card-title">Самовывоз</h3>
					<p class="delivery__card-text">
						Бесплатно из нашего магазина.
						г. Москва, ул. Обувная, д. 1.
					</p>
				</div>

				<div class="delivery__card">
					<div class="delivery__card-icon">
						<span class="mdi mdi-shoe-sneaker delivery__card-mdi" />
					</div>
					<h3 class="delivery__card-title">Примерка при получении</h3>
					<p class="delivery__card-text">
						Примерьте обувь перед оплатой.
						Если не подошёл размер — вернём без вопросов.
					</p>
				</div>
			</div>
		</section>

		<!-- Оплата -->
		<section class="delivery__section">
			<h2 class="delivery__subtitle">Способы оплаты</h2>

			<div class="delivery__pay-grid">
				<div class="delivery__pay-item">
					<span class="mdi mdi-cash" style="font-size: 24px" />
					<span>Наличные при получении</span>
				</div>
				<div class="delivery__pay-item">
					<span class="mdi mdi-credit-card-outline" style="font-size: 24px" />
					<span>Банковская карта</span>
				</div>
				<div class="delivery__pay-item">
					<span class="mdi mdi-cellphone" style="font-size: 24px" />
					<span>Онлайн-оплата на сайте</span>
				</div>
			</div>
		</section>

		<!-- Возврат -->
		<section class="delivery__section">
			<h2 class="delivery__subtitle">Возврат и обмен</h2>

			<div class="delivery__return">
				<div class="delivery__return-header">
					<span class="mdi mdi-refresh" style="font-size: 28px" />
					<span>14 дней на возврат</span>
				</div>

				<ul class="delivery__return-list">
					<li class="delivery__return-item">
						Возврат и обмен в течение 14 дней с момента покупки
					</li>
					<li class="delivery__return-item">
						Товар не должен быть в использовании, сохранены бирки и упаковка
					</li>
					<li class="delivery__return-item">
						При себе иметь чек и паспорт
					</li>
				</ul>
			</div>
		</section>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/var.scss" as *;

.delivery {
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

	&__section {
		margin-bottom: var(--spacing-2xl);
	}

	&__subtitle {
		font-family: var(--font-accent);
		font-size: var(--fs-xl);
		font-weight: var(--fw-semibold);
		color: var(--c-text);
		margin: 0 0 var(--spacing-lg);
		padding-bottom: var(--spacing-sm);
		border-bottom: 2px solid var(--c-primary);
		display: inline-block;
	}

	// Карточки доставки
	&__cards {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--spacing-lg);

		@media (max-width: $breakpoint-tablet) {
			grid-template-columns: 1fr;
		}
	}

	&__card {
		background: var(--c-surface);
		border: 1px solid var(--c-border-light);
		border-radius: var(--radius-md);
		padding: var(--spacing-lg);
		transition: var(--transition-base);

		&:hover {
			box-shadow: var(--shadow-md);
			border-color: var(--c-primary);
		}
	}

	&__card-icon {
		width: 56px;
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--c-primary-light);
		border-radius: var(--radius-md);
		color: var(--c-primary);
		margin-bottom: var(--spacing-md);
	}

	&__card-mdi {
		font-size: 32px;
	}

	&__card-title {
		font-family: var(--font-accent);
		font-size: var(--fs-md);
		font-weight: var(--fw-semibold);
		color: var(--c-text);
		margin: 0 0 var(--spacing-sm);
	}

	&__card-text {
		font-size: var(--fs-base);
		color: var(--c-text-secondary);
		line-height: var(--lh-relaxed);
		margin: 0;
	}

	// Оплата
	&__pay-grid {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-md);
	}

	&__pay-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		background: var(--c-surface);
		border: 1px solid var(--c-border-light);
		border-radius: var(--radius-md);
		padding: var(--spacing-md) var(--spacing-lg);
		font-size: var(--fs-base);
		color: var(--c-text);
		transition: var(--transition-base);

		&:hover {
			border-color: var(--c-primary);
			box-shadow: var(--shadow-sm);
		}
	}

	// Возврат
	&__return {
		background: var(--c-surface);
		border: 1px solid var(--c-border-light);
		border-radius: var(--radius-md);
		padding: var(--spacing-lg);
	}

	&__return-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		font-family: var(--font-accent);
		font-size: var(--fs-lg);
		font-weight: var(--fw-semibold);
		color: var(--c-primary);
		margin-bottom: var(--spacing-md);
	}

	&__return-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	&__return-item {
		position: relative;
		padding-left: var(--spacing-lg);
		margin-bottom: var(--spacing-sm);
		font-size: var(--fs-base);
		color: var(--c-text-secondary);
		line-height: var(--lh-relaxed);

		&::before {
			content: "";
			position: absolute;
			left: 0;
			top: 10px;
			width: 8px;
			height: 8px;
			border-radius: var(--radius-full);
			background: var(--c-primary);
		}

		&:last-child {
			margin-bottom: 0;
		}
	}
}
</style>
