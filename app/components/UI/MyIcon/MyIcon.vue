<script setup lang="ts">
import { computed, type CSSProperties } from "vue";

const props = defineProps<{
  id?: string;
  href?: string;
  className?: string;
  variant?: "base" | "primary" | "secondary";
  disabled?: boolean;
  isActive?: boolean;
  styles?: CSSProperties;
}>();

const path = computed(() => {
  return props.href || `/sprites/sprite.svg#${props.id}`;
});

const classes = computed(() => {
  return [
    "icon",
    props.className && props.className,
    props.variant && `icon--${props.variant}`,
    props.isActive && `active`,
    props.disabled && `disabled`,
  ]
    .filter(Boolean)
    .join(" ");
});
</script>

<template>
  <svg :class="classes" :style="styles">
    <use :href="path" />
  </svg>
</template>

<style scoped lang="scss">
@use "sass:map";
@use "./_icon.config.scss" as cfg;
@use "@/assets/styles/var.scss" as *;
@use "@/assets/styles/mixins" as *;

.icon {
	transition: var(--transition-base);

	@each $name, $v in cfg.$icon-variants {
		&--#{$name} {
			@include responsive-size(
				map.get($v, w-mob), map.get($v, h-mob),
				map.get($v, w-tab), map.get($v, h-tab),
				map.get($v, w-desk), map.get($v, h-desk)
			);
			@include interactive-icon(
				map.get($v, color),
				map.get($v, color-hover),
				map.get($v, color-active)
			);
		}
	}
}
</style>
