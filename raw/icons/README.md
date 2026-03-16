# raw/icons/ - Исходные SVG иконки

Папка `raw/icons/` содержит исходные SVG файлы иконок, которые объединяются в SVG спрайт для эффективного использования на сайте.

## 📁 Структура папки

Организуйте иконки по категориям в подпапках:

```
raw/icons/
├── social/           # Социальные сети
│   ├── facebook.svg
│   ├── twitter.svg
│   └── youtube.svg
├── actions/          # Действия
│   ├── edit.svg
│   ├── delete.svg
│   └── save.svg
├── navigation/       # Навигация
│   ├── menu.svg
│   ├── close.svg
│   └── arrow.svg
└── common/          # Общие иконки
    ├── heart.svg
    ├── star.svg
    └── search.svg
```

## 🎯 Назначение папки

Это **источник** для SVG спрайтов. Файлы отсюда:

1. **Оптимизируются** → удаляются лишние атрибуты
2. **Объединяются** → в один SVG спрайт
3. **Сохраняются** → в `app/assets/sprites/icons.svg`
4. **Используются** → через `<use>` элемент

## 🔧 Workflow добавления новой иконки

### 1. Добавьте SVG файл

```bash
# Например, добавляем иконку сердца
cp ~/Downloads/heart.svg raw/icons/common/
```

### 2. Запустите генерацию спрайта

```bash
pnpm assets:icons
```

**Что произойдет:**

- Скрипт найдет все `.svg` файлы в `raw/icons/` (включая подпапки)
- Оптимизирует каждый SVG (удалит лишнее)
- Объединит в один спрайт
- Создаст уникальные ID на основе пути к файлу
- Сохранит в `app/assets/sprites/icons.svg`

**Пример вывода:**

```
🎨 Генерация SVG спрайта...
✅ Найдено 24 иконки
✅ Спрайт создан: app/assets/sprites/icons.svg
✨ Готово!
```

### 3. Используйте иконку

```vue
<template>
	<!-- Иконка из корня icons/ -->
	<svg width="24" height="24">
		<use xlink:href="/sprites/icons.svg#heart"></use>
	</svg>

	<!-- Иконка из подпапки social/ -->
	<svg width="24" height="24">
		<use xlink:href="/sprites/icons.svg#social-youtube"></use>
	</svg>

	<!-- Иконка из подпапки actions/ -->
	<svg width="24" height="24">
		<use xlink:href="/sprites/icons.svg#actions-edit"></use>
	</svg>
</template>
```

## 📋 Правила именования ID

ID иконки в спрайте генерируется из пути к файлу:

```
raw/icons/heart.svg              → #heart
raw/icons/social/facebook.svg    → #social-facebook
raw/icons/actions/edit.svg       → #actions-edit
raw/icons/nav/arrow-right.svg    → #nav-arrow-right
```

## 🎨 Подготовка SVG иконок

### ✅ Правильный SVG

```xml
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path fill="currentColor" d="M12 2L2 7v10l10 5 10-5V7z"/>
</svg>
```

**Хорошо:**

- Использует `viewBox` вместо `width/height`
- `fill="currentColor"` - цвет наследуется из CSS
- Нет лишних атрибутов
- Минимальная разметка

### ❌ Проблемный SVG

```xml
<svg width="24px" height="24px" id="icon-1" class="my-icon" style="...">
  <title>My Icon</title>
  <desc>Description</desc>
  <g transform="translate(0,0)">
    <g transform="scale(1)">
      <path fill="#FF0000" stroke="#000" d="..."/>
    </g>
  </g>
</svg>
```

**Проблемы:**

- Фиксированные размеры (`width`, `height`)
- ID и классы (будут конфликтовать)
- Лишние `<g>` группы
- Фиксированные цвета (`#FF0000`)
- Ненужные элементы (`<title>`, `<desc>`)

### Оптимизация перед добавлением

#### Онлайн инструменты

1. **[SVGOMG](https://jakearchibald.github.io/svgomg/)** (рекомендуется)

   - Drag & Drop SVG
   - Настройки оптимизации
   - Скачать результат

2. **[SVGO Playground](https://svgo-playground.vercel.app/)**
   - Похож на SVGOMG
   - Больше настроек

#### Настройки SVGO (рекомендуемые)

```
✅ Remove doctype
✅ Remove XML instructions
✅ Remove comments
✅ Remove metadata
✅ Remove editors data
✅ Clean up attributes
✅ Remove empty attributes
✅ Remove hidden elements
✅ Merge paths
✅ Convert style to attributes
✅ Convert colors
⚠️ Remove viewBox - НЕТ (нужен!)
✅ Clean up IDs
```

#### Figma → SVG

При экспорте из Figma:

1. Выберите иконку
2. Export → SVG
3. Настройки экспорта:
   - **Include "id" attribute:** Unchecked
   - **Outline text:** Checked (если есть текст)
   - **Simplify stroke:** Checked

#### Adobe Illustrator → SVG

File → Export → Export As → SVG

Настройки:

- **Styling:** Presentation Attributes
- **Font:** Convert to Outlines
- **Images:** Embed
- **Object IDs:** Layer Names
- **Decimal:** 2
- **Minify:** ✅
- **Responsive:** ✅

## 🎯 Best Practices

### 1. Единый размер viewBox

Используйте один размер для всех иконок:

✅ **Рекомендуется:**

```
viewBox="0 0 24 24"    ← Все иконки 24x24
```

❌ **Не рекомендуется:**

```
icon1.svg → viewBox="0 0 24 24"
icon2.svg → viewBox="0 0 16 16"
icon3.svg → viewBox="0 0 32 32"
```

### 2. currentColor для цвета

```xml
<!-- ✅ Хорошо - цвет управляется из CSS -->
<path fill="currentColor" d="..."/>

<!-- ❌ Плохо - фиксированный цвет -->
<path fill="#FF0000" d="..."/>
```

Использование:

```vue
<template>
	<svg class="icon">
		<use xlink:href="/sprites/icons.svg#heart"></use>
	</svg>
</template>

<style>
.icon {
	color: red; /* currentColor = red */
	width: 24px;
	height: 24px;
}

.icon:hover {
	color: blue; /* currentColor = blue */
}
</style>
```

### 3. Описательные имена файлов

```
✅ Хорошо:
- arrow-right.svg
- arrow-left.svg
- user-profile.svg
- shopping-cart.svg
- social-facebook.svg

❌ Плохо:
- icon1.svg
- Icon_NEW_final.svg
- fb.svg
- img_copy_2.svg
```

### 4. Группировка по категориям

```
raw/icons/
├── social/          # Социальные сети
├── actions/         # CRUD операции
├── navigation/      # Навигация
├── ui/             # UI элементы
├── communication/   # Email, Phone, Chat
└── status/         # Success, Error, Warning
```

### 5. Размер файлов

- **Оптимально:** < 2KB на иконку
- **Максимум:** < 5KB

Если файл больше - значит иконка слишком сложная. Упростите или используйте PNG/WebP.

## 💡 Примеры использования

### Базовая иконка

```vue
<template>
	<svg class="icon" aria-label="Heart icon">
		<use xlink:href="/sprites/icons.svg#heart"></use>
	</svg>
</template>

<style scoped>
.icon {
	width: 24px;
	height: 24px;
	color: red;
}
</style>
```

### Иконка с текстом

```vue
<template>
	<button class="btn">
		<svg class="btn__icon">
			<use xlink:href="/sprites/icons.svg#social-youtube"></use>
		</svg>
		<span>Watch on YouTube</span>
	</button>
</template>

<style scoped>
.btn {
	display: flex;
	align-items: center;
	gap: 8px;
}

.btn__icon {
	width: 20px;
	height: 20px;
	color: #ff0000;
}
</style>
```

### Адаптивные размеры

```vue
<template>
	<div>
		<svg class="icon icon--sm">
			<use xlink:href="/sprites/icons.svg#heart"></use>
		</svg>
		<svg class="icon icon--md">
			<use xlink:href="/sprites/icons.svg#heart"></use>
		</svg>
		<svg class="icon icon--lg">
			<use xlink:href="/sprites/icons.svg#heart"></use>
		</svg>
	</div>
</template>

<style scoped>
.icon {
	color: currentColor;
}

.icon--sm {
	width: 16px;
	height: 16px;
}

.icon--md {
	width: 24px;
	height: 24px;
}

.icon--lg {
	width: 32px;
	height: 32px;
}
</style>
```

### Анимированная иконка

```vue
<template>
	<svg class="icon icon--animated">
		<use xlink:href="/sprites/icons.svg#heart"></use>
	</svg>
</template>

<style scoped>
.icon--animated {
	transition: transform 0.2s;
}

.icon--animated:hover {
	transform: scale(1.2);
	color: red;
}
</style>
```

## 🔍 Проверка иконок

### Просмотр спрайта

Откройте сгенерированный спрайт в браузере:

```
http://localhost:3000/sprites/icons.svg
```

Или в редакторе:

```bash
code app/assets/sprites/icons.svg
```

### Список всех иконок

```bash
# Показать все ID иконок в спрайте
grep -o 'id="[^"]*"' app/assets/sprites/icons.svg
```

## 🚀 Автоматическая обработка

### Watch режим

```bash
pnpm assets:watch
```

Теперь при добавлении/изменении `.svg` файлов в `raw/icons/`, спрайт автоматически перегенерируется.

### В CI/CD

```yaml
# .github/workflows/deploy.yml
- name: Generate sprite
  run: pnpm assets:icons

- name: Build
  run: pnpm build
```

## 📚 Где взять иконки

### Бесплатные источники

- [Heroicons](https://heroicons.com/) - 292 иконки от Tailwind CSS
- [Feather Icons](https://feathericons.com/) - 286 минималистичных иконок
- [Bootstrap Icons](https://icons.getbootstrap.com/) - 1800+ иконок
- [Material Design Icons](https://pictogrammers.com/library/mdi/) - 7000+ иконок
- [Font Awesome](https://fontawesome.com/) - Огромная коллекция
- [Ionicons](https://ionic.io/ionicons) - 1300+ иконок

### Платные источники

- [Streamline](https://www.streamlinehq.com/) - 100,000+ иконок
- [Iconfinder](https://www.iconfinder.com/) - Миллионы иконок
- [Flaticon](https://www.flaticon.com/) - Огромная коллекция

## ⚠️ Troubleshooting

### Иконка не отображается

1. **Проверьте путь к спрайту:**

   ```vue
   <!-- ✅ Правильно -->
   <use xlink:href="/sprites/icons.svg#heart"></use>

   <!-- ❌ Неправильно -->
   <use xlink:href="sprites/icons.svg#heart"></use>
   <use xlink:href="/assets/sprites/icons.svg#heart"></use>
   ```

2. **Проверьте ID иконки:**
   Откройте `app/assets/sprites/icons.svg` и найдите нужный `id="..."`.

3. **Проверьте размер SVG:**
   ```vue
   <svg width="24" height="24">
     <use xlink:href="/sprites/icons.svg#heart"></use>
   </svg>
   ```

### Иконка отображается черным квадратом

Проблема с `viewBox` в исходном SVG. Проверьте:

```xml
<!-- ✅ Правильно -->
<svg viewBox="0 0 24 24">

<!-- ❌ Неправильно -->
<svg>
```

### Иконка не меняет цвет

Используйте `currentColor`:

```xml
<!-- ✅ Правильно -->
<path fill="currentColor" d="..."/>

<!-- ❌ Неправильно -->
<path fill="#000000" d="..."/>
```

---

[← Назад к raw/](../README.md) | [← Назад к главному README](../../README.md)
