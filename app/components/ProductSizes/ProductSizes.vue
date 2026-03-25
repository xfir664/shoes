<!--
  ProductSizes — сетка размеров с выбором.
-->
<script setup lang="ts">
import type { ProductSize } from "~/types/product";

defineProps<{
	sizes: ProductSize[];
	modelValue: number | null;
	showWarning?: boolean;
}>();

const emit = defineEmits<{
	"update:modelValue": [value: number];
}>();

function selectSize(size: number) {
	emit("update:modelValue", size);
}
</script>

<template>
	<div class="sizes">
		<span class="sizes__label">Размер:</span>
		<div class="sizes__grid">
			<button
				v-for="s in sizes"
				:key="s.size"
				class="sizes__btn"
				:class="{
					'sizes__btn--active': modelValue === s.size,
					'sizes__btn--unavailable': !s.inStock,
				}"
				:disabled="!s.inStock"
				@click="selectSize(s.size)"
			>
				{{ s.size }}
			</button>
		</div>
		<Transition name="fade">
			<span v-if="showWarning" class="sizes__warning">
				<span class="mdi mdi-alert-circle-outline" />
				Выберите размер
			</span>
		</Transition>
	</div>
</template>

<style scoped lang="scss">
.sizes {
	&__label {
		display: block;
		font-size: var(--fs-sm);
		color: var(--c-text-secondary);
		margin-bottom: var(--spacing-sm);
	}

	&__grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(52px, 1fr));
		gap: var(--spacing-sm);
		margin-bottom: var(--spacing-sm);
	}

	&__btn {
		height: var(--component-height-md);
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--c-border);
		border-radius: var(--radius-sm);
		background: var(--c-base-bg);
		color: var(--c-base-text);
		font-size: var(--fs-sm);
		font-weight: var(--fw-medium);
		cursor: pointer;
		transition: var(--transition-base);
		position: relative;
		overflow: hidden;

		&:hover:not(:disabled):not(&--active) {
			border-color: var(--c-primary);
			background: var(--c-primary-light);
		}

		&--active {
			border-color: var(--c-primary);
			background: var(--c-primary);
			color: var(--c-primary-text);
		}

		&--unavailable {
			color: var(--c-neutral-400);
			background: var(--c-neutral-200);
			border-color: var(--c-neutral-300);
			cursor: not-allowed;

			&::after {
				content: "";
				position: absolute;
				top: 50%;
				left: 50%;
				width: 140%;
				height: 1px;
				background: var(--c-neutral-400);
				transform: translate(-50%, -50%) rotate(-45deg);
			}
		}
	}

	&__warning {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		color: var(--c-error);
		font-size: var(--fs-sm);

		.mdi {
			font-size: var(--fs-md);
		}
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
