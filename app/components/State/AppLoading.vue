<!--
  AppLoading — индикатор загрузки с тремя вариантами отображения.

  Использование:
    <AppLoading />
    <AppLoading variant="skeleton" />
    <AppLoading variant="dots" />
    <AppLoading variant="spinner" size="48" />

  Props:
    variant — "spinner" (по умолчанию), "skeleton", "dots"
    size    — размер spinner/dots в px (по умолчанию 32)
-->
<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		variant?: "spinner" | "skeleton" | "dots";
		size?: number;
	}>(),
	{
		variant: "spinner",
		size: 32,
	},
);

const sizeStyle = computed(() => ({
	width: `${props.size}px`,
	height: `${props.size}px`,
}));
</script>

<template>
	<div class="loading" role="status" aria-label="Загрузка">
		<!-- Spinner -->
		<div v-if="variant === 'spinner'" class="loading__spinner" :style="sizeStyle" />

		<!-- Skeleton -->
		<div v-else-if="variant === 'skeleton'" class="loading__skeleton">
			<div class="loading__skeleton-line loading__skeleton-line--long" />
			<div class="loading__skeleton-line loading__skeleton-line--medium" />
			<div class="loading__skeleton-line loading__skeleton-line--short" />
		</div>

		<!-- Dots -->
		<div v-else-if="variant === 'dots'" class="loading__dots">
			<span class="loading__dot" />
			<span class="loading__dot" />
			<span class="loading__dot" />
		</div>

		<span class="visually-hidden">Загрузка...</span>
	</div>
</template>

<style scoped lang="scss">
.loading {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: var(--spacing-lg);

	&__spinner {
		border: 3px solid var(--c-neutral-200);
		border-top-color: var(--c-info);
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	&__skeleton {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		width: 100%;

		&-line {
			height: 16px;
			border-radius: var(--radius-sm);
			background: linear-gradient(
				90deg,
				var(--c-neutral-200) 25%,
				var(--c-neutral-100) 50%,
				var(--c-neutral-200) 75%
			);
			background-size: 200% 100%;
			animation: shimmer 1.5s ease-in-out infinite;

			&--long {
				width: 100%;
			}

			&--medium {
				width: 75%;
			}

			&--short {
				width: 50%;
			}
		}
	}

	&__dots {
		display: flex;
		gap: var(--spacing-xs);
	}

	&__dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: var(--c-info);
		animation: dotPulse 1.2s ease-in-out infinite;

		&:nth-child(2) {
			animation-delay: 0.2s;
		}

		&:nth-child(3) {
			animation-delay: 0.4s;
		}
	}
}

@keyframes shimmer {
	0% {
		background-position: 200% 0;
	}
	100% {
		background-position: -200% 0;
	}
}

@keyframes dotPulse {
	0%,
	80%,
	100% {
		opacity: 0.3;
		transform: scale(0.8);
	}
	40% {
		opacity: 1;
		transform: scale(1);
	}
}
</style>
