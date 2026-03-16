# pages/

Страницы приложения. Файловый роутинг — имя файла = URL.

## Текущие страницы

| Файл | URL | Описание |
|------|-----|----------|
| `index.vue` | `/` | Showcase всех UI и State компонентов |
| `icons.vue` | `/icons` | Каталог MDI-иконок с поиском |
| `animations.vue` | `/animations` | Демо всех анимаций с replay |

## Создание новой страницы

```vue
<script setup lang="ts">
useSeoMeta({
  title: "Название",
  description: "Описание",
  ogTitle: "Название",
  ogDescription: "Описание",
});
</script>

<template>
  <div class="page-name">
    <h1 class="page-name__title title title--h1">Заголовок</h1>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/var.scss" as *;
@use "@/assets/styles/mixins" as *;
</style>
```

После создания добавь ссылку в навигацию `AppHeader.vue`.

## Динамические маршруты

- `[id].vue` — `/users/123`
- `[...slug].vue` — catch-all (404)
- `[[query]].vue` — опциональный параметр

## Middleware

```vue
<script setup lang="ts">
definePageMeta({ middleware: "auth" });
</script>
```
