<script setup lang="ts">
import { mockPromos } from "~/utils/mockProducts";

useSeoMeta({
	title: "Акции",
	description: "Актуальные акции и специальные предложения на обувь",
	ogTitle: "Акции — ShoeStore",
});
</script>

<template>
	<div class="promos">
		<h1 class="promos__title">Акции</h1>

		<div class="promos__grid">
			<article
				v-for="promo in mockPromos"
				:key="promo.id"
				class="promos__card"
			>
				<div class="promos__card-image-wrap">
					<img
						:src="promo.image"
						:alt="promo.title"
						class="promos__card-image"
						loading="lazy"
					/>
					<div class="promos__card-overlay">
						<h2 class="promos__card-title">{{ promo.title }}</h2>
					</div>
				</div>
				<div class="promos__card-body">
					<p class="promos__card-desc">{{ promo.description }}</p>
					<MyBtn type="button" variant="primary" class="promos__card-btn">
						Подробнее
					</MyBtn>
				</div>
			</article>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/var.scss" as *;

.promos {
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
		overflow: hidden;
		transition: var(--transition-slow);

		&:hover {
			box-shadow: var(--shadow-lg);
			transform: translateY(-4px);
		}

		&:hover .promos__card-image {
			transform: scale(1.05);
		}
	}

	&__card-image-wrap {
		position: relative;
		overflow: hidden;
		aspect-ratio: 2 / 1;
	}

	&__card-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--duration-slow) ease;
	}

	&__card-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: flex-end;
		padding: var(--spacing-lg);
		background: linear-gradient(
			to top,
			rgba(0, 0, 0, 0.7) 0%,
			rgba(0, 0, 0, 0.1) 60%,
			transparent 100%
		);
	}

	&__card-title {
		font-family: var(--font-accent);
		font-size: var(--fs-xl);
		font-weight: var(--fw-bold);
		color: var(--c-white);
		margin: 0;
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
	}

	&__card-body {
		padding: var(--spacing-lg);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--spacing-md);

		@media (max-width: $breakpoint-tablet) {
			flex-direction: column;
			align-items: stretch;
		}
	}

	&__card-desc {
		font-size: var(--fs-base);
		color: var(--c-text-secondary);
		line-height: var(--lh-relaxed);
		margin: 0;
	}

	&__card-btn {
		flex-shrink: 0;
	}
}
</style>
