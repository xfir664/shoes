<!--
  ProductCard — карточка товара для каталога и главной.
-->
<script setup lang="ts">
import type { Product } from "~/types/product";
import { formatPrice } from "~/utils/mockProducts";

defineProps<{
	product: Product;
	showCategory?: boolean;
}>();
</script>

<template>
	<article class="product-card">
		<NuxtLink
			:to="`/catalog/${product.article}`"
			class="product-card__image-link"
		>
			<img
				:src="product.image"
				:alt="product.name"
				class="product-card__image"
				loading="lazy"
			/>
		</NuxtLink>

		<div class="product-card__body">
			<span v-if="showCategory" class="product-card__category">
				{{ product.category }}
			</span>

			<h3 class="product-card__name">
				<NuxtLink :to="`/catalog/${product.article}`" class="product-card__name-link">
					{{ product.name }}
				</NuxtLink>
			</h3>

			<div class="product-card__meta">
				<span class="product-card__color">{{ product.color }}</span>
				<span class="product-card__article">арт. {{ product.article }}</span>
			</div>

			<div class="product-card__prices">
				<span class="product-card__price">{{ formatPrice(product.price) }}</span>
			</div>

			<div class="product-card__actions">
				<NuxtLink
					:to="`/catalog/${product.article}`"
					class="product-card__detail-link"
				>
					Подробнее
				</NuxtLink>
			</div>
		</div>
	</article>
</template>

<style scoped lang="scss">
.product-card {
	background: var(--c-surface);
	border-radius: var(--radius-lg);
	border: 1px solid var(--c-border-light);
	overflow: hidden;
	// Форсируем composite-слой — иначе Chrome при hover-transform
	// на родителе + scale на ребёнке теряет border-radius-клиппинг.
	isolation: isolate;
	transform: translateZ(0);
	will-change: transform;
	transition: var(--transition-slow);

	&:hover {
		box-shadow: var(--shadow-lg);
		transform: translate3d(0, -2px, 0);
	}

	&__image-link {
		position: relative;
		display: block;
		aspect-ratio: 1 / 1;
		overflow: hidden;
		background: var(--c-beige-100);
		// Скругляем сверху напрямую у контейнера картинки,
		// а не полагаемся на клиппинг через предка — иначе при
		// transform у swiper/карточки Chrome теряет border-radius.
		border-top-left-radius: calc(var(--radius-lg) - 1px);
		border-top-right-radius: calc(var(--radius-lg) - 1px);
	}

	&__image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.4s ease;

		.product-card:hover & {
			transform: scale(1.05);
		}
	}

	&__body {
		padding: var(--spacing-md);
	}

	&__category {
		display: inline-block;
		font-size: var(--fs-xs);
		color: var(--c-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		margin-bottom: var(--spacing-xs);
	}

	&__name {
		margin: 0 0 var(--spacing-sm);
		font-family: var(--font-accent);
		font-size: var(--fs-base);
		font-weight: var(--fw-semibold);
		line-height: var(--lh-tight);
	}

	&__name-link {
		color: var(--c-text);
		text-decoration: none;
		transition: var(--transition-base);

		&:hover {
			color: var(--c-primary);
		}
	}

	&__meta {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		margin-bottom: var(--spacing-sm);
		font-size: var(--fs-xs);
		color: var(--c-text-muted);
	}

	&__article {
		opacity: 0.7;
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

	&__actions {
		display: flex;
		gap: var(--spacing-sm);
	}

	&__detail-link {
		flex: 1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-sm) var(--spacing-md);
		background: var(--c-secondary);
		color: var(--c-secondary-text);
		border-radius: var(--radius-md);
		font-family: var(--font-base);
		font-size: var(--fs-sm);
		font-weight: var(--fw-medium);
		text-decoration: none;
		transition: var(--transition-base);

		&:hover {
			background: var(--c-secondary-hover);
		}
	}
}
</style>
