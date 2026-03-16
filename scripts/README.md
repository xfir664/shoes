# scripts/ - Утилиты обработки ресурсов

Папка `scripts/` содержит Node.js скрипты для автоматической обработки ресурсов: конвертации шрифтов, генерации спрайтов, оптимизации изображений и SVG.

## 📁 Структура папки

```
scripts/
├── convert-fonts.js      # Конвертация TTF/OTF → WOFF/WOFF2
├── generate-sprite.js    # Генерация SVG спрайтов из иконок
├── optimize-images.js    # Оптимизация растровых изображений
└── optimize-svg.js       # Оптимизация SVG файлов
```

## 🎯 Назначение папки

### 1. **Автоматизация обработки ресурсов**
Скрипты автоматизируют рутинные задачи:
- Конвертация форматов
- Оптимизация размеров
- Генерация производных файлов

### 2. **Унификация процесса**
Все разработчики используют одинаковые настройки обработки.

### 3. **Build pipeline**
Скрипты интегрируются в процесс сборки и разработки.

## 🔧 Скрипты

### convert-fonts.js - Конвертация шрифтов

**Назначение:** Конвертирует TTF/OTF шрифты в веб-форматы WOFF и WOFF2.

**Входные данные:** `raw/fonts/*.{ttf,otf}`  
**Выходные данные:** `public/fonts/*.{woff,woff2}`

**Что делает:**
1. Сканирует папку `raw/fonts/`
2. Находит все TTF и OTF файлы
3. Конвертирует в WOFF2 (лучшее сжатие)
4. Конвертирует в WOFF (fallback)
5. Сохраняет в `public/fonts/`
6. Выводит статистику размеров

**Использование:**
```bash
# Запуск скрипта
pnpm assets:fonts

# Или напрямую
node scripts/convert-fonts.js
```

**Технологии:**
- `ttf2woff2` - конвертация в WOFF2
- `ttf2woff` - конвертация в WOFF
- `fs` - работа с файловой системой
- `path` - работа с путями

**Пример вывода:**
```
🔤 Конвертация шрифтов...
✅ Roboto-Regular.ttf → WOFF2 (45KB) и WOFF (60KB)
✅ Roboto-Bold.ttf → WOFF2 (48KB) и WOFF (65KB)
✨ Готово! Обработано 2 шрифтов.
```

**Преимущества форматов:**
- **WOFF2:** -30% размера, поддержка 96%+ браузеров
- **WOFF:** Fallback для IE11 и старых браузеров

### generate-sprite.js - Генерация SVG спрайтов

**Назначение:** Объединяет отдельные SVG иконки в один спрайт-файл.

**Входные данные:** `raw/icons/**/*.svg`  
**Выходные данные:** `app/assets/sprites/icons.svg`

**Что делает:**
1. Сканирует `raw/icons/` (включая подпапки)
2. Читает каждый SVG файл
3. Оптимизирует SVG (удаляет лишнее)
4. Генерирует уникальный ID для каждой иконки
5. Объединяет все в один спрайт
6. Сохраняет в `app/assets/sprites/`

**Использование:**
```bash
# Запуск скрипта
pnpm assets:icons

# Или напрямую
node scripts/generate-sprite.js
```

**Технологии:**
- `fast-glob` - поиск файлов по паттерну
- `svgo` - оптимизация SVG
- `fs` - работа с файлами

**Структура спрайта:**
```xml
<svg xmlns="http://www.w3.org/2000/svg">
  <defs>
    <symbol id="menu" viewBox="0 0 24 24">
      <path d="..."/>
    </symbol>
    <symbol id="social-facebook" viewBox="0 0 24 24">
      <path d="..."/>
    </symbol>
  </defs>
</svg>
```

**ID иконок:**
- `raw/icons/menu.svg` → `id="menu"`
- `raw/icons/social/facebook.svg` → `id="social-facebook"`
- `raw/icons/actions/edit.svg` → `id="actions-edit"`

**Пример вывода:**
```
🎨 Генерация SVG спрайта...
✅ Найдено 24 иконки
✅ Спрайт создан: app/assets/sprites/icons.svg
✨ Готово!
```

### optimize-images.js - Оптимизация изображений

**Назначение:** Сжимает и оптимизирует растровые изображения (JPG, PNG).

**Входные данные:** `raw/img/**/*.{jpg,jpeg,png}`  
**Выходные данные:** `public/img/**/*.{jpg,png}`

**Что делает:**
1. Сканирует `raw/img/`
2. Находит JPG и PNG файлы
3. Сжимает с сохранением качества
4. Опционально: генерирует WebP версии
5. Сохраняет в `public/img/`
6. Выводит статистику сжатия

**Использование:**
```bash
# Запуск скрипта
pnpm assets:images

# Или напрямую
node scripts/optimize-images.js
```

**Технологии:**
- `sharp` - обработка изображений
- `fast-glob` - поиск файлов

**Настройки сжатия:**
```javascript
// JPG
sharp(input)
  .jpeg({ quality: 80, progressive: true })
  .toFile(output);

// PNG
sharp(input)
  .png({ compressionLevel: 9, progressive: true })
  .toFile(output);

// WebP (опционально)
sharp(input)
  .webp({ quality: 80 })
  .toFile(outputWebP);
```

**Пример вывода:**
```
🖼️  Оптимизация изображений...
✅ hero-background.jpg: 2.5MB → 800KB (-68%)
✅ product-1.png: 500KB → 150KB (-70%)
✅ logo.png: 100KB → 45KB (-55%)
✨ Готово! Сэкономлено 2.2MB
```

### optimize-svg.js - Оптимизация SVG

**Назначение:** Оптимизирует SVG файлы (удаляет лишнее, упрощает).

**Входные данные:** `raw/img/**/*.svg`  
**Выходные данные:** `public/img/**/*.svg`

**Что делает:**
1. Сканирует `raw/img/` для SVG
2. Оптимизирует каждый SVG
3. Удаляет комментарии, метаданные
4. Упрощает пути и трансформации
5. Удаляет скрытые элементы
6. Сохраняет в `public/img/`

**Использование:**
```bash
# Запуск скрипта
pnpm assets:svg

# Или напрямую
node scripts/optimize-svg.js
```

**Технологии:**
- `svgo` - оптимизация SVG
- `fast-glob` - поиск файлов

**Настройки оптимизации:**
```javascript
{
  plugins: [
    'removeComments',
    'removeMetadata',
    'removeEditorsNSData',
    'cleanupIds',
    'removeUselessDefs',
    'cleanupNumericValues',
    'convertPathData',
    'mergePaths',
    'removeUnusedNS',
    'sortAttrs',
    'removeXMLNS'
  ]
}
```

**Пример вывода:**
```
🎨 Оптимизация SVG...
✅ illustration.svg: 45KB → 12KB (-73%)
✅ diagram.svg: 30KB → 10KB (-67%)
✨ Готово! Оптимизировано 2 файла
```

## 🚀 Команды в package.json

Все скрипты доступны через npm/pnpm команды:

```json
{
  "scripts": {
    "assets:fonts": "node scripts/convert-fonts.js",
    "assets:icons": "node scripts/generate-sprite.js",
    "assets:svg": "node scripts/optimize-svg.js",
    "assets:images": "node scripts/optimize-images.js",
    "assets:all": "pnpm run assets:fonts && pnpm run assets:icons && pnpm run assets:svg && pnpm run assets:images",
    "assets:watch": "pnpm run assets:all && chokidar 'raw/**/*' -c 'pnpm run assets:all'"
  }
}
```

### Использование:

```bash
# Одна команда
pnpm assets:fonts

# Все команды последовательно
pnpm assets:all

# Watch режим (автоматическая обработка)
pnpm assets:watch
```

## 🛠️ Настройка скриптов

### Изменение качества изображений

```javascript
// scripts/optimize-images.js

// Для лучшего качества (больше размер)
.jpeg({ quality: 90 })

// Для меньшего размера (хуже качество)
.jpeg({ quality: 70 })
```

### Настройка SVGO

```javascript
// scripts/optimize-svg.js

const config = {
  plugins: [
    'preset-default',
    // Отключить конкретный плагин
    { name: 'removeViewBox', active: false },
    // Добавить свой плагин
    { name: 'removeDimensions', active: true }
  ]
};
```

### Добавление WebP генерации

```javascript
// scripts/optimize-images.js

// После оптимизации JPG/PNG
await sharp(inputPath)
  .webp({ quality: 80 })
  .toFile(outputPath.replace(/\.(jpg|png)$/, '.webp'));
```

## 🎯 Best Practices

### 1. Запускайте после добавления файлов

```bash
# Добавили шрифты
git add raw/fonts/
pnpm assets:fonts
git add public/fonts/

# Добавили иконки
git add raw/icons/
pnpm assets:icons
git add app/assets/sprites/
```

### 2. Используйте watch в разработке

```bash
# Один раз запустить
pnpm assets:watch

# Теперь изменения обрабатываются автоматически
```

### 3. В CI/CD обрабатывайте перед build

```yaml
# .github/workflows/deploy.yml
- name: Process assets
  run: pnpm assets:all

- name: Build
  run: pnpm build
```

### 4. Коммитьте и исходники, и результаты

```bash
# Добавляем в git и исходники, и результаты
git add raw/ public/ app/assets/sprites/
```

Это позволяет:
- Воспроизвести результаты
- Откатиться к предыдущей версии
- Не требовать обработку при деплое

### 5. Проверяйте размеры

```bash
# Посмотреть размеры до и после
du -sh raw/fonts/*
du -sh public/fonts/*

du -sh raw/img/*
du -sh public/img/*
```

## 📊 Производительность

### Типичные результаты:

| Операция | Входной размер | Выходной размер | Экономия |
|----------|---------------|-----------------|----------|
| TTF → WOFF2 | 120KB | 40KB | 67% |
| JPG optimize | 2.5MB | 800KB | 68% |
| PNG optimize | 500KB | 150KB | 70% |
| SVG optimize | 45KB | 12KB | 73% |

### Время выполнения:

- **convert-fonts:** ~100ms на шрифт
- **generate-sprite:** ~500ms на 50 иконок
- **optimize-images:** ~200ms на изображение
- **optimize-svg:** ~50ms на SVG

## 🔍 Troubleshooting

### Ошибка "Module not found"

```bash
# Установите зависимости
pnpm install
```

### Файлы не обрабатываются

1. Проверьте путь к `raw/`
2. Проверьте расширение файла
3. Проверьте права доступа

### Sharp не работает

```bash
# Переустановите Sharp
pnpm remove sharp
pnpm add sharp
```

### Watch не срабатывает

```bash
# Установите chokidar глобально
npm install -g chokidar-cli

# Или используйте nodemon
pnpm add -D nodemon
```

## 💡 Расширение скриптов

### Добавление нового скрипта

```javascript
// scripts/my-script.js
import fs from 'fs';
import path from 'path';

console.log('🚀 Мой скрипт запущен!');

// Ваша логика обработки
const files = fs.readdirSync('raw/my-folder');
files.forEach(file => {
  // Обработка
});

console.log('✨ Готово!');
```

### Регистрация в package.json

```json
{
  "scripts": {
    "assets:my-script": "node scripts/my-script.js"
  }
}
```

### Использование

```bash
pnpm assets:my-script
```

## 📚 Зависимости

Скрипты используют следующие пакеты:

```json
{
  "devDependencies": {
    "sharp": "^0.33.0",        // Обработка изображений
    "svgo": "^3.0.2",          // Оптимизация SVG
    "fast-glob": "^3.3.2",     // Поиск файлов
    "ttf2woff": "^2.0.0",      // TTF → WOFF
    "ttf2woff2": "^4.0.4",     // TTF → WOFF2
    "chokidar": "^3.5.3"       // File watcher
  }
}
```

---

[← Назад к главному README](../README.md)

