<script setup lang="ts">
import type { Product, ProductsResponse } from "~/types/product";
import { formatPrice } from "~/utils/mockProducts";

const route = useRoute();
const article = route.params.article as string;

/** Загрузка товара */
const { data: product, error } = await useFetch<Product>(`/api/products/${article}`);

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
			<!-- Левая колонка — картинка -->
			<div class="product-main__gallery">
				<div class="product-main__image-wrapper">
					<img
						:src="product.image"
						:alt="product.name"
						class="product-main__image"
					/>
				</div>
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
				<table class="product-main__specs">
					<tbody>
						<tr>
							<td>Категория</td>
							<td>{{ product.category }}</td>
						</tr>
						<tr v-if="product.gender">
							<td>Пол</td>
							<td>{{ product.gender }}</td>
						</tr>
						<tr>
							<td>Цвет</td>
							<td>{{ product.color }}</td>
						</tr>
					</tbody>
				</table>

				<!-- Размеры -->
				<div v-if="product.sizes.length" class="product-main__sizes">
					<h3 class="product-main__sizes-title">Размеры</h3>
					<div class="product-main__sizes-grid">
						<span
							v-for="s in product.sizes"
							:key="s.size"
							class="product-main__size"
							:class="{ 'product-main__size--out': s.count === 0 }"
						>
							{{ s.size }}
							<small v-if="s.count > 0">({{ s.count }})</small>
						</span>
					</div>
				</div>
			</div>
		</section>

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
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-2xl);
	}

	&__image-wrapper {
		aspect-ratio: 1 / 1;
		border-radius: var(--radius-lg);
		overflow: hidden;
		background: var(--c-beige-100);
	}

	&__image {
		width: 100%;
		height: 100%;
		object-fit: cover;
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
		width: 100%;
		border-collapse: collapse;
		margin-bottom: var(--spacing-lg);

		td {
			padding: var(--spacing-sm) 0;
			border-bottom: 1px solid var(--c-border-light);
			font-size: var(--fs-sm);

			&:first-child {
				color: var(--c-text-muted);
				padding-right: var(--spacing-md);
				width: 40%;
			}

			&:last-child {
				font-weight: var(--fw-medium);
			}
		}
	}

	&__sizes {
		margin-top: var(--spacing-md);
	}

	&__sizes-title {
		font-size: var(--fs-sm);
		font-weight: var(--fw-semibold);
		color: var(--c-text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0 0 var(--spacing-sm);
	}

	&__sizes-grid {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-xs);
	}

	&__size {
		display: inline-flex;
		align-items: center;
		gap: 2px;
		padding: var(--spacing-xs) var(--spacing-sm);
		border: 1px solid var(--c-border);
		border-radius: var(--radius-md);
		font-size: var(--fs-sm);
		color: var(--c-text);

		small {
			font-size: var(--fs-xs);
			color: var(--c-text-muted);
		}

		&--out {
			opacity: 0.4;
			text-decoration: line-through;
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
