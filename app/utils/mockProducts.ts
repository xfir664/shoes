import type { Promo } from "~/types/product";

/** Форматирование цены */
export function formatPrice(price: number): string {
	return price.toLocaleString("ru-RU") + " \u20BD";
}

/** Акции (хардкод пока нет данных) */
export const mockPromos: Promo[] = [
	{
		id: 1,
		title: "Скидки до 40% на кроссовки",
		description: "Весенняя распродажа лучших моделей",
		image: "/img/Кроссовки Sport Pro.jpg",
	},
	{
		id: 2,
		title: "2+1 на летнюю коллекцию",
		description: "Купи 2 пары — получи 3-ю в подарок",
		image: "/img/Кеды Classic Canvas.jpg",
	},
	{
		id: 3,
		title: "Зимние ботинки от 2999",
		description: "Натуральная кожа по доступным ценам",
		image: "/img/Ботинки Winter Shield.jpg",
	},
	{
		id: 4,
		title: "Бесплатная доставка от 5000",
		description: "На все заказы по Москве и МО",
		image: "/img/Ботинки Chelsea Dark.jpg",
	},
];
