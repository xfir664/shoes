<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import {
	mockProducts,
	categoryLabels,
	seasonLabels,
	genderLabels,
	formatPrice,
	getDiscount,
} from "~/utils/mockProducts";

const route = useRoute();
const product = mockProducts.find(p => p.slug === route.params.slug);

const discount = computed(() =>
	product ? getDiscount(product.price, product.oldPrice) : 0,
);

// Похожие товары
const similarProducts = computed(() =>
	product
		? mockProducts
				.filter(p => p.category === product.category && p.id !== product.id)
				.slice(0, 8)
		: [],
);

const swiperModules = [Pagination];

// Табы
const activeTab = ref("description");
const tabs = [
	{ key: "description", label: "Описание" },
	{ key: "specs", label: "Характеристики" },
	{ key: "delivery", label: "Доставка" },
];

// Хлебные крошки
const breadcrumbs = computed(() => [
	{ label: "Главная", to: "/" },
	{ label: "Каталог", to: "/catalog" },
	{ label: product?.name ?? "Товар", current: true },
]);

// SEO
if (product) {
	useSeoMeta({
		title: `${product.name} — купить в интернет-магазине`,
		description: product.description,
		ogTitle: `${product.name} — ShoeStore`,
		ogDescription: product.description,
		ogImage: product.images[0],
	});

	useHead({
		script: [
			{
				type: "application/ld+json",
				innerHTML: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "Product",
					name: product.name,
					description: product.description,
					image: product.images,
					offers: {
						"@type": "Offer",
						price: product.price,
						priceCurrency: "RUB",
						availability: product.sizes.some(s => s.inStock)
							? "https://schema.org/InStock"
							: "https://schema.org/OutOfStock",
					},
				}),
			},
		],
	});
}
</script>

<template>
	<div v-if="!product" class="product-error">
		<div class="product-error__content">
			<span class="product-error__icon mdi mdi-shoe-sneaker" />
			<h1 class="product-error__title">Товар не найден</h1>
			<p class="product-error__text">
				К сожалению, такого товара не существует или он был удалён.
			</p>
			<NuxtLink to="/catalog" class="product-error__link">
				<span class="mdi mdi-arrow-left" />
				Вернуться в каталог
			</NuxtLink>
		</div>
	</div>

	<div v-else class="product-page">
		<!-- Хлебные крошки -->
		<MyBreadcrumbs :items="breadcrumbs" />

		<!-- Основной блок товара -->
		<section class="product-page__main product-main">
			<!-- Левая колонка — галерея -->
			<div class="product-main__gallery">
				<ProductGallery
					:images="product.images"
					:name="product.name"
					:discount="discount"
				/>
			</div>

			<!-- Правая колонка — информация -->
			<div class="product-main__info">
				<ProductInfo :product="product" />
			</div>
		</section>

		<!-- Табы: Описание / Характеристики / Доставка -->
		<section class="product-page__tabs">
			<MyTabs v-model="activeTab" :tabs="tabs">
				<template #description>
					<div class="tab-content">
						<h3>О товаре</h3>
						<p>{{ product.description }}</p>
					</div>
				</template>
				<template #specs>
					<div class="tab-content">
						<h3>Характеристики</h3>
						<table class="specs-table">
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
				</template>
				<template #delivery>
					<div class="tab-content">
						<h3>Доставка и возврат</h3>
						<ul class="delivery-list">
							<li>Бесплатная доставка по Москве при заказе от 5 000 ₽</li>
							<li>Доставка по России — от 290 ₽, 3–7 рабочих дней</li>
							<li>Самовывоз из магазина — бесплатно</li>
							<li>Возврат в течение 14 дней при сохранении товарного вида</li>
							<li>Примерка при получении курьером</li>
						</ul>
					</div>
				</template>
			</MyTabs>
		</section>

		<!-- Похожие товары — Swiper -->
		<section v-if="similarProducts.length" class="product-page__similar similar">
			<h2 class="similar__title">Похожие товары</h2>
			<ClientOnly>
				<Swiper
					:modules="swiperModules"
					:slides-per-view="2"
					:space-between="12"
					:pagination="{ clickable: true }"
					:breakpoints="{
						480: { slidesPerView: 2, spaceBetween: 16 },
						768: { slidesPerView: 3, spaceBetween: 20 },
						1440: { slidesPerView: 4, spaceBetween: 24 },
					}"
					class="similar__swiper"
				>
					<SwiperSlide v-for="item in similarProducts" :key="item.id">
						<ProductCard :product="item" />
					</SwiperSlide>
				</Swiper>
			</ClientOnly>
		</section>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/var.scss" as *;

// Ошибка — товар не найден
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

// Страница товара
.product-page {
	max-width: var(--container-max);
	margin: 0 auto;
	padding: var(--spacing-lg) var(--spacing-md);
	padding-bottom: 80px; // для sticky CTA на мобильном

	@media (min-width: $breakpoint-tablet) {
		padding-bottom: var(--spacing-lg);
	}
}

// Основной блок
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

// Табы секция
.product-page__tabs {
	margin-bottom: var(--spacing-3xl);
	padding-top: var(--spacing-xl);
	border-top: 1px solid var(--c-border-light);
}

.tab-content {
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

.specs-table {
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

.delivery-list {
	padding-left: var(--spacing-lg);
	color: var(--c-text-secondary);
	line-height: var(--lh-relaxed);

	li {
		margin-bottom: var(--spacing-sm);
	}
}

// Похожие товары
.similar {
	margin-bottom: var(--spacing-2xl);

	&__title {
		font-size: var(--fs-xl);
		font-weight: var(--fw-bold);
		margin-bottom: var(--spacing-lg);
	}

	&__swiper {
		padding-bottom: var(--spacing-xl);
	}
}
</style>
