<script setup lang="ts">
import { mockProducts, categoryLabels, seasonLabels, genderLabels, formatPrice, getDiscount } from "~/utils/mockProducts";
import type { SortOption } from "~/types/product";

useSeoMeta({
	title: "Каталог",
	description: "Каталог обуви — кроссовки, ботинки, сандалии и другая обувь",
	ogTitle: "Каталог — Обувь",
	ogDescription: "Каталог обуви — кроссовки, ботинки, сандалии и другая обувь",
});

const route = useRoute();

/** Фильтры */
const isFiltersOpen = ref(false);
const isInStockOnly = ref(false);
const selectedCategories = ref<string[]>([]);
const selectedGenders = ref<string[]>([]);
const selectedSeasons = ref<string[]>([]);
const priceFrom = ref<string>("");
const priceTo = ref<string>("");
const searchQuery = ref<string>("");

/** Сортировка */
const currentSort = ref<SortOption>("popular");

/** Пагинация */
const currentPage = ref(1);
const perPage = 12;

/** Опции сортировки */
const sortOptions: { value: SortOption; label: string }[] = [
	{ value: "cheap", label: "Дешевле" },
	{ value: "expensive", label: "Дороже" },
	{ value: "popular", label: "Популярные" },
	{ value: "discount", label: "По скидкам" },
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

/** Переключение значения в массиве фильтра */
const toggleFilter = (arr: Ref<string[]>, value: string) => {
	const idx = arr.value.indexOf(value);
	if (idx === -1) {
		arr.value.push(value);
	} else {
		arr.value.splice(idx, 1);
	}
};

/** Сброс всех фильтров */
const resetFilters = () => {
	isInStockOnly.value = false;
	selectedCategories.value = [];
	selectedGenders.value = [];
	selectedSeasons.value = [];
	priceFrom.value = "";
	priceTo.value = "";
	searchQuery.value = "";
	currentPage.value = 1;
};

/** Отфильтрованные товары */
const filteredProducts = computed(() => {
	let result = [...mockProducts];

	// Поиск по названию
	if (searchQuery.value) {
		const q = searchQuery.value.toLowerCase();
		result = result.filter((p) => p.name.toLowerCase().includes(q));
	}

	// Наличие
	if (isInStockOnly.value) {
		result = result.filter((p) => p.sizes.some((s) => s.inStock));
	}

	// Категория
	if (selectedCategories.value.length > 0) {
		result = result.filter((p) => selectedCategories.value.includes(p.category));
	}

	// Пол
	if (selectedGenders.value.length > 0) {
		result = result.filter((p) => selectedGenders.value.includes(p.gender));
	}

	// Сезон
	if (selectedSeasons.value.length > 0) {
		result = result.filter((p) => selectedSeasons.value.includes(p.season));
	}

	// Цена
	const from = Number(priceFrom.value);
	const to = Number(priceTo.value);
	if (from > 0) {
		result = result.filter((p) => p.price >= from);
	}
	if (to > 0) {
		result = result.filter((p) => p.price <= to);
	}

	return result;
});

/** Отсортированные товары */
const sortedProducts = computed(() => {
	const items = [...filteredProducts.value];

	switch (currentSort.value) {
		case "cheap":
			return items.sort((a, b) => a.price - b.price);
		case "expensive":
			return items.sort((a, b) => b.price - a.price);
		case "popular":
			return items.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
		case "discount":
			return items.sort((a, b) => getDiscount(b.price, b.oldPrice) - getDiscount(a.price, a.oldPrice));
		default:
			return items;
	}
});

/** Общее количество страниц */
const totalPages = computed(() => Math.ceil(sortedProducts.value.length / perPage));

/** Товары на текущей странице */
const paginatedProducts = computed(() => {
	const start = (currentPage.value - 1) * perPage;
	return sortedProducts.value.slice(start, start + perPage);
});

/** Номера страниц для пагинации */
const pageNumbers = computed(() => {
	const pages: number[] = [];
	for (let i = 1; i <= totalPages.value; i++) {
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
	[isInStockOnly, selectedCategories, selectedGenders, selectedSeasons, priceFrom, priceTo, searchQuery, currentSort],
	() => {
		currentPage.value = 1;
	},
);

/** Проверка наличия хотя бы одного размера */
const hasAnySize = (product: typeof mockProducts[0]): boolean => {
	return product.sizes.some((s) => s.inStock);
};
</script>

<template>
	<div class="catalog">
		<h1 class="catalog__title">Каталог</h1>

		<!-- Поиск -->
		<div v-if="searchQuery" class="catalog__search-info">
			Результаты поиска: «{{ searchQuery }}»
			<button class="catalog__search-clear" type="button" @click="searchQuery = ''">
				Сбросить
			</button>
		</div>

		<!-- Мобильная кнопка фильтров -->
		<button
			class="catalog__filter-toggle"
			type="button"
			@click="isFiltersOpen = !isFiltersOpen"
		>
			<span class="catalog__filter-toggle-icon">☰</span>
			Фильтры
		</button>

		<div class="catalog__layout">
			<!-- Сайдбар фильтров -->
			<aside
				class="catalog__sidebar"
				:class="{ 'catalog__sidebar--open': isFiltersOpen }"
			>
				<!-- Оверлей для мобильных -->
				<div
					class="catalog__overlay"
					@click="isFiltersOpen = false"
				/>

				<div class="catalog__filters">
					<div class="catalog__filters-header">
						<h2 class="catalog__filters-title">Фильтры</h2>
						<button
							class="catalog__filters-close"
							type="button"
							@click="isFiltersOpen = false"
						>
							✕
						</button>
					</div>

					<!-- Наличие -->
					<div class="catalog__filter-group">
						<h3 class="catalog__filter-heading">Наличие</h3>
						<label class="catalog__filter-label">
							<MyCheckboxInput
								variant="primary"
								:checked="isInStockOnly"
								@change="isInStockOnly = $event"
							/>
							<span>Только в наличии</span>
						</label>
					</div>

					<!-- Категория -->
					<div class="catalog__filter-group">
						<h3 class="catalog__filter-heading">Категория</h3>
						<label
							v-for="(label, key) in categoryLabels"
							:key="key"
							class="catalog__filter-label"
						>
							<MyCheckboxInput
								variant="primary"
								:checked="selectedCategories.includes(key)"
								@change="toggleFilter(selectedCategories, key)"
							/>
							<span>{{ label }}</span>
						</label>
					</div>

					<!-- Пол -->
					<div class="catalog__filter-group">
						<h3 class="catalog__filter-heading">Пол</h3>
						<label
							v-for="(label, key) in genderLabels"
							:key="key"
							class="catalog__filter-label"
						>
							<MyCheckboxInput
								variant="primary"
								:checked="selectedGenders.includes(key)"
								@change="toggleFilter(selectedGenders, key)"
							/>
							<span>{{ label }}</span>
						</label>
					</div>

					<!-- Сезон -->
					<div class="catalog__filter-group">
						<h3 class="catalog__filter-heading">Сезон</h3>
						<label
							v-for="(label, key) in seasonLabels"
							:key="key"
							class="catalog__filter-label"
						>
							<MyCheckboxInput
								variant="primary"
								:checked="selectedSeasons.includes(key)"
								@change="toggleFilter(selectedSeasons, key)"
							/>
							<span>{{ label }}</span>
						</label>
					</div>

					<!-- Цена -->
					<div class="catalog__filter-group">
						<h3 class="catalog__filter-heading">Цена</h3>
						<div class="catalog__price-range">
							<input
								v-model="priceFrom"
								type="number"
								class="catalog__price-input"
								placeholder="от"
								min="0"
							/>
							<span class="catalog__price-separator">—</span>
							<input
								v-model="priceTo"
								type="number"
								class="catalog__price-input"
								placeholder="до"
								min="0"
							/>
						</div>
					</div>

					<!-- Сброс -->
					<button
						class="catalog__reset-btn"
						type="button"
						@click="resetFilters"
					>
						Сбросить фильтры
					</button>
				</div>
			</aside>

			<!-- Основной контент -->
			<div class="catalog__content">
				<!-- Сортировка -->
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
						{{ sortedProducts.length }} {{ sortedProducts.length === 1 ? "товар" : "товаров" }}
					</span>
				</div>

				<!-- Пустое состояние -->
				<AppEmpty
					v-if="paginatedProducts.length === 0"
					title="Ничего не найдено"
					message="Попробуйте изменить параметры фильтрации"
				/>

				<!-- Сетка товаров -->
				<div v-else class="catalog__grid">
					<article
						v-for="product in paginatedProducts"
						:key="product.id"
						class="product-card"
					>
						<NuxtLink
							:to="`/catalog/${product.slug}`"
							class="product-card__image-link"
						>
							<img
								:src="product.images[0]"
								:alt="product.name"
								class="product-card__image"
								loading="lazy"
							/>
							<span
								v-if="getDiscount(product.price, product.oldPrice) > 0"
								class="product-card__badge"
							>
								-{{ getDiscount(product.price, product.oldPrice) }}%
							</span>
						</NuxtLink>

						<div class="product-card__body">
							<span class="product-card__category">
								{{ categoryLabels[product.category] || product.category }}
							</span>

							<h3 class="product-card__name">
								<NuxtLink :to="`/catalog/${product.slug}`" class="product-card__name-link">
									{{ product.name }}
								</NuxtLink>
							</h3>

							<div class="product-card__prices">
								<span class="product-card__price">{{ formatPrice(product.price) }}</span>
								<span
									v-if="product.oldPrice"
									class="product-card__old-price"
								>
									{{ formatPrice(product.oldPrice) }}
								</span>
							</div>

							<div class="product-card__actions">
								<NuxtLink
									:to="`/catalog/${product.slug}`"
									class="product-card__detail-link"
								>
									Подробнее
								</NuxtLink>
								<button
									class="product-card__cart-btn"
									type="button"
									disabled
									title="Выберите размер на странице товара"
								>
									В корзину
								</button>
							</div>
						</div>
					</article>
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

	// Мобильная кнопка фильтров
	&__filter-toggle {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		margin-bottom: var(--spacing-md);
		padding: var(--spacing-sm) var(--spacing-md);
		background: var(--c-surface);
		border: 1px solid var(--c-border);
		border-radius: var(--radius-md);
		cursor: pointer;
		font-family: var(--font-base);
		font-size: var(--fs-base);
		color: var(--c-text);
		transition: var(--transition-base);

		&:hover {
			border-color: var(--c-primary);
		}

		@media (min-width: $breakpoint-tablet) {
			display: none;
		}
	}

	&__filter-toggle-icon {
		font-size: var(--fs-lg);
	}

	// Лейаут
	&__layout {
		display: flex;
		gap: var(--spacing-xl);

		@media (max-width: #{$breakpoint-tablet - 1px}) {
			flex-direction: column;
		}
	}

	// Сайдбар
	&__sidebar {
		flex-shrink: 0;
		width: 280px;

		@media (max-width: #{$breakpoint-tablet - 1px}) {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: var(--z-modal);
			width: 100%;
			pointer-events: none;
			visibility: hidden;
			opacity: 0;
			transition: var(--transition-base);

			&--open {
				pointer-events: all;
				visibility: visible;
				opacity: 1;
			}
		}
	}

	&__overlay {
		display: none;

		@media (max-width: #{$breakpoint-tablet - 1px}) {
			display: block;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.5);
		}
	}

	&__filters {
		position: sticky;
		top: var(--spacing-lg);

		@media (max-width: #{$breakpoint-tablet - 1px}) {
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			width: 300px;
			max-width: 85vw;
			background: var(--c-surface);
			z-index: var(--z-modal);
			overflow-y: auto;
			padding: var(--spacing-lg);
			box-shadow: var(--shadow-xl);
		}

		@media (min-width: $breakpoint-tablet) {
			padding: var(--spacing-lg);
			background: var(--c-surface);
			border-radius: var(--radius-lg);
			border: 1px solid var(--c-border-light);
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

	&__filters-close {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border: none;
		background: var(--c-base-bg);
		border-radius: var(--radius-full);
		cursor: pointer;
		font-size: var(--fs-base);
		color: var(--c-text-secondary);
		transition: var(--transition-base);

		&:hover {
			background: var(--c-base-hover);
		}

		@media (min-width: $breakpoint-tablet) {
			display: none;
		}
	}

	// Группа фильтров
	&__filter-group {
		margin-bottom: var(--spacing-lg);
		padding-bottom: var(--spacing-lg);
		border-bottom: 1px solid var(--c-border-light);
	}

	&__filter-heading {
		font-size: var(--fs-sm);
		font-weight: var(--fw-semibold);
		color: var(--c-text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0 0 var(--spacing-sm);
	}

	&__filter-label {
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

	// Цена
	&__price-range {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}

	&__price-input {
		width: 100%;
		padding: var(--spacing-sm) var(--spacing-sm);
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

	// Сброс
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

	// Контент
	&__content {
		flex: 1;
		min-width: 0;
	}

	// Сортировка
	&__sort-bar {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
		margin-bottom: var(--spacing-lg);
		padding: var(--spacing-sm) var(--spacing-md);
		background: var(--c-surface);
		border: 1px solid var(--c-border-light);
		border-radius: var(--radius-md);
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
	}

	// Сетка товаров
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

	// Пагинация
	&__pagination {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-xs);
		margin-top: var(--spacing-2xl);
	}
}

// Карточка товара
.product-card {
	background: var(--c-surface);
	border-radius: var(--radius-lg);
	border: 1px solid var(--c-border-light);
	overflow: hidden;
	transition: var(--transition-slow);

	&:hover {
		box-shadow: var(--shadow-lg);
		transform: translateY(-2px);
	}

	&__image-link {
		position: relative;
		display: block;
		aspect-ratio: 1 / 1;
		overflow: hidden;
		background: var(--c-beige-100);
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

	&__badge {
		position: absolute;
		top: var(--spacing-sm);
		right: var(--spacing-sm);
		padding: var(--spacing-xs) var(--spacing-sm);
		background: var(--c-gold-600);
		color: var(--c-white);
		font-family: var(--font-accent);
		font-size: var(--fs-xs);
		font-weight: var(--fw-bold);
		border-radius: var(--radius-full);
		letter-spacing: 0.02em;
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

	&__old-price {
		font-size: var(--fs-sm);
		color: var(--c-text-muted);
		text-decoration: line-through;
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

	&__cart-btn {
		flex: 1;
		padding: var(--spacing-sm) var(--spacing-md);
		background: var(--c-base-bg);
		color: var(--c-text-muted);
		border: 1px solid var(--c-border-light);
		border-radius: var(--radius-md);
		font-family: var(--font-base);
		font-size: var(--fs-sm);
		cursor: not-allowed;
		opacity: 0.6;
		transition: var(--transition-base);
	}
}
</style>
