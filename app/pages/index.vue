<script setup lang="ts">
import {
	mockProducts,
	mockPromos,
	categoryLabels,
	formatPrice,
	getDiscount,
} from "~/utils/mockProducts";

useSeoMeta({
	title: "ShoeStore — Обувь с характером",
	description:
		"Премиальная обувь на каждый день. Кроссовки, ботинки, лоферы и другая обувь с доставкой по всей России.",
});

const categories = [
	{ key: "sneakers", icon: "mdi-shoe-sneaker" },
	{ key: "trainers", icon: "mdi-shoe-formal" },
	{ key: "boots", icon: "mdi-boot" },
	{ key: "loafers", icon: "mdi-shoe-cleat" },
	{ key: "sandals", icon: "mdi-sandal" },
	{ key: "flats", icon: "mdi-shoe-ballet" },
	{ key: "slippers", icon: "mdi-shoe-print" },
	{ key: "heels", icon: "mdi-shoe-heel" },
];

const promos = mockPromos.slice(0, 3);
const popularProducts = mockProducts.filter(p => p.isPopular);
</script>

<template>
	<div class="home">
		<!-- Hero -->
		<section class="hero">
			<div class="hero__overlay" />
			<div class="hero__content">
				<h1 class="hero__title">Обувь с характером</h1>
				<p class="hero__subtitle">
					Премиальное качество, актуальный стиль и комфорт на каждый день.
					Найдите свою идеальную пару в нашем каталоге.
				</p>
				<NuxtLink to="/catalog" class="hero__cta">
					<span class="mdi mdi-arrow-right" />
					Перейти в каталог
				</NuxtLink>
			</div>
		</section>

		<!-- Категории -->
		<section class="categories">
			<div class="categories__container">
				<h2 class="section-title">Категории</h2>
				<div class="categories__grid">
					<NuxtLink
						v-for="cat in categories"
						:key="cat.key"
						:to="`/catalog?category=${cat.key}`"
						class="categories__item"
					>
						<span class="categories__icon mdi" :class="cat.icon" />
						<span class="categories__label">{{ categoryLabels[cat.key] }}</span>
					</NuxtLink>
				</div>
				<div class="categories__footer">
					<NuxtLink to="/catalog" class="categories__all-link">
						Смотреть весь каталог
						<span class="mdi mdi-arrow-right" />
					</NuxtLink>
				</div>
			</div>
		</section>

		<!-- Акции -->
		<section class="promos">
			<div class="promos__container">
				<h2 class="section-title">Акции и предложения</h2>
				<div class="promos__grid">
					<div v-for="promo in promos" :key="promo.id" class="promos__card">
						<img
							:src="promo.image"
							:alt="promo.title"
							class="promos__card-image"
							loading="lazy"
						/>
						<div class="promos__card-overlay" />
						<div class="promos__card-content">
							<h3 class="promos__card-title">{{ promo.title }}</h3>
							<p class="promos__card-desc">{{ promo.description }}</p>
						</div>
					</div>
				</div>
				<div class="promos__footer">
					<NuxtLink to="/promos" class="promos__all-btn">
						Все акции
						<span class="mdi mdi-arrow-right" />
					</NuxtLink>
				</div>
			</div>
		</section>

		<!-- Популярные товары -->
		<section class="popular">
			<div class="popular__container">
				<h2 class="section-title">Популярные товары</h2>
				<div class="popular__grid">
					<div
						v-for="product in popularProducts"
						:key="product.id"
						class="product-card"
					>
						<NuxtLink :to="`/catalog/${product.slug}`">
							<div class="product-card__image-wrap">
								<img
									:src="product.images[0]"
									:alt="product.name"
									class="product-card__image"
									loading="lazy"
								/>
								<span
									v-if="
										product.oldPrice &&
										getDiscount(product.price, product.oldPrice)
									"
									class="product-card__badge"
								>
									-{{ getDiscount(product.price, product.oldPrice) }}%
								</span>
							</div>
							<div class="product-card__body">
								<h3 class="product-card__name">{{ product.name }}</h3>
								<div class="product-card__prices">
									<span class="product-card__price">{{
										formatPrice(product.price)
									}}</span>
									<span v-if="product.oldPrice" class="product-card__old-price">
										{{ formatPrice(product.oldPrice) }}
									</span>
								</div>
								<div class="product-card__actions">
									<button class="product-card__btn product-card__btn--cart">
										<span class="mdi mdi-cart-outline" />
										В корзину
									</button>
									<NuxtLink
										:to="`/catalog/${product.slug}`"
										class="product-card__btn product-card__btn--details"
									>
										Подробнее
									</NuxtLink>
								</div>
							</div>
						</NuxtLink>
					</div>
				</div>
			</div>
		</section>

		<!-- Карта -->
		<section class="map-section">
			<div class="map-section__container">
				<h2 class="section-title">Наш магазин</h2>
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
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/var.scss" as *;

// ── Section title ───────────────────────────────────────────────────────────
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

// ── Hero ────────────────────────────────────────────────────────────────────
.hero {
	position: relative;
	min-height: 520px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: url("https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1600&h=900&fit=crop")
		center / cover no-repeat;
	overflow: hidden;

	@media (min-width: $breakpoint-tablet) {
		min-height: 620px;
	}

	&__overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			135deg,
			rgba(26, 26, 26, 0.85) 0%,
			rgba(26, 26, 26, 0.6) 50%,
			rgba(26, 26, 26, 0.75) 100%
		);
		z-index: 1;
	}

	&__content {
		position: relative;
		z-index: 2;
		text-align: center;
		max-width: 680px;
		padding: var(--spacing-2xl) var(--spacing-lg);
	}

	&__title {
		font-family: var(--font-accent);
		font-size: var(--fs-4xl);
		font-weight: var(--fw-bold);
		color: var(--c-white);
		text-transform: uppercase;
		letter-spacing: 2px;
		margin-bottom: var(--spacing-md);

		@media (min-width: $breakpoint-tablet) {
			font-size: var(--fs-5xl);
		}
	}

	&__subtitle {
		font-family: var(--font-base);
		font-size: var(--fs-md);
		color: var(--c-beige-300);
		line-height: var(--lh-relaxed);
		margin-bottom: var(--spacing-xl);

		@media (min-width: $breakpoint-tablet) {
			font-size: var(--fs-lg);
		}
	}

	&__cta {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-md) var(--spacing-xl);
		background: var(--c-primary);
		color: var(--c-white);
		font-family: var(--font-accent);
		font-size: var(--fs-md);
		font-weight: var(--fw-semibold);
		text-decoration: none;
		text-transform: uppercase;
		letter-spacing: 1px;
		border-radius: var(--radius-md);
		transition: var(--transition-base);

		&:hover {
			background: var(--c-primary-hover);
			transform: translateY(-2px);
			box-shadow: var(--shadow-lg);
		}
	}
}

// ── Categories ──────────────────────────────────────────────────────────────
.categories {
	padding: var(--spacing-3xl) var(--spacing-lg);
	background: var(--c-page-bg);

	&__container {
		max-width: var(--container-max);
		margin: 0 auto;
	}

	&__grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--spacing-md);

		@media (min-width: $breakpoint-tablet) {
			grid-template-columns: repeat(4, 1fr);
			gap: var(--spacing-lg);
		}
	}

	&__item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-lg) var(--spacing-md);
		background: var(--c-surface);
		border: 1px solid var(--c-border-light);
		border-radius: var(--radius-lg);
		text-decoration: none;
		color: var(--c-text);
		transition: var(--transition-base);

		&:hover {
			border-color: var(--c-primary);
			transform: translateY(-4px);
			box-shadow: var(--shadow-md);

			.categories__icon {
				color: var(--c-primary);
			}
		}
	}

	&__icon {
		font-size: 36px;
		color: var(--c-text-secondary);
		transition: var(--transition-base);
	}

	&__label {
		font-family: var(--font-accent);
		font-size: var(--fs-sm);
		font-weight: var(--fw-semibold);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	&__footer {
		text-align: center;
		margin-top: var(--spacing-xl);
	}

	&__all-link {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xs);
		font-family: var(--font-accent);
		font-size: var(--fs-base);
		font-weight: var(--fw-semibold);
		color: var(--c-primary);
		text-decoration: none;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		transition: var(--transition-base);

		&:hover {
			color: var(--c-primary-hover);
			gap: var(--spacing-sm);
		}
	}
}

// ── Promos ───────────────────────────────────────────────────────────────────
.promos {
	padding: var(--spacing-3xl) var(--spacing-lg);
	background: var(--c-surface);

	&__container {
		max-width: var(--container-max);
		margin: 0 auto;
	}

	&__grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--spacing-lg);

		@media (min-width: $breakpoint-tablet) {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	&__card {
		position: relative;
		border-radius: var(--radius-lg);
		overflow: hidden;
		aspect-ratio: 16 / 9;
		cursor: pointer;
		transition: var(--transition-base);

		&:hover {
			transform: translateY(-4px);
			box-shadow: var(--shadow-lg);

			.promos__card-image {
				transform: scale(1.05);
			}
		}
	}

	&__card-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: var(--transition-slow);
	}

	&__card-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to top,
			rgba(26, 26, 26, 0.85) 0%,
			rgba(26, 26, 26, 0.2) 100%
		);
	}

	&__card-content {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: var(--spacing-lg);
		color: var(--c-white);
	}

	&__card-title {
		font-family: var(--font-accent);
		font-size: var(--fs-lg);
		font-weight: var(--fw-bold);
		margin-bottom: var(--spacing-xs);
	}

	&__card-desc {
		font-size: var(--fs-sm);
		color: var(--c-beige-300);
		line-height: var(--lh-normal);
	}

	&__footer {
		text-align: center;
		margin-top: var(--spacing-xl);
	}

	&__all-btn {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-sm) var(--spacing-xl);
		border: 2px solid var(--c-secondary);
		border-radius: var(--radius-md);
		background: transparent;
		color: var(--c-secondary);
		font-family: var(--font-accent);
		font-size: var(--fs-base);
		font-weight: var(--fw-semibold);
		text-decoration: none;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		transition: var(--transition-base);

		&:hover {
			background: var(--c-secondary);
			color: var(--c-secondary-text);
		}
	}
}

// ── Popular products ────────────────────────────────────────────────────────
.popular {
	padding: var(--spacing-3xl) var(--spacing-lg);
	background: var(--c-page-bg);

	&__container {
		max-width: var(--container-max);
		margin: 0 auto;
	}

	&__grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--spacing-lg);

		@media (min-width: $breakpoint-tablet) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media (min-width: $breakpoint-desktop) {
			grid-template-columns: repeat(4, 1fr);
		}
	}
}

.product-card {
	background: var(--c-surface);
	border-radius: var(--radius-lg);
	overflow: hidden;
	border: 1px solid var(--c-border-light);
	transition: var(--transition-base);

	&:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg);
	}

	&__image-wrap {
		position: relative;
		aspect-ratio: 1;
		overflow: hidden;
		background: var(--c-beige-100);
	}

	&__image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: var(--transition-slow);

		.product-card:hover & {
			transform: scale(1.05);
		}
	}

	&__badge {
		position: absolute;
		top: var(--spacing-sm);
		left: var(--spacing-sm);
		padding: var(--spacing-xs) var(--spacing-sm);
		background: var(--c-error);
		color: var(--c-white);
		font-family: var(--font-accent);
		font-size: var(--fs-xs);
		font-weight: var(--fw-bold);
		border-radius: var(--radius-sm);
	}

	&__body {
		padding: var(--spacing-md);
	}

	&__name {
		font-family: var(--font-accent);
		font-size: var(--fs-base);
		font-weight: var(--fw-semibold);
		color: var(--c-text);
		margin-bottom: var(--spacing-sm);
		line-height: var(--lh-tight);
	}

	&__prices {
		display: flex;
		align-items: baseline;
		gap: var(--spacing-sm);
		margin-bottom: var(--spacing-md);
	}

	&__price {
		font-family: var(--font-accent);
		font-size: var(--fs-lg);
		font-weight: var(--fw-bold);
		color: var(--c-text);
	}

	&__old-price {
		font-size: var(--fs-sm);
		color: var(--c-text-muted);
		text-decoration: line-through;
	}

	&__actions {
		display: flex;
		gap: var(--spacing-sm);
	}

	&__btn {
		flex: 1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-sm) var(--spacing-md);
		font-family: var(--font-accent);
		font-size: var(--fs-xs);
		font-weight: var(--fw-semibold);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		text-decoration: none;
		transition: var(--transition-base);

		&--cart {
			background: var(--c-primary);
			color: var(--c-primary-text);

			&:hover {
				background: var(--c-primary-hover);
			}
		}

		&--details {
			background: var(--c-base-bg);
			color: var(--c-base-text);

			&:hover {
				background: var(--c-base-hover);
			}
		}
	}
}

// ── Map section ─────────────────────────────────────────────────────────────
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
