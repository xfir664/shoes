<!--
  StoreMap — блок с контактной информацией и картой магазина.
-->
<template>
	<section class="map-section">
		<div class="map-section__container">
			<h2 class="map-section__title section-title">Наш магазин</h2>
			<div class="map-section__content">
				<div class="map-section__info">
					<div class="map-section__info-item">
						<span class="mdi mdi-map-marker" />
						<p>г. Москва, ул. Тверская, д. 15</p>
					</div>
					<div class="map-section__info-item">
						<span class="mdi mdi-clock-outline" />
						<p>Ежедневно с 10:00 до 22:00</p>
					</div>
					<div class="map-section__info-item">
						<span class="mdi mdi-phone" />
						<p>+7 (495) 123-45-67</p>
					</div>
					<div class="map-section__info-item">
						<span class="mdi mdi-email-outline" />
						<p>info@shoestore.ru</p>
					</div>
				</div>
				<div class="map-section__map">
					<iframe
						src="https://yandex.ru/map-widget/v1/?ll=37.608879%2C55.762592&z=16&pt=37.608879%2C55.762592%2Cpm2rdm"
						width="100%"
						height="400"
						frameborder="0"
						allowfullscreen
						loading="lazy"
						title="Расположение магазина на карте"
					/>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
@use "@/assets/styles/var.scss" as *;

.section-title {
	font-family: var(--font-accent);
	font-size: var(--fs-3xl);
	font-weight: var(--fw-bold);
	text-transform: uppercase;
	text-align: center;
	color: var(--c-text);
	margin-bottom: var(--spacing-2xl);
	position: relative;
	padding-bottom: var(--spacing-md);

	&::after {
		content: "";
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 64px;
		height: 3px;
		background: var(--c-primary);
		border-radius: var(--radius-full);
	}
}

.map-section {
	padding: var(--spacing-3xl) var(--spacing-lg);
	background: var(--c-surface);

	&__container {
		max-width: var(--container-max);
		margin: 0 auto;
	}

	&__content {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--spacing-xl);

		@media (min-width: $breakpoint-tablet) {
			grid-template-columns: 1fr 2fr;
			align-items: start;
		}
	}

	&__info {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	&__info-item {
		display: flex;
		align-items: flex-start;
		gap: var(--spacing-md);

		.mdi {
			font-size: 24px;
			color: var(--c-primary);
			flex-shrink: 0;
			margin-top: 2px;
		}

		p {
			font-family: var(--font-base);
			font-size: var(--fs-base);
			color: var(--c-text);
			line-height: var(--lh-normal);
			margin: 0;
		}
	}

	&__map {
		border-radius: var(--radius-lg);
		overflow: hidden;
		border: 1px solid var(--c-border-light);

		iframe {
			display: block;
		}
	}
}
</style>
