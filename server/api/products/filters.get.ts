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

let cachedProducts: RawProduct[] | null = null;

function loadProducts(): RawProduct[] {
	if (!cachedProducts) {
		const filePath = resolve("server/products.json");
		const raw = readFileSync(filePath, "utf-8");
		cachedProducts = JSON.parse(raw);
	}
	return cachedProducts!;
}

export default defineEventHandler(() => {
	const products = loadProducts();

	const categories = [...new Set(products.map((p) => p.category))].sort(
		(a, b) => a.localeCompare(b, "ru"),
	);

	const genders = [
		...new Set(products.map((p) => p.gender).filter(Boolean)),
	].sort((a, b) => a!.localeCompare(b!, "ru")) as string[];

	const colors = [
		...new Set(products.map((p) => p.color.toLowerCase())),
	].sort((a, b) => a.localeCompare(b, "ru"));

	const sizes = [
		...new Set(products.flatMap((p) => p.sizes.map((s) => s.size))),
	].sort((a, b) => Number(a) - Number(b));

	const prices = products.map((p) => p.price);

	return {
		categories,
		genders,
		colors,
		sizes,
		priceMin: Math.min(...prices),
		priceMax: Math.max(...prices),
	};
});
