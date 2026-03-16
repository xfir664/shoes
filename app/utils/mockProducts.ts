import type { Product, Promo } from "~/types/product";

/** Генерация размеров с рандомным наличием */
function generateSizes(from: number, to: number): Product["sizes"] {
	const sizes: Product["sizes"] = [];
	for (let s = from; s <= to; s++) {
		sizes.push({ size: s, inStock: Math.random() > 0.25 });
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
		images: [
			"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
			"https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop",
			"https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop",
		],
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
		images: [
			"https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&h=600&fit=crop",
			"https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?w=600&h=600&fit=crop",
		],
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
		images: [
			"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=600&fit=crop",
			"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=600&fit=crop",
		],
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
		images: [
			"https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=600&fit=crop",
		],
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
		images: [
			"https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&h=600&fit=crop",
		],
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
		images: [
			"https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop",
			"https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop",
		],
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
		images: [
			"https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=600&fit=crop",
		],
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
		images: [
			"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=600&fit=crop",
		],
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
		images: [
			"https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop",
		],
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
		images: [
			"https://images.unsplash.com/photo-1610398752800-146f269dfcc8?w=600&h=600&fit=crop",
		],
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
		images: [
			"https://images.unsplash.com/photo-1631984564919-1f6b2313a71c?w=600&h=600&fit=crop",
		],
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
		images: [
			"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&h=600&fit=crop",
		],
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
		image:
			"https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=400&fit=crop",
	},
	{
		id: 2,
		title: "2+1 на летнюю коллекцию",
		description: "Купи 2 пары — получи 3-ю в подарок",
		image:
			"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=400&fit=crop",
	},
	{
		id: 3,
		title: "Зимние ботинки от 9990",
		description: "Натуральная кожа и мех по доступным ценам",
		image:
			"https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&h=400&fit=crop",
	},
	{
		id: 4,
		title: "Бесплатная доставка от 5000",
		description: "На все заказы по Москве и МО",
		image:
			"https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800&h=400&fit=crop",
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
