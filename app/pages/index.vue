<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";
import type { ProductsResponse, FilterOptions } from "~/types/product";
import { mockPromos } from "~/utils/mockProducts";

useSeoMeta({
	title: "ShoeStore — Обувь с характером",
	description:
		"Премиальная обувь на каждый день. Кроссовки, ботинки, лоферы и другая обувь с доставкой по всей России.",
	ogImage: "/img/main.jpg",
});

/** Загрузка категорий с сервера */
const { data: filterOptions } = useFetch<FilterOptions>("/api/products/filters");

/** Загрузка товаров для секции «Популярные» (первые 12) */
const { data: popularData } = useFetch<ProductsResponse>("/api/products", {
	query: { perPage: 12 },
});

const popularProducts = computed(() => popularData.value?.items ?? []);
const categories = computed(() => filterOptions.value?.categories ?? []);

const promos = mockPromos.slice(0, 3);
const swiperModules = [Pagination, Autoplay];

/** Иконки для категорий */
function getCategoryIcon(cat: string): string {
	const lower = cat.toLowerCase();
	if (lower.includes("кроссовк")) return "mdi-shoe-sneaker";
	if (lower.includes("ботин") || lower.includes("ботиль")) return "mdi-shoe-print";
	if (lower.includes("сапог") || lower.includes("полусапог")) return "mdi-shoe-print";
	if (lower.includes("сандал") || lower.includes("босоно")) return "mdi-shoe-ballet";
	if (lower.includes("туфл") || lower.includes("оксфорд")) return "mdi-shoe-formal";
	if (lower.includes("кед")) return "mdi-shoe-formal";
	if (lower.includes("лофер") || lower.includes("мокасин")) return "mdi-shoe-cleat";
	if (lower.includes("сабо")) return "mdi-shoe-heel";
	if (lower.includes("угг")) return "mdi-shoe-print";
	if (lower.includes("полубот")) return "mdi-shoe-print";
	return "mdi-shoe-sneaker";
}
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
						:key="cat"
						:to="`/catalog?category=${encodeURIComponent(cat)}`"
						class="categories__item"
					>
						<span class="categories__icon mdi" :class="getCategoryIcon(cat)" />
						<span class="categories__label">{{ cat }}</span>
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

		<!-- Акции — Swiper -->
		<section class="promos">
			<div class="promos__container">
				<h2 class="section-title">Акции и предложения</h2>
				<ClientOnly>
					<Swiper
						:modules="swiperModules"
						:slides-per-view="1"
						:space-between="16"
						:pagination="{ clickable: true }"
						:autoplay="{ delay: 4000, disableOnInteraction: false }"
						:breakpoints="{
							768: { slidesPerView: 2, spaceBetween: 20 },
							1440: { slidesPerView: 3, spaceBetween: 24 },
						}"
						class="promos__swiper"
					>
						<SwiperSlide v-for="promo in promos" :key="promo.id">
							<div class="promos__card">
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
						</SwiperSlide>
					</Swiper>
				</ClientOnly>
				<div class="promos__footer">
					<NuxtLink to="/promos" class="promos__all-btn">
						Все акции
						<span class="mdi mdi-arrow-right" />
					</NuxtLink>
				</div>
			</div>
		</section>

		<!-- Популярные товары — Swiper -->
		<section class="popular">
			<div class="popular__container">
				<h2 class="section-title">Популярные товары</h2>
				<ClientOnly>
					<Swiper
						:modules="swiperModules"
						:slides-per-view="1"
						:space-between="16"
						:pagination="{ clickable: true }"
						:breakpoints="{
							480: { slidesPerView: 2, spaceBetween: 16 },
							768: { slidesPerView: 3, spaceBetween: 20 },
							1440: { slidesPerView: 4, spaceBetween: 24 },
						}"
						class="popular__swiper"
					>
						<SwiperSlide v-for="product in popularProducts" :key="product.id">
							<ProductCard :product="product" />
						</SwiperSlide>
					</Swiper>
				</ClientOnly>
			</div>
		</section>

		<!-- Карта -->
		<StoreMap />
	</div>
</template>

<style lang="scss">
// Swiper pagination — стиль сайта
.home {
	.swiper-pagination-bullet {
		width: 10px;
		height: 10px;
		background: var(--c-neutral-400);
		opacity: 1;
		transition: all 0.2s ease;

		&-active {
			background: var(--c-primary);
			width: 24px;
			border-radius: 5px;
		}
	}
}
</style>

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
	background: url("/img/main.jpg") center / cover no-repeat;
	overflow: hidden;

	@media (min-width: $breakpoint-tablet) {
		min-height: 620px;
	}

	&__overlay {
		position: absolute;
		inset: 0;
		background: rgba(26, 26, 26, 0.75);
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
		color: rgba(255, 255, 255, 0.8);
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

	&__swiper {
		padding-bottom: var(--spacing-xl);
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
			rgba(26, 26, 26, 0.92) 0%,
			rgba(26, 26, 26, 0.5) 50%,
			rgba(26, 26, 26, 0.25) 100%
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
		color: rgba(255, 255, 255, 0.75);
		line-height: var(--lh-normal);
	}

	&__footer {
		text-align: center;
		margin-top: var(--spacing-md);
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

	&__swiper {
		padding-bottom: var(--spacing-xl);
	}
}
</style>
