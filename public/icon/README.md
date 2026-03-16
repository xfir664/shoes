# public/icon/ - Иконки и Фавиконы

Папка `public/icon/` содержит иконки сайта для браузеров, мобильных устройств и социальных сетей.

## 📁 Текущее содержимое

```
public/icon/
├── active.svg           # SVG иконка (активное состояние?)
├── heart.svg            # SVG иконка сердца
└── social-youtube.svg   # SVG иконка YouTube
```

## 🎯 Назначение папки

### Два типа иконок

#### 1. **Фавиконы** (Favicon & Browser Icons)

Иконки, отображаемые в браузере:

- Вкладка браузера
- Закладки
- История
- Домашний экран мобильных устройств

#### 2. **SVG иконки для UI**

Отдельные иконки, используемые напрямую в разметке (не через спрайты).

## 🔧 Полный набор фавиконов (рекомендуется)

### Необходимые файлы

```
public/icon/
├── favicon.ico              # Классический favicon (16x16, 32x32)
├── favicon-16x16.png       # 16x16 PNG
├── favicon-32x32.png       # 32x32 PNG
├── apple-touch-icon.png    # 180x180 для iOS
├── android-chrome-192x192.png  # 192x192 для Android
├── android-chrome-512x512.png  # 512x512 для Android
├── safari-pinned-tab.svg   # SVG для Safari Pinned Tabs
└── site.webmanifest        # Манифест для PWA
```

### Генерация фавиконов

#### Онлайн инструменты (рекомендуется)

1. **[RealFaviconGenerator](https://realfavicongenerator.net/)**

   - Загрузите PNG 512x512 или SVG
   - Настройте превью для разных платформ
   - Скачайте пакет
   - Распакуйте в `public/icon/`

2. **[Favicon.io](https://favicon.io/)**
   - Простой генератор
   - Из текста, изображения или эмодзи

#### Вручную (ImageMagick)

```bash
# Создать ICO из PNG
magick convert logo-512.png -define icon:auto-resize=16,32,48 favicon.ico

# Создать разные размеры
magick convert logo-512.png -resize 16x16 favicon-16x16.png
magick convert logo-512.png -resize 32x32 favicon-32x32.png
magick convert logo-512.png -resize 180x180 apple-touch-icon.png
magick convert logo-512.png -resize 192x192 android-chrome-192x192.png
magick convert logo-512.png -resize 512x512 android-chrome-512x512.png
```

## 💻 Подключение фавиконов

### В Nuxt (nuxt.config.ts)

```typescript
export default defineNuxtConfig({
	app: {
		head: {
			link: [
				// Основной favicon
				{ rel: "icon", type: "image/x-icon", href: "/icon/favicon.ico" },

				// PNG иконки
				{
					rel: "icon",
					type: "image/png",
					sizes: "32x32",
					href: "/icon/favicon-32x32.png",
				},
				{
					rel: "icon",
					type: "image/png",
					sizes: "16x16",
					href: "/icon/favicon-16x16.png",
				},

				// Apple Touch Icon
				{
					rel: "apple-touch-icon",
					sizes: "180x180",
					href: "/icon/apple-touch-icon.png",
				},

				// Android Chrome
				{
					rel: "icon",
					type: "image/png",
					sizes: "192x192",
					href: "/icon/android-chrome-192x192.png",
				},
				{
					rel: "icon",
					type: "image/png",
					sizes: "512x512",
					href: "/icon/android-chrome-512x512.png",
				},

				// Safari Pinned Tab
				{
					rel: "mask-icon",
					href: "/icon/safari-pinned-tab.svg",
					color: "#5bbad5",
				},

				// Webmanifest
				{ rel: "manifest", href: "/icon/site.webmanifest" },
			],

			meta: [
				// Theme color для mobile browsers
				{ name: "theme-color", content: "#ffffff" },

				// Microsoft Tiles
				{ name: "msapplication-TileColor", content: "#2d89ef" },
				{
					name: "msapplication-config",
					content: "/icon/browserconfig.xml",
				},
			],
		},
	},
});
```

### В layouts/default.vue (динамически)

```vue
<script setup lang="ts">
useHead({
	link: [
		{ rel: "icon", type: "image/x-icon", href: "/icon/favicon.ico" },
		{
			rel: "apple-touch-icon",
			sizes: "180x180",
			href: "/icon/apple-touch-icon.png",
		},
	],
	meta: [{ name: "theme-color", content: "#ffffff" }],
});
</script>
```

## 📱 site.webmanifest - PWA манифест

```json
{
	"name": "Название сайта",
	"short_name": "Сайт",
	"icons": [
		{
			"src": "/icon/android-chrome-192x192.png",
			"sizes": "192x192",
			"type": "image/png"
		},
		{
			"src": "/icon/android-chrome-512x512.png",
			"sizes": "512x512",
			"type": "image/png"
		}
	],
	"theme_color": "#ffffff",
	"background_color": "#ffffff",
	"display": "standalone"
}
```

## 🎨 SVG иконки для UI

### Текущие иконки

- **active.svg** - Состояние активности
- **heart.svg** - Лайки, избранное
- **social-youtube.svg** - Ссылка на YouTube

### Когда использовать отдельные SVG (не спрайт)

✅ **Используйте отдельные файлы когда:**

- Иконка используется 1-2 раза на сайте
- Иконка очень специфичная (социальные сети)
- Иконка большая и сложная

❌ **Используйте спрайт когда:**

- Иконка используется много раз (меню, кнопки)
- Иконки однотипные (UI set)
- Нужна оптимизация HTTP запросов

### Использование SVG иконок

```vue
<template>
	<!-- Прямая вставка -->
	<img src="/icon/heart.svg" alt="Heart" width="24" height="24" />

	<!-- В Vue компоненте -->
	<svg width="24" height="24">
		<use href="/icon/heart.svg#heart"></use>
	</svg>

	<!-- Inline SVG -->
	<IconHeart class="icon" />
</template>

<style scoped>
.icon {
	width: 24px;
	height: 24px;
	color: red;
}
</style>
```

## 🎯 Размеры иконок

### Фавиконы

| Тип               | Размер       | Формат |
| ----------------- | ------------ | ------ |
| favicon.ico       | 16x16, 32x32 | ICO    |
| favicon-16x16     | 16x16        | PNG    |
| favicon-32x32     | 32x32        | PNG    |
| apple-touch-icon  | 180x180      | PNG    |
| android-chrome    | 192x192      | PNG    |
| android-chrome    | 512x512      | PNG    |
| safari-pinned-tab | Vector       | SVG    |

### UI иконки

| Размер | Использование             |
| ------ | ------------------------- |
| 16x16  | Очень маленькие иконки    |
| 20x20  | Маленькие иконки в тексте |
| 24x24  | Стандартный размер UI     |
| 32x32  | Средние иконки            |
| 48x48  | Большие иконки            |

## 💡 Best Practices

### 1. SVG оптимизация

```bash
# Оптимизируйте SVG перед добавлением
svgo input.svg -o output.svg
```

Или используйте онлайн: [SVGOMG](https://jakearchibald.github.io/svgomg/)

### 2. currentColor для SVG

```xml
<!-- ✅ Правильно - цвет управляется из CSS -->
<svg viewBox="0 0 24 24">
	<path fill="currentColor" d="..." />
</svg>

<!-- ❌ Неправильно - фиксированный цвет -->
<svg viewBox="0 0 24 24">
	<path fill="#FF0000" d="..." />
</svg>
```

### 3. Именование файлов

```
✅ Хорошо:
- favicon.ico
- apple-touch-icon.png
- social-youtube.svg
- icon-heart.svg

❌ Плохо:
- icon1.svg
- favicon_new.ico
- ICON.SVG
```

### 4. Прозрачный фон

Фавиконы с прозрачным фоном выглядят лучше в разных темах браузера.

### 5. Favicon checklist

- [ ] favicon.ico (16x16, 32x32)
- [ ] favicon-16x16.png
- [ ] favicon-32x32.png
- [ ] apple-touch-icon.png (180x180)
- [ ] android-chrome-192x192.png
- [ ] android-chrome-512x512.png
- [ ] site.webmanifest
- [ ] Подключены в HTML/Nuxt config

## 🔍 Тестирование фавиконов

### Онлайн инструменты

- [Favicon Checker](https://realfavicongenerator.net/favicon_checker)
- [Favicon.io Preview](https://favicon.io/)

### Локально

1. Запустите dev сервер: `pnpm dev`
2. Откройте: `http://localhost:3000`
3. Проверьте вкладку браузера
4. Добавьте в закладки - проверьте иконку
5. Откройте на мобильном - добавьте на домашний экран

### DevTools

1. F12 → Network
2. Фильтр: `favicon`
3. Проверьте статус 200 для всех иконок

## 📚 Связанные файлы

- [app/assets/sprites/](../../app/assets/sprites/) - SVG спрайты для UI иконок
- [raw/icons/](../../raw/icons/) - Исходные SVG иконки для спрайтов

---

[← Назад к public/](../README.md) | [← Назад к главному README](../../README.md)
