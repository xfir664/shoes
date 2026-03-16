<!--
  MyBreadcrumbs — хлебные крошки с JSON-LD BreadcrumbList.

  Использование:
    <MyBreadcrumbs :items="[
      { label: 'Главная', to: '/' },
      { label: 'Каталог', to: '/catalog' },
      { label: 'Товар', current: true },
    ]" />
-->
<script setup lang="ts">
import type { BreadcrumbItem } from "~/types/ui";

const props = defineProps<{
	items: BreadcrumbItem[];
}>();

const config = useRuntimeConfig();

const jsonLd = computed(() => ({
	"@context": "https://schema.org",
	"@type": "BreadcrumbList",
	itemListElement: props.items.map((item, idx) => ({
		"@type": "ListItem",
		position: idx + 1,
		name: item.label,
		...(item.to ? { item: `${config.public.siteUrl || ''}${item.to}` } : {}),
	})),
}));

useHead({
	script: [
		{
			type: "application/ld+json",
			innerHTML: computed(() => JSON.stringify(jsonLd.value)),
		},
	],
});
</script>

<template>
	<nav class="breadcrumbs" aria-label="Навигация">
		<template v-for="(item, idx) in items" :key="idx">
			<NuxtLink
				v-if="item.to && !item.current"
				:to="item.to"
				class="breadcrumbs__item"
			>
				{{ item.label }}
			</NuxtLink>
			<span v-else class="breadcrumbs__item breadcrumbs__item--current">
				{{ item.label }}
			</span>
			<span
				v-if="idx < items.length - 1"
				class="breadcrumbs__separator mdi mdi-chevron-right"
			/>
		</template>
	</nav>
</template>

<style scoped lang="scss">
.breadcrumbs {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: var(--spacing-xs);
	margin-bottom: var(--spacing-xl);
	font-size: var(--fs-sm);

	&__item {
		color: var(--c-text-secondary);
		text-decoration: none;
		transition: var(--transition-base);

		&:hover:not(&--current) {
			color: var(--c-primary);
		}

		&--current {
			color: var(--c-text);
			font-weight: var(--fw-medium);
		}
	}

	&__separator {
		color: var(--c-neutral-400);
		font-size: var(--fs-xs);
	}
}
</style>
