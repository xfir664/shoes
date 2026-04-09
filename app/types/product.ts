/** Размер товара */
export interface ProductSize {
	size: string;
	count: number;
}

/** Товар */
export interface Product {
	id: number;
	name: string;
	article: string;
	category: string;
	gender: string | null;
	price: number;
	color: string;
	sizes: ProductSize[];
	image: string;
}

/** Элемент корзины */
export interface CartItem {
	product: Product;
	size: string;
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
	category?: string;
	gender?: string;
	color?: string;
	size?: string;
	priceFrom?: number;
	priceTo?: number;
}

/** Сортировка */
export type SortOption = "cheap" | "expensive" | "name";

/** Опции фильтров (с сервера) */
export interface FilterOptions {
	categories: string[];
	genders: string[];
	colors: string[];
	sizes: string[];
	priceMin: number;
	priceMax: number;
}

/** Ответ API списка товаров */
export interface ProductsResponse {
	items: Product[];
	total: number;
	page: number;
	perPage: number;
	totalPages: number;
}
