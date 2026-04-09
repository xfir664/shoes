<!--
  CatalogFilters — боковая панель фильтров каталога.
  Опции фильтров приходят динамически с сервера.
  Группы раскрываются/сворачиваются. Применение — по кнопке.
-->
<script setup lang="ts">
import type { FilterOptions } from "~/types/product";

const props = defineProps<{
	filters: FilterOptions | null;
	selectedCategories: string[];
	selectedGenders: string[];
	selectedColors: string[];
	selectedSizes: string[];
	priceFrom: string;
	priceTo: string;
}>();

const emit = defineEmits<{
	apply: [
		payload: {
			categories: string[];
			genders: string[];
			colors: string[];
			sizes: string[];
			priceFrom: string;
			priceTo: string;
		},
	];
	reset: [];
}>();

/** Черновики фильтров — применяются только по кнопке "Применить" */
const draftCategories = ref<string[]>([...props.selectedCategories]);
const draftGenders = ref<string[]>([...props.selectedGenders]);
const draftColors = ref<string[]>([...props.selectedColors]);
const draftSizes = ref<string[]>([...props.selectedSizes]);
const draftPriceFrom = ref<string>(props.priceFrom);
const draftPriceTo = ref<string>(props.priceTo);

/** Синхронизация черновиков при внешнем изменении props (например, сброс) */
watch(
	() => [
		props.selectedCategories,
		props.selectedGenders,
		props.selectedColors,
		props.selectedSizes,
		props.priceFrom,
		props.priceTo,
	],
	() => {
		draftCategories.value = [...props.selectedCategories];
		draftGenders.value = [...props.selectedGenders];
		draftColors.value = [...props.selectedColors];
		draftSizes.value = [...props.selectedSizes];
		draftPriceFrom.value = props.priceFrom;
		draftPriceTo.value = props.priceTo;
	},
	{ deep: true }
);

/** Состояние раскрытия групп */
const openGroups = ref<Record<string, boolean>>({
	category: false,
	gender: false,
	color: false,
	size: false,
	price: true,
});

function toggleGroup(key: string) {
	openGroups.value[key] = !openGroups.value[key];
}

/** JS-хуки для плавного раскрытия/сворачивания по высоте */
function onCollapseEnter(el: Element) {
	const e = el as HTMLElement;
	e.style.height = "0";
	e.style.overflow = "hidden";
	// force reflow
	void e.offsetHeight;
	e.style.height = e.scrollHeight + "px";
}
function onCollapseAfterEnter(el: Element) {
	const e = el as HTMLElement;
	e.style.height = "";
	e.style.overflow = "";
}
function onCollapseLeave(el: Element) {
	const e = el as HTMLElement;
	e.style.height = e.scrollHeight + "px";
	e.style.overflow = "hidden";
	void e.offsetHeight;
	e.style.height = "0";
}

/** Переключение значения в черновике */
function toggleDraft(arr: string[], value: string) {
	const idx = arr.indexOf(value);
	idx === -1 ? arr.push(value) : arr.splice(idx, 1);
}

/** Применить фильтры */
function applyFilters() {
	emit("apply", {
		categories: [...draftCategories.value],
		genders: [...draftGenders.value],
		colors: [...draftColors.value],
		sizes: [...draftSizes.value],
		priceFrom: draftPriceFrom.value,
		priceTo: draftPriceTo.value,
	});
}
</script>

<template>
	<div class="filters">
		<!-- Пол -->
		<div v-if="filters?.genders.length" class="filters__group">
			<button
				type="button"
				class="filters__heading"
				@click="toggleGroup('gender')"
			>
				<span>Пол</span>
				<span
					class="mdi filters__chevron"
					:class="openGroups.gender ? 'mdi-chevron-up' : 'mdi-chevron-down'"
				/>
			</button>
			<Transition
				name="collapse"
				@enter="onCollapseEnter"
				@after-enter="onCollapseAfterEnter"
				@leave="onCollapseLeave"
			>
				<div v-if="openGroups.gender" class="filters__content">
					<label v-for="g in filters.genders" :key="g" class="filters__label">
						<MyCheckboxInput
							variant="primary"
							:checked="draftGenders.includes(g)"
							@change="toggleDraft(draftGenders, g)"
						/>
						<span class="filters__label-text">{{ g }}</span>
					</label>
				</div>
			</Transition>
		</div>
		<!-- Категория -->
		<div v-if="filters?.categories.length" class="filters__group">
			<button
				type="button"
				class="filters__heading"
				@click="toggleGroup('category')"
			>
				<span>Категория</span>
				<span
					class="mdi filters__chevron"
					:class="openGroups.category ? 'mdi-chevron-up' : 'mdi-chevron-down'"
				/>
			</button>
			<Transition
				name="collapse"
				@enter="onCollapseEnter"
				@after-enter="onCollapseAfterEnter"
				@leave="onCollapseLeave"
			>
				<div v-if="openGroups.category" class="filters__content">
					<label
						v-for="cat in filters.categories"
						:key="cat"
						class="filters__label"
					>
						<MyCheckboxInput
							variant="primary"
							:checked="draftCategories.includes(cat)"
							@change="toggleDraft(draftCategories, cat)"
						/>
						<span class="filters__label-text">{{ cat }}</span>
					</label>
				</div>
			</Transition>
		</div>

		<!-- Цвет -->
		<div v-if="filters?.colors.length" class="filters__group">
			<button
				type="button"
				class="filters__heading"
				@click="toggleGroup('color')"
			>
				<span>Цвет</span>
				<span
					class="mdi filters__chevron"
					:class="openGroups.color ? 'mdi-chevron-up' : 'mdi-chevron-down'"
				/>
			</button>
			<Transition
				name="collapse"
				@enter="onCollapseEnter"
				@after-enter="onCollapseAfterEnter"
				@leave="onCollapseLeave"
			>
				<div v-if="openGroups.color" class="filters__content">
					<label v-for="c in filters.colors" :key="c" class="filters__label">
						<MyCheckboxInput
							variant="primary"
							:checked="draftColors.includes(c)"
							@change="toggleDraft(draftColors, c)"
						/>
						<span class="filters__label-text">{{ c }}</span>
					</label>
				</div>
			</Transition>
		</div>

		<!-- Размер -->
		<div v-if="filters?.sizes.length" class="filters__group">
			<button
				type="button"
				class="filters__heading"
				@click="toggleGroup('size')"
			>
				<span>Размер</span>
				<span
					class="mdi filters__chevron"
					:class="openGroups.size ? 'mdi-chevron-up' : 'mdi-chevron-down'"
				/>
			</button>
			<Transition
				name="collapse"
				@enter="onCollapseEnter"
				@after-enter="onCollapseAfterEnter"
				@leave="onCollapseLeave"
			>
				<div
					v-if="openGroups.size"
					class="filters__content filters__content--sizes"
				>
					<div class="filters__sizes-grid">
						<button
							v-for="s in filters.sizes"
							:key="s"
							type="button"
							class="filters__size-btn"
							:class="{ 'filters__size-btn--active': draftSizes.includes(s) }"
							@click="toggleDraft(draftSizes, s)"
						>
							{{ s }}
						</button>
					</div>
				</div>
			</Transition>
		</div>

		<!-- Цена -->
		<div class="filters__group">
			<button
				type="button"
				class="filters__heading"
				@click="toggleGroup('price')"
			>
				<span>Цена</span>
				<span
					class="mdi filters__chevron"
					:class="openGroups.price ? 'mdi-chevron-up' : 'mdi-chevron-down'"
				/>
			</button>
			<Transition
				name="collapse"
				@enter="onCollapseEnter"
				@after-enter="onCollapseAfterEnter"
				@leave="onCollapseLeave"
			>
				<div v-if="openGroups.price" class="filters__content">
					<div class="filters__price-range">
					<input
						v-model="draftPriceFrom"
						type="number"
						class="filters__price-input"
						:placeholder="filters ? `от ${filters.priceMin}` : 'от'"
						min="0"
					/>
					<span class="filters__price-separator">—</span>
					<input
						v-model="draftPriceTo"
						type="number"
						class="filters__price-input"
						:placeholder="filters ? `до ${filters.priceMax}` : 'до'"
						min="0"
					/>
				</div>
			</div>
			</Transition>
		</div>

		<!-- Действия -->
		<div class="filters__actions">
			<button class="filters__apply-btn" type="button" @click="applyFilters">
				Применить
			</button>
			<button class="filters__reset-btn" type="button" @click="emit('reset')">
				Сбросить фильтры
			</button>
		</div>
	</div>
</template>

<style scoped lang="scss">
.filters {
	&__group {
		margin-bottom: var(--spacing-md);
		padding-bottom: var(--spacing-md);
		border-bottom: 1px solid var(--c-border-light);
	}

	&__heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: var(--spacing-xs) 0;
		background: none;
		border: none;
		cursor: pointer;
		font-family: var(--font-base);
		font-size: var(--fs-sm);
		font-weight: var(--fw-semibold);
		color: var(--c-text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		transition: var(--transition-base);

		&:hover {
			color: var(--c-primary);
		}
	}

	&__chevron {
		font-size: var(--fs-lg);
		color: var(--c-text-muted);
		transition: var(--transition-base);
	}

	&__content {
		max-height: 500px;
		overflow-y: auto;
		margin-top: var(--spacing-sm);
		padding-right: var(--spacing-xs);

		// Тонкий скроллбар
		scrollbar-width: thin;
		scrollbar-color: var(--c-border) transparent;

		&::-webkit-scrollbar {
			width: 6px;
		}

		&::-webkit-scrollbar-thumb {
			background: var(--c-border);
			border-radius: var(--radius-full);
		}

		&::-webkit-scrollbar-track {
			background: transparent;
		}

		&--sizes {
			overflow-y: visible;
		}
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

	&__label-text {
		&::first-letter {
			text-transform: uppercase;
		}
	}

	&__sizes-grid {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-xs);
	}

	&__size-btn {
		min-width: 40px;
		padding: var(--spacing-xs) var(--spacing-sm);
		border: 1px solid var(--c-border);
		border-radius: var(--radius-md);
		background: var(--c-input-bg);
		font-family: var(--font-base);
		font-size: var(--fs-sm);
		color: var(--c-text);
		cursor: pointer;
		transition: var(--transition-base);
		text-align: center;

		&:hover {
			border-color: var(--c-primary);
		}

		&--active {
			background: var(--c-primary);
			color: var(--c-primary-text);
			border-color: var(--c-primary);
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

	&__actions {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		margin-top: var(--spacing-lg);
	}

	&__apply-btn {
		width: 100%;
		padding: var(--spacing-sm) var(--spacing-md);
		background: var(--c-primary);
		color: var(--c-primary-text);
		border: 1px solid var(--c-primary);
		border-radius: var(--radius-md);
		cursor: pointer;
		font-family: var(--font-base);
		font-size: var(--fs-sm);
		font-weight: var(--fw-semibold);
		transition: var(--transition-base);

		&:hover {
			background: var(--c-primary-hover);
			border-color: var(--c-primary-hover);
		}
	}

	// Плавное раскрытие/сворачивание групп
	.collapse-enter-active,
	.collapse-leave-active {
		transition: height 0.28s ease, opacity 0.2s ease;
		overflow: hidden;
	}

	.collapse-enter-from,
	.collapse-leave-to {
		opacity: 0;
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
