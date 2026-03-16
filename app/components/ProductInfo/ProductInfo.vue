<!--
  ProductInfo — информация о товаре (название, цена, цвет, характеристики, кнопка купить).
-->
<script setup lang="ts">
import type { Product } from "~/types/product";
import { formatPrice, getDiscount, seasonLabels, genderLabels, categoryLabels } from "~/utils/mockProducts";

const props = defineProps<{
	product: Product;
}>();

const uiStore = useUiStore();
const cartStore = useCartStore();

const selectedColorIndex = ref(0);
const selectedSize = ref<number | null>(null);
const isSizeWarning = ref(false);
const isAddedToCart = ref(false);
const isDescriptionExpanded = ref(false);
const isSizeChartOpen = ref(false);

const discount = computed(() => getDiscount(props.product.price, props.product.oldPrice));

function selectSize(size: number) {
	selectedSize.value = size;
	isSizeWarning.value = false;
}

function handleAddToCart() {
	if (!selectedSize.value) {
		isSizeWarning.value = true;
		return;
	}

	isSizeWarning.value = false;
	cartStore.addItem(props.product, selectedSize.value);
	isAddedToCart.value = true;

	uiStore.addToast({
		type: "success",
		title: "Товар добавлен в корзину",
		message: `${props.product.name}, размер ${selectedSize.value}`,
	});

	setTimeout(() => {
		isAddedToCart.value = false;
	}, 2000);
}
</script>

<template>
	<div class="product-info">
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
				/>
			</div>
			<span class="colors__name">
				{{ product.colors[selectedColorIndex]?.name }}
			</span>
		</div>

		<!-- Характеристики -->
		<div class="product-info__specs specs">
			<div class="specs__row">
				<span class="specs__label">
					<span class="mdi mdi-texture-box" />
					Состав
				</span>
				<span class="specs__value">{{ product.material }}</span>
			</div>
			<div class="specs__row">
				<span class="specs__label">
					<span class="mdi mdi-weather-snowy-rainy" />
					Сезон
				</span>
				<span class="specs__value">{{ seasonLabels[product.season] }}</span>
			</div>
			<div class="specs__row">
				<span class="specs__label">
					<span class="mdi mdi-human-male-female" />
					Пол
				</span>
				<span class="specs__value">{{ genderLabels[product.gender] }}</span>
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
					:class="isDescriptionExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"
				/>
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

		<!-- Размерная сетка -->
		<button class="product-info__size-chart-btn" @click="isSizeChartOpen = true">
			<span class="mdi mdi-ruler" />
			Размерная сетка
		</button>

		<!-- Размеры -->
		<div class="product-info__sizes">
			<ProductSizes
				:sizes="product.sizes"
				:model-value="selectedSize"
				:show-warning="isSizeWarning"
				@update:model-value="selectSize"
			/>
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
			<span v-if="isAddedToCart" class="mdi mdi-check" />
			<span v-else class="mdi mdi-cart-outline" />
			{{ isAddedToCart ? "Добавлено" : "Купить" }}
		</button>

		<!-- Sticky мобильная кнопка -->
		<div class="product-info__sticky-cta">
			<span class="product-info__sticky-price">{{ formatPrice(product.price) }}</span>
			<button
				class="buy-btn"
				:class="{ 'buy-btn--added': isAddedToCart }"
				@click="handleAddToCart"
			>
				<span v-if="isAddedToCart" class="mdi mdi-check" />
				<span v-else class="mdi mdi-cart-outline" />
				{{ isAddedToCart ? "Добавлено" : "Купить" }}
			</button>
		</div>

		<!-- Модалка размерной сетки -->
		<MyModal v-model="isSizeChartOpen" title="Размерная сетка">
			<div class="size-chart-table-wrap">
				<table class="size-chart-table">
					<thead>
						<tr>
							<th>RU</th><th>EU</th><th>US</th><th>UK</th><th>Длина стопы, см</th>
						</tr>
					</thead>
					<tbody>
						<tr><td>35</td><td>36</td><td>5</td><td>3</td><td>22.5</td></tr>
						<tr><td>36</td><td>37</td><td>6</td><td>4</td><td>23.0</td></tr>
						<tr><td>37</td><td>38</td><td>7</td><td>5</td><td>23.5</td></tr>
						<tr><td>38</td><td>39</td><td>7.5</td><td>5.5</td><td>24.5</td></tr>
						<tr><td>39</td><td>40</td><td>8</td><td>6</td><td>25.0</td></tr>
						<tr><td>40</td><td>41</td><td>9</td><td>7</td><td>25.5</td></tr>
						<tr><td>41</td><td>42</td><td>9.5</td><td>7.5</td><td>26.5</td></tr>
						<tr><td>42</td><td>43</td><td>10</td><td>8</td><td>27.0</td></tr>
						<tr><td>43</td><td>44</td><td>11</td><td>9</td><td>27.5</td></tr>
						<tr><td>44</td><td>45</td><td>11.5</td><td>9.5</td><td>28.5</td></tr>
						<tr><td>45</td><td>46</td><td>12</td><td>10</td><td>29.0</td></tr>
						<tr><td>46</td><td>47</td><td>13</td><td>11</td><td>29.5</td></tr>
					</tbody>
				</table>
			</div>
		</MyModal>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/var.scss" as *;

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

	&__sticky-cta {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: var(--spacing-md);
		background: var(--c-surface);
		border-top: 1px solid var(--c-border-light);
		box-shadow: var(--shadow-lg);
		z-index: var(--z-sticky);

		@media (min-width: $breakpoint-tablet) {
			display: none;
		}

		.buy-btn {
			flex: 1;
		}
	}

	&__sticky-price {
		font-family: var(--font-accent);
		font-size: var(--fs-xl);
		font-weight: var(--fw-bold);
		white-space: nowrap;
	}
}

// Цвета
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

// Характеристики
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

// Подробнее
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

// Цена
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

// Кнопка "Купить"
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

// Размерная сетка таблица
.size-chart-table-wrap {
	overflow-x: auto;
}

.size-chart-table {
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

// Transitions
.slide-down-enter-active,
.slide-down-leave-active {
	transition: all 0.2s ease;
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
</style>
