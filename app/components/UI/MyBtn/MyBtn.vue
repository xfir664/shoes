<script setup lang="ts">
import { computed, type CSSProperties } from "vue";

const emit = defineEmits<{
	(e: "click"): void;
}>();

const props = defineProps<{
	type: "button" | "submit" | "reset";
	disabled?: boolean;
	isActive?: boolean;
	className?: string;
	styles?: CSSProperties;
	variant?: "base" | "primary" | "secondary";
}>();

const classes = computed(() => {
	return [
		"btn",
		props.className && props.className,
		props.variant && `btn--${props.variant}`,
		props.isActive && "active",
	]
		.filter(Boolean)
		.join(" ");
});

const handleClick = () => {
	if (props.disabled) return;
	emit("click");
};
</script>

<template>
	<button
		:type="type"
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
@use "./_btn.config.scss" as cfg;
@use "@/assets/styles/var.scss" as *;
@use "@/assets/styles/mixins" as *;

.btn {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	border: none;
	background-color: transparent;
	padding: 0;
	font-weight: 500;
	font-family: inherit;
	min-height: var(--component-height-md);
	transition: var(--transition-base);

	@each $name, $v in cfg.$btn-variants {
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
