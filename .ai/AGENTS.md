# Nuxt Template — обзор

> Полная документация: `CLAUDE.md`. Навигация: [INDEX.md](INDEX.md).

## Стек

Nuxt 4, Vue 3 (Composition API, `<script setup>`), TypeScript (strict), SCSS + CSS Custom Properties, Pinia, MDI icons, pnpm.

## Структура

```
app/
  assets/styles/     # Токены, тема, миксины, утилиты, брейкпоинты
  components/
    UI/              # 12 компонентов (My-префикс), _config.scss + @each варианты
    Layout/          # AppHeader, AppFooter
    State/           # AppLoading, AppError, AppEmpty
  composables/       # useApi, useApiFetch, useTheme, useBreakpoint
  stores/            # Pinia (Options API): useAuthStore, useUiStore
  utils/             # Чистые функции
  types/             # TypeScript type
  interface/         # TypeScript interface
  pages/             # Файловый роутинг
server/api/          # Nitro endpoints
raw/                 # Ассеты → asset pipeline → public/
```

## Ключевые конвенции

- Авто-импорты Nuxt (ref, computed, watch, onMounted, navigateTo и т.д.) — не импортируй вручную
- Компоненты с `pathPrefix: false` — используй имя напрямую
- UI: My-префикс, Layout/State: App-префикс
- Стили: `var(--token)`, BEM, `<style scoped lang="scss">`
- Функции ≤20 строк, DRY при 2+ использованиях, JSDoc, русский язык
