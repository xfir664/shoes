# public/fonts/ - Веб-шрифты

Папка `public/fonts/` содержит конвертированные веб-шрифты в форматах WOFF и WOFF2, готовые для использования на сайте.

## 📁 Текущее содержимое

```
public/fonts/
└── AnimeAce/        # Папка со шрифтом AnimeAce
```

## 🎯 Назначение папки

Это **результат** конвертации шрифтов из `raw/fonts/`. Файлы здесь:

- ✅ Готовы к использованию на сайте
- ✅ Оптимизированы для web (WOFF2 = -30% размера)
- ✅ Доступны напрямую по URL `/fonts/...`
- ✅ НЕ обрабатываются сборщиком

## 🔄 Откуда берутся файлы

```
raw/fonts/MyFont.ttf  →  [pnpm assets:fonts]  →  public/fonts/MyFont.woff2
                                                →  public/fonts/MyFont.woff
```

**Не редактируйте файлы вручную** - они генерируются автоматически!

## 💻 Использование шрифтов

### Базовое подключение

```scss
// app/assets/styles/fonts.scss
@font-face {
	font-family: "AnimeAce";
	src: url("/fonts/AnimeAce/AnimeAce.woff2") format("woff2"), url("/fonts/AnimeAce/AnimeAce.woff")
			format("woff");
	font-weight: 400;
	font-style: normal;
	font-display: swap;
}

// Использование
.title {
	font-family: "AnimeAce", sans-serif;
}
```

### Несколько начертаний

```scss
// Regular (400)
@font-face {
	font-family: "Roboto";
	src: url("/fonts/Roboto-Regular.woff2") format("woff2"), url("/fonts/Roboto-Regular.woff")
			format("woff");
	font-weight: 400;
	font-style: normal;
	font-display: swap;
}

// Bold (700)
@font-face {
	font-family: "Roboto";
	src: url("/fonts/Roboto-Bold.woff2") format("woff2"), url("/fonts/Roboto-Bold.woff")
			format("woff");
	font-weight: 700;
	font-style: normal;
	font-display: swap;
}

// Italic (400)
@font-face {
	font-family: "Roboto";
	src: url("/fonts/Roboto-Italic.woff2") format("woff2"), url("/fonts/Roboto-Italic.woff")
			format("woff");
	font-weight: 400;
	font-style: italic;
	font-display: swap;
}

// Использование
body {
	font-family: "Roboto", sans-serif;
	font-weight: 400; // Regular
}

strong {
	font-weight: 700; // Bold - автоматически использует Roboto-Bold
}

em {
	font-style: italic; // Italic - автоматически использует Roboto-Italic
}
```

## 📊 Форматы шрифтов

### WOFF2 (Web Open Font Format 2)

**Основной формат:**

- Лучшее сжатие (-30% от WOFF, -50% от TTF)
- Поддержка: Chrome 36+, Firefox 39+, Safari 10+, Edge 14+
- Поддержка: ~97% пользователей

**Всегда указывайте первым в @font-face!**

### WOFF (Web Open Font Format)

**Fallback формат:**

- Хорошее сжатие (-40% от TTF)
- Поддержка: IE9+, все современные браузеры
- Поддержка: ~99% пользователей

## 🎯 font-display стратегии

### swap (рекомендуется)

```scss
@font-face {
	font-family: "MyFont";
	src: url("/fonts/MyFont.woff2") format("woff2");
	font-display: swap; // ← Показать fallback, потом swap
}
```

**Поведение:**

1. Показывает системный шрифт сразу
2. После загрузки веб-шрифта - меняет на него
3. Отличная производительность, может быть FOUT (Flash of Unstyled Text)

### block

```scss
font-display: block; // Блокировать рендеринг до загрузки
```

**Поведение:**

1. Блокирует рендеринг текста на 3 секунды
2. Если шрифт загрузился - показывает
3. Если нет - показывает fallback
4. **Плохо для UX** - пользователь видит пустое место

### fallback

```scss
font-display: fallback; // Быстрый fallback
```

**Поведение:**

1. Блокирует рендеринг на ~100ms
2. Показывает fallback
3. Если шрифт загрузился в течение 3 сек - swap
4. Если нет - остается fallback

### optional

```scss
font-display: optional; // Опциональная загрузка
```

**Поведение:**

1. Блокирует на ~100ms
2. Если шрифт загрузился быстро - использует
3. Если нет - навсегда fallback
4. Хорошо для медленных соединений

## 📏 Размеры файлов

### Типичные размеры WOFF2

- **Regular начертание:** 20-50KB
- **Bold начертание:** 25-55KB
- **Italic начертание:** 20-50KB
- **Full font family (4 начертания):** 80-200KB

### Если файл больше 100KB

1. **Subsetting** - удалите ненужные символы
2. **Используйте Variable Font** - все weights в одном файле
3. **Выберите только нужные начертания**

## 🚀 Оптимизация загрузки

### Preload критичных шрифтов

```vue
<script setup lang="ts">
useHead({
	link: [
		{
			rel: "preload",
			as: "font",
			type: "font/woff2",
			href: "/fonts/Roboto-Regular.woff2",
			crossorigin: "anonymous",
		},
	],
});
</script>
```

### Preconnect к CDN

Если шрифты на Google Fonts или других CDN:

```vue
<script setup lang="ts">
useHead({
	link: [
		{ rel: "preconnect", href: "https://fonts.googleapis.com" },
		{
			rel: "preconnect",
			href: "https://fonts.gstatic.com",
			crossorigin: "anonymous",
		},
	],
});
</script>
```

### Локальный fallback

```scss
@font-face {
	font-family: "Roboto";
	src: local("Roboto"),
		// Попытаться найти на компьютере
		url("/fonts/Roboto-Regular.woff2") format("woff2"), url("/fonts/Roboto-Regular.woff")
			format("woff");
	font-display: swap;
}
```

## 💡 Best Practices

### 1. WOFF2 первым

```scss
/* ✅ Правильно */
@font-face {
	src: url("/fonts/Font.woff2") format("woff2"), /* Первым - лучшее сжатие */
			url("/fonts/Font.woff") format("woff"); /* Fallback */
}

/* ❌ Неправильно */
@font-face {
	src: url("/fonts/Font.woff") format("woff"), url("/fonts/Font.woff2") format("woff2");
}
```

### 2. font-display: swap

```scss
/* ✅ Для большинства случаев */
@font-face {
	font-display: swap; /* Быстрый рендеринг */
}
```

### 3. Группировка начертаний

```scss
/* ✅ Один font-family для всех начертаний */
@font-face {
	font-family: "Roboto"; /* Одинаковое имя */
	font-weight: 400;
	/* ... */
}

@font-face {
	font-family: "Roboto"; /* Одинаковое имя */
	font-weight: 700;
	/* ... */
}

/* ❌ Разные font-family */
@font-face {
	font-family: "Roboto-Regular";
	/* ... */
}

@font-face {
	font-family: "Roboto-Bold";
	/* ... */
}
```

### 4. Fallback стек

```scss
body {
	font-family: "Roboto", /* Веб-шрифт */ -apple-system, /* macOS/iOS системный */
			"Segoe UI", /* Windows */ "Helvetica Neue", /* macOS fallback */ Arial,
		/* Универсальный */ sans-serif;
	/* Браузерный fallback */
}
```

## 🔍 Debugging

### Проверка загрузки шрифтов

**В DevTools:**

1. F12 → Network
2. Фильтр: Font
3. Проверьте статус 200 для `.woff2` файлов

**В Console:**

```javascript
// Проверить загруженные шрифты
document.fonts.ready.then(() => {
	console.log("Fonts loaded:", document.fonts.size);
	for (let font of document.fonts) {
		console.log(font.family, font.weight, font.style);
	}
});
```

### Частые проблемы

#### Шрифт не загружается (404)

```
❌ Ошибка: GET /fonts/MyFont.woff2 404
```

**Решение:**

1. Проверьте путь в CSS
2. Проверьте, что файл есть в `public/fonts/`
3. Проверьте регистр букв (case-sensitive на Linux)

#### CORS ошибка

```
❌ Access to font at '...' has been blocked by CORS policy
```

**Решение:**

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
	nitro: {
		routeRules: {
			"/fonts/**": {
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
			},
		},
	},
});
```

#### Шрифт не применяется

```scss
/* Проверьте имя font-family */
@font-face {
	font-family: "MyFont"; /* Запомните это имя */
	/* ... */
}

body {
	font-family: "MyFont", sans-serif; /* Используйте точно такое же */
}
```

## 📚 Связанные файлы

- [raw/fonts/](../../raw/fonts/README.md) - Исходные шрифты (TTF, OTF)
- [app/assets/styles/fonts.scss](../../app/assets/styles/) - @font-face объявления
- [scripts/convert-fonts.js](../../scripts/) - Скрипт конвертации

---

[← Назад к public/](../README.md) | [← Назад к главному README](../../README.md)
