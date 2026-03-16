# composables/

Реактивные хуки (composables). Nuxt авто-импортирует их по имени функции.

## Содержимое

| Файл | Функция | Назначение |
|------|---------|-----------|
| `useApi.ts` | `useApi()` | HTTP-запросы (get, post, put, patch, del) с baseURL из runtimeConfig |
| `useApi.ts` | `useApiFetch()` | SSR-совместимый fetch (обёртка над useFetch) |
| `useTheme.ts` | `useTheme()` | Управление темой: toggleTheme, setTheme, isDark |
| `useBreakpoint.ts` | `useBreakpoint()` | Реактивный брейкпоинт: isMobile, isTablet, isDesktop |

## Использование

```typescript
const { get, post } = useApi();
const users = await get<User[]>("/users");

const { isDark, toggleTheme } = useTheme();

const { isMobile } = useBreakpoint();
```

## Конвенции

- Имя файла: `useName.ts`
- Экспорт: `export function useName()`
- SSR: проверяй `import.meta.client` перед `window`/`document`
- Cleanup: `onUnmounted()` для listeners и таймеров
