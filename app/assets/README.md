# assets/

Статические ресурсы, обрабатываемые сборщиком (Vite).

## Структура

```
assets/
  styles/          # SCSS-стили
    _tokens.scss   # CSS Custom Properties (дизайн-токены)
    _dark.scss     # Переопределение токенов для dark mode
    _typography.scss # Типографика (SCSS maps -> классы)
    _animations.scss # Keyframes + утилитарные классы
    var.scss       # SCSS-переменные (только брейкпоинты)
    mixins/        # SCSS-миксины (font, interactive, responsive, typography)
    common.scss    # Утилитарные CSS-классы
    global.scss    # Reset, body
    fonts.scss     # @font-face
    main.scss      # Точка входа (порядок импортов)
  fonts/           # Шрифты (WOFF, WOFF2)
  sprites/         # SVG-спрайты
```

## Подключение стилей

Глобальные стили подключены в `nuxt.config.ts`:

```typescript
css: ["~/assets/styles/main.scss"]
```

В компонентах подключаются только миксины и конфиги:

```scss
@use "@/assets/styles/var.scss" as *;
@use "@/assets/styles/mixins" as *;
```

## Шрифты

Исходные файлы: `raw/fonts/` (TTF/OTF). Конвертированные: `assets/fonts/` (WOFF/WOFF2).
Подключение через миксин `font-face` в `fonts.scss`.

## Спрайты

Исходные SVG: `raw/icons/`. Сгенерированные спрайты: `assets/sprites/`.
Используются через компонент `MyIcon`.
