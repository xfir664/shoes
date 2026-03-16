/** Категория обуви */
export type ShoeCategory =
	| "sneakers"
	| "boots"
	| "sandals"
	| "loafers"
	| "heels"
	| "flats"
	| "slippers"
	| "trainers";

/** Сезон */
export type Season = "winter" | "summer" | "demi";

/** Пол */
export type Gender = "male" | "female" | "unisex";

/** Размер товара */
export interface ProductSize {
	size: number;
	inStock: boolean;
}

/** Цвет товара */
export interface ProductColor {
	name: string;
	hex: string;
}

/** Товар */
export interface Product {
	id: number;
	name: string;
	slug: string;
	category: ShoeCategory;
	price: number;
	oldPrice?: number;
	images: string[];
	colors: ProductColor[];
	sizes: ProductSize[];
	gender: Gender;
	season: Season;
	material: string;
	liningMaterial: string;
	insoleMaterial: string;
	description: string;
	isPopular: boolean;
	isPromo: boolean;
}

/** Элемент корзины */
export interface CartItem {
	product: Product;
	size: number;
	quantity: number;
}

/** Акция */
export interface Promo {
	id: number;
	title: string;
	description: string;
	image: string;
}

/** Фильтры каталога */
export interface CatalogFilters {
	category?: ShoeCategory;
	gender?: Gender;
	season?: Season;
	material?: string;
	liningMaterial?: string;
	insoleMaterial?: string;
	color?: string;
	size?: number;
	priceFrom?: number;
	priceTo?: number;
	inStock?: boolean;
}

/** Сортировка */
export type SortOption = "cheap" | "expensive" | "popular" | "discount";
