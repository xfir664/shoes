# middleware/

Route middleware — проверки перед переходом на страницу.

## Содержимое

| Файл | Назначение |
|------|-----------|
| `auth.ts` | Проверка авторизации. Редирект на `/` если нет accessToken. |

## Использование на странице

```vue
<script setup lang="ts">
definePageMeta({ middleware: "auth" });
</script>
```

## Глобальный middleware

Для применения ко всем страницам переименуй файл в `auth.global.ts`.

## Создание нового middleware

```typescript
export default defineNuxtRouteMiddleware((to) => {
  // Логика проверки
  if (!condition) {
    return navigateTo("/");
  }
});
```
