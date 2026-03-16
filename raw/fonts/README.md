# raw/fonts/ - Исходные шрифты

Папка `raw/fonts/` содержит исходные файлы шрифтов в форматах TTF и OTF, которые конвертируются в веб-форматы (WOFF, WOFF2) для использования на сайте.

## 📁 Текущее содержимое

```
raw/fonts/
└── roadradio_bold.otf     # OpenType шрифт RoadRadio Bold
```

## 🎯 Назначение папки

Это **источник** для веб-шрифтов. Файлы отсюда:

1. **Конвертируются** → в WOFF и WOFF2
2. **Сохраняются** → в `public/fonts/`
3. **Используются** → на сайте через CSS

## 🔧 Workflow добавления нового шрифта

### 1. Добавьте TTF/OTF файл

```bash
# Скопируйте шрифт в raw/fonts/
cp ~/Downloads/MyFont-Regular.ttf raw/fonts/
```

### 2. Запустите конвертацию

```bash
pnpm assets:fonts
```

**Что произойдет:**

- Скрипт прочитает все `.ttf` и `.otf` файлы из `raw/fonts/`
- Конвертирует в WOFF2 (лучшее сжатие, -30% размера)
- Конвертирует в WOFF (fallback для старых браузеров)
- Сохранит результаты в `public/fonts/`

**Пример вывода:**

```
🔤 Конвертация шрифтов...
✅ roadradio_bold.otf → WOFF2 (25KB) и WOFF (35KB)
✨ Готово! Обработано 1 шрифтов.
```

### 3. Используйте шрифт в CSS

```scss
// app/assets/styles/fonts.scss
@font-face {
	font-family: "RoadRadio";
	src: url("/fonts/roadradio_bold.woff2") format("woff2"), url("/fonts/roadradio_bold.woff")
			format("woff");
	font-weight: 700;
	font-style: normal;
	font-display: swap;
}

// Использование
.title {
	font-family: "RoadRadio", sans-serif;
	font-weight: 700;
}
```

## 📋 Поддерживаемые форматы

### Входные (raw/fonts/)

- **TTF** (TrueType Font) - `.ttf`
- **OTF** (OpenType Font) - `.otf`

### Выходные (public/fonts/)

- **WOFF2** (Web Open Font Format 2) - `.woff2`
  - Лучшее сжатие (-30% от WOFF)
  - Поддержка: Chrome 36+, Firefox 39+, Safari 10+, Edge 14+
- **WOFF** (Web Open Font Format) - `.woff`
  - Fallback для старых браузеров
  - Поддержка: IE9+, все современные браузеры

## 🎨 Именование файлов шрифтов

### ✅ Правильное именование

```
FontName-Weight.extension

Примеры:
✅ Roboto-Regular.ttf
✅ Roboto-Bold.ttf
✅ Roboto-Italic.ttf
✅ Roboto-BoldItalic.ttf
✅ OpenSans-Light.otf
✅ Montserrat-SemiBold.ttf
```

### Стандартные начертания (weights)

- **Thin** - 100
- **ExtraLight** - 200
- **Light** - 300
- **Regular** (или Normal) - 400
- **Medium** - 500
- **SemiBold** - 600
- **Bold** - 700
- **ExtraBold** - 800
- **Black** - 900

### Стили

- **Regular** (нормальный)
- **Italic** (курсив)
- **BoldItalic** (жирный курсив)

### ❌ Неправильное именование

```
❌ font.ttf                    (неинформативно)
❌ MyFont_new_final_2.ttf      (версионирование в имени)
❌ ROBOTO-BOLD.TTF             (всё заглавными)
❌ roboto bold.ttf             (пробелы вместо дефисов)
```

## 📏 Рекомендации по размерам

### Исходные файлы (TTF/OTF)

- **Оптимально:** < 200KB
- **Максимум:** < 500KB

Если файл больше:

1. Используйте **subsetting** (удаление неиспользуемых символов)
2. Используйте онлайн-инструменты:
   - [Font Squirrel Generator](https://www.fontsquirrel.com/tools/webfont-generator)
   - [Transfonter](https://transfonter.org/)

### Результаты конвертации

- **WOFF2:** обычно 25-50KB на начертание
- **WOFF:** обычно 35-70KB на начертание

## 🎯 Best Practices

### 1. Загружайте только нужные начертания

❌ **Не нужно:**

```
Roboto-Thin.ttf
Roboto-ExtraLight.ttf
Roboto-Light.ttf
Roboto-Regular.ttf
Roboto-Medium.ttf
Roboto-SemiBold.ttf
Roboto-Bold.ttf
Roboto-ExtraBold.ttf
Roboto-Black.ttf
```

✅ **Достаточно:**

```
Roboto-Regular.ttf    (400 - основной текст)
Roboto-Bold.ttf       (700 - заголовки, выделение)
```

### 2. Italic только если используется

Загружайте Italic версии только если действительно нужны:

```
Roboto-Regular.ttf
Roboto-Bold.ttf
Roboto-Italic.ttf       ← Только если используете курсив
```

### 3. Используйте Variable Fonts (если возможно)

Variable шрифты содержат все начертания в одном файле:

```
Roboto-Variable.ttf    ← Все weights (100-900) в одном файле!
```

### 4. Subsetting для кириллицы

Если нужна только кириллица:

```bash
# Используйте pyftsubset (из fonttools)
pyftsubset Roboto-Regular.ttf \
  --output-file=Roboto-Regular-Cyrillic.ttf \
  --unicodes="U+0400-04FF,U+0500-052F,U+2DE0-2DFF,U+A640-A69F"
```

### 5. Лицензии шрифтов

**⚠️ Важно:** Проверьте лицензию шрифта перед использованием на сайте!

- **Open Source:** Google Fonts, Adobe Fonts (некоторые)
- **Платные:** Требуют веб-лицензию
- **Бесплатные для личного использования:** НЕ подходят для коммерческих сайтов

## 🔍 Проверка шрифтов

### Информация о шрифте

**Mac/Linux:**

```bash
otfinfo raw/fonts/roadradio_bold.otf
```

**Онлайн:**

- [FontDrop!](https://fontdrop.info/) - Drag & Drop шрифт для анализа

### Проверка символов

```bash
# Список всех символов в шрифте
fc-query --format='%{charset}\n' raw/fonts/roadradio_bold.otf
```

## 🚀 Автоматическая обработка

### Watch режим

Автоматическая конвертация при изменениях:

```bash
pnpm assets:watch
```

Теперь при добавлении нового `.ttf` или `.otf` файла в `raw/fonts/`, он автоматически конвертируется.

### В CI/CD

Добавьте в build pipeline:

```yaml
# .github/workflows/deploy.yml
- name: Convert fonts
  run: pnpm assets:fonts

- name: Build
  run: pnpm build
```

## 💡 Примеры использования

### Базовое подключение

```scss
// app/assets/styles/fonts.scss
@font-face {
	font-family: "RoadRadio";
	src: url("/fonts/roadradio_bold.woff2") format("woff2"), url("/fonts/roadradio_bold.woff")
			format("woff");
	font-weight: 700;
	font-style: normal;
	font-display: swap;
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

// Использование
body {
	font-family: "Roboto", sans-serif;
	font-weight: 400; // Regular
}

h1 {
	font-weight: 700; // Bold - автоматически использует Roboto-Bold
}
```

### font-display стратегии

```scss
@font-face {
	font-family: "MyFont";
	src: url("/fonts/MyFont.woff2") format("woff2");

	/* Стратегии загрузки: */

	/* swap - показать fallback, потом swap на веб-шрифт (рекомендуется) */
	font-display: swap;

	/* block - блокировать рендеринг до загрузки (плохо для UX) */
	font-display: block;

	/* fallback - быстрый fallback, потом swap если загрузился */
	font-display: fallback;

	/* optional - использовать только если быстро загрузился */
	font-display: optional;
}
```

## 📚 Где взять шрифты

### Бесплатные источники

- [Google Fonts](https://fonts.google.com/) - Огромная коллекция open-source шрифтов
- [Font Squirrel](https://www.fontsquirrel.com/) - Шрифты с коммерческой лицензией
- [DaFont](https://www.dafont.com/) - Тысячи бесплатных шрифтов (проверяйте лицензию!)

### Платные источники

- [Adobe Fonts](https://fonts.adobe.com/) - Подписка Adobe
- [MyFonts](https://www.myfonts.com/) - Маркетплейс шрифтов
- [Fontspring](https://www.fontspring.com/) - Покупка без подписки

---

[← Назад к raw/](../README.md) | [← Назад к главному README](../../README.md)
