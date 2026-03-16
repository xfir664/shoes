# public/ - Публичные статические файлы

Папка `public/` содержит статические файлы, которые будут доступны в корне сайта без какой-либо обработки. Эти файлы копируются "как есть" при сборке.

## 📁 Структура папки

```
public/
├── fonts/           # Оптимизированные веб-шрифты (WOFF, WOFF2)
├── icon/            # Иконки и фавиконы
├── img/             # Оптимизированные изображения
├── robots.txt       # Файл для поисковых роботов
└── README.md        # Документация (текущий файл)
```

## 🎯 Назначение папки

### 1. **Прямой доступ к файлам**

Файлы из `public/` доступны напрямую по корневому URL:

```
public/icon/favicon.ico → https://yoursite.com/favicon.ico
public/img/logo.png     → https://yoursite.com/img/logo.png
public/robots.txt       → https://yoursite.com/robots.txt
```

### 2. **Без обработки сборщиком**

Файлы копируются без изменений, в отличие от `assets/`, где файлы обрабатываются Vite.

### 3. **SEO и метаданные**

Содержит файлы для поисковых систем и браузеров:

- `robots.txt` - правила для поисковых роботов
- Фавиконы и иконки
- Манифест PWA (если есть)

### 4. **Оптимизированные ресурсы**

Файлы в `public/` генерируются из исходников в `raw/` через скрипты:

- `fonts/` - конвертированные из `raw/fonts/`
- `img/` - оптимизированные из `raw/img/`

## 🔧 Как использовать

### Доступ к файлам

#### В HTML/Vue компонентах

```vue
<template>
	<!-- Изображения -->
	<img src="/img/logo.png" alt="Logo" />

	<!-- Иконки -->
	<link rel="icon" href="/icon/favicon.ico" />

	<!-- Шрифты (в CSS) -->
	<style>
		@font-face {
			font-family: "MyFont";
			src: url("/fonts/MyFont.woff2") format("woff2");
		}
	</style>
</template>
```

#### В CSS/SCSS

```scss
// Фоновые изображения
.hero {
	background-image: url("/img/hero-bg.jpg");
}

// Шрифты
@font-face {
	font-family: "Roboto";
	src: url("/fonts/Roboto-Regular.woff2") format("woff2"), url("/fonts/Roboto-Regular.woff")
			format("woff");
	font-weight: 400;
	font-style: normal;
	font-display: swap;
}
```

#### В JavaScript

```typescript
// Прямой URL
const logoUrl = "/img/logo.png";

// Динамическая загрузка
const image = new Image();
image.src = "/img/photo.jpg";
```

### robots.txt

Файл `robots.txt` управляет индексацией сайта поисковыми системами:

```txt
# Разрешить всё для всех ботов
User-agent: *
Allow: /

# Запретить индексацию админки
Disallow: /admin/

# Запретить индексацию API
Disallow: /api/

# Sitemap
Sitemap: https://yoursite.com/sitemap.xml
```

## 📂 Подробнее о подпапках

### fonts/ - Веб-шрифты

Содержит оптимизированные шрифты в форматах WOFF и WOFF2:

```
fonts/
├── Roboto-Regular.woff2
├── Roboto-Regular.woff
├── Roboto-Bold.woff2
└── Roboto-Bold.woff
```

**Источник:** Генерируются из `raw/fonts/` командой:

```bash
pnpm assets:fonts
```

**Использование:**

```scss
@font-face {
	font-family: "Roboto";
	src: url("/fonts/Roboto-Regular.woff2") format("woff2"), url("/fonts/Roboto-Regular.woff")
			format("woff");
	font-weight: 400;
	font-display: swap;
}

body {
	font-family: "Roboto", sans-serif;
}
```

### icon/ - Иконки и фавиконы

Содержит иконки для браузеров и устройств:

```
icon/
├── favicon.ico           # 16x16, 32x32
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png  # 180x180 для iOS
├── android-chrome-192x192.png
└── android-chrome-512x512.png
```

**Использование в HTML:**

```html
<head>
	<link rel="icon" type="image/x-icon" href="/icon/favicon.ico" />
	<link
		rel="icon"
		type="image/png"
		sizes="32x32"
		href="/icon/favicon-32x32.png"
	/>
	<link
		rel="icon"
		type="image/png"
		sizes="16x16"
		href="/icon/favicon-16x16.png"
	/>
	<link
		rel="apple-touch-icon"
		sizes="180x180"
		href="/icon/apple-touch-icon.png"
	/>
</head>
```

**В Nuxt (nuxt.config.ts или useHead):**

```typescript
useHead({
	link: [
		{ rel: "icon", type: "image/x-icon", href: "/icon/favicon.ico" },
		{
			rel: "apple-touch-icon",
			sizes: "180x180",
			href: "/icon/apple-touch-icon.png",
		},
	],
});
```

### img/ - Изображения

Оптимизированные изображения для использования на сайте:

```
img/
├── logo.png
├── hero-bg.jpg
├── product-1.webp
└── banner.svg
```

**Источник:** Оптимизируются из `raw/img/` командами:

```bash
pnpm assets:images  # Растровые изображения (jpg, png)
pnpm assets:svg     # SVG файлы
```

**Использование:**

```vue
<template>
	<!-- Простое изображение -->
	<img src="/img/logo.png" alt="Логотип" />

	<!-- С Nuxt Image -->
	<NuxtImg src="/img/hero-bg.jpg" alt="Hero" width="1920" height="1080" />

	<!-- Picture для WebP -->
	<picture>
		<source srcset="/img/product-1.webp" type="image/webp" />
		<img src="/img/product-1.jpg" alt="Product" />
	</picture>
</template>
```

## 🚀 Рабочий процесс

### 1. Добавление нового ресурса

#### Шрифты:

1. Поместите TTF/OTF файлы в `raw/fonts/`
2. Запустите: `pnpm assets:fonts`
3. Шрифты появятся в `public/fonts/`

#### Изображения:

1. Поместите исходники в `raw/img/`
2. Запустите: `pnpm assets:images` (для jpg/png) или `pnpm assets:svg` (для SVG)
3. Оптимизированные файлы появятся в `public/img/`

#### Иконки:

1. Поместите SVG в `raw/icons/`
2. Запустите: `pnpm assets:icons`
3. Спрайты появятся в `app/assets/sprites/`

### 2. Автоматическая обработка

Для автоматической обработки при изменениях:

```bash
pnpm assets:watch
```

Эта команда отслеживает изменения в `raw/` и автоматически запускает обработку.

## 🎯 Best Practices

### 1. Используйте WebP для изображений

```html
<picture>
	<source srcset="/img/photo.webp" type="image/webp" />
	<source srcset="/img/photo.jpg" type="image/jpeg" />
	<img src="/img/photo.jpg" alt="Photo" />
</picture>
```

### 2. Оптимизируйте размеры

- Используйте подходящий формат (JPG для фото, PNG для графики, WebP для всего)
- Генерируйте responsive версии (разные размеры)
- Используйте lazy loading: `<img loading="lazy" />`

### 3. Правильные имена файлов

```
✅ Хорошо:
- logo.png
- hero-background.jpg
- product-thumbnail-1.webp

❌ Плохо:
- Image1.PNG
- bg_new_final_2.jpg
- photo (1).jpeg
```

### 4. WOFF2 первым

```scss
@font-face {
	font-family: "MyFont";
	// WOFF2 первым - лучшее сжатие
	src: url("/fonts/MyFont.woff2") format("woff2"), url("/fonts/MyFont.woff")
			format("woff");
}
```

### 5. font-display для шрифтов

```scss
@font-face {
	font-family: "MyFont";
	src: url("/fonts/MyFont.woff2") format("woff2");
	font-display: swap; // Показывать системный шрифт пока загружается
}
```

### 6. Структурируйте изображения

```
img/
├── products/
│   ├── product-1.webp
│   └── product-2.webp
├── blog/
│   ├── post-1-thumbnail.jpg
│   └── post-2-thumbnail.jpg
└── ui/
    ├── logo.png
    └── icon-search.svg
```

## 🔒 Безопасность

### 1. robots.txt

Запретите доступ к служебным папкам:

```txt
User-agent: *
Disallow: /api/
Disallow: /admin/
Disallow: /_nuxt/
Allow: /
```

### 2. Не размещайте чувствительные данные

❌ Не кладите в `public/`:

- Конфигурационные файлы
- API ключи
- Приватные документы
- Бэкапы базы данных

### 3. CORS для шрифтов

Если шрифты на CDN, добавьте CORS заголовки в `nuxt.config.ts`:

```typescript
nitro: {
  routeRules: {
    '/fonts/**': {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  }
}
```

## 🔍 Debugging

### Файл не загружается?

1. Проверьте путь - начинается с `/`
2. Проверьте регистр букв (case-sensitive на Linux)
3. Проверьте, что файл действительно в `public/`
4. Очистите кэш: `rm -rf .nuxt .output`

### Шрифт не работает?

1. Проверьте формат в `src:` (woff2, woff)
2. Проверьте MIME-type
3. Проверьте CORS заголовки
4. Откройте DevTools → Network → проверьте загрузку

## 📊 Размеры файлов

### Рекомендуемые размеры:

| Тип              | Рекомендация         |
| ---------------- | -------------------- |
| Фавикон          | < 100KB              |
| Шрифт (WOFF2)    | < 50KB на начертание |
| Логотип PNG      | < 100KB              |
| Hero изображение | < 500KB              |
| Thumbnail        | < 50KB               |
| SVG иконка       | < 10KB               |

### Проверка размеров:

```bash
# Linux/Mac
du -sh public/fonts/*
du -sh public/img/*

# Найти файлы больше 1MB
find public -type f -size +1M
```

## 📚 Дополнительные ресурсы

- [Nuxt Public Directory](https://nuxt.com/docs/guide/directory-structure/public)
- [Web Font Best Practices](https://web.dev/font-best-practices/)
- [Image Optimization Guide](https://web.dev/fast/#optimize-your-images)

---

[← Назад к главному README](../README.md)
