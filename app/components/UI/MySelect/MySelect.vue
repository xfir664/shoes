<script setup lang="ts">
import { computed, type CSSProperties } from "vue";

const props = defineProps<{
  className?: string;
  styles?: CSSProperties;
  variant?: "base" | "primary" | "secondary";
  disabled?: boolean;
}>();

const classes = computed(() => {
  return [
    "my-select",
    props.className && props.className,
    props.variant && `my-select--${props.variant}`,
  ]
    .filter(Boolean)
    .join(" ");
});
</script>

<template>
  <select :class="classes" :style="styles" :disabled="disabled">
    <slot />
  </select>
</template>

<style scoped lang="scss">
@use "sass:map";
@use "./_select.config.scss" as cfg;
@use "@/assets/styles/mixins" as *;

.my-select {
	width: 100%;
	font-family: inherit;
	min-height: var(--component-height-md);
	cursor: pointer;
	transition: var(--transition-base);

	@each $name, $v in cfg.$select-variants {
		&--#{$name} {
			@include interactive-colors(
				map.get($v, color),
				map.get($v, bg),
				map.get($v, bg-hover),
				map.get($v, bg-click),
				map.get($v, color-active),
				map.get($v, bg-active)
			);
			padding: map.get($v, padding);
			border-radius: map.get($v, radius);
			border: map.get($v, border);
		}
	}
}
</style>
