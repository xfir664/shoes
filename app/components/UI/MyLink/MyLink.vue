<script setup lang="ts">
import { computed, type CSSProperties } from "vue";

const props = defineProps<{
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  variant?: "base" | "primary" | "secondary";
  className?: string;
  styles?: CSSProperties;
  isActive?: boolean;
  disabled?: boolean;
}>();

const classes = computed(() => {
  return [
    "my-link",
    props.className && props.className,
    props.variant && `my-link--${props.variant}`,
    props.isActive && `active`,
    props.disabled && `disabled`,
  ]
    .filter(Boolean)
    .join(" ");
});
</script>

<template>
  <a :href="href" :target="target" :class="classes" :style="styles">
    <slot />
  </a>
</template>

<style scoped lang="scss">
@use "sass:map";
@use "./_link.config.scss" as cfg;
@use "@/assets/styles/var.scss" as *;
@use "@/assets/styles/mixins" as *;

.my-link {
	display: inline-flex;
	align-items: center;
	cursor: pointer;
	text-decoration: none;
	transition: var(--transition-base);

	@each $name, $v in cfg.$link-variants {
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
		}
	}
}
</style>
