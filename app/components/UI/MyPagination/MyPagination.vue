<script setup lang="ts">
import { computed, type CSSProperties } from "vue";

const props = defineProps<{
  className?: string;
  styles?: CSSProperties;
  variant?: "base" | "primary" | "secondary";
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: "click"): void;
}>();

const classes = computed(() => {
  return [
    "my-pagination",
    props.className && props.className,
    props.variant && `my-pagination--${props.variant}`,
  ]
    .filter(Boolean)
    .join(" ");
});

const handleClick = () => {
  emit("click");
};
</script>

<template>
  <button
    :class="classes"
    :style="styles"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
@use "sass:map";
@use "./_pagination.config.scss" as cfg;
@use "@/assets/styles/var.scss" as *;
@use "@/assets/styles/mixins" as *;

.my-pagination {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	border: none;
	background-color: transparent;
	font-family: inherit;
	font-weight: 500;
	min-width: var(--component-height-sm);
	min-height: var(--component-height-sm);
	transition: var(--transition-base);

	@each $name, $v in cfg.$pagination-variants {
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
