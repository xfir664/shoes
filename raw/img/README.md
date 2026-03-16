# raw/img/ - Исходные изображения

Папка `raw/img/` содержит исходные изображения в максимальном качестве, которые оптимизируются и сжимаются для использования на сайте.

## 📁 Структура папки

Организуйте изображения по категориям:

```
raw/img/
├── hero/            # Hero изображения (большие баннеры)
├── products/        # Фотографии товаров
├── blog/           # Изображения для блога
├── team/           # Фото команды
├── ui/             # UI элементы (логотипы, иконки)
└── backgrounds/    # Фоновые изображения
```

## 🎯 Назначение папки

Это **источник** изображений высокого качества. Файлы отсюда:

1. **Оптимизируются** → сжимаются с сохранением качества
2. **Конвертируются** → (опционально) в WebP
3. **Сохраняются** → в `public/img/`
4. **Используются** → на сайте через `<img>` или CSS

## 🔧 Workflow добавления изображения

### 1. Добавьте изображение

```bash
# Скопируйте в соответствующую категорию
cp ~/Downloads/hero-background.jpg raw/img/hero/
cp ~/Downloads/product-1.png raw/img/products/
```

### 2. Запустите оптимизацию

```bash
# Для растровых изображений (JPG, PNG)
pnpm assets:images

# Для SVG изображений
pnpm assets:svg

# Или все сразу
pnpm assets:all
```

**Что произойдет для JPG/PNG:**

- Сжатие JPG с quality: 80 (прогрессивная загрузка)
- Сжатие PNG с максимальной компрессией
- Опционально: генерация WebP версий
- Сохранение в `public/img/` с той же структурой папок

**Что произойдет для SVG:**

- Удаление метаданных, комментариев
- Упрощение путей
- Удаление скрытых элементов
- Уменьшение размера на 30-70%

**Пример вывода:**

```
🖼️  Оптимизация изображений...
✅ hero-background.jpg: 2.5MB → 800KB (-68%)
✅ product-1.png: 500KB → 150KB (-70%)
✅ logo.svg: 45KB → 12KB (-73%)
✨ Готово! Сэкономлено 2.2MB
```

### 3. Используйте изображение

```vue
<template>
	<!-- Простое изображение -->
	<img src="/img/hero/hero-background.jpg" alt="Hero" />

	<!-- С WebP fallback -->
	<picture>
		<source srcset="/img/products/product-1.webp" type="image/webp" />
		<img src="/img/products/product-1.jpg" alt="Product" />
	</picture>

	<!-- SVG -->
	<img src="/img/ui/logo.svg" alt="Logo" />
</template>
```

## 📋 Поддерживаемые форматы

### Растровые изображения

- **JPG/JPEG** (`.jpg`, `.jpeg`) - Фотографии, реалистичные изображения
- **PNG** (`.png`) - Графика с прозрачностью, логотипы
- **WebP** (`.webp`) - Современный формат (лучшее сжатие)

### Векторные изображения

- **SVG** (`.svg`) - Векторная графика, иллюстрации

## 🎨 Рекомендации по форматам

### Когда использовать JPG

**✅ Подходит для:**

- Фотографии
- Сложные изображения с градиентами
- Hero backgrounds
- Фото товаров
- Фото команды

**Характеристики:**

- Сжатие с потерями
- Не поддерживает прозрачность
- Отличное соотношение качество/размер

**Настройки:**

- Quality: 80-85 для большинства случаев
- Quality: 90+ только для критически важных изображений
- Progressive: включить (быстрее загрузка)

### Когда использовать PNG

**✅ Подходит для:**

- Логотипы
- Иконки (если не SVG)
- Скриншоты
- Графика с прозрачностью
- Изображения с текстом

**Характеристики:**

- Сжатие без потерь
- Поддержка прозрачности (alpha channel)
- Больший размер файла чем JPG

**Типы PNG:**

- PNG-8: до 256 цветов, меньший размер
- PNG-24: миллионы цветов, больший размер

### Когда использовать WebP

**✅ Подходит для:**

- Всего вышеперечисленного
- Замена JPG и PNG
- Современные браузеры

**Характеристики:**

- Сжатие лучше чем JPG/PNG (-25-35%)
- Поддержка прозрачности
- Поддержка анимации
- Не поддерживается в IE11

**Использование:**

```html
<picture>
	<source srcset="image.webp" type="image/webp" />
	<source srcset="image.jpg" type="image/jpeg" />
	<img src="image.jpg" alt="Fallback" />
</picture>
```

### Когда использовать SVG

**✅ Подходит для:**

- Логотипы
- Иконки
- Простые иллюстрации
- Графики и диаграммы
- Паттерны

**Характеристики:**

- Векторная графика (масштабируется без потери качества)
- Маленький размер файла (для простых изображений)
- Можно стилизовать через CSS
- Можно анимировать

**❌ НЕ подходит для:**

- Фотографий
- Сложных реалистичных изображений

## 📏 Рекомендации по размерам

### Исходные файлы

Загружайте изображения в **максимально возможном** качестве:

- JPG quality: 95-100
- PNG: без сжатия
- Разрешение: максимальное, которое будет использоваться

Оптимизация произойдет автоматически.

### Рекомендуемые размеры для web

| Тип изображения    | Ширина (px) | Размер файла |
| ------------------ | ----------- | ------------ |
| Hero (Full width)  | 1920        | < 500KB      |
| Product большой    | 1200        | < 200KB      |
| Product средний    | 800         | < 100KB      |
| Product миниатюра  | 400         | < 50KB       |
| Аватар             | 200         | < 30KB       |
| Логотип PNG        | 200-400     | < 50KB       |
| Логотип SVG        | -           | < 10KB       |
| Blog изображение   | 1200        | < 300KB      |
| Background pattern | 400-800     | < 100KB      |

### Responsive изображения

Создавайте несколько версий для разных экранов:

```
hero-background-2560.jpg   (4K)
hero-background-1920.jpg   (Full HD)
hero-background-1280.jpg   (HD)
hero-background-640.jpg    (Mobile)
```

Использование:

```html
<img
	src="/img/hero-background-640.jpg"
	srcset="
		/img/hero-background-640.jpg   640w,
		/img/hero-background-1280.jpg 1280w,
		/img/hero-background-1920.jpg 1920w,
		/img/hero-background-2560.jpg 2560w
	"
	sizes="100vw"
	alt="Hero"
/>
```

## 🎯 Best Practices

### 1. Именование файлов

```
✅ Хорошо:
- hero-background-summer.jpg
- product-sneakers-red.png
- team-member-john-doe.jpg
- logo-company-white.svg

❌ Плохо:
- IMG_1234.JPG
- DSC_0001.jpg
- image (1).png
- new_photo_final_v2.jpg
```

### 2. Оптимизация перед загрузкой

**Рекомендуется:**

1. Resize до нужного размера в Photoshop/GIMP
2. Загрузить в `raw/img/`
3. Запустить `pnpm assets:images`

**Не рекомендуется:**

1. Загрузить огромное 5000x4000 изображение
2. Надеяться что скрипт resize

### 3. Lazy Loading

```vue
<template>
	<!-- Отложенная загрузка -->
	<img src="/img/product.jpg" loading="lazy" alt="Product" />
</template>
```

### 4. Alt текст

Всегда добавляйте описательный `alt`:

```vue
<!-- ✅ Хорошо -->
<img src="/img/product.jpg" alt="Red sneakers Nike Air Max" />

<!-- ❌ Плохо -->
<img src="/img/product.jpg" alt="Image" />
<img src="/img/product.jpg" />
```

### 5. Структура папок

```
raw/img/
├── hero/
│   ├── summer-sale.jpg
│   └── winter-collection.jpg
├── products/
│   ├── category-1/
│   │   ├── product-1.jpg
│   │   └── product-2.jpg
│   └── category-2/
│       └── product-3.jpg
└── ui/
    ├── logo.svg
    ├── logo-white.svg
    └── favicon.png
```

## 💡 Примеры использования

### Hero изображение

```vue
<template>
	<section class="hero">
		<picture>
			<source srcset="/img/hero/summer-sale.webp" type="image/webp" />
			<img
				src="/img/hero/summer-sale.jpg"
				alt="Summer sale - up to 50% off"
				class="hero__image"
			/>
		</picture>
		<div class="hero__content">
			<h1>Summer Sale</h1>
		</div>
	</section>
</template>

<style scoped>
.hero {
	position: relative;
	height: 600px;
}

.hero__image {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
</style>
```

### Карточка товара

```vue
<template>
	<div class="product-card">
		<picture>
			<source srcset="/img/products/sneakers.webp" type="image/webp" />
			<img
				src="/img/products/sneakers.jpg"
				alt="Nike Air Max sneakers"
				loading="lazy"
				class="product-card__image"
			/>
		</picture>
		<h3>Nike Air Max</h3>
		<p>$129.99</p>
	</div>
</template>
```

### Фоновое изображение в CSS

```scss
.section {
	background-image: url("/img/backgrounds/pattern.png");
	background-size: cover;
	background-position: center;

	// С WebP
	@supports (background-image: url("/img/backgrounds/pattern.webp")) {
		background-image: url("/img/backgrounds/pattern.webp");
	}
}
```

## 🚀 Автоматическая обработка

### Watch режим

```bash
pnpm assets:watch
```

При добавлении/изменении изображений в `raw/img/`, они автоматически оптимизируются.

### В CI/CD

```yaml
# .github/workflows/deploy.yml
- name: Optimize images
  run: pnpm assets:images && pnpm assets:svg

- name: Build
  run: pnpm build
```

## 🔧 Дополнительная оптимизация

### Онлайн инструменты

- [TinyPNG](https://tinypng.com/) - Отличное сжатие PNG и JPG
- [Squoosh](https://squoosh.app/) - От Google, много настроек
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - Оптимизация SVG

### Командная строка

```bash
# ImageMagick - resize
magick convert input.jpg -resize 1920x1080 output.jpg

# ImageMagick - quality
magick convert input.jpg -quality 80 output.jpg

# SVGO - SVG optimization
svgo input.svg -o output.svg
```

## ⚠️ Troubleshooting

### Изображение слишком большое

1. Resize в Photoshop/GIMP
2. Уменьшите quality в скрипте оптимизации
3. Конвертируйте в WebP

### Изображение выглядит размытым

1. Увеличьте quality в настройках
2. Проверьте исходное разрешение
3. Используйте PNG вместо JPG

### WebP не работает в Safari

Safari поддерживает WebP с версии 14 (2020). Используйте fallback:

```html
<picture>
	<source srcset="image.webp" type="image/webp" />
	<img src="image.jpg" alt="Fallback" />
</picture>
```

---

[← Назад к raw/](../README.md) | [← Назад к главному README](../../README.md)
