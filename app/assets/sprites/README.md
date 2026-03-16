# app/assets/sprites/ - SVG Спрайты

Папка `app/assets/sprites/` содержит сгенерированные SVG спрайты - объединенные SVG иконки в одном файле для эффективного использования.

## 🎯 Назначение папки

Это **результат** генерации SVG спрайтов из отдельных иконок в `raw/icons/`.

### Преимущества спрайтов

✅ **Один HTTP запрос** вместо десятков  
✅ **Кэширование** всех иконок разом  
✅ **Меньший общий размер** из-за оптимизации  
✅ **Удобное использование** через `<use>`

## 🔄 Откуда берутся файлы

```
raw/icons/heart.svg           →
raw/icons/star.svg            →  [pnpm assets:icons]  →  app/assets/sprites/icons.svg
raw/icons/social/youtube.svg  →
```

**Не редактируйте файлы вручную** - они генерируются автоматически!

## 📄 Структура спрайта

### Как выглядит сгенерированный файл

```xml
<!-- app/assets/sprites/icons.svg -->
<svg xmlns="http://www.w3.org/2000/svg">
	<defs>
		<!-- Каждая иконка как symbol с уникальным ID -->
		<symbol id="heart" viewBox="0 0 24 24">
			<path fill="currentColor" d="M12,21.35L10.55..." />
		</symbol>

		<symbol id="star" viewBox="0 0 24 24">
			<path fill="currentColor" d="M12,17.27L18.18..." />
		</symbol>

		<symbol id="social-youtube" viewBox="0 0 24 24">
			<path fill="currentColor" d="M10,15L15.19..." />
		</symbol>
	</defs>
</svg>
```

### Именование ID

ID генерируются из пути к файлу:

```
raw/icons/heart.svg              → #heart
raw/icons/social/youtube.svg     → #social-youtube
raw/icons/actions/edit.svg       → #actions-edit
raw/icons/nav/arrow-right.svg    → #nav-arrow-right
```

## 💻 Использование спрайтов

### Базовое использование

```vue
<template>
	<svg width="24" height="24" aria-label="Heart icon">
		<use xlink:href="/sprites/icons.svg#heart"></use>
	</svg>
</template>
```

### С CSS стилизацией

```vue
<template>
	<svg class="icon icon--heart">
		<use xlink:href="/sprites/icons.svg#heart"></use>
	</svg>
</template>

<style scoped>
.icon {
	width: 24px;
	height: 24px;
	color: currentColor;
}

.icon--heart {
	color: red;
}

.icon--heart:hover {
	color: darkred;
	transform: scale(1.2);
}
</style>
```

### В компоненте-обертке

```vue
<!-- components/UI/Icon/Icon.vue -->
<template>
	<svg :class="['icon', `icon--${size}`, className]" :aria-label="label">
		<use :xlink:href="`/sprites/icons.svg#${name}`"></use>
	</svg>
</template>

<script setup lang="ts">
interface Props {
	name: string;
	size?: "sm" | "md" | "lg";
	className?: string;
	label?: string;
}

withDefaults(defineProps<Props>(), {
	size: "md",
	className: "",
});
</script>

<style scoped lang="scss">
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

**Использование компонента:**

```vue
<template>
	<UIIcon name="heart" size="lg" className="text-red" label="Like" />
	<UIIcon name="social-youtube" size="md" />
	<UIIcon name="actions-edit" size="sm" />
</template>
```

## 🎨 Стилизация иконок

### Цвет через currentColor

```vue
<template>
	<div class="button">
		<svg class="button__icon">
			<use xlink:href="/sprites/icons.svg#heart"></use>
		</svg>
		<span>Like</span>
	</div>
</template>

<style scoped>
.button {
	color: blue; /* currentColor наследуется */
}

.button__icon {
	width: 20px;
	height: 20px;
	color: currentColor; /* = blue */
}

.button:hover {
	color: darkblue; /* Иконка тоже изменится */
}
</style>
```

### Анимации

```vue
<template>
	<svg class="icon icon--animated">
		<use xlink:href="/sprites/icons.svg#heart"></use>
	</svg>
</template>

<style scoped>
.icon--animated {
	transition: all 0.3s ease;
}

.icon--animated:hover {
	transform: scale(1.2) rotate(15deg);
	color: red;
}

/* Пульсация */
@keyframes pulse {
	0%,
	100% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.1);
	}
}

.icon--pulse {
	animation: pulse 1s infinite;
}
</style>
```

### Разные размеры

```vue
<template>
	<div class="icon-sizes">
		<svg class="icon icon--xs">
			<use xlink:href="/sprites/icons.svg#star"></use>
		</svg>
		<svg class="icon icon--sm">
			<use xlink:href="/sprites/icons.svg#star"></use>
		</svg>
		<svg class="icon icon--md">
			<use xlink:href="/sprites/icons.svg#star"></use>
		</svg>
		<svg class="icon icon--lg">
			<use xlink:href="/sprites/icons.svg#star"></use>
		</svg>
		<svg class="icon icon--xl">
			<use xlink:href="/sprites/icons.svg#star"></use>
		</svg>
	</div>
</template>

<style scoped>
.icon {
	color: gold;
}
.icon--xs {
	width: 12px;
	height: 12px;
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
.icon--xl {
	width: 48px;
	height: 48px;
}
</style>
```

## 🎯 Best Practices

### 1. Переиспользуйте через компонент

```vue
<!-- ✅ Хорошо - компонент-обертка -->
<UIIcon name="heart" />

<!-- ⚠️ Плохо - повторяющийся код -->
<svg width="24" height="24">
	<use xlink:href="/sprites/icons.svg#heart"></use>
</svg>
```

### 2. Используйте currentColor

```xml
<!-- ✅ В исходной иконке -->
<path fill="currentColor" d="..." />

<!-- ❌ Не используйте фиксированные цвета -->
<path fill="#FF0000" d="..." />
```

### 3. Указывайте размеры

```vue
<!-- ✅ Хорошо -->
<svg width="24" height="24">
	<use xlink:href="/sprites/icons.svg#heart"></use>
</svg>

<!-- ❌ Плохо -->
<svg>
	<use xlink:href="/sprites/icons.svg#heart"></use>
</svg>
```

### 4. Accessibility

```vue
<!-- ✅ Хорошо - с описанием -->
<svg aria-label="Favorite" role="img">
	<use xlink:href="/sprites/icons.svg#heart"></use>
</svg>

<!-- ✅ Хорошо - декоративная иконка -->
<svg aria-hidden="true">
	<use xlink:href="/sprites/icons.svg#heart"></use>
</svg>
```

### 5. Проверяйте ID иконок

```bash
# Показать все доступные иконки в спрайте
grep -o 'id="[^"]*"' app/assets/sprites/icons.svg

# Или откройте файл в браузере
# http://localhost:3000/sprites/icons.svg
```

## 💡 Примеры использования

### Кнопка с иконкой

```vue
<template>
	<button class="btn">
		<svg class="btn__icon">
			<use xlink:href="/sprites/icons.svg#social-youtube"></use>
		</svg>
		<span class="btn__text">Watch on YouTube</span>
	</button>
</template>

<style scoped>
.btn {
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 12px 24px;
	background: #ff0000;
	color: white;
	border: none;
	border-radius: 8px;
	cursor: pointer;
}

.btn__icon {
	width: 20px;
	height: 20px;
}

.btn:hover {
	background: #cc0000;
}
</style>
```

### Навигация с иконками

```vue
<template>
	<nav class="nav">
		<a
			v-for="item in navItems"
			:key="item.to"
			:href="item.to"
			class="nav__item"
		>
			<svg class="nav__icon">
				<use :xlink:href="`/sprites/icons.svg#${item.icon}`"></use>
			</svg>
			<span>{{ item.label }}</span>
		</a>
	</nav>
</template>

<script setup lang="ts">
const navItems = [
	{ to: "/", icon: "home", label: "Home" },
	{ to: "/about", icon: "info", label: "About" },
	{ to: "/contact", icon: "mail", label: "Contact" },
];
</script>

<style scoped>
.nav {
	display: flex;
	gap: 1rem;
}

.nav__item {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.5rem 1rem;
	text-decoration: none;
	color: inherit;
}

.nav__icon {
	width: 20px;
	height: 20px;
}

.nav__item:hover {
	background: #f0f0f0;
	border-radius: 4px;
}
</style>
```

### Social media links

```vue
<template>
	<div class="social-links">
		<a
			v-for="social in socials"
			:key="social.name"
			:href="social.url"
			:aria-label="social.name"
			class="social-link"
			target="_blank"
			rel="noopener noreferrer"
		>
			<svg class="social-link__icon">
				<use :xlink:href="`/sprites/icons.svg#social-${social.icon}`"></use>
			</svg>
		</a>
	</div>
</template>

<script setup lang="ts">
const socials = [
	{ name: "YouTube", icon: "youtube", url: "https://youtube.com/..." },
	{ name: "Facebook", icon: "facebook", url: "https://facebook.com/..." },
	{ name: "Twitter", icon: "twitter", url: "https://twitter.com/..." },
];
</script>

<style scoped>
.social-links {
	display: flex;
	gap: 1rem;
}

.social-link {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background: #f0f0f0;
	color: #333;
	transition: all 0.3s;
}

.social-link__icon {
	width: 24px;
	height: 24px;
}

.social-link:hover {
	background: #333;
	color: white;
	transform: translateY(-2px);
}
</style>
```

## ⚠️ Troubleshooting

### Иконка не отображается

**Проблема:** Пустой квадрат или ничего

**Решение:**

1. Проверьте путь: `/sprites/icons.svg#...` (с `/` в начале)
2. Проверьте ID иконки в спрайте
3. Укажите размеры: `width="24" height="24"`

### Иконка черного цвета

**Проблема:** Иконка всегда черная, не меняет цвет

**Решение:**  
Проверьте, что в исходном SVG используется `fill="currentColor"`:

```bash
# Проверить спрайт
grep -A 2 'id="heart"' app/assets/sprites/icons.svg
```

### Спрайт не обновляется

**Проблема:** Добавил иконку, но её нет в спрайте

**Решение:**

```bash
# Перегенерируйте спрайт
pnpm assets:icons

# Или с watch
pnpm assets:watch
```

## 📚 Связанные файлы

- [raw/icons/](../../raw/icons/README.md) - Исходные SVG иконки
- [scripts/generate-sprite.js](../../scripts/) - Скрипт генерации спрайта
- [public/icon/](../../public/icon/README.md) - Отдельные SVG иконки (не спрайты)

---

[← Назад к assets/](../README.md) | [← Назад к главному README](../../../README.md)
