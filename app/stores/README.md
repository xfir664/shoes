# stores/

Pinia-сторы для управления состоянием.

## Содержимое

| Файл | Store | Назначение |
|------|-------|-----------|
| `useUiStore.ts` | `useUiStore` | Состояние UI: sidebar, toast-уведомления |
| `useAuthStore.ts` | `useAuthStore` | Авторизация: user, accessToken, login/logout |

## Использование

```typescript
const ui = useUiStore();
ui.toggleSidebar();
ui.addToast({ type: "success", title: "Сохранено" });

const auth = useAuthStore();
if (auth.isAuthenticated) { ... }
await auth.login({ email, password });
```

## Конвенции

- Файл: `useName.ts`
- Формат: Pinia Options API (`defineStore("name", { state, getters, actions })`)
- Типизация: state через TypeScript interface
