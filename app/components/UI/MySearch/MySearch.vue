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
    "my-search",
    props.className && props.className,
    props.variant && `my-search--${props.variant}`,
  ]
    .filter(Boolean)
    .join(" ");
});
</script>

<template>
  <input type="search" :class="classes" :style="styles" :disabled="disabled" />
</template>

<style scoped lang="scss">
@use "sass:map";
@use "./_search.config.scss" as cfg;
@use "@/assets/styles/var.scss" as *;
@use "@/assets/styles/mixins" as *;

.my-search {
	width: 100%;
	margin: 0;
	font-family: inherit;
	min-height: var(--component-height-md);
	transition: var(--transition-base);

	&::placeholder {
		color: var(--c-neutral-400);
	}

	@each $name, $v in cfg.$search-variants {
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
			border-radius: map.get($v, radius);
			border: map.get($v, border);
		}
	}
}
</style>
