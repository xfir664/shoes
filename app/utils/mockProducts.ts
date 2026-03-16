import type { Product, Promo } from "~/types/product";

/** Генерация размеров с детерминированным наличием */
function generateSizes(from: number, to: number): Product["sizes"] {
	const sizes: Product["sizes"] = [];
	for (let s = from; s <= to; s++) {
		// Детерминированная «псевдослучайность» на основе размера
		const hash = ((s * 2654435761) >>> 0) % 100;
		sizes.push({ size: s, inStock: hash > 25 });
	}
	return sizes;
}

/** Каталог товаров (моковые данные) */
export const mockProducts: Product[] = [
	{
		id: 1,
		name: "Кроссовки Urban Runner",
		slug: "urban-runner",
		category: "sneakers",
		price: 8990,
		oldPrice: 11990,
		images: ["/img/Urban_Runner.jpg", "/img/spec1.jpg", "/img/spec2.jpg", "/img/spec3.jpg"],
		colors: [
			{ name: "Чёрный", hex: "#1a1a1a" },
			{ name: "Белый", hex: "#f5f5f5" },
		],
		sizes: generateSizes(36, 45),
		gender: "unisex",
		season: "demi",
		material: "Текстиль, синтетика",
		liningMaterial: "Текстиль",
		insoleMaterial: "EVA",
		description:
			"Лёгкие и комфортные кроссовки для города. Дышащий верх, амортизирующая подошва. Подходят для повседневной носки и активного отдыха.",
		isPopular: true,
		isPromo: true,
	},
	{
		id: 2,
		name: "Ботинки Winter Shield",
		slug: "winter-shield",
		category: "boots",
		price: 14990,
		images: ["/img/Ботинки Winter Shield.jpg", "/img/spec2.jpg", "/img/spec4.jpg", "/img/spec1.jpg"],
		colors: [
			{ name: "Коричневый", hex: "#5b3a1a" },
			{ name: "Чёрный", hex: "#1a1a1a" },
		],
		sizes: generateSizes(39, 46),
		gender: "male",
		season: "winter",
		material: "Натуральная кожа",
		liningMaterial: "Натуральный мех",
		insoleMaterial: "Натуральная кожа",
		description:
			"Тёплые зимние ботинки из натуральной кожи с меховой подкладкой. Нескользящая подошва, влагозащита. Для морозов до -25°C.",
		isPopular: true,
		isPromo: false,
	},
	{
		id: 3,
		name: "Кеды Classic Canvas",
		slug: "classic-canvas",
		category: "trainers",
		price: 4990,
		oldPrice: 6490,
		images: ["/img/Кеды Classic Canvas.jpg", "/img/spec3.jpg", "/img/spec1.jpg"],
		colors: [
			{ name: "Белый", hex: "#f5f5f5" },
			{ name: "Синий", hex: "#1e3a5f" },
			{ name: "Красный", hex: "#c62828" },
		],
		sizes: generateSizes(35, 44),
		gender: "unisex",
		season: "summer",
		material: "Хлопковый канвас",
		liningMaterial: "Текстиль",
		insoleMaterial: "Текстиль",
		description:
			"Классические кеды из плотного канваса. Вулканизированная подошва, усиленный мысок. Идеальны для тёплого сезона.",
		isPopular: true,
		isPromo: true,
	},
	{
		id: 4,
		name: "Лоферы Elegance",
		slug: "elegance-loafers",
		category: "loafers",
		price: 9990,
		images: ["/img/spec1.jpg", "/img/spec3.jpg", "/img/spec4.jpg"],
		colors: [
			{ name: "Бежевый", hex: "#c8b99c" },
			{ name: "Чёрный", hex: "#1a1a1a" },
		],
		sizes: generateSizes(36, 42),
		gender: "female",
		season: "demi",
		material: "Натуральная замша",
		liningMaterial: "Натуральная кожа",
		insoleMaterial: "Натуральная кожа",
		description:
			"Элегантные лоферы из мягкой замши. Удобная колодка, гибкая подошва. Для офиса и повседневного стиля.",
		isPopular: false,
		isPromo: false,
	},
	{
		id: 5,
		name: "Сандалии Breeze",
		slug: "breeze-sandals",
		category: "sandals",
		price: 5490,
		oldPrice: 7990,
		images: ["/img/Сандалии Breeze.jpg", "/img/spec2.jpg", "/img/spec3.jpg"],
		colors: [
			{ name: "Коричневый", hex: "#8b5e3c" },
			{ name: "Чёрный", hex: "#1a1a1a" },
		],
		sizes: generateSizes(36, 44),
		gender: "unisex",
		season: "summer",
		material: "Натуральная кожа",
		liningMaterial: "Натуральная кожа",
		insoleMaterial: "Пробка",
		description:
			"Удобные сандалии с анатомической стелькой. Регулируемые ремешки, лёгкая подошва. Для пляжа и прогулок.",
		isPopular: true,
		isPromo: true,
	},
	{
		id: 6,
		name: "Кроссовки Sport Pro",
		slug: "sport-pro",
		category: "sneakers",
		price: 12490,
		images: ["/img/Кроссовки Sport Pro.jpg", "/img/spec4.jpg", "/img/spec1.jpg", "/img/spec2.jpg"],
		colors: [
			{ name: "Чёрный", hex: "#1a1a1a" },
			{ name: "Серый", hex: "#6b6b6b" },
		],
		sizes: generateSizes(40, 46),
		gender: "male",
		season: "demi",
		material: "Синтетическая сетка",
		liningMaterial: "Текстиль",
		insoleMaterial: "Ортопедическая EVA",
		description:
			"Профессиональные кроссовки для бега и тренировок. Технология амортизации, поддержка стопы. Ультралёгкие.",
		isPopular: true,
		isPromo: false,
	},
	{
		id: 7,
		name: "Ботинки Chelsea Dark",
		slug: "chelsea-dark",
		category: "boots",
		price: 11990,
		oldPrice: 15990,
		images: ["/img/Ботинки Chelsea Dark.jpg", "/img/spec1.jpg", "/img/spec4.jpg"],
		colors: [{ name: "Чёрный", hex: "#1a1a1a" }],
		sizes: generateSizes(39, 45),
		gender: "male",
		season: "demi",
		material: "Натуральная кожа",
		liningMaterial: "Текстиль",
		insoleMaterial: "Натуральная кожа",
		description:
			"Классические челси из гладкой кожи. Эластичные вставки по бокам, удобная колодка. Универсальная модель на каждый день.",
		isPopular: true,
		isPromo: true,
	},
	{
		id: 8,
		name: "Балетки Grace",
		slug: "grace-flats",
		category: "flats",
		price: 6990,
		images: ["/img/Балетки Grace.jpg", "/img/spec3.jpg", "/img/spec2.jpg"],
		colors: [
			{ name: "Бежевый", hex: "#e0d5c4" },
			{ name: "Чёрный", hex: "#1a1a1a" },
			{ name: "Розовый", hex: "#d4a0a0" },
		],
		sizes: generateSizes(35, 41),
		gender: "female",
		season: "summer",
		material: "Искусственная кожа",
		liningMaterial: "Текстиль",
		insoleMaterial: "Пенополиуретан",
		description:
			"Изящные балетки с мягкой стелькой. Лёгкие и удобные, подходят для ежедневной носки. Бантик-декор.",
		isPopular: false,
		isPromo: false,
	},
	{
		id: 9,
		name: "Кроссовки Street Style",
		slug: "street-style",
		category: "sneakers",
		price: 7490,
		images: ["/img/Кроссовки Street Style.jpg", "/img/spec4.jpg", "/img/spec2.jpg", "/img/spec3.jpg"],
		colors: [
			{ name: "Белый", hex: "#f5f5f5" },
			{ name: "Зелёный", hex: "#2e7d32" },
		],
		sizes: generateSizes(36, 44),
		gender: "unisex",
		season: "demi",
		material: "Натуральная кожа, текстиль",
		liningMaterial: "Текстиль",
		insoleMaterial: "EVA",
		description:
			"Стильные кроссовки для городских прогулок. Комбинированный верх, толстая платформа. Трендовый дизайн.",
		isPopular: true,
		isPromo: false,
	},
	{
		id: 10,
		name: "Зимние сапоги Frost",
		slug: "frost-boots",
		category: "boots",
		price: 16990,
		oldPrice: 21990,
		images: ["/img/Зимние сапоги Frost.jpg", "/img/spec1.jpg", "/img/spec3.jpg", "/img/spec4.jpg"],
		colors: [
			{ name: "Чёрный", hex: "#1a1a1a" },
			{ name: "Коричневый", hex: "#5b3a1a" },
		],
		sizes: generateSizes(36, 41),
		gender: "female",
		season: "winter",
		material: "Натуральная кожа",
		liningMaterial: "Натуральная шерсть",
		insoleMaterial: "Натуральная шерсть",
		description:
			"Высокие зимние сапоги с утеплителем из натуральной шерсти. Устойчивый каблук, протекторная подошва. До -30°C.",
		isPopular: false,
		isPromo: true,
	},
	{
		id: 11,
		name: "Домашние тапочки Comfort",
		slug: "comfort-slippers",
		category: "slippers",
		price: 1990,
		images: ["/img/spec2.jpg", "/img/spec4.jpg", "/img/spec1.jpg"],
		colors: [
			{ name: "Серый", hex: "#8a8a8a" },
			{ name: "Бежевый", hex: "#c8b99c" },
		],
		sizes: generateSizes(36, 45),
		gender: "unisex",
		season: "winter",
		material: "Текстиль",
		liningMaterial: "Флис",
		insoleMaterial: "Пенополиуретан",
		description:
			"Мягкие домашние тапочки с флисовой подкладкой. Нескользящая подошва, ортопедическая стелька.",
		isPopular: false,
		isPromo: false,
	},
	{
		id: 12,
		name: "Кроссовки Air Motion",
		slug: "air-motion",
		category: "sneakers",
		price: 10990,
		oldPrice: 13990,
		images: ["/img/Кроссовки Air Motion.jpg", "/img/spec2.jpg", "/img/spec4.jpg", "/img/spec1.jpg"],
		colors: [
			{ name: "Чёрный", hex: "#1a1a1a" },
			{ name: "Белый", hex: "#f5f5f5" },
			{ name: "Красный", hex: "#c62828" },
		],
		sizes: generateSizes(38, 46),
		gender: "unisex",
		season: "demi",
		material: "Синтетика, сетка",
		liningMaterial: "Текстиль",
		insoleMaterial: "Memory Foam",
		description:
			"Кроссовки с воздушной подушкой в пятке. Невесомые, отлично гнутся. Идеальны для длительных прогулок и лёгких тренировок.",
		isPopular: true,
		isPromo: true,
	},
];

/** Маппинг категорий для UI */
export const categoryLabels: Record<string, string> = {
	sneakers: "Кроссовки",
	boots: "Ботинки",
	sandals: "Сандалии",
	loafers: "Лоферы",
	heels: "Туфли на каблуке",
	flats: "Балетки",
	slippers: "Тапочки",
	trainers: "Кеды",
};

/** Маппинг сезонов */
export const seasonLabels: Record<string, string> = {
	winter: "Зимние",
	summer: "Летние",
	demi: "Демисезонные",
};

/** Маппинг пола */
export const genderLabels: Record<string, string> = {
	male: "Мужские",
	female: "Женские",
	unisex: "Унисекс",
};

/** Акции */
export const mockPromos: Promo[] = [
	{
		id: 1,
		title: "Скидки до 40% на кроссовки",
		description: "Весенняя распродажа лучших моделей",
		image: "/img/spec3.jpg",
	},
	{
		id: 2,
		title: "2+1 на летнюю коллекцию",
		description: "Купи 2 пары — получи 3-ю в подарок",
		image: "/img/Кеды Classic Canvas.jpg",
	},
	{
		id: 3,
		title: "Зимние ботинки от 9990",
		description: "Натуральная кожа и мех по доступным ценам",
		image: "/img/Ботинки Winter Shield.jpg",
	},
	{
		id: 4,
		title: "Бесплатная доставка от 5000",
		description: "На все заказы по Москве и МО",
		image: "/img/spec4.jpg",
	},
];

/** Форматирование цены */
export function formatPrice(price: number): string {
	return price.toLocaleString("ru-RU") + " \u20BD";
}

/** Расчёт скидки в процентах */
export function getDiscount(price: number, oldPrice?: number): number {
	if (!oldPrice || oldPrice <= price) return 0;
	return Math.round(((oldPrice - price) / oldPrice) * 100);
}
