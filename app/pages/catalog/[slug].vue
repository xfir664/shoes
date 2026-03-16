<script setup lang="ts">
import {
	mockProducts,
	categoryLabels,
	seasonLabels,
	genderLabels,
	formatPrice,
	getDiscount,
} from "~/utils/mockProducts";

const route = useRoute();
const cartStore = useCartStore();

const product = mockProducts.find(p => p.slug === route.params.slug);

// Состояние галереи
const activeImageIndex = ref(0);
const activeImage = computed(
	() => product?.images[activeImageIndex.value] ?? ""
);

// Выбранный цвет
const selectedColorIndex = ref(0);

// Выбранный размер
const selectedSize = ref<number | null>(null);
const isSizeWarning = ref(false);

// Подробное описание
const isDescriptionExpanded = ref(false);

// Модалка размерной сетки
const isSizeChartOpen = ref(false);

// Скидка
const discount = computed(() =>
	product ? getDiscount(product.price, product.oldPrice) : 0
);

// Похожие товары (та же категория, исключая текущий)
const similarProducts = computed(() =>
	product
		? mockProducts
				.filter(p => p.category === product.category && p.id !== product.id)
				.slice(0, 8)
		: []
);

// Добавление в корзину
const isAddedToCart = ref(false);

function handleAddToCart() {
	if (!product) return;

	if (!selectedSize.value) {
		isSizeWarning.value = true;
		return;
	}

	isSizeWarning.value = false;
	cartStore.addItem(product, selectedSize.value);
	isAddedToCart.value = true;

	setTimeout(() => {
		isAddedToCart.value = false;
	}, 2000);
}

function selectSize(size: number) {
	selectedSize.value = size;
	isSizeWarning.value = false;
}

// SEO
if (product) {
	useSeoMeta({
		title: `${product.name} — купить в интернет-магазине`,
		description: product.description,
	});
}
</script>

<template>
	<div v-if="!product" class="product-error">
		<div class="product-error__content">
			<span class="product-error__icon mdi mdi-shoe-sneaker"></span>
			<h1 class="product-error__title">Товар не найден</h1>
			<p class="product-error__text">
				К сожалению, такого товара не существует или он был удалён.
			</p>
			<NuxtLink to="/catalog" class="product-error__link">
				<span class="mdi mdi-arrow-left"></span>
				Вернуться в каталог
			</NuxtLink>
		</div>
	</div>

	<div v-else class="product-page">
		<!-- Хлебные крошки -->
		<nav class="product-page__breadcrumbs breadcrumbs">
			<NuxtLink to="/" class="breadcrumbs__item">Главная</NuxtLink>
			<span class="breadcrumbs__separator mdi mdi-chevron-right"></span>
			<NuxtLink to="/catalog" class="breadcrumbs__item">Каталог</NuxtLink>
			<span class="breadcrumbs__separator mdi mdi-chevron-right"></span>
			<span class="breadcrumbs__item breadcrumbs__item--current">
				{{ product.name }}
			</span>
		</nav>

		<!-- Основной блок товара -->
		<section class="product-page__main product-main">
			<!-- Левая колонка — галерея -->
			<div class="product-main__gallery gallery">
				<div class="gallery__main">
					<img
						:src="activeImage"
						:alt="product.name"
						class="gallery__main-image"
					/>
					<span v-if="discount" class="gallery__badge"> -{{ discount }}% </span>
				</div>
				<div v-if="product.images.length > 1" class="gallery__thumbnails">
					<button
						v-for="(img, idx) in product.images"
						:key="idx"
						class="gallery__thumb"
						:class="{ 'gallery__thumb--active': idx === activeImageIndex }"
						@click="activeImageIndex = idx"
					>
						<img :src="img" :alt="`${product.name} — фото ${idx + 1}`" />
					</button>
				</div>
			</div>

			<!-- Правая колонка — информация -->
			<div class="product-main__info product-info">
				<h1 class="product-info__name">{{ product.name }}</h1>

				<!-- Цвета -->
				<div class="product-info__colors colors">
					<span class="colors__label">Цвет:</span>
					<div class="colors__list">
						<button
							v-for="(color, idx) in product.colors"
							:key="color.hex"
							class="colors__swatch"
							:class="{ 'colors__swatch--active': idx === selectedColorIndex }"
							:style="{ backgroundColor: color.hex }"
							:title="color.name"
							@click="selectedColorIndex = idx"
						></button>
					</div>
					<span class="colors__name">
						{{ product.colors[selectedColorIndex]?.name }}
					</span>
				</div>

				<!-- Характеристики -->
				<div class="product-info__specs specs">
					<div class="specs__row">
						<span class="specs__label">
							<span class="mdi mdi-texture-box"></span>
							Состав
						</span>
						<span class="specs__value">{{ product.material }}</span>
					</div>
					<div class="specs__row">
						<span class="specs__label">
							<span class="mdi mdi-weather-snowy-rainy"></span>
							Сезон
						</span>
						<span class="specs__value">
							{{ seasonLabels[product.season] }}
						</span>
					</div>
					<div class="specs__row">
						<span class="specs__label">
							<span class="mdi mdi-human-male-female"></span>
							Пол
						</span>
						<span class="specs__value">
							{{ genderLabels[product.gender] }}
						</span>
					</div>
				</div>

				<!-- Подробнее -->
				<div class="product-info__details details">
					<button
						class="details__toggle"
						@click="isDescriptionExpanded = !isDescriptionExpanded"
					>
						<span>Подробнее</span>
						<span
							class="mdi"
							:class="
								isDescriptionExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down'
							"
						></span>
					</button>
					<Transition name="slide-down">
						<div v-if="isDescriptionExpanded" class="details__content">
							<p>{{ product.description }}</p>
							<div class="details__extra">
								<div class="details__row">
									<span>Подкладка:</span>
									<span>{{ product.liningMaterial }}</span>
								</div>
								<div class="details__row">
									<span>Стелька:</span>
									<span>{{ product.insoleMaterial }}</span>
								</div>
								<div class="details__row">
									<span>Категория:</span>
									<span>{{ categoryLabels[product.category] }}</span>
								</div>
							</div>
						</div>
					</Transition>
				</div>

				<!-- Размерная сетка — кнопка -->
				<button
					class="product-info__size-chart-btn"
					@click="isSizeChartOpen = true"
				>
					<span class="mdi mdi-ruler"></span>
					Размерная сетка
				</button>

				<!-- Размеры -->
				<div class="product-info__sizes sizes">
					<span class="sizes__label">Размер:</span>
					<div class="sizes__grid">
						<button
							v-for="s in product.sizes"
							:key="s.size"
							class="sizes__btn"
							:class="{
								'sizes__btn--active': selectedSize === s.size,
								'sizes__btn--unavailable': !s.inStock,
							}"
							:disabled="!s.inStock"
							@click="selectSize(s.size)"
						>
							{{ s.size }}
						</button>
					</div>
					<Transition name="fade">
						<span v-if="isSizeWarning" class="sizes__warning">
							<span class="mdi mdi-alert-circle-outline"></span>
							Выберите размер
						</span>
					</Transition>
				</div>

				<!-- Цена -->
				<div class="product-info__price price-block">
					<span v-if="product.oldPrice" class="price-block__old">
						{{ formatPrice(product.oldPrice) }}
					</span>
					<span class="price-block__current">
						{{ formatPrice(product.price) }}
					</span>
					<span v-if="discount" class="price-block__discount">
						-{{ discount }}%
					</span>
				</div>

				<!-- Кнопка "Купить" -->
				<button
					class="product-info__buy-btn buy-btn"
					:class="{ 'buy-btn--added': isAddedToCart }"
					@click="handleAddToCart"
				>
					<span v-if="isAddedToCart" class="mdi mdi-check"></span>
					<span v-else class="mdi mdi-cart-outline"></span>
					{{ isAddedToCart ? "Добавлено" : "Купить" }}
				</button>
			</div>
		</section>

		<!-- Описание и характеристики -->
		<section class="product-page__description description-block">
			<h2 class="description-block__title">Описание и характеристики</h2>
			<div class="description-block__content">
				<div class="description-block__text">
					<h3>О товаре</h3>
					<p>{{ product.description }}</p>
				</div>
				<div class="description-block__chars">
					<h3>Характеристики</h3>
					<table class="description-block__table">
						<tbody>
							<tr>
								<td>Категория</td>
								<td>{{ categoryLabels[product.category] }}</td>
							</tr>
							<tr>
								<td>Материал верха</td>
								<td>{{ product.material }}</td>
							</tr>
							<tr>
								<td>Подкладка</td>
								<td>{{ product.liningMaterial }}</td>
							</tr>
							<tr>
								<td>Стелька</td>
								<td>{{ product.insoleMaterial }}</td>
							</tr>
							<tr>
								<td>Сезон</td>
								<td>{{ seasonLabels[product.season] }}</td>
							</tr>
							<tr>
								<td>Пол</td>
								<td>{{ genderLabels[product.gender] }}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>

		<!-- Похожие товары -->
		<section
			v-if="similarProducts.length"
			class="product-page__similar similar"
		>
			<h2 class="similar__title">Похожие товары</h2>
			<div class="similar__scroll">
				<NuxtLink
					v-for="item in similarProducts"
					:key="item.id"
					:to="`/catalog/${item.slug}`"
					class="similar__card"
				>
					<div class="similar__card-image">
						<img :src="item.images[0]" :alt="item.name" />
						<span
							v-if="getDiscount(item.price, item.oldPrice)"
							class="similar__card-badge"
						>
							-{{ getDiscount(item.price, item.oldPrice) }}%
						</span>
					</div>
					<div class="similar__card-info">
						<span class="similar__card-name">{{ item.name }}</span>
						<div class="similar__card-price">
							<span v-if="item.oldPrice" class="similar__card-old-price">
								{{ formatPrice(item.oldPrice) }}
							</span>
							<span class="similar__card-current-price">
								{{ formatPrice(item.price) }}
							</span>
						</div>
					</div>
				</NuxtLink>
			</div>
		</section>

		<!-- Модалка размерной сетки -->
		<Teleport to="body">
			<Transition name="fade">
				<div
					v-if="isSizeChartOpen"
					class="size-chart-overlay"
					@click.self="isSizeChartOpen = false"
				>
					<div class="size-chart">
						<div class="size-chart__header">
							<h3 class="size-chart__title">Размерная сетка</h3>
							<button
								class="size-chart__close"
								@click="isSizeChartOpen = false"
							>
								<span class="mdi mdi-close"></span>
							</button>
						</div>
						<div class="size-chart__body">
							<table class="size-chart__table">
								<thead>
									<tr>
										<th>RU</th>
										<th>EU</th>
										<th>US</th>
										<th>UK</th>
										<th>Длина стопы, см</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>35</td>
										<td>36</td>
										<td>5</td>
										<td>3</td>
										<td>22.5</td>
									</tr>
									<tr>
										<td>36</td>
										<td>37</td>
										<td>6</td>
										<td>4</td>
										<td>23.0</td>
									</tr>
									<tr>
										<td>37</td>
										<td>38</td>
										<td>7</td>
										<td>5</td>
										<td>23.5</td>
									</tr>
									<tr>
										<td>38</td>
										<td>39</td>
										<td>7.5</td>
										<td>5.5</td>
										<td>24.5</td>
									</tr>
									<tr>
										<td>39</td>
										<td>40</td>
										<td>8</td>
										<td>6</td>
										<td>25.0</td>
									</tr>
									<tr>
										<td>40</td>
										<td>41</td>
										<td>9</td>
										<td>7</td>
										<td>25.5</td>
									</tr>
									<tr>
										<td>41</td>
										<td>42</td>
										<td>9.5</td>
										<td>7.5</td>
										<td>26.5</td>
									</tr>
									<tr>
										<td>42</td>
										<td>43</td>
										<td>10</td>
										<td>8</td>
										<td>27.0</td>
									</tr>
									<tr>
										<td>43</td>
										<td>44</td>
										<td>11</td>
										<td>9</td>
										<td>27.5</td>
									</tr>
									<tr>
										<td>44</td>
										<td>45</td>
										<td>11.5</td>
										<td>9.5</td>
										<td>28.5</td>
									</tr>
									<tr>
										<td>45</td>
										<td>46</td>
										<td>12</td>
										<td>10</td>
										<td>29.0</td>
									</tr>
									<tr>
										<td>46</td>
										<td>47</td>
										<td>13</td>
										<td>11</td>
										<td>29.5</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</Transition>
		</Teleport>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/var.scss" as *;

// ==========================================================================
// Ошибка — товар не найден
// ==========================================================================
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

// ==========================================================================
// Страница товара
// ==========================================================================
.product-page {
	max-width: var(--container-max);
	margin: 0 auto;
	padding: var(--spacing-lg) var(--spacing-md);
}

// ==========================================================================
// Хлебные крошки
// ==========================================================================
.breadcrumbs {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: var(--spacing-xs);
	margin-bottom: var(--spacing-xl);
	font-size: var(--fs-sm);

	&__item {
		color: var(--c-text-secondary);
		text-decoration: none;
		transition: var(--transition-base);

		&:hover:not(&--current) {
			color: var(--c-primary);
		}

		&--current {
			color: var(--c-text);
			font-weight: var(--fw-medium);
		}
	}

	&__separator {
		color: var(--c-neutral-400);
		font-size: var(--fs-xs);
	}
}

// ==========================================================================
// Основной блок (две колонки)
// ==========================================================================
.product-main {
	display: grid;
	grid-template-columns: 1fr;
	gap: var(--spacing-xl);
	margin-bottom: var(--spacing-3xl);

	@media (min-width: $breakpoint-tablet) {
		grid-template-columns: 2fr 3fr;
		gap: var(--spacing-2xl);
	}
}

// ==========================================================================
// Галерея
// ==========================================================================
.gallery {
	&__main {
		position: relative;
		border-radius: var(--radius-lg);
		overflow: hidden;
		background: var(--c-beige-100);
		aspect-ratio: 1 / 1;
		margin-bottom: var(--spacing-md);
	}

	&__main-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	&__badge {
		position: absolute;
		top: var(--spacing-md);
		left: var(--spacing-md);
		background: var(--c-error);
		color: var(--c-white);
		font-size: var(--fs-sm);
		font-weight: var(--fw-bold);
		padding: var(--spacing-xs) var(--spacing-sm);
		border-radius: var(--radius-sm);
	}

	&__thumbnails {
		display: flex;
		gap: var(--spacing-sm);
		overflow-x: auto;
	}

	&__thumb {
		flex-shrink: 0;
		width: 72px;
		height: 72px;
		border-radius: var(--radius-md);
		overflow: hidden;
		border: 2px solid transparent;
		cursor: pointer;
		padding: 0;
		background: var(--c-beige-100);
		transition: var(--transition-base);

		&--active {
			border-color: var(--c-primary);
		}

		&:hover:not(&--active) {
			border-color: var(--c-border);
		}

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			display: block;
		}
	}
}

// ==========================================================================
// Информация о товаре
// ==========================================================================
.product-info {
	&__name {
		font-size: var(--fs-2xl);
		font-weight: var(--fw-bold);
		line-height: var(--lh-tight);
		margin-bottom: var(--spacing-lg);

		@media (min-width: $breakpoint-tablet) {
			font-size: var(--fs-3xl);
		}
	}

	&__colors {
		margin-bottom: var(--spacing-lg);
	}

	&__specs {
		margin-bottom: var(--spacing-lg);
	}

	&__details {
		margin-bottom: var(--spacing-md);
	}

	&__size-chart-btn {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xs);
		background: none;
		border: none;
		color: var(--c-primary);
		font-size: var(--fs-sm);
		font-weight: var(--fw-medium);
		cursor: pointer;
		padding: 0;
		margin-bottom: var(--spacing-lg);
		transition: var(--transition-base);

		&:hover {
			color: var(--c-primary-hover);
			text-decoration: underline;
		}
	}

	&__sizes {
		margin-bottom: var(--spacing-lg);
	}

	&__price {
		margin-bottom: var(--spacing-lg);
	}

	&__buy-btn {
		width: 100%;

		@media (min-width: $breakpoint-tablet) {
			width: auto;
			min-width: 280px;
		}
	}
}

// ==========================================================================
// Цвета
// ==========================================================================
.colors {
	&__label {
		display: block;
		font-size: var(--fs-sm);
		color: var(--c-text-secondary);
		margin-bottom: var(--spacing-sm);
	}

	&__list {
		display: flex;
		gap: var(--spacing-sm);
		margin-bottom: var(--spacing-xs);
	}

	&__swatch {
		width: 32px;
		height: 32px;
		border-radius: var(--radius-full);
		border: 2px solid var(--c-border-light);
		cursor: pointer;
		padding: 0;
		transition: var(--transition-base);
		outline-offset: 2px;

		&--active {
			border-color: var(--c-primary);
			box-shadow: 0 0 0 2px var(--c-focus-ring);
		}

		&:hover:not(&--active) {
			border-color: var(--c-neutral-400);
		}
	}

	&__name {
		font-size: var(--fs-sm);
		color: var(--c-text-muted);
	}
}

// ==========================================================================
// Характеристики
// ==========================================================================
.specs {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-sm);
	padding: var(--spacing-md);
	background: var(--c-beige-100);
	border-radius: var(--radius-md);

	&__row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--spacing-md);
	}

	&__label {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		color: var(--c-text-secondary);
		font-size: var(--fs-sm);

		.mdi {
			font-size: var(--fs-md);
		}
	}

	&__value {
		font-size: var(--fs-sm);
		font-weight: var(--fw-medium);
		text-align: right;
	}
}

// ==========================================================================
// Подробнее (раскрывающийся)
// ==========================================================================
.details {
	&__toggle {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		background: none;
		border: none;
		color: var(--c-text);
		font-size: var(--fs-base);
		font-weight: var(--fw-medium);
		cursor: pointer;
		padding: var(--spacing-sm) 0;
		transition: var(--transition-base);

		&:hover {
			color: var(--c-primary);
		}
	}

	&__content {
		padding: var(--spacing-sm) 0 var(--spacing-md);
		font-size: var(--fs-sm);
		color: var(--c-text-secondary);
		line-height: var(--lh-relaxed);

		p {
			margin-bottom: var(--spacing-md);
		}
	}

	&__extra {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	&__row {
		display: flex;
		gap: var(--spacing-sm);

		span:first-child {
			color: var(--c-text-muted);
		}

		span:last-child {
			font-weight: var(--fw-medium);
			color: var(--c-text);
		}
	}
}

// ==========================================================================
// Размеры
// ==========================================================================
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
		background: var(--c-surface);
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
			background: var(--c-neutral-100);
			border-color: var(--c-neutral-200);
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

// ==========================================================================
// Блок цены
// ==========================================================================
.price-block {
	display: flex;
	align-items: baseline;
	gap: var(--spacing-md);
	flex-wrap: wrap;

	&__old {
		font-size: var(--fs-lg);
		color: var(--c-text-muted);
		text-decoration: line-through;
	}

	&__current {
		font-size: var(--fs-3xl);
		font-weight: var(--fw-bold);
		color: var(--c-text);
	}

	&__discount {
		display: inline-flex;
		align-items: center;
		background: var(--c-error);
		color: var(--c-white);
		font-size: var(--fs-sm);
		font-weight: var(--fw-bold);
		padding: var(--spacing-xs) var(--spacing-sm);
		border-radius: var(--radius-sm);
	}
}

// ==========================================================================
// Кнопка "Купить"
// ==========================================================================
.buy-btn {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: var(--spacing-sm);
	height: var(--component-height-lg);
	padding: 0 var(--spacing-xl);
	background: var(--c-primary);
	color: var(--c-primary-text);
	border: none;
	border-radius: var(--radius-md);
	font-size: var(--fs-md);
	font-weight: var(--fw-bold);
	cursor: pointer;
	transition: var(--transition-base);

	&:hover {
		background: var(--c-primary-hover);
	}

	&:active {
		background: var(--c-primary-active);
	}

	&--added {
		background: var(--c-success);

		&:hover {
			background: var(--c-success);
		}
	}

	.mdi {
		font-size: var(--fs-xl);
	}
}

// ==========================================================================
// Описание и характеристики
// ==========================================================================
.description-block {
	margin-bottom: var(--spacing-3xl);
	padding-top: var(--spacing-xl);
	border-top: 1px solid var(--c-border-light);

	&__title {
		font-size: var(--fs-xl);
		font-weight: var(--fw-bold);
		margin-bottom: var(--spacing-lg);
	}

	&__content {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--spacing-xl);

		@media (min-width: $breakpoint-tablet) {
			grid-template-columns: 1fr 1fr;
		}
	}

	&__text {
		h3 {
			font-size: var(--fs-md);
			font-weight: var(--fw-semibold);
			margin-bottom: var(--spacing-md);
		}

		p {
			color: var(--c-text-secondary);
			line-height: var(--lh-relaxed);
		}
	}

	&__chars {
		h3 {
			font-size: var(--fs-md);
			font-weight: var(--fw-semibold);
			margin-bottom: var(--spacing-md);
		}
	}

	&__table {
		width: 100%;
		border-collapse: collapse;

		td {
			padding: var(--spacing-sm) 0;
			border-bottom: 1px solid var(--c-border-light);
			font-size: var(--fs-sm);

			&:first-child {
				color: var(--c-text-muted);
				padding-right: var(--spacing-md);
				width: 45%;
			}

			&:last-child {
				font-weight: var(--fw-medium);
			}
		}
	}
}

// ==========================================================================
// Похожие товары
// ==========================================================================
.similar {
	margin-bottom: var(--spacing-2xl);

	&__title {
		font-size: var(--fs-xl);
		font-weight: var(--fw-bold);
		margin-bottom: var(--spacing-lg);
	}

	&__scroll {
		display: flex;
		gap: var(--spacing-md);
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		padding-bottom: var(--spacing-md);
		-webkit-overflow-scrolling: touch;

		&::-webkit-scrollbar {
			height: 6px;
		}

		&::-webkit-scrollbar-track {
			background: var(--c-beige-100);
			border-radius: var(--radius-full);
		}

		&::-webkit-scrollbar-thumb {
			background: var(--c-neutral-400);
			border-radius: var(--radius-full);
		}
	}

	&__card {
		flex-shrink: 0;
		width: 200px;
		scroll-snap-align: start;
		text-decoration: none;
		color: var(--c-text);
		transition: var(--transition-base);

		@media (min-width: $breakpoint-tablet) {
			width: 240px;
		}

		&:hover {
			transform: translateY(-4px);
		}
	}

	&__card-image {
		position: relative;
		border-radius: var(--radius-md);
		overflow: hidden;
		aspect-ratio: 1 / 1;
		background: var(--c-beige-100);
		margin-bottom: var(--spacing-sm);

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			display: block;
		}
	}

	&__card-badge {
		position: absolute;
		top: var(--spacing-sm);
		left: var(--spacing-sm);
		background: var(--c-error);
		color: var(--c-white);
		font-size: var(--fs-xs);
		font-weight: var(--fw-bold);
		padding: 2px var(--spacing-xs);
		border-radius: var(--radius-sm);
	}

	&__card-info {
		padding: 0 var(--spacing-xs);
	}

	&__card-name {
		display: block;
		font-size: var(--fs-sm);
		font-weight: var(--fw-medium);
		margin-bottom: var(--spacing-xs);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	&__card-price {
		display: flex;
		align-items: baseline;
		gap: var(--spacing-sm);
	}

	&__card-old-price {
		font-size: var(--fs-xs);
		color: var(--c-text-muted);
		text-decoration: line-through;
	}

	&__card-current-price {
		font-size: var(--fs-base);
		font-weight: var(--fw-bold);
	}
}

// ==========================================================================
// Модалка размерной сетки
// ==========================================================================
.size-chart-overlay {
	position: fixed;
	inset: 0;
	z-index: var(--z-modal-backdrop);
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: var(--spacing-md);
}

.size-chart {
	background: var(--c-surface);
	border-radius: var(--radius-lg);
	box-shadow: var(--shadow-xl);
	max-width: 600px;
	width: 100%;
	max-height: 90vh;
	overflow-y: auto;
	z-index: var(--z-modal);

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-lg);
		border-bottom: 1px solid var(--c-border-light);
	}

	&__title {
		font-size: var(--fs-lg);
		font-weight: var(--fw-bold);
		margin: 0;
	}

	&__close {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		background: none;
		border: none;
		cursor: pointer;
		border-radius: var(--radius-full);
		color: var(--c-text-secondary);
		font-size: var(--fs-xl);
		transition: var(--transition-base);

		&:hover {
			background: var(--c-beige-100);
			color: var(--c-text);
		}
	}

	&__body {
		padding: var(--spacing-lg);
		overflow-x: auto;
	}

	&__table {
		width: 100%;
		border-collapse: collapse;
		text-align: center;
		font-size: var(--fs-sm);

		th {
			padding: var(--spacing-sm);
			background: var(--c-beige-100);
			font-weight: var(--fw-semibold);
			border-bottom: 2px solid var(--c-border);
		}

		td {
			padding: var(--spacing-sm);
			border-bottom: 1px solid var(--c-border-light);
		}

		tr:hover td {
			background: var(--c-primary-light);
		}
	}
}

// ==========================================================================
// Transitions
// ==========================================================================
.slide-down-enter-active,
.slide-down-leave-active {
	transition: all var(--duration-base) ease;
	overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
	opacity: 0;
	max-height: 0;
	transform: translateY(-8px);
}

.slide-down-enter-to,
.slide-down-leave-from {
	opacity: 1;
	max-height: 500px;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity var(--duration-base) ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
