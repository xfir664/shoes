# layouts/

Шаблоны страниц. Определяют общую структуру (header, content, footer).

## Текущие layouts

### default.vue

Основной layout. Включает AppHeader, контентную область и AppFooter.

```vue
<template>
  <div class="layout">
    <AppHeader />
    <main class="layout__main">
      <div class="layout__container">
        <slot />
      </div>
    </main>
    <AppFooter />
  </div>
</template>
```

## Использование

По умолчанию все страницы используют `default.vue`. Для кастомного layout:

```vue
<script setup lang="ts">
definePageMeta({ layout: "admin" });
</script>
```

Для отключения layout:

```vue
<script setup lang="ts">
definePageMeta({ layout: false });
</script>
```

## Создание нового layout

Создай файл в `layouts/` (например, `admin.vue`, `auth.vue`). Обязательно включи `<slot />` для контента страницы.
