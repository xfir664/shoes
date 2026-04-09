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

const products = productsData as RawProduct[];

export default defineEventHandler(() => {

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
