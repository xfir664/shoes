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

const products = productsData as RawProduct[];

function pickImages(globalIndex: number): string[] {
	const n = MOCK_IMAGES.length;
	return [0, 1, 2, 3].map((offset) => MOCK_IMAGES[(globalIndex + offset) % n]);
}

export default defineEventHandler((event) => {
	const article = getRouterParam(event, "article");
	const index = products.findIndex((p) => p.article === article);

	if (index === -1) {
		throw createError({
			statusCode: 404,
			statusMessage: "Товар не найден",
		});
	}

	const p = products[index];
	const images = pickImages(index);

	return {
		id: index + 1,
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
