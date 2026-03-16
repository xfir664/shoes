# Nuxt Template — навигация

> **Это точка входа.** Шаблон для быстрого развёртывания Nuxt 4 фронтенда.

## Документация

| Файл | Что содержит |
|------|-------------|
| `CLAUDE.md` | Главное: стек, архитектура, конвенции, компоненты, стили, команды |
| `.ai/INDEX.md` | ← ты здесь |
| `.ai/status.md` | Текущее состояние: компоненты, стили, страницы, планы |
| `.ai/decisions.md` | Архитектурные решения: стили, Pinia, брейкпоинты, темы |

## Правила (Cursor)

| Файл | Описание | alwaysApply |
|------|----------|-------------|
| `.cursor/rules/nuxt-project.mdc` | Nuxt: авто-импорты, роутинг, компоненты, RuntimeConfig | ✅ |
| `.cursor/rules/clean-code.mdc` | Чистый код: лимит функций, DRY, composables, utils | ✅ |
| `.cursor/rules/vue-component.mdc` | Vue SFC: структура, props, emits, BEM, стили | по глобу `.vue` |
| `.cursor/rules/scss-styling.mdc` | SCSS: токены, брейкпоинты, миксины, конфиги | по глобу `.scss` |
| `.cursor/rules/component-registry.mdc` | Реестр всех компонентов: пропсы, emits, варианты | по глобу `.vue` |
| `.cursor/rules/code-review.mdc` | Чеклист ревью (вызов: `@code-review`) | — |

## Скиллы (Cursor)

| Скилл | Когда использовать |
|-------|-------------------|
| `.cursor/skills/create-component/SKILL.md` | Новый UI-компонент (MyName) |
| `.cursor/skills/create-page/SKILL.md` | Новая страница (файловый роутинг) |
| `.cursor/skills/create-composable/SKILL.md` | Новый composable (useSmth) |
| `.cursor/skills/design-system/SKILL.md` | Токены, цвета, темы, типографика, анимации |
| `.cursor/skills/ui-ux-design/SKILL.md` | Визуальная полировка, отступы, состояния, доступность |

## Маршрутизация задач

| Тип задачи | Куда идти |
|------------|-----------|
| Новый UI-компонент | → скилл `create-component` |
| Новая страница | → скилл `create-page` |
| Новый composable | → скилл `create-composable` |
| Токены, тема, типографика | → скилл `design-system` |
| UI/UX полировка | → скилл `ui-ux-design` |
| Ревью кода | → правило `code-review` |
| Всё остальное | → `CLAUDE.md` (конвенции) |

## Комбинированные задачи

Если задача затрагивает несколько областей (например, «создай компонент с новым цветом»):
1. `design-system` — добавь токен
2. `create-component` — создай компонент
3. `ui-ux-design` — проверь визуальное качество
