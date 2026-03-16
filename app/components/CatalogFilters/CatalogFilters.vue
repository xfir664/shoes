<!--
  CatalogFilters — боковая панель фильтров каталога.
-->
<script setup lang="ts">
import { categoryLabels, seasonLabels, genderLabels } from "~/utils/mockProducts";

const props = defineProps<{
	isInStockOnly: boolean;
	selectedCategories: string[];
	selectedGenders: string[];
	selectedSeasons: string[];
	priceFrom: string;
	priceTo: string;
}>();

const emit = defineEmits<{
	"update:isInStockOnly": [value: boolean];
	"toggle-category": [value: string];
	"toggle-gender": [value: string];
	"toggle-season": [value: string];
	"update:priceFrom": [value: string];
	"update:priceTo": [value: string];
	reset: [];
}>();
</script>

<template>
	<div class="filters">
		<!-- Наличие -->
		<div class="filters__group">
			<h3 class="filters__heading">Наличие</h3>
			<label class="filters__label">
				<MyCheckboxInput
					variant="primary"
					:checked="isInStockOnly"
					@change="emit('update:isInStockOnly', $event)"
				/>
				<span>Только в наличии</span>
			</label>
		</div>

		<!-- Категория -->
		<div class="filters__group">
			<h3 class="filters__heading">Категория</h3>
			<label
				v-for="(label, key) in categoryLabels"
				:key="key"
				class="filters__label"
			>
				<MyCheckboxInput
					variant="primary"
					:checked="selectedCategories.includes(key)"
					@change="emit('toggle-category', key)"
				/>
				<span>{{ label }}</span>
			</label>
		</div>

		<!-- Пол -->
		<div class="filters__group">
			<h3 class="filters__heading">Пол</h3>
			<label
				v-for="(label, key) in genderLabels"
				:key="key"
				class="filters__label"
			>
				<MyCheckboxInput
					variant="primary"
					:checked="selectedGenders.includes(key)"
					@change="emit('toggle-gender', key)"
				/>
				<span>{{ label }}</span>
			</label>
		</div>

		<!-- Сезон -->
		<div class="filters__group">
			<h3 class="filters__heading">Сезон</h3>
			<label
				v-for="(label, key) in seasonLabels"
				:key="key"
				class="filters__label"
			>
				<MyCheckboxInput
					variant="primary"
					:checked="selectedSeasons.includes(key)"
					@change="emit('toggle-season', key)"
				/>
				<span>{{ label }}</span>
			</label>
		</div>

		<!-- Цена -->
		<div class="filters__group">
			<h3 class="filters__heading">Цена</h3>
			<div class="filters__price-range">
				<input
					:value="priceFrom"
					type="number"
					class="filters__price-input"
					placeholder="от"
					min="0"
					@input="emit('update:priceFrom', ($event.target as HTMLInputElement).value)"
				/>
				<span class="filters__price-separator">—</span>
				<input
					:value="priceTo"
					type="number"
					class="filters__price-input"
					placeholder="до"
					min="0"
					@input="emit('update:priceTo', ($event.target as HTMLInputElement).value)"
				/>
			</div>
		</div>

		<!-- Сброс -->
		<button class="filters__reset-btn" type="button" @click="emit('reset')">
			Сбросить фильтры
		</button>
	</div>
</template>

<style scoped lang="scss">
.filters {
	&__group {
		margin-bottom: var(--spacing-lg);
		padding-bottom: var(--spacing-lg);
		border-bottom: 1px solid var(--c-border-light);
	}

	&__heading {
		font-size: var(--fs-sm);
		font-weight: var(--fw-semibold);
		color: var(--c-text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0 0 var(--spacing-sm);
	}

	&__label {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-xs) 0;
		cursor: pointer;
		font-size: var(--fs-sm);
		color: var(--c-text);
		transition: var(--transition-base);

		&:hover {
			color: var(--c-primary);
		}
	}

	&__price-range {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}

	&__price-input {
		width: 100%;
		padding: var(--spacing-sm);
		border: 1px solid var(--c-border);
		border-radius: var(--radius-md);
		background: var(--c-input-bg);
		font-family: var(--font-base);
		font-size: var(--fs-sm);
		color: var(--c-text);
		transition: var(--transition-base);
		appearance: textfield;

		&::-webkit-inner-spin-button,
		&::-webkit-outer-spin-button {
			appearance: none;
			margin: 0;
		}

		&:focus {
			outline: none;
			border-color: var(--c-primary);
			box-shadow: 0 0 0 3px var(--c-focus-ring);
		}

		&::placeholder {
			color: var(--c-text-muted);
		}
	}

	&__price-separator {
		color: var(--c-text-muted);
		flex-shrink: 0;
	}

	&__reset-btn {
		width: 100%;
		padding: var(--spacing-sm) var(--spacing-md);
		background: transparent;
		border: 1px solid var(--c-border);
		border-radius: var(--radius-md);
		cursor: pointer;
		font-family: var(--font-base);
		font-size: var(--fs-sm);
		color: var(--c-text-secondary);
		transition: var(--transition-base);

		&:hover {
			border-color: var(--c-error);
			color: var(--c-error);
		}
	}
}
</style>
