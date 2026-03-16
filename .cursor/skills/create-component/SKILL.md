---
name: create-component
description: Создание нового UI-компонента для Nuxt-проекта с SCSS-конфигом вариантов, типизацией и scoped-стилями. Используй когда нужно создать новый компонент, кнопку, инпут, карточку или любой переиспользуемый элемент интерфейса.
---

# Создание UI-компонента

## Структура

Каждый UI-компонент живёт в своей папке:

```
app/components/UI/MyName/
├── MyName.vue         # Компонент
└── _name.config.scss  # SCSS map вариантов
```

## Шаг 1 — SCSS-конфиг `_name.config.scss`

```scss
$name-variants: (
	base: (
		color: var(--c-neutral-900),
		bg: var(--c-neutral-100),
		bg-hover: var(--c-neutral-200),
		bg-click: var(--c-neutral-300),
		color-active: var(--c-white),
		bg-active: var(--c-blue-600),
		size-mob: 14px,
		size-tab: 15px,
		size-desk: 16px,
		lh-mob: 18px,
		lh-tab: 20px,
		lh-desk: 22px,
	),
	primary: (
		color: var(--c-white),
		bg: var(--c-blue-600),
		bg-hover: var(--c-blue-700),
		bg-click: var(--c-blue-800),
		color-active: var(--c-white),
		bg-active: var(--c-blue-900),
		size-mob: 14px,
		size-tab: 16px,
		size-desk: 18px,
		lh-mob: 18px,
		lh-tab: 22px,
		lh-desk: 24px,
	),
);
```

**Ключи map**: `color`, `bg`, `bg-hover`, `bg-click`, `color-active`, `bg-active`, `size-mob`, `size-tab`, `size-desk`, `lh-mob`, `lh-tab`, `lh-desk`.

Значения бери из `_tokens.scss` — CSS Custom Properties (`var(--c-blue-600)`).

## Шаг 2 — Vue-компонент `MyName.vue`

```vue
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
	variant?: "base" | "primary";
	disabled?: boolean;
}>();

const emit = defineEmits<{
	(e: "click"): void;
}>();

const classes = computed(() =>
	["name", props.variant && `name--${props.variant}`].filter(Boolean).join(" "),
);
</script>

<template>
	<div :class="classes">
		<slot />
	</div>
</template>

<style scoped lang="scss">
@use "sass:map";
@use "./_name.config.scss" as cfg;
@use "@/assets/styles/var.scss" as *;
@use "@/assets/styles/mixins" as *;

.name {
	transition: var(--transition-base);

	@each $name, $v in cfg.$name-variants {
		&--#{$name} {
			@include interactive-colors(
				map.get($v, color),
				map.get($v, bg),
				map.get($v, bg-hover),
				map.get($v, bg-click),
				map.get($v, color-active),
				map.get($v, bg-active)
			);
			@include responsive-font(
				map.get($v, size-mob),
				map.get($v, size-tab),
				map.get($v, size-desk)
			);
			@include responsive-line-height(
				map.get($v, lh-mob),
				map.get($v, lh-tab),
				map.get($v, lh-desk)
			);
		}
	}
}
</style>
```

## Шаг 3 — Использование

Компонент доступен глобально (Nuxt auto-import, `pathPrefix: false`):

```vue
<MyName variant="primary">Контент</MyName>
```

## Чеклист

- [ ] Папка `app/components/UI/MyName/`
- [ ] `_name.config.scss` с SCSS map вариантов
- [ ] `MyName.vue` с `<script setup lang="ts">`, `<style scoped lang="scss">`
- [ ] Props типизированы через `defineProps<{ ... }>()`
- [ ] Вариант через prop `variant` и динамический класс `name--${variant}`
- [ ] Значения цветов/отступов из `_tokens.scss`
- [ ] Миксины из `@/assets/styles/mixins`

## Добавление нового варианта к существующему компоненту

1. Добавь ключ в SCSS map в `_config.scss`
2. Добавь значение в union type prop `variant` в `.vue`
3. Класс сгенерируется автоматически — `@each` пройдёт по новому ключу
