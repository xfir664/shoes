<script setup lang="ts">
useSeoMeta({
	title: "Контакты",
	description: "Контактная информация магазина обуви — телефоны, адрес, график работы",
	ogTitle: "Контакты — ShoeStore",
});
</script>

<template>
	<div class="contacts">
		<h1 class="contacts__title">Контакты</h1>

		<div class="contacts__grid">
			<!-- Информация -->
			<div class="contacts__info">
				<div class="contacts__block">
					<div class="contacts__block-header">
						<span class="mdi mdi-phone-outline contacts__icon" />
						<h2 class="contacts__block-title">Телефоны</h2>
					</div>
					<a href="tel:+74951234567" class="contacts__link">
						+7 (495) 123-45-67
					</a>
					<a href="tel:88001234567" class="contacts__link">
						8 (800) 123-45-67
					</a>
					<p class="contacts__hint">Звонок по России бесплатный</p>
				</div>

				<div class="contacts__block">
					<div class="contacts__block-header">
						<span class="mdi mdi-map-marker-outline contacts__icon" />
						<h2 class="contacts__block-title">Адрес</h2>
					</div>
					<p class="contacts__text">
						г. Москва, ул. Обувная, д. 1
					</p>
				</div>

				<div class="contacts__block">
					<div class="contacts__block-header">
						<span class="mdi mdi-clock-outline contacts__icon" />
						<h2 class="contacts__block-title">Режим работы</h2>
					</div>
					<p class="contacts__text">
						Пн–Вс: 10:00 – 21:00
					</p>
				</div>

				<div class="contacts__block">
					<div class="contacts__block-header">
						<span class="mdi mdi-email-outline contacts__icon" />
						<h2 class="contacts__block-title">E-mail</h2>
					</div>
					<a href="mailto:info@shoestore.ru" class="contacts__link">
						info@shoestore.ru
					</a>
				</div>
			</div>

			<!-- Карта -->
			<div class="contacts__map">
				<div class="contacts__map-placeholder">
					<span class="mdi mdi-map-outline" style="font-size: 48px" />
					<p class="contacts__map-text">Карта загружается...</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/var.scss" as *;

.contacts {
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

	&__grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-xl);
		align-items: start;

		@media (max-width: $breakpoint-tablet) {
			grid-template-columns: 1fr;
		}
	}

	&__info {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	&__block {
		background: var(--c-surface);
		border: 1px solid var(--c-border-light);
		border-radius: var(--radius-md);
		padding: var(--spacing-lg);
		transition: var(--transition-base);

		&:hover {
			box-shadow: var(--shadow-md);
		}
	}

	&__icon {
		font-size: 24px;
	}

	&__block-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		margin-bottom: var(--spacing-md);
		color: var(--c-primary);
	}

	&__block-title {
		font-family: var(--font-accent);
		font-size: var(--fs-lg);
		font-weight: var(--fw-semibold);
		color: var(--c-text);
		margin: 0;
	}

	&__link {
		display: block;
		font-size: var(--fs-md);
		color: var(--c-text);
		text-decoration: none;
		margin-bottom: var(--spacing-xs);
		transition: var(--transition-base);

		&:hover {
			color: var(--c-primary);
		}
	}

	&__hint {
		font-size: var(--fs-sm);
		color: var(--c-text-muted);
		margin: var(--spacing-xs) 0 0;
	}

	&__text {
		font-size: var(--fs-md);
		color: var(--c-text);
		margin: 0;
		line-height: var(--lh-relaxed);
	}

	&__map {
		min-height: 400px;
		border-radius: var(--radius-md);
		overflow: hidden;
		border: 1px solid var(--c-border-light);

		@media (max-width: $breakpoint-tablet) {
			min-height: 300px;
		}
	}

	&__map-placeholder {
		width: 100%;
		height: 100%;
		min-height: 400px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-md);
		background: var(--c-beige-100);
		color: var(--c-text-muted);

		@media (max-width: $breakpoint-tablet) {
			min-height: 300px;
		}
	}

	&__map-text {
		font-size: var(--fs-base);
		color: var(--c-text-muted);
		margin: 0;
	}
}
</style>
