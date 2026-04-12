<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";
import type { ProductsResponse, FilterOptions } from "~/types/product";
import { mockPromos } from "~/utils/mockProducts";

/** Бесконечная лента категорий — transform + RAF, без Swiper loop. */
const MARQUEE_SPEED = 40;
const DRAG_THRESHOLD = 5;

const trackRef = ref<HTMLElement | null>(null);
let marqueeOffset = 0;
let marqueeHalfWidth = 0;
let rafId = 0;
let lastTimestamp = 0;
/** Указатель нажат (но не обязательно перетаскивается). */
let isPointerDown = false;
/** Реальное перетаскивание (после превышения порога) — тогда блокируем автоскролл. */
let isDragging = false;
let capturedPointerId: number | null = null;
let dragStartX = 0;
let dragStartOffset = 0;
let dragDistance = 0;

function measureMarquee() {
	if (!trackRef.value) return;
	marqueeHalfWidth = trackRef.value.scrollWidth / 2;
}

function normalizeOffset() {
	if (marqueeHalfWidth <= 0) return;
	if (marqueeOffset <= -marqueeHalfWidth) marqueeOffset += marqueeHalfWidth;
	if (marqueeOffset > 0) marqueeOffset -= marqueeHalfWidth;
}

function applyTransform() {
	if (trackRef.value) {
		trackRef.value.style.transform = `translate3d(${marqueeOffset}px, 0, 0)`;
	}
}

function marqueeTick(timestamp: number) {
	// Автоскролл работает, когда не перетаскивают И не удерживают мышь.
	if (!isPointerDown && !isDragging && marqueeHalfWidth > 0) {
		if (!lastTimestamp) lastTimestamp = timestamp;
		const dt = (timestamp - lastTimestamp) / 1000;
		marqueeOffset -= MARQUEE_SPEED * dt;
		normalizeOffset();
		applyTransform();
	}
	lastTimestamp = timestamp;
	rafId = requestAnimationFrame(marqueeTick);
}

function onMarqueeDown(e: PointerEvent) {
	isPointerDown = true;
	isDragging = false;
	dragStartX = e.clientX;
	dragStartOffset = marqueeOffset;
	dragDistance = 0;
	// ВАЖНО: pointer capture НЕ ставим сразу, иначе pointerup уходит
	// с ссылки на контейнер и браузер не генерирует click по NuxtLink.
}

function onMarqueeMove(e: PointerEvent) {
	if (!isPointerDown) return;
	const delta = e.clientX - dragStartX;
	dragDistance = Math.abs(delta);
	// Включаем drag-режим только после превышения порога.
	if (!isDragging && dragDistance > DRAG_THRESHOLD) {
		isDragging = true;
		try {
			(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
			capturedPointerId = e.pointerId;
		} catch {}
	}
	if (isDragging) {
		marqueeOffset = dragStartOffset + delta;
		normalizeOffset();
		applyTransform();
	}
}

function onMarqueeUp(e: PointerEvent) {
	isPointerDown = false;
	if (capturedPointerId !== null) {
		try {
			(e.currentTarget as HTMLElement).releasePointerCapture(capturedPointerId);
		} catch {}
		capturedPointerId = null;
	}
	// isDragging оставляем до следующего pointerdown, чтобы click.capture успел сработать
	requestAnimationFrame(() => {
		isDragging = false;
	});
}

/** Блокировка клика после drag'а (иначе NuxtLink сработает). */
function onMarqueeClickCapture(e: MouseEvent) {
	if (dragDistance > DRAG_THRESHOLD) {
		e.preventDefault();
		e.stopPropagation();
		dragDistance = 0;
	}
}

useSeoMeta({
	title: "ShoeStore — Обувь с характером",
	description:
		"Премиальная обувь на каждый день. Кроссовки, ботинки, лоферы и другая обувь с доставкой по всей России.",
	ogImage: "/img/main.jpg",
});

/** Загрузка категорий с сервера */
const { data: filterOptions } = useFetch<FilterOptions>(
	"/api/products/filters"
);

/** Загрузка товаров для секции «Популярные» (первые 12) */
const { data: popularData } = useFetch<ProductsResponse>("/api/products", {
	query: { perPage: 12 },
});

const popularProducts = computed(() => popularData.value?.items ?? []);
const categories = computed(() => filterOptions.value?.categories ?? []);

/** Удвоенный список для бесшовной ленты. */
const categoriesDoubled = computed(() => [
	...categories.value,
	...categories.value,
]);

const promos = mockPromos.slice(0, 3);
const swiperModules = [Pagination, Autoplay];

onMounted(async () => {
	await nextTick();
	measureMarquee();
	if (typeof window !== "undefined") {
		window.addEventListener("resize", measureMarquee);
	}
	rafId = requestAnimationFrame(marqueeTick);
});

watch(categories, async () => {
	await nextTick();
	measureMarquee();
});

onBeforeUnmount(() => {
	if (rafId) cancelAnimationFrame(rafId);
	if (typeof window !== "undefined") {
		window.removeEventListener("resize", measureMarquee);
	}
});

/** Иконки для категорий */
function getCategoryIcon(cat: string): string {
	const lower = cat.toLowerCase();
	if (lower.includes("кроссовк")) return "mdi-shoe-sneaker";
	if (lower.includes("ботин") || lower.includes("ботиль"))
		return "mdi-shoe-print";
	if (lower.includes("сапог") || lower.includes("полусапог"))
		return "mdi-shoe-print";
	if (lower.includes("сандал") || lower.includes("босоно"))
		return "mdi-shoe-ballet";
	if (lower.includes("туфл") || lower.includes("оксфорд"))
		return "mdi-shoe-formal";
	if (lower.includes("кед")) return "mdi-shoe-formal";
	if (lower.includes("лофер") || lower.includes("мокасин"))
		return "mdi-shoe-cleat";
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
				<div
					v-if="categories.length"
					class="categories__marquee"
					@pointerdown="onMarqueeDown"
					@pointermove="onMarqueeMove"
					@pointerup="onMarqueeUp"
					@pointercancel="onMarqueeUp"
					@click.capture="onMarqueeClickCapture"
				>
					<div ref="trackRef" class="categories__track">
						<NuxtLink
							v-for="(cat, idx) in categoriesDoubled"
							:key="`${cat}-${idx}`"
							:to="`/catalog?category=${encodeURIComponent(cat)}`"
							class="categories__item"
							draggable="false"
						>
							<span
								class="categories__icon mdi"
								:class="getCategoryIcon(cat)"
							/>
							<span class="categories__label">{{ cat }}</span>
						</NuxtLink>
					</div>
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
								<div class="promos__card-media">
									<img
										:src="promo.image"
										:alt="promo.title"
										class="promos__card-image"
										loading="lazy"
									/>
									<div class="promos__card-overlay" />
								</div>
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

	&__marquee {
		width: 100%;
		overflow: hidden;
		padding: var(--spacing-sm) 0;
		cursor: grab;
		touch-action: pan-y;
		user-select: none;

		&:active {
			cursor: grabbing;
		}
	}

	&__track {
		display: flex;
		gap: var(--spacing-md);
		will-change: transform;
		// transform управляется JS (RAF + pointer)
	}

	&__item {
		flex: 0 0 auto;
		width: 180px;
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
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease;

		@media (min-width: $breakpoint-tablet) {
			width: 220px;
		}

		&:hover {
			border-color: var(--c-primary);
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
	// overflow: clip — клиппит слайды за viewport, но НЕ создаёт scroll-контейнер.
	// Padding даёт карточкам воздух для hover-transform и тени,
	// отрицательный margin возвращает swiper в исходные границы контейнера.
	:deep(.swiper) {
		overflow: clip;
		padding: 16px 16px 40px;
		margin: -16px -16px 0;
	}

	:deep(.swiper-slide) {
		height: auto;
	}

	:deep(.swiper-pagination) {
		bottom: 8px;
		z-index: 2;
	}

	padding: var(--spacing-3xl) var(--spacing-lg);
	background: var(--c-surface);

	&__container {
		position: relative;
		max-width: var(--container-max);
		margin: 0 auto;
	}

	&__swiper {
		position: relative;
	}

	&__card {
		position: relative;
		border: 2px solid #d4b76e;
		border-radius: var(--radius-lg);
		aspect-ratio: 16 / 9;
		cursor: pointer;
		transition: var(--transition-base);
		isolation: isolate;

		&::after {
			position: absolute;
			content: "";
			top: 0;
			left: 0;
			width: 100%;
			height: 10%;
			background: #d4b76e;
			border-radius: var(--radius-lg);
		}

		&:hover {
			transform: translate3d(0, -4px, 0);
			box-shadow: var(--shadow-lg);

			.promos__card-image {
				transform: scale(1.05);
			}
		}
	}

	// Обёртка медиа-слоя — клиппит картинку и оверлей по своей форме,
	// не полагаясь на overflow:hidden карточки. Текст (content) лежит
	// снаружи, поверх, и не подвержен hover-scale картинки.
	&__card-media {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		overflow: hidden;
		z-index: 1;
	}

	&__card-image {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: var(--transition-slow);
		z-index: 10;
	}

	&__card-overlay {
		position: absolute;
		inset: 0;
		// ВАЖНО: низ градиента ДОЛЖЕН точно совпадать с фоном секции
		// (var(--c-surface)). Иначе антиалиасинг скруглённых углов карточки
		// «размазывает» разницу цветов и она видна как отдельный скругл-прямоугольник.
		background: linear-gradient(
			to top,
			rgba(26, 26, 26, 1) 0%,
			rgba(26, 26, 26, 0.85) 25%,
			rgba(26, 26, 26, 0.45) 55%,
			rgba(26, 26, 26, 0.15) 100%
		);
	}

	&__card-content {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: var(--spacing-lg);
		color: var(--c-white);
		z-index: 20;
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

	:deep(.swiper) {
		overflow: clip;
		padding: 16px 16px 40px;
		margin: -16px -16px 0;
	}

	:deep(.swiper-slide) {
		height: auto;
	}

	:deep(.swiper-pagination) {
		bottom: 8px;
		z-index: 2;
	}

	&__container {
		position: relative;
		max-width: var(--container-max);
		margin: 0 auto;
	}

	&__swiper {
		position: relative;
	}
}
</style>
