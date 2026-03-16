---
name: design-system
description: Управление дизайн-системой проекта — токены, цвета, типографика, анимации, тёмная тема. Используй когда нужно добавить новый цвет, отступ, тень, шрифтовой размер, анимацию, настроить dark mode или связать токены с компонентным конфигом.
---

# Дизайн-система

## Архитектура

```
assets/styles/
  _tokens.scss       — CSS Custom Properties (:root), единый источник правды
  _dark.scss         — переопределение семантических токенов для dark mode
  _typography.scss   — SCSS maps + классы .title, .text, .subtitle
  _animations.scss   — @keyframes + утилитарные .animate-* классы
  var.scss           — SCSS-переменные для брейкпоинтов (НЕ в :root)
  mixins/            — SCSS-миксины (font, interactive, responsive, typography)
  common.scss        — утилитарные CSS-классы (.flex, .visually-hidden, …)
  global.scss        — body reset, базовые стили
  fonts.scss         — @font-face
  main.scss          — точка входа (порядок импортов)
```

## Токены (`_tokens.scss`)

Все значения в `:root`. Категории и префиксы:

| Категория | Префикс | Пример |
|-----------|---------|--------|
| Цвет-примитив | `--c-` | `--c-blue-600`, `--c-neutral-200` |
| Цвет-семантика | `--c-` | `--c-page-bg`, `--c-text`, `--c-disabled-bg` |
| Шрифт | `--fs-` | `--fs-sm` (14px), `--fs-base` (16px), `--fs-xl` (24px) |
| Высота строки | `--lh-` | `--lh-tight` (20px), `--lh-relaxed` (24px) |
| Отступы | `--spacing-` | `--spacing-xs` (4px) … `--spacing-xl` (32px) |
| Радиусы | `--radius-` | `--radius-sm` (4px), `--radius-md` (8px) |
| Тени | `--shadow-` | `--shadow-sm`, `--shadow-md` |
| Z-index | `--z-` | `--z-dropdown` (100) … `--z-tooltip` (700) |
| Анимации | `--duration-` | `--duration-fast` (150ms), `--duration-base` (300ms) |
| Переход | `--transition-` | `--transition-base` |

### Добавление нового токена

1. Добавь в `:root` внутри `_tokens.scss` в нужную секцию
2. Если семантический — добавь переопределение в `_dark.scss`
3. Используй: `color: var(--c-new-token);`

## Тёмная тема (`_dark.scss`)

Механизм: `[data-theme="dark"]` переопределяет **только семантические** токены.

```scss
// _dark.scss
[data-theme="dark"] {
    --c-page-bg: #121212;
    --c-text: #e0e0e0;
}
```

Фоллбэк: `@media (prefers-color-scheme: dark)` для `:root:not([data-theme])`.

Управление из Vue: `useTheme()` → `toggleTheme()`, `setTheme("dark")`.

### Добавление нового семантического токена

1. Добавь в `_tokens.scss` (секция «Семантические»): `--c-border: var(--c-neutral-300);`
2. Добавь переопределение в `_dark.scss`: `--c-border: #444;`
3. Добавь в `@media (prefers-color-scheme: dark)` блок `_dark.scss`

## Типографика (`_typography.scss`)

SCSS map → миксин `typography-variant` → классы `.title--base`, `.text--primary`, …

```scss
$title-variants: (
    base: (mob: 18px, tab: 18px, desk: 18px, lh: 21px, color: #000),
    primary: (mob: 23px, tab: 23px, desk: 23px, lh: 34px, color: #419516),
);
```

### Добавление типографического варианта

1. Добавь ключ в нужный map (`$title-variants`, `$text-variants`, `$subtitle-variants`)
2. Класс `.title--name` сгенерируется через `@each` автоматически
3. Используй: `<h1 class="title title--name">Текст</h1>`

## Анимации (`_animations.scss`)

Keyframes + утилитарные классы. Длительности через токены.

| Keyframe | Класс | Назначение |
|----------|-------|-----------|
| `fadeIn` | `.animate-fade-in` | Плавное появление |
| `fadeOut` | `.animate-fade-out` | Плавное исчезновение |
| `slideInUp` | `.animate-slide-up` | Появление снизу |
| `slideInDown` | `.animate-slide-down` | Появление сверху |
| `slideInLeft` | `.animate-slide-left` | Появление слева |
| `slideInRight` | `.animate-slide-right` | Появление справа |
| `scaleIn` | `.animate-scale-in` | Масштабирование с появлением |
| `skeletonPulse` | `.animate-skeleton` | Пульсация-заглушка |
| `spin` | `.animate-spin` | Бесконечное вращение |

### Добавление новой анимации

1. Создай `@keyframes name` в `_animations.scss`
2. Добавь класс `.animate-name` с `animation: name var(--duration-base) ease both;`
3. Добавь демо на странице `/animations`

## Связь с компонентами

Компонентные конфиги (`_config.scss`) используют токены:

```scss
// components/UI/MyBtn/_btn.config.scss
$btn-variants: (
    primary: (
        color: var(--c-white),
        bg: var(--c-blue-600),
        // ...
    ),
);
```

Стили генерируются через `@each` + миксины `interactive-colors`, `responsive-font`.

### Чеклист при изменении дизайн-системы

- [ ] Токен добавлен в `_tokens.scss`
- [ ] Если семантический — переопределён в `_dark.scss` (оба блока)
- [ ] Значения из токенов, а не хардкод
- [ ] `main.scss` — порядок импортов не нарушен
