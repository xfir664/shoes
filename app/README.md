# app/

Исходный код Nuxt-приложения.

## Структура

```
app/
  assets/styles/   # SCSS: токены, миксины, типографика, анимации
  assets/fonts/    # Шрифты (WOFF, WOFF2)
  assets/sprites/  # SVG-спрайты
  components/
    UI/            # 12 UI-компонентов (MyBtn, MyInput, ...)
    Layout/        # AppHeader, AppFooter
    State/         # AppLoading, AppError, AppEmpty
  composables/     # useApi, useTheme, useBreakpoint
  utils/           # Чистые функции-хелперы
  stores/          # Pinia: useAuthStore, useUiStore
  types/           # TypeScript type (api, user, ui)
  interface/       # TypeScript interface
  pages/           # Файловый роутинг (index, icons, animations)
  middleware/      # Route middleware (auth)
  layouts/         # Nuxt layouts (default)
  plugins/         # Nuxt plugins
  scripts/         # Скрипты сборки
  app.vue          # Корневой компонент (SEO, titleTemplate)
```

## Ключевые файлы

- `app.vue` — корневой компонент с `useHead` (lang, charset, viewport, titleTemplate)
- `nuxt.config.ts` — конфигурация Nuxt, Pinia, runtimeConfig
- `assets/styles/main.scss` — точка входа для глобальных стилей

## Быстрый старт

```bash
pnpm install
pnpm dev
```

Приложение запустится на `http://localhost:3000`.
