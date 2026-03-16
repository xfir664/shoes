# public/img/ - Оптимизированные изображения

Папка `public/img/` содержит оптимизированные изображения, готовые для использования на сайте.

## 🎯 Назначение папки

Это **результат** оптимизации изображений из `raw/img/`. Файлы здесь:

- ✅ Оптимизированы и сжаты
- ✅ Готовы к использованию
- ✅ Доступны напрямую по URL `/img/...`
- ✅ НЕ обрабатываются сборщиком

## 🔄 Откуда берутся файлы

```
raw/img/hero.jpg (2.5MB)  →  [pnpm assets:images]  →  public/img/hero.jpg (800KB)
raw/img/logo.png (500KB)  →  [pnpm assets:images]  →  public/img/logo.png (150KB)
raw/img/icon.svg (45KB)   →  [pnpm assets:svg]     →  public/img/icon.svg (12KB)
```

**Не редактируйте файлы вручную** - они генерируются автоматически!

## 📁 Рекомендуемая структура

Организуйте изображения по категориям:

```
public/img/
├── hero/              # Hero изображения
│   ├── summer-sale.jpg
│   ├── summer-sale.webp
│   └── winter-collection.jpg
├── products/          # Товары
│   ├── category-1/
│   │   ├── product-1.jpg
│   │   ├── product-1.webp
│   │   └── product-2.jpg
│   └── category-2/
│       └── product-3.jpg
├── blog/             # Блог
│   ├── post-1-thumbnail.jpg
│   └── post-2-thumbnail.jpg
├── team/             # Команда
│   ├── john-doe.jpg
│   └── jane-smith.jpg
├── ui/               # UI элементы
│   ├── logo.svg
│   ├── logo-white.svg
│   └── pattern.png
└── backgrounds/      # Фоны
    └── texture.png
```

## 💻 Использование изображений

### Простое изображение

```vue
<template>
	<img src="/img/products/product-1.jpg" alt="Product name" />
</template>
```

### С WebP fallback

```vue
<template>
	<picture>
		<source srcset="/img/hero/summer-sale.webp" type="image/webp" />
		<source srcset="/img/hero/summer-sale.jpg" type="image/jpeg" />
		<img src="/img/hero/summer-sale.jpg" alt="Summer sale" />
	</picture>
</template>
```

### Responsive изображения

```vue
<template>
	<img
		src="/img/hero/hero-640.jpg"
		srcset="
			/img/hero/hero-640.jpg   640w,
			/img/hero/hero-1280.jpg 1280w,
			/img/hero/hero-1920.jpg 1920w
		"
		sizes="100vw"
		alt="Hero image"
	/>
</template>
```

### Lazy Loading

```vue
<template>
	<img src="/img/products/product-1.jpg" alt="Product" loading="lazy" />
</template>
```

### Фоновое изображение в CSS

```scss
.hero {
	background-image: url("/img/hero/summer-sale.jpg");
	background-size: cover;
	background-position: center;
}

// С WebP support
@supports (background-image: url("/img/hero/summer-sale.webp")) {
	.hero {
		background-image: url("/img/hero/summer-sale.webp");
	}
}
```

### С Nuxt Image

```vue
<template>
	<NuxtImg
		src="/img/products/product-1.jpg"
		alt="Product"
		width="800"
		height="600"
		loading="lazy"
	/>
</template>
```

## 📊 Оптимизация

### Текущие настройки

**JPG:**

- Quality: 80
- Progressive: true
- Сжатие: ~60-70%

**PNG:**

- compressionLevel: 9
- Progressive: true
- Сжатие: ~50-70%

**SVG:**

- Удаление метаданных
- Упрощение путей
- Сжатие: ~30-70%

### Типичные результаты

| Исходник  | Результат | Экономия |
| --------- | --------- | -------- |
| 2.5MB JPG | 800KB JPG | 68%      |
| 500KB PNG | 150KB PNG | 70%      |
| 45KB SVG  | 12KB SVG  | 73%      |

## 🎯 Best Practices

### 1. Правильный формат

```
Фотографии          → JPG (или WebP)
Графика с прозрачностью → PNG (или WebP)
Логотипы, иконки    → SVG
Простые иллюстрации → SVG
```

### 2. Responsive изображения

Создавайте несколько версий для разных экранов:

```
hero-640.jpg     (Mobile)
hero-1280.jpg    (Tablet)
hero-1920.jpg    (Desktop)
hero-2560.jpg    (4K)
```

### 3. Alt текст

```vue
<!-- ✅ Хорошо -->
<img src="/img/product.jpg" alt="Red Nike Air Max sneakers" />

<!-- ❌ Плохо -->
<img src="/img/product.jpg" alt="Image" />
<img src="/img/product.jpg" />
```

### 4. Width и Height

Указывайте размеры для предотвращения layout shift:

```vue
<img src="/img/product.jpg" alt="Product" width="800" height="600" />
```

### 5. WebP + Fallback

Всегда предоставляйте fallback для старых браузеров:

```html
<picture>
	<source srcset="image.webp" type="image/webp" />
	<img src="image.jpg" alt="Fallback" />
</picture>
```

## 📏 Рекомендуемые размеры

### По типу изображения

| Тип                | Ширина    | Формат   | Размер файла |
| ------------------ | --------- | -------- | ------------ |
| Hero (Full width)  | 1920px    | JPG/WebP | < 500KB      |
| Product большой    | 1200px    | JPG/WebP | < 200KB      |
| Product средний    | 800px     | JPG/WebP | < 100KB      |
| Product миниатюра  | 400px     | JPG/WebP | < 50KB       |
| Blog изображение   | 1200px    | JPG/WebP | < 300KB      |
| Аватар             | 200px     | JPG/PNG  | < 30KB       |
| Логотип            | -         | SVG/PNG  | < 50KB       |
| Иконка             | 24-48px   | SVG/PNG  | < 10KB       |
| Background pattern | 400-800px | PNG/SVG  | < 100KB      |

### Aspect Ratios

Стандартные соотношения сторон:

- **16:9** - Hero, видео превью
- **4:3** - Стандартные фото
- **1:1** - Аватары, Instagram-style
- **3:2** - Фотографии товаров
- **21:9** - Ультраширокие баннеры

## 🚀 Производительность

### Оптимизация загрузки

1. **Lazy loading** для изображений ниже fold
2. **WebP** для лучшего сжатия
3. **Responsive images** для разных экранов
4. **Preload** критичных изображений
5. **CDN** для глобального кэширования

### Preload критичных изображений

```vue
<script setup lang="ts">
useHead({
	link: [
		{
			rel: "preload",
			as: "image",
			href: "/img/hero/hero-background.jpg",
			type: "image/jpeg",
		},
	],
});
</script>
```

### Кэширование

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
	nitro: {
		routeRules: {
			"/img/**": {
				headers: {
					"Cache-Control": "public, max-age=31536000, immutable",
				},
			},
		},
	},
});
```

## 🔍 Debugging

### Проверка оптимизации

```bash
# Сравнение размеров
ls -lh raw/img/hero-background.jpg
ls -lh public/img/hero-background.jpg

# Детальная информация об изображении
identify -verbose public/img/hero-background.jpg
```

### Проверка в DevTools

1. F12 → Network
2. Фильтр: Img
3. Проверьте:
   - Статус: 200
   - Size: должен быть меньше исходника
   - Type: image/jpeg, image/png, image/webp

### Lighthouse audit

```bash
# Проверка производительности изображений
npx lighthouse https://yoursite.com --only-categories=performance
```

## ⚠️ Troubleshooting

### Изображение не отображается (404)

```
❌ GET /img/product.jpg 404
```

**Решение:**

1. Проверьте путь (начинается с `/img/`)
2. Проверьте, что файл есть в `public/img/`
3. Проверьте регистр букв (case-sensitive)

### Изображение слишком большое

**Решение:**

1. Resize в исходнике (`raw/img/`)
2. Запустите `pnpm assets:images`
3. Уменьшите quality в скрипте оптимизации

### Изображение размытое

**Решение:**

1. Используйте исходник большего размера
2. Увеличьте quality в настройках
3. Для графики - используйте PNG вместо JPG

### WebP не работает в Safari

Safari поддерживает WebP с версии 14 (2020).  
**Решение:** Всегда предоставляйте fallback!

```html
<picture>
	<source srcset="image.webp" type="image/webp" />
	<img src="image.jpg" alt="Fallback для старых браузеров" />
</picture>
```

## 💡 Примеры использования

### Hero секция

```vue
<template>
	<section class="hero">
		<picture>
			<source
				media="(min-width: 1920px)"
				srcset="/img/hero/hero-2560.webp"
				type="image/webp"
			/>
			<source
				media="(min-width: 1280px)"
				srcset="/img/hero/hero-1920.webp"
				type="image/webp"
			/>
			<source
				media="(min-width: 640px)"
				srcset="/img/hero/hero-1280.webp"
				type="image/webp"
			/>
			<source srcset="/img/hero/hero-640.webp" type="image/webp" />
			<img
				src="/img/hero/hero-1920.jpg"
				alt="Summer sale - up to 50% off"
				class="hero__image"
				width="1920"
				height="1080"
			/>
		</picture>
		<div class="hero__content">
			<h1>Summer Sale</h1>
			<p>Up to 50% off</p>
		</div>
	</section>
</template>

<style scoped>
.hero {
	position: relative;
	height: 600px;
	overflow: hidden;
}

.hero__image {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.hero__content {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
	color: white;
}
</style>
```

### Галерея продуктов

```vue
<template>
	<div class="products-grid">
		<div v-for="product in products" :key="product.id" class="product-card">
			<picture>
				<source
					:srcset="`/img/products/${product.slug}.webp`"
					type="image/webp"
				/>
				<img
					:src="`/img/products/${product.slug}.jpg`"
					:alt="product.name"
					loading="lazy"
					width="400"
					height="400"
					class="product-card__image"
				/>
			</picture>
			<h3>{{ product.name }}</h3>
			<p>{{ product.price }}</p>
		</div>
	</div>
</template>

<style scoped>
.products-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 2rem;
}

.product-card__image {
	width: 100%;
	height: auto;
	object-fit: cover;
}
</style>
```

## 📚 Связанные файлы

- [raw/img/](../../raw/img/README.md) - Исходные изображения высокого качества
- [scripts/optimize-images.js](../../scripts/) - Скрипт оптимизации JPG/PNG
- [scripts/optimize-svg.js](../../scripts/) - Скрипт оптимизации SVG

---

[← Назад к public/](../README.md) | [← Назад к главному README](../../README.md)
