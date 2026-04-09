<script setup lang="ts">
import type {
	ProductsResponse,
	FilterOptions,
	SortOption,
} from "~/types/product";
import { formatPrice } from "~/utils/mockProducts";

useSeoMeta({
	title: "Каталог",
	description: "Каталог обуви — кроссовки, ботинки, сандалии и другая обувь",
	ogTitle: "Каталог — Обувь",
	ogDescription: "Каталог обуви — кроссовки, ботинки, сандалии и другая обувь",
});

const route = useRoute();

/** Фильтры */
const isDrawerOpen = ref(false);
const isSortDrawerOpen = ref(false);
const selectedCategories = ref<string[]>([]);
const selectedGenders = ref<string[]>([]);
const selectedColors = ref<string[]>([]);
const selectedSizes = ref<string[]>([]);
const priceFrom = ref<string>("");
const priceTo = ref<string>("");
const searchQuery = ref<string>("");

/** Сортировка */
const currentSort = ref<SortOption>("name");

/** Пагинация */
const currentPage = ref(1);
const perPage = 12;

/** Опции сортировки */
const sortOptions: { value: SortOption; label: string }[] = [
	{ value: "cheap", label: "Дешевле" },
	{ value: "expensive", label: "Дороже" },
	{ value: "name", label: "По названию" },
];

/** Инициализация из query-параметров */
const initFromQuery = () => {
	const q = route.query.q;
	const category = route.query.category;

	if (typeof q === "string" && q) {
		searchQuery.value = q;
	}
	if (typeof category === "string" && category) {
		selectedCategories.value = [category];
	}
};

initFromQuery();

/** Синхронизация с query при навигации (поиск из хедера на том же роуте) */
watch(
	() => route.query.q,
	(q) => {
		searchQuery.value = typeof q === "string" ? q : "";
	}
);

/** Применить фильтры из компонента */
function applyFilters(payload: {
	categories: string[];
	genders: string[];
	colors: string[];
	sizes: string[];
	priceFrom: string;
	priceTo: string;
}) {
	selectedCategories.value = payload.categories;
	selectedGenders.value = payload.genders;
	selectedColors.value = payload.colors;
	selectedSizes.value = payload.sizes;
	priceFrom.value = payload.priceFrom;
	priceTo.value = payload.priceTo;
	isDrawerOpen.value = false;
}

/** Сброс всех фильтров */
const resetFilters = () => {
	selectedCategories.value = [];
	selectedGenders.value = [];
	selectedColors.value = [];
	selectedSizes.value = [];
	priceFrom.value = "";
	priceTo.value = "";
	searchQuery.value = "";
	currentPage.value = 1;
};

/** Параметры запроса к API */
const apiQuery = computed(() => {
	const q: Record<string, string | number> = {
		page: currentPage.value,
		perPage,
	};

	if (currentSort.value) q.sort = currentSort.value;
	if (searchQuery.value) q.search = searchQuery.value;
	if (selectedCategories.value.length === 1)
		q.category = selectedCategories.value[0];
	if (selectedGenders.value.length === 1) q.gender = selectedGenders.value[0];
	if (selectedColors.value.length === 1) q.color = selectedColors.value[0];
	if (selectedSizes.value.length === 1) q.size = selectedSizes.value[0];
	if (priceFrom.value) q.priceFrom = Number(priceFrom.value);
	if (priceTo.value) q.priceTo = Number(priceTo.value);

	return q;
});

/** Загрузка товаров */
const { data: productsData, pending } = useFetch<ProductsResponse>(
	"/api/products",
	{
		query: apiQuery,
		watch: [apiQuery],
	}
);

/** Загрузка опций фильтров */
const { data: filterOptions } = useFetch<FilterOptions>(
	"/api/products/filters"
);

/** Данные для шаблона */
const products = computed(() => productsData.value?.items ?? []);
const totalPages = computed(() => productsData.value?.totalPages ?? 0);
const totalItems = computed(() => productsData.value?.total ?? 0);

/** Номера страниц для пагинации */
const pageNumbers = computed(() => {
	const pages: number[] = [];
	const total = totalPages.value;
	const current = currentPage.value;

	// Показываем максимум 7 страниц
	let start = Math.max(1, current - 3);
	let end = Math.min(total, start + 6);
	start = Math.max(1, end - 6);

	for (let i = start; i <= end; i++) {
		pages.push(i);
	}
	return pages;
});

/** Переход на страницу */
const goToPage = (page: number) => {
	if (page >= 1 && page <= totalPages.value) {
		currentPage.value = page;
		window.scrollTo({ top: 0, behavior: "smooth" });
	}
};

/** Сброс пагинации при изменении фильтров */
watch(
	[
		selectedCategories,
		selectedGenders,
		selectedColors,
		selectedSizes,
		priceFrom,
		priceTo,
		searchQuery,
		currentSort,
	],
	() => {
		currentPage.value = 1;
	}
);
</script>

<template>
	<div class="catalog">
		<h1 class="catalog__title">Каталог</h1>

		<!-- Поиск -->
		<div v-if="searchQuery" class="catalog__search-info">
			Результаты поиска: «{{ searchQuery }}»
			<button
				class="catalog__search-clear"
				type="button"
				@click="searchQuery = ''"
			>
				Сбросить
			</button>
		</div>

		<!-- Мобильный drawer с фильтрами -->
		<MyDrawer v-model="isDrawerOpen" title="Фильтры">
			<CatalogFilters
				:filters="filterOptions"
				:selected-categories="selectedCategories"
				:selected-genders="selectedGenders"
				:selected-colors="selectedColors"
				:selected-sizes="selectedSizes"
				:price-from="priceFrom"
				:price-to="priceTo"
				@apply="applyFilters"
				@reset="resetFilters"
			/>
		</MyDrawer>

		<!-- Мобильный toolbar: кнопки фильтров и сортировки -->
		<div class="catalog__mobile-toolbar">
			<button
				class="catalog__filter-toggle"
				type="button"
				@click="isDrawerOpen = true"
			>
				<span class="mdi mdi-filter-outline" />
				Фильтры
			</button>
			<button
				class="catalog__sort-toggle"
				type="button"
				@click="isSortDrawerOpen = true"
			>
				<span class="mdi mdi-sort-variant" />
				{{ sortOptions.find(o => o.value === currentSort)?.label }}
			</button>
			<span class="catalog__mobile-count">
				{{ totalItems }} {{ totalItems === 1 ? "товар" : "товаров" }}
			</span>
		</div>

		<!-- Мобильный drawer сортировки -->
		<MyDrawer v-model="isSortDrawerOpen" title="Сортировка">
			<div class="catalog__sort-list">
				<button
					v-for="option in sortOptions"
					:key="option.value"
					class="catalog__sort-list-item"
					:class="{
						'catalog__sort-list-item--active': currentSort === option.value,
					}"
					type="button"
					@click="
						currentSort = option.value;
						isSortDrawerOpen = false;
					"
				>
					{{ option.label }}
					<span v-if="currentSort === option.value" class="mdi mdi-check" />
				</button>
			</div>
		</MyDrawer>

		<!-- Десктопная сортировка -->
		<div class="catalog__sort-bar">
			<span class="catalog__sort-label">Сортировка:</span>
			<div class="catalog__sort-options">
				<button
					v-for="option in sortOptions"
					:key="option.value"
					class="catalog__sort-btn"
					:class="{ 'catalog__sort-btn--active': currentSort === option.value }"
					type="button"
					@click="currentSort = option.value"
				>
					{{ option.label }}
				</button>
			</div>
			<span class="catalog__results-count">
				{{ totalItems }} {{ totalItems === 1 ? "товар" : "товаров" }}
			</span>
		</div>

		<div class="catalog__layout">
			<!-- Десктопный сайдбар фильтров -->
			<aside class="catalog__sidebar">
				<div class="catalog__filters">
					<div class="catalog__filters-header">
						<h2 class="catalog__filters-title">Фильтры</h2>
					</div>
					<CatalogFilters
						:filters="filterOptions"
						:selected-categories="selectedCategories"
						:selected-genders="selectedGenders"
						:selected-colors="selectedColors"
						:selected-sizes="selectedSizes"
						:price-from="priceFrom"
						:price-to="priceTo"
						@apply="applyFilters"
						@reset="resetFilters"
					/>
				</div>
			</aside>

			<!-- Основной контент -->
			<div class="catalog__content">
				<!-- Загрузка -->
				<AppLoading v-if="pending" />

				<!-- Пустое состояние -->
				<AppEmpty
					v-else-if="products.length === 0"
					title="Ничего не найдено"
					message="Попробуйте изменить параметры фильтрации"
				/>

				<!-- Сетка товаров -->
				<div v-else class="catalog__grid">
					<ProductCard
						v-for="product in products"
						:key="product.id"
						:product="product"
						show-category
					/>
				</div>

				<!-- Пагинация -->
				<div v-if="totalPages > 1" class="catalog__pagination">
					<MyPagination
						variant="base"
						:disabled="currentPage <= 1"
						@click="goToPage(currentPage - 1)"
					>
						←
					</MyPagination>
					<MyPagination
						v-for="page in pageNumbers"
						:key="page"
						:variant="page === currentPage ? 'primary' : 'base'"
						@click="goToPage(page)"
					>
						{{ page }}
					</MyPagination>
					<MyPagination
						variant="base"
						:disabled="currentPage >= totalPages"
						@click="goToPage(currentPage + 1)"
					>
						→
					</MyPagination>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/var.scss" as *;

.catalog {
	max-width: var(--container-max);
	margin: 0 auto;
	padding: var(--spacing-lg) var(--spacing-md) var(--spacing-2xl);

	&__title {
		font-family: var(--font-accent);
		font-size: var(--fs-3xl);
		font-weight: var(--fw-bold);
		margin: 0 0 var(--spacing-lg);
		color: var(--c-text);
	}

	&__search-info {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		margin-bottom: var(--spacing-lg);
		padding: var(--spacing-sm) var(--spacing-md);
		background: var(--c-primary-light);
		border-radius: var(--radius-md);
		font-size: var(--fs-sm);
		color: var(--c-text);
	}

	&__search-clear {
		background: none;
		border: none;
		color: var(--c-primary);
		cursor: pointer;
		font-size: var(--fs-sm);
		text-decoration: underline;
		padding: 0;

		&:hover {
			color: var(--c-primary-hover);
		}
	}

	&__mobile-toolbar {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		margin-bottom: var(--spacing-md);

		@media (min-width: $breakpoint-tablet) {
			display: none;
		}
	}

	&__filter-toggle,
	&__sort-toggle {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-sm) var(--spacing-md);
		background: var(--c-surface);
		border: 1px solid var(--c-border);
		border-radius: var(--radius-md);
		cursor: pointer;
		font-family: var(--font-base);
		font-size: var(--fs-sm);
		color: var(--c-text);
		transition: var(--transition-base);
		white-space: nowrap;

		&:hover {
			border-color: var(--c-primary);
		}
	}

	&__mobile-count {
		margin-left: auto;
		font-size: var(--fs-sm);
		color: var(--c-text-muted);
		white-space: nowrap;
	}

	&__sort-list {
		display: flex;
		flex-direction: column;
	}

	&__sort-list-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-md);
		background: none;
		border: none;
		border-bottom: 1px solid var(--c-border-light);
		cursor: pointer;
		font-family: var(--font-base);
		font-size: var(--fs-base);
		color: var(--c-text);
		transition: var(--transition-base);

		&:last-child {
			border-bottom: none;
		}

		&:hover {
			background: var(--c-base-hover);
		}

		&--active {
			color: var(--c-primary);
			font-weight: var(--fw-semibold);
		}

		.mdi {
			font-size: var(--fs-lg);
			color: var(--c-primary);
		}
	}

	&__layout {
		display: flex;
		gap: var(--spacing-xl);
	}

	&__sidebar {
		flex-shrink: 0;
		width: 280px;
		display: none;

		@media (min-width: $breakpoint-tablet) {
			display: block;
		}
	}

	&__filters {
		height: 100%;	
		position: sticky;
		top: var(--spacing-lg);
		max-height: calc(100vh - var(--spacing-lg) * 2);
		overflow-y: auto;
		padding: var(--spacing-lg);
		background: var(--c-surface);
		border-radius: var(--radius-lg);
		border: 1px solid var(--c-border-light);
		scrollbar-width: none;

		&::-webkit-scrollbar {
			display: none;
		}
	}

	&__filters-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--spacing-lg);
	}

	&__filters-title {
		font-family: var(--font-accent);
		font-size: var(--fs-lg);
		font-weight: var(--fw-semibold);
		margin: 0;
		color: var(--c-text);
	}

	&__content {
		flex: 1;
		min-width: 0;
	}

	&__sort-bar {
		display: none;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
		margin-bottom: var(--spacing-lg);
		padding: var(--spacing-sm) var(--spacing-md);
		background: var(--c-surface);
		border: 1px solid var(--c-border-light);
		border-radius: var(--radius-md);

		@media (min-width: $breakpoint-tablet) {
			display: flex;
		}
	}

	&__sort-label {
		font-size: var(--fs-sm);
		color: var(--c-text-secondary);
		font-weight: var(--fw-medium);
		margin-right: var(--spacing-xs);
	}

	&__sort-options {
		display: flex;
		gap: var(--spacing-xs);
		flex-wrap: wrap;
	}

	&__sort-btn {
		padding: var(--spacing-xs) var(--spacing-sm);
		background: transparent;
		border: 1px solid transparent;
		border-radius: var(--radius-full);
		cursor: pointer;
		font-family: var(--font-base);
		font-size: var(--fs-sm);
		color: var(--c-text-secondary);
		transition: var(--transition-base);

		&:hover {
			color: var(--c-text);
			background: var(--c-base-bg);
		}

		&--active {
			background: var(--c-primary);
			color: var(--c-primary-text);
			border-color: var(--c-primary);

			&:hover {
				background: var(--c-primary-hover);
				color: var(--c-primary-text);
			}
		}
	}

	&__results-count {
		margin-left: auto;
		font-size: var(--fs-sm);
		color: var(--c-text-muted);
		flex-shrink: 0;
		white-space: nowrap;
	}

	&__grid {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: var(--spacing-lg);

		@media (min-width: 480px) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media (min-width: $breakpoint-desktop) {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	&__pagination {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-xs);
		margin-top: var(--spacing-2xl);
	}
}
</style>
