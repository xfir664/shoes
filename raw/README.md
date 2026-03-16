# raw/ - Исходные ресурсы для обработки

Папка `raw/` содержит исходные файлы ресурсов (шрифты, иконки, изображения), которые обрабатываются специальными скриптами и конвертируются в оптимизированные форматы для использования на сайте.

## 📁 Структура папки

```
raw/
├── fonts/       # Исходные шрифты (TTF, OTF)
├── icons/       # Исходные SVG иконки
└── img/         # Исходные изображения (JPG, PNG, SVG)
```

## 🎯 Назначение папки

### 1. **Источник ресурсов**
`raw/` - это хранилище исходных файлов, которые затем обрабатываются:
- `raw/fonts/` → конвертируются → `public/fonts/` (WOFF, WOFF2)
- `raw/icons/` → собираются → `app/assets/sprites/` (SVG спрайты)
- `raw/img/` → оптимизируются → `public/img/` (сжатые изображения)

### 2. **Разделение исходников и результата**
Исходные файлы хранятся отдельно от обработанных, что позволяет:
- Легко обновлять ресурсы
- Перегенерировать результаты при необходимости
- Хранить исходные файлы высокого качества
- Автоматизировать обработку

### 3. **Не публикуются напрямую**
Файлы из `raw/` НЕ доступны на сайте напрямую - только после обработки.

## 🔧 Обработка ресурсов

### Команды обработки

```bash
# Конвертация шрифтов TTF/OTF → WOFF/WOFF2
pnpm assets:fonts

# Генерация SVG спрайтов из иконок
pnpm assets:icons

# Оптимизация SVG файлов
pnpm assets:svg

# Оптимизация растровых изображений (JPG, PNG)
pnpm assets:images

# Выполнить все команды обработки
pnpm assets:all

# Автоматическая обработка при изменениях в raw/
pnpm assets:watch
```

## 📂 fonts/ - Исходные шрифты

### Поддерживаемые форматы

- TTF (TrueType Font)
- OTF (OpenType Font)

### Структура

```
raw/fonts/
├── Roboto-Regular.ttf
├── Roboto-Bold.ttf
├── Roboto-Italic.ttf
└── OpenSans-Regular.otf
```

### Процесс обработки

1. **Размещение:** Поместите TTF/OTF файлы в `raw/fonts/`
2. **Конвертация:** Запустите `pnpm assets:fonts`
3. **Результат:** 
   - Создаются WOFF и WOFF2 версии в `public/fonts/`
   - WOFF2 - основной формат (лучшее сжатие, -30% размера)
   - WOFF - fallback для старых браузеров

### Что происходит под капотом

Скрипт `scripts/convert-fonts.js`:
- Читает все TTF/OTF из `raw/fonts/`
- Конвертирует в WOFF и WOFF2
- Сохраняет в `public/fonts/`
- Показывает информацию о размерах

### Пример использования результата

```scss
// После обработки используйте в CSS
@font-face {
  font-family: 'Roboto';
  src: url('/fonts/Roboto-Regular.woff2') format('woff2'),
       url('/fonts/Roboto-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

### Best Practices

1. **Именование файлов:**
   ```
   ✅ Хорошо:
   - Roboto-Regular.ttf
   - Roboto-Bold.ttf
   - OpenSans-Italic.ttf
   
   ❌ Плохо:
   - roboto.ttf
   - font1.ttf
   - MyFont_new_final.ttf
   ```

2. **Только необходимые начертания:**
   - Не добавляйте все weights (100-900) если не используете
   - Обычно достаточно: Regular (400), Bold (700)
   - Italic версии - по необходимости

3. **Размер исходников:**
   - TTF/OTF должны быть < 200KB
   - Используйте subsetting для удаления ненужных символов

## 📂 icons/ - Исходные SVG иконки

### Поддерживаемые форматы

- SVG (Scalable Vector Graphics)

### Структура

```
raw/icons/
├── menu.svg
├── close.svg
├── search.svg
├── social/
│   ├── facebook.svg
│   ├── twitter.svg
│   └── instagram.svg
└── actions/
    ├── edit.svg
    ├── delete.svg
    └── save.svg
```

### Процесс обработки

1. **Размещение:** Поместите SVG файлы в `raw/icons/`
2. **Генерация:** Запустите `pnpm assets:icons`
3. **Результат:** 
   - Создается SVG спрайт в `app/assets/sprites/icons.svg`
   - Все иконки объединены в один файл
   - ID иконки = имя файла (без расширения)

### Что происходит под капотом

Скрипт `scripts/generate-sprite.js`:
- Читает все SVG из `raw/icons/` (включая подпапки)
- Оптимизирует каждый SVG (удаляет лишнее)
- Объединяет в один спрайт-файл
- Генерирует ID на основе имени файла и пути

### Использование результата

```vue
<template>
  <!-- Иконка из корня icons/ -->
  <svg width="24" height="24">
    <use xlink:href="/sprites/icons.svg#menu"></use>
  </svg>
  
  <!-- Иконка из подпапки social/ -->
  <svg width="24" height="24">
    <use xlink:href="/sprites/icons.svg#social-facebook"></use>
  </svg>
  
  <!-- Иконка из подпапки actions/ -->
  <svg width="24" height="24">
    <use xlink:href="/sprites/icons.svg#actions-edit"></use>
  </svg>
</template>
```

### Best Practices

1. **Подготовка SVG:**
   - Используйте viewBox вместо width/height
   - Удалите ненужные атрибуты (id, class, style)
   - Упростите пути (optimize в Figma/Illustrator)
   - Используйте currentColor для цвета обводки/заливки

   ```xml
   <!-- ✅ Хорошо -->
   <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
     <path fill="currentColor" d="M12 2L2 7v10l10 5 10-5V7z"/>
   </svg>
   
   <!-- ❌ Плохо -->
   <svg width="24px" height="24px" id="icon-1" class="my-icon">
     <g transform="translate(0,0)">
       <path fill="#FF0000" d="..."/>
     </g>
   </svg>
   ```

2. **Именование:**
   ```
   ✅ Хорошо:
   - menu.svg
   - arrow-right.svg
   - social/facebook.svg
   
   ❌ Плохо:
   - Icon1.svg
   - new_icon_final.svg
   - facebook_icon_2.svg
   ```

3. **Размер:**
   - Оптимизированный SVG должен быть < 5KB
   - Используйте SVGO для оптимизации

4. **Группировка:**
   - Используйте подпапки для категорий
   - `social/` - социальные сети
   - `actions/` - действия (edit, delete, save)
   - `navigation/` - навигация (menu, close, back)

## 📂 img/ - Исходные изображения

### Поддерживаемые форматы

- JPG / JPEG (фотографии)
- PNG (графика с прозрачностью)
- SVG (векторная графика)
- WebP (современный формат)

### Структура

```
raw/img/
├── logo.png
├── hero-background.jpg
├── products/
│   ├── product-1.jpg
│   └── product-2.jpg
└── illustrations/
    └── about-us.svg
```

### Процесс обработки

#### Растровые изображения (JPG, PNG)

1. **Размещение:** Поместите JPG/PNG в `raw/img/`
2. **Оптимизация:** Запустите `pnpm assets:images`
3. **Результат:**
   - Сжатые изображения в `public/img/`
   - Уменьшение размера на 30-70%
   - Сохранение качества

#### SVG файлы

1. **Размещение:** Поместите SVG в `raw/img/`
2. **Оптимизация:** Запустите `pnpm assets:svg`
3. **Результат:**
   - Оптимизированные SVG в `public/img/`
   - Удаление лишних атрибутов
   - Уменьшение размера

### Что происходит под капотом

**Скрипт `scripts/optimize-images.js`:**
- Использует Sharp для обработки
- Сжимает JPG (quality: 80)
- Сжимает PNG (compressionLevel: 9)
- Опционально: генерирует WebP версии
- Сохраняет EXIF данные если нужно

**Скрипт `scripts/optimize-svg.js`:**
- Использует SVGO
- Удаляет комментарии, метаданные
- Упрощает пути
- Удаляет скрытые элементы

### Использование результата

```vue
<template>
  <!-- Простое изображение -->
  <img src="/img/logo.png" alt="Logo" />
  
  <!-- Адаптивное изображение -->
  <picture>
    <source 
      srcset="/img/hero.webp" 
      type="image/webp"
    />
    <img 
      src="/img/hero.jpg" 
      alt="Hero"
    />
  </picture>
  
  <!-- SVG -->
  <img src="/img/illustration.svg" alt="Illustration" />
</template>
```

### Best Practices

1. **Формат по типу:**
   - JPG - фотографии, реалистичные изображения
   - PNG - графика, логотипы, иконки с прозрачностью
   - SVG - простая векторная графика, иконки
   - WebP - универсальный (если поддержка браузеров OK)

2. **Размеры:**
   - Не загружайте изображения больше чем нужно
   - Resize перед добавлением в `raw/img/`
   - Рекомендуемые максимумы:
     - Hero: 1920x1080 (Full HD)
     - Product: 800x800
     - Thumbnail: 400x300
     - Avatar: 200x200

3. **Качество исходников:**
   - Используйте максимальное качество для исходников
   - Оптимизация произойдет автоматически
   - JPG quality > 90 для исходников

4. **Именование:**
   ```
   ✅ Хорошо:
   - hero-background.jpg
   - product-thumbnail-1.png
   - about-us-illustration.svg
   
   ❌ Плохо:
   - IMG_1234.JPG
   - new image (1).png
   - final_version_2.jpg
   ```

5. **Структура:**
   - Группируйте по разделам (products/, blog/, ui/)
   - Используйте описательные имена папок

## 🚀 Автоматизация

### Watch режим

Для автоматической обработки при изменениях:

```bash
pnpm assets:watch
```

Эта команда:
- Отслеживает изменения в `raw/**/*`
- Автоматически запускает обработку
- Экономит время при разработке

### Workflow

1. **Добавляете файлы** в `raw/fonts/`, `raw/icons/`, или `raw/img/`
2. **Запускаете watch** (один раз): `pnpm assets:watch`
3. **Работаете** - файлы обрабатываются автоматически
4. **Используете** результаты из `public/` или `assets/`

### В CI/CD

В production build добавьте обработку:

```bash
# В package.json или CI скрипте
pnpm assets:all && pnpm build
```

## 🎯 Checklist добавления ресурсов

### Шрифты:
- [ ] Файл в формате TTF или OTF
- [ ] Имя файла: `FontName-Weight.ttf`
- [ ] Размер < 200KB
- [ ] Запущена команда `pnpm assets:fonts`
- [ ] Проверка: файлы появились в `public/fonts/`

### Иконки:
- [ ] Файл в формате SVG
- [ ] Оптимизирован (viewBox, currentColor)
- [ ] Размер < 5KB
- [ ] Описательное имя файла
- [ ] Запущена команда `pnpm assets:icons`
- [ ] Проверка: спрайт обновился в `app/assets/sprites/`

### Изображения:
- [ ] Правильный формат (JPG/PNG/SVG)
- [ ] Правильный размер (не больше необходимого)
- [ ] Качество исходника высокое
- [ ] Описательное имя файла
- [ ] Запущена команда `pnpm assets:images` или `pnpm assets:svg`
- [ ] Проверка: файлы появились в `public/img/`

## 📚 Дополнительные ресурсы

- [Sharp Documentation](https://sharp.pixelplumbing.com/) - обработка изображений
- [SVGO Documentation](https://github.com/svg/svgo) - оптимизация SVG
- [Web Font Best Practices](https://web.dev/font-best-practices/)
- [SVG Sprite Technique](https://css-tricks.com/svg-sprites-use-better-icon-fonts/)

---

[← Назад к главному README](../README.md)

