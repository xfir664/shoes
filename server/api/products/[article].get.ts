import { readFileSync } from "node:fs";
import { resolve } from "node:path";

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

let cachedProducts: RawProduct[] | null = null;

function loadProducts(): RawProduct[] {
	if (!cachedProducts) {
		const filePath = resolve("server/products.json");
		const raw = readFileSync(filePath, "utf-8");
		cachedProducts = JSON.parse(raw);
	}
	return cachedProducts!;
}

export default defineEventHandler((event) => {
	const article = getRouterParam(event, "article");
	const products = loadProducts();
	const index = products.findIndex((p) => p.article === article);

	if (index === -1) {
		throw createError({
			statusCode: 404,
			statusMessage: "Товар не найден",
		});
	}

	const p = products[index];

	return {
		id: index + 1,
		name: p.name,
		article: p.article,
		category: p.category,
		gender: p.gender,
		price: p.price,
		color: p.color,
		sizes: p.sizes,
		image: MOCK_IMAGES[index % MOCK_IMAGES.length],
	};
});
