<script setup lang="ts">
import type { Product, ProductsResponse } from "~/types/product";
import { formatPrice } from "~/utils/mockProducts";

const route = useRoute();
const article = route.params.article as string;
const cartStore = useCartStore();

/** Загрузка товара */
const { data: product, error } = await useFetch<Product>(`/api/products/${article}`);

/** Временное описание (в json нет) — статичная заглушка с подстановкой имени. */
const DESCRIPTION_LOREM =
	"Эта модель сочетает современный стиль и продуманный комфорт для повседневной носки. " +
	"Верх выполнен из качественных материалов, устойчивых к износу, а анатомическая стелька " +
	"поддерживает стопу в течение всего дня. Подошва из амортизирующего компаунда обеспечивает " +
	"уверенное сцепление на разных поверхностях — от городского асфальта до гладких полов торговых центров. " +
	"Продуманная посадка, аккуратные швы и узнаваемый силуэт делают эту пару универсальной: " +
	"она одинаково хорошо сочетается с джинсами, классическими брюками и спортивной одеждой. " +
	"Товар поставляется в фирменной коробке, подходит для подарка.";

const description = computed(() => {
	if (!product.value) return "";
	return `${product.value.name} — ${product.value.category.toLowerCase()} для тех, кто ценит качество и детали. ${DESCRIPTION_LOREM}`;
});

const isDescriptionExpanded = ref(false);

function toggleDescription() {
	isDescriptionExpanded.value = !isDescriptionExpanded.value;
}

/** Выбор размера и добавление в корзину */
const selectedSize = ref<string | null>(null);
const sizeWarning = ref(false);

/** Лайтбокс */
const lightboxOpen = ref(false);
const lightboxStart = ref(0);

function handleAddToCart() {
	if (!product.value) return;
	if (!selectedSize.value) {
		sizeWarning.value = true;
		return;
	}
	cartStore.addItem(product.value, selectedSize.value);
}

function openLightbox(index: number) {
	lightboxStart.value = index;
	lightboxOpen.value = true;
}

watch(selectedSize, (v) => {
	if (v) sizeWarning.value = false;
});

/** Похожие товары (та же категория) */
const similarQuery = computed(() => ({
	category: product.value?.category ?? "",
	perPage: 8,
}));

const { data: similarData } = useFetch<ProductsResponse>("/api/products", {
	query: similarQuery,
});

const similarProducts = computed(() =>
	(similarData.value?.items ?? []).filter((p) => p.article !== article).slice(0, 8),
);

/** Хлебные крошки */
const breadcrumbs = computed(() => [
	{ label: "Главная", to: "/" },
	{ label: "Каталог", to: "/catalog" },
	{ label: product.value?.name ?? "Товар", current: true },
]);

/** SEO */
if (product.value) {
	useSeoMeta({
		title: `${product.value.name} — купить в интернет-магазине`,
		description: `${product.value.name} — ${product.value.category}. Цена: ${formatPrice(product.value.price)}`,
		ogTitle: `${product.value.name} — ShoeStore`,
		ogDescription: `${product.value.category} — ${formatPrice(product.value.price)}`,
		ogImage: product.value.image,
	});
}
</script>

<template>
	<div v-if="error || !product" class="product-error">
		<div class="product-error__content">
			<span class="product-error__icon mdi mdi-shoe-sneaker" />
			<h1 class="product-error__title">Товар не найден</h1>
			<p class="product-error__text">
				К сожалению, такого товара не существует или он был удалён.
			</p>
			<NuxtLink to="/catalog" class="product-error__link">
				<span class="mdi mdi-arrow-left" />
				Вернуться в каталог
			</NuxtLink>
		</div>
	</div>

	<div v-else class="product-page">
		<!-- Хлебные крошки -->
		<MyBreadcrumbs :items="breadcrumbs" />

		<!-- Основной блок товара -->
		<section class="product-page__main product-main">
			<!-- Левая колонка — галерея -->
			<div class="product-main__gallery">
				<ProductGallery
					:images="product.images"
					:name="product.name"
					@open="openLightbox"
				/>
			</div>

			<!-- Правая колонка — информация -->
			<div class="product-main__info">
				<h1 class="product-main__name">{{ product.name }}</h1>

				<div class="product-main__meta">
					<span class="product-main__article">Артикул: {{ product.article }}</span>
				</div>

				<div class="product-main__price">
					{{ formatPrice(product.price) }}
				</div>

				<!-- Характеристики -->
				<div class="product-main__specs specs">
					<h3 class="specs__title">Характеристики</h3>
					<ul class="specs__list">
						<li class="specs__item">
							<span class="specs__icon mdi mdi-tag-outline" />
							<span class="specs__label">Категория</span>
							<span class="specs__value">{{ product.category }}</span>
						</li>
						<li v-if="product.gender" class="specs__item">
							<span class="specs__icon mdi mdi-human-male-female" />
							<span class="specs__label">Пол</span>
							<span class="specs__value">{{ product.gender }}</span>
						</li>
						<li class="specs__item">
							<span class="specs__icon mdi mdi-palette-outline" />
							<span class="specs__label">Цвет</span>
							<span class="specs__value">{{ product.color }}</span>
						</li>
						<li class="specs__item">
							<span class="specs__icon mdi mdi-barcode" />
							<span class="specs__label">Артикул</span>
							<span class="specs__value">{{ product.article }}</span>
						</li>
						<li class="specs__item">
							<span class="specs__icon mdi mdi-truck-fast-outline" />
							<span class="specs__label">
								Доставка
								<span
									class="specs__hint"
									tabindex="0"
									aria-label="Информация о сроках доставки"
								>
									<span class="mdi mdi-information-outline" />
									<span class="specs__tooltip" role="tooltip">
										Указанный срок является ориентировочным и может изменяться
										в зависимости от региона доставки, загруженности службы
										логистики и наличия товара на складе. Точный срок будет
										подтверждён менеджером после оформления заказа.
									</span>
								</span>
							</span>
							<span class="specs__value">2–5 дней</span>
						</li>
						<li class="specs__item">
							<span class="specs__icon mdi mdi-shield-check-outline" />
							<span class="specs__label">Гарантия</span>
							<span class="specs__value">30 дней на возврат</span>
						</li>
					</ul>
				</div>

				<!-- Описание -->
				<div class="product-main__description description">
					<h3 class="description__title">Описание</h3>
					<div
						class="description__text"
						:class="{ 'description__text--expanded': isDescriptionExpanded }"
					>
						{{ description }}
					</div>
					<button
						type="button"
						class="description__toggle"
						@click="toggleDescription"
					>
						{{ isDescriptionExpanded ? "Свернуть" : "Показать больше" }}
						<span
							class="mdi"
							:class="
								isDescriptionExpanded
									? 'mdi-chevron-up'
									: 'mdi-chevron-down'
							"
						/>
					</button>
				</div>

				<!-- Размеры -->
				<div v-if="product.sizes.length" class="product-main__sizes-block">
					<ProductSizes
						v-model="selectedSize"
						:sizes="product.sizes"
						:show-warning="sizeWarning"
					/>
				</div>

				<!-- Добавить в корзину -->
				<MyBtn
					type="button"
					variant="primary"
					class-name="product-main__add-to-cart"
					@click="handleAddToCart"
				>
					<span class="mdi mdi-cart-plus" />
					Добавить в корзину
				</MyBtn>
			</div>
		</section>

		<!-- Лайтбокс -->
		<ProductLightbox
			v-model:open="lightboxOpen"
			:images="product.images"
			:name="product.name"
			:start-index="lightboxStart"
		/>

		<!-- Похожие товары -->
		<section v-if="similarProducts.length" class="product-page__similar similar">
			<h2 class="similar__title">Похожие товары</h2>
			<div class="similar__grid">
				<ProductCard
					v-for="item in similarProducts"
					:key="item.id"
					:product="item"
				/>
			</div>
		</section>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/var.scss" as *;

// Ошибка — товар не найден
.product-error {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 60vh;
	padding: var(--spacing-xl);

	&__content {
		text-align: center;
		max-width: 400px;
	}

	&__icon {
		font-size: 64px;
		color: var(--c-neutral-400);
		display: block;
		margin-bottom: var(--spacing-lg);
	}

	&__title {
		font-size: var(--fs-2xl);
		font-weight: var(--fw-bold);
		margin-bottom: var(--spacing-sm);
	}

	&__text {
		color: var(--c-text-secondary);
		margin-bottom: var(--spacing-lg);
	}

	&__link {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xs);
		color: var(--c-primary);
		font-weight: var(--fw-medium);
		text-decoration: none;
		transition: var(--transition-base);

		&:hover {
			color: var(--c-primary-hover);
		}
	}
}

// Страница товара
.product-page {
	max-width: var(--container-max);
	margin: 0 auto;
	padding: var(--spacing-lg) var(--spacing-md);

	&__similar {
		margin-top: var(--spacing-3xl);
	}
}

// Основной блок
.product-main {
	display: grid;
	grid-template-columns: 1fr;
	gap: var(--spacing-xl);
	margin-bottom: var(--spacing-3xl);

	@media (min-width: $breakpoint-tablet) {
		grid-template-columns: minmax(0, 420px) minmax(0, 1fr);
		gap: var(--spacing-2xl);
		align-items: start;
	}

	&__gallery {
		max-width: 420px;
		width: 100%;
	}

	&__name {
		font-family: var(--font-accent);
		font-size: var(--fs-2xl);
		font-weight: var(--fw-bold);
		margin: 0 0 var(--spacing-sm);
		color: var(--c-text);
	}

	&__meta {
		margin-bottom: var(--spacing-md);
	}

	&__article {
		font-size: var(--fs-sm);
		color: var(--c-text-muted);
	}

	&__price {
		font-family: var(--font-accent);
		font-size: var(--fs-3xl);
		font-weight: var(--fw-bold);
		color: var(--c-text);
		margin-bottom: var(--spacing-lg);
	}

	&__specs {
		margin-bottom: var(--spacing-lg);
	}

	&__description {
		margin-bottom: var(--spacing-lg);
	}

	&__sizes-block {
		margin-top: var(--spacing-md);
		margin-bottom: var(--spacing-lg);
	}

	&__add-to-cart {
		margin-top: var(--spacing-md);
		width: 100%;
	}
}

// Характеристики — карточка со списком
.specs {
	background: var(--c-surface);
	border: 1px solid var(--c-border-light);
	border-radius: var(--radius-lg);
	padding: var(--spacing-lg);

	&__title {
		font-size: var(--fs-sm);
		font-weight: var(--fw-semibold);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--c-text-secondary);
		margin: 0 0 var(--spacing-md);
	}

	&__list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--spacing-xs);

		@media (min-width: $breakpoint-tablet) {
			grid-template-columns: 1fr 1fr;
			gap: var(--spacing-xs) var(--spacing-lg);
		}
	}

	&__item {
		display: grid;
		grid-template-columns: 20px 1fr auto;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-sm) 0;
		border-bottom: 1px solid var(--c-border-light);
		font-size: var(--fs-sm);

		&:last-child,
		&:nth-last-child(2):nth-child(odd) {
			border-bottom: none;
		}
	}

	&__icon {
		font-size: 18px;
		color: var(--c-primary);
		line-height: 1;
	}

	&__label {
		color: var(--c-text-muted);
		display: inline-flex;
		align-items: center;
		gap: 4px;
	}

	&__value {
		color: var(--c-text);
		font-weight: var(--fw-medium);
		text-align: right;

		// Автоматически капитализируем первую букву (JSON может прийти в любом регистре)
		&::first-letter {
			text-transform: uppercase;
		}
	}

	// Иконка-тултип рядом с лейблом
	&__hint {
		position: relative;
		display: inline-flex;
		align-items: center;
		color: var(--c-text-muted);
		cursor: help;
		outline: none;

		.mdi {
			font-size: 16px;
			transition: color 0.2s ease;
		}

		&:hover .mdi,
		&:focus .mdi {
			color: var(--c-primary);
		}

		&:hover .specs__tooltip,
		&:focus .specs__tooltip {
			opacity: 1;
			visibility: visible;
			transform: translate(-50%, 0);
		}
	}

	&__tooltip {
		position: absolute;
		bottom: calc(100% + 8px);
		left: 50%;
		transform: translate(-50%, 6px);
		min-width: 260px;
		max-width: 300px;
		padding: var(--spacing-sm) var(--spacing-md);
		background: var(--c-surface);
		border: 1px solid var(--c-border-light);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-lg);
		color: var(--c-text);
		font-size: var(--fs-xs);
		font-weight: var(--fw-regular);
		line-height: 1.5;
		text-align: left;
		text-transform: none;
		letter-spacing: normal;
		opacity: 0;
		visibility: hidden;
		transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
		pointer-events: none;
		z-index: 20;

		&::after {
			content: "";
			position: absolute;
			top: 100%;
			left: 50%;
			transform: translateX(-50%);
			border: 6px solid transparent;
			border-top-color: var(--c-surface);
		}
	}
}

// Описание с показать больше/меньше
.description {
	&__title {
		font-size: var(--fs-sm);
		font-weight: var(--fw-semibold);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--c-text-secondary);
		margin: 0 0 var(--spacing-sm);
	}

	&__text {
		position: relative;
		font-size: var(--fs-sm);
		line-height: 1.6;
		color: var(--c-text);
		max-height: 4.8em;
		overflow: hidden;
		transition: max-height 0.35s ease;

		&::after {
			content: "";
			position: absolute;
			inset: auto 0 0 0;
			height: 2em;
			background: linear-gradient(
				to bottom,
				transparent,
				var(--c-page-bg) 90%
			);
			pointer-events: none;
			transition: opacity 0.25s ease;
		}

		&--expanded {
			max-height: 80em;

			&::after {
				opacity: 0;
			}
		}
	}

	&__toggle {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		margin-top: var(--spacing-xs);
		background: none;
		border: none;
		padding: var(--spacing-xs) 0;
		color: var(--c-primary);
		font-size: var(--fs-sm);
		font-weight: var(--fw-semibold);
		cursor: pointer;
		transition: color 0.2s ease;

		&:hover {
			color: var(--c-primary-hover);
		}

		.mdi {
			font-size: 18px;
		}
	}
}

// Похожие товары
.similar {
	margin-bottom: var(--spacing-2xl);

	&__title {
		font-size: var(--fs-xl);
		font-weight: var(--fw-bold);
		margin-bottom: var(--spacing-lg);
	}

	&__grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--spacing-md);

		@media (min-width: $breakpoint-tablet) {
			grid-template-columns: repeat(3, 1fr);
			gap: var(--spacing-lg);
		}

		@media (min-width: $breakpoint-desktop) {
			grid-template-columns: repeat(4, 1fr);
			gap: var(--spacing-xl);
		}
	}
}
</style>
