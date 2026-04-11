import productsData from "../../products.json";

interface RawProduct {
	name: string;
	article: string;
	category: string;
	gender: string | null;
	price: number;
	color: string;
	sizes: { size: string; count: number }[];
}

const MOCK_IMAGES = [
	"/img/Urban_Runner.jpg",
	"/img/Ботинки Winter Shield.jpg",
	"/img/Кеды Classic Canvas.jpg",
	"/img/Сандалии Breeze.jpg",
	"/img/Кроссовки Sport Pro.jpg",
	"/img/Кроссовки Street Style.jpg",
	"/img/Кроссовки Air Motion.jpg",
	"/img/Ботинки Chelsea Dark.jpg",
];

const allProductsRaw = productsData as RawProduct[];

function pickImages(globalIndex: number): string[] {
	const n = MOCK_IMAGES.length;
	return [0, 1, 2, 3].map((offset) => MOCK_IMAGES[(globalIndex + offset) % n]);
}

export default defineEventHandler((event) => {
	const query = getQuery(event);

	const page = Math.max(1, Number(query.page) || 1);
	const perPage = Math.min(100, Math.max(1, Number(query.perPage) || 12));
	const sort = (query.sort as string) || "";
	const search = (query.search as string) || "";
	const category = (query.category as string) || "";
	const gender = (query.gender as string) || "";
	const color = (query.color as string) || "";
	const size = (query.size as string) || "";
	const priceFrom = Number(query.priceFrom) || 0;
	const priceTo = Number(query.priceTo) || 0;

	let products = allProductsRaw;

	// Фильтрация
	if (search) {
		const q = search.toLowerCase();
		products = products.filter(
			(p) =>
				p.name.toLowerCase().includes(q) ||
				p.article.toLowerCase().includes(q),
		);
	}

	if (category) {
		products = products.filter((p) => p.category === category);
	}

	if (gender) {
		products = products.filter((p) => p.gender === gender);
	}

	if (color) {
		products = products.filter(
			(p) => p.color.toLowerCase() === color.toLowerCase(),
		);
	}

	if (size) {
		products = products.filter((p) =>
			p.sizes.some((s) => s.size === size && s.count > 0),
		);
	}

	if (priceFrom > 0) {
		products = products.filter((p) => p.price >= priceFrom);
	}

	if (priceTo > 0) {
		products = products.filter((p) => p.price <= priceTo);
	}

	// Сортировка
	switch (sort) {
		case "cheap":
			products = [...products].sort((a, b) => a.price - b.price);
			break;
		case "expensive":
			products = [...products].sort((a, b) => b.price - a.price);
			break;
		case "name":
			products = [...products].sort((a, b) =>
				a.name.localeCompare(b.name, "ru"),
			);
			break;
	}

	const total = products.length;
	const totalPages = Math.ceil(total / perPage);
	const start = (page - 1) * perPage;
	const paged = products.slice(start, start + perPage);

	// Маппинг в формат ответа с моковыми картинками
	const items = paged.map((p) => {
		const globalIndex = allProductsRaw.indexOf(p);
		const images = pickImages(globalIndex);
		return {
			id: globalIndex + 1,
			name: p.name,
			article: p.article,
			category: p.category,
			gender: p.gender,
			price: p.price,
			color: p.color,
			sizes: p.sizes,
			image: images[0],
			images,
		};
	});

	return {
		items,
		total,
		page,
		perPage,
		totalPages,
	};
});
