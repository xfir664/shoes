# CLAUDE.md — Nuxt Template

Шаблон для быстрого развёртывания Nuxt 4 фронтенда. Самодостаточный — клонируй и работай.

## Навигация

**Точка входа: [`.ai/INDEX.md`](.ai/INDEX.md)** — карта проекта, ссылки на правила и скиллы.

## Команды

```bash
pnpm dev          # dev server http://localhost:3000
pnpm build        # build to .output/
pnpm start        # run .output/server/index.mjs
pnpm generate     # static site generation
pnpm lint         # ESLint
pnpm format       # Prettier

# Asset pipeline
pnpm assets:fonts    # TTF → WOFF/WOFF2 (raw/fonts → public/fonts)
pnpm assets:icons    # SVG sprite (raw/icons)
pnpm assets:svg      # optimize SVGs (raw/img)
pnpm assets:images   # optimize images (raw/img)
pnpm assets:all      # все четыре выше
pnpm assets:watch    # watch raw/ и перезапуск
```

## Стек

Nuxt 4, Vue 3 (Composition API, `<script setup>`), TypeScript (strict), SCSS + CSS Custom Properties, Pinia, MDI icons, pnpm.

## Архитектура

```
app/
  assets/styles/       # Токены (_tokens.scss), тема (_dark.scss), миксины, утилиты
  components/
    UI/                # 12 компонентов: MyBtn, MyInput, MySearch, MySelect, MySelectOption,
                       #   MyCheckboxInput, MyRadioInput, MyFileInput, MyIcon, MyLink, MyNavLink, MyPagination
    Layout/            # AppHeader (навигация + слоты), AppFooter (3 колонки)
    State/             # AppLoading (spinner/skeleton/dots), AppError (retry), AppEmpty
  composables/         # useApi, useApiFetch, useTheme, useBreakpoint
  stores/              # Pinia: useAuthStore, useUiStore
  utils/               # Чистые функции-хелперы
  types/               # TypeScript type
  interface/           # TypeScript interface
  pages/               # Файловый роутинг (/, /icons, /animations)
  middleware/           # Route middleware (auth.ts)
  layouts/             # Nuxt layouts
server/api/            # Nitro API endpoints
raw/                   # Необработанные ассеты → scripts → public/
```

## Nuxt Auto-imports

НЕ импортируй вручную: `ref`, `computed`, `watch`, `onMounted`, `useState`, `useRuntimeConfig`, `navigateTo`, `definePageMeta`, `useSeoMeta`, `useHead`.

Компоненты зарегистрированы с `pathPrefix: false` — используй имя напрямую.

## Конвенции

### Компоненты
- **UI**: префикс `My` (MyBtn, MyInput) — каждый в своей директории `MyName/MyName.vue`
- **Layout**: префикс `App` (AppHeader, AppFooter)
- **State**: префикс `App` (AppLoading, AppError, AppEmpty)
- **Варианты**: SCSS map в `_config.scss` + `@each` → `.component--variant`
- **Лимит**: ≤150 строк OK, 150–250 допустимо, >250 дробить

### Vue SFC порядок
```vue
<script setup lang="ts">
// 1. Импорты (только не авто-импортируемое)
// 2. defineProps / defineEmits
// 3. Реактивные данные (ref, computed)
// 4. Методы
// 5. Lifecycle hooks
</script>
<template><!-- один корневой элемент, BEM-класс --></template>
<style scoped lang="scss"></style>
```

### Стили
- Дизайн-токены в `_tokens.scss` как CSS Custom Properties — `var(--token-name)`
- Тёмная тема: `_dark.scss` (`[data-theme="dark"]`)
- Брейкпоинты: SCSS-переменные в `var.scss` (CSS vars не работают в `@media`)
- Миксины: `@use "@/assets/styles/mixins" as *` (font-face, interactive-colors, responsive-font, typography-variant)
- BEM: `.block`, `.block__element`, `.block--modifier`

### Код
- **Язык**: русский (UI, комментарии)
- **Отступы**: табы; **Кавычки**: двойные
- **Функции**: ≤20 строк, максимум 30–40
- **DRY**: выносить при 2+ использованиях (`utils/`, `composables/`, `types/`, `interface/`)
- **JSDoc**: на все экспортируемые функции
- **Булевы имена**: `is`, `has`, `can`, `should`
- **Pinia**: Options API (`defineStore("name", { state, getters, actions })`)
- **RuntimeConfig**: public — `useRuntimeConfig().public.apiUrl`, private — `useRuntimeConfig().fastApiUrl`

### Структура директорий компонентов

```
ComponentName/
  ComponentName.vue       ← script + template
  ComponentName.scss      ← стили (когда вынесены)
  scripts/
    useComponentName.ts   ← локальный composable (только этот компонент)
  ChildComponent/
    ChildComponent.vue
```

- `scripts/` внутри компонента — только для этого компонента
- `app/composables/`, `app/utils/` — при 2+ использованиях

## `.ai/` Convention

- `.ai/INDEX.md` — точка входа, карта проекта
- `.ai/status.md` — текущее состояние
- `.ai/decisions.md` — архитектурные решения
- При значимых изменениях — обновляй status.md и decisions.md
