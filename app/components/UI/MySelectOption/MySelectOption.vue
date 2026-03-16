<script setup lang="ts">
import { computed, type CSSProperties } from "vue";

const props = defineProps<{
  className?: string;
  styles?: CSSProperties;
  variant?: "base" | "primary" | "secondary";
}>();

const classes = computed(() => {
  return [
    "my-select-option",
    props.className && props.className,
    props.variant && `my-select-option--${props.variant}`,
  ]
    .filter(Boolean)
    .join(" ");
});
</script>

<template>
  <option :class="classes" :style="styles">
    <slot />
  </option>
</template>

<style scoped lang="scss">
@use "sass:map";
@use "./_selectoption.config.scss" as cfg;
@use "@/assets/styles/var.scss" as *;
@use "@/assets/styles/mixins" as *;

.my-select-option {
	cursor: pointer;
	transition: var(--transition-base);

	@each $name, $v in cfg.$selectoption-variants {
		&--#{$name} {
			@include interactive-colors(
				map.get($v, color),
				map.get($v, bg),
				map.get($v, bg-hover),
				map.get($v, bg-click),
				map.get($v, color-active),
				map.get($v, bg-active)
			);
			@include responsive-font(map.get($v, size-mob), map.get($v, size-tab), map.get($v, size-desk));
			@include responsive-line-height(map.get($v, lh-mob), map.get($v, lh-tab), map.get($v, lh-desk));
			padding: map.get($v, padding);
		}
	}
}
</style>
