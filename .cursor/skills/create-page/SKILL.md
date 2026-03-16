---
name: create-page
description: Создание новой страницы Nuxt с SEO-метатегами, layout-интеграцией и навигацией. Используй когда нужно создать новую страницу, роут, раздел сайта или добавить URL.
---

# Создание страницы

## Структура файла

Страница живёт в `app/pages/`. Имя файла = URL-путь.

| Файл | URL |
|------|-----|
| `index.vue` | `/` |
| `about.vue` | `/about` |
| `users/[id].vue` | `/users/:id` |

## Шаблон страницы

```vue
<script setup lang="ts">
useSeoMeta({
	title: "Название страницы",
	description: "Описание для поисковиков",
	ogTitle: "Название страницы",
	ogDescription: "Описание для поисковиков",
});
</script>

<template>
	<div class="page-name">
		<h1 class="page-name__title title title--h1">Заголовок</h1>
		<!-- Контент -->
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/var.scss" as *;
@use "@/assets/styles/mixins" as *;

.page-name {
	padding: var(--spacing-lg) 0;

	&__title {
		margin-bottom: var(--spacing-lg);
	}
}
</style>
```

## С middleware (защищённая страница)

```vue
<script setup lang="ts">
definePageMeta({
	middleware: "auth",
});
</script>
```

## С кастомным layout

```vue
<script setup lang="ts">
definePageMeta({
	layout: "admin",
});
</script>
```

## Добавление в навигацию

После создания страницы добавь ссылку в `AppHeader.vue`:

```typescript
const navItems: MenuItem[] = [
	// ... существующие
	{ label: "Новая страница", to: "/new-page" },
];
```

## Чеклист

- [ ] Файл в `app/pages/`
- [ ] `useSeoMeta()` с title и description
- [ ] BEM-класс на корневом элементе
- [ ] `<style scoped lang="scss">`
- [ ] Токены для отступов/цветов (не хардкод)
- [ ] Ссылка в навигации `AppHeader.vue`
- [ ] Типография через классы из `_typography.scss` (`.title--h1`, `.text--body`)
