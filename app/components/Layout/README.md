# Layout/

Компоненты общей структуры страницы — шапка и подвал.

## Компоненты

### AppHeader

Шапка сайта с логотипом и навигацией.

- Слот `logo` — кастомный логотип
- Слот `actions` — действия справа (переключатель темы, auth)
- Навигация: массив `navItems` типа `MenuItem[]`
- Активная ссылка подсвечивается через `router-link-exact-active`

### AppFooter

Подвал сайта с тремя колонками.

- Слот `default` — полностью кастомный контент
- По умолчанию: навигация, ресурсы (Nuxt/Vue/MDI docs), описание проекта
- Копирайт с динамическим годом

## Использование

Оба компонента используются в `layouts/default.vue`:

```vue
<template>
  <div class="layout">
    <AppHeader />
    <main class="layout__main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
```

## Добавление ссылки в навигацию

В `AppHeader.vue` обнови массив `navItems`:

```typescript
const navItems: MenuItem[] = [
  { label: "Компоненты", to: "/" },
  { label: "Иконки", to: "/icons" },
  { label: "Новая страница", to: "/new" },
];
```
