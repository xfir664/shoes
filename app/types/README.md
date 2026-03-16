# types/

TypeScript-типы (`type`), используемые в нескольких файлах.

## Содержимое

| Файл | Типы | Назначение |
|------|------|-----------|
| `api.ts` | ApiResponse, PaginatedResponse, ApiError, PaginationParams | Типы API-ответов |
| `user.ts` | User, UserRole, AuthTokens, LoginCredentials, RegisterData | Типы пользователя и авторизации |
| `ui.ts` | ToastMessage, MenuItem, BreadcrumbItem, ComponentVariant | Типы UI-компонентов |

## Использование

```typescript
import type { User } from "~/types/user";
import type { ApiResponse } from "~/types/api";
import type { MenuItem } from "~/types/ui";
```

## Конвенции

- Один файл = один домен
- Только `type` (интерфейсы — в `interface/`)
- Используется в 2+ файлах (локальные типы оставляй в файле)
