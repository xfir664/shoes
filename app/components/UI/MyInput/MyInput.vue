<script setup lang="ts">
import { ref, computed } from "vue";
import type { CSSProperties } from "vue";

const props = defineProps<{
	modelValue?: string;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	variant?: "base" | "primary" | "secondary";
	isActive?: boolean;
	className?: string;
	styles?: CSSProperties;
	type?: "text" | "password" | "email" | "number" | "tel";
}>();

const inputValue = ref(props.modelValue);

const classes = computed(() => {
	return [
		"my-input",
		props.className && props.className,
		props.variant && `my-input--${props.variant}`,
		props.isActive && `active`,
	]
		.filter(Boolean)
		.join(" ");
});

const emit = defineEmits<{
	(e: "update:modelValue", value: string): void;
}>();

const handleInput = (e: Event) => {
	inputValue.value = (e.target as HTMLInputElement).value;
	emit("update:modelValue", inputValue.value);
};
</script>

<template>
	<input
		:type="type"
		:placeholder="placeholder"
		:disabled="disabled"
		:class="classes"
		:style="styles"
		:required="required"
		:value="inputValue"
		@input="handleInput"
	/>
</template>

<style scoped lang="scss">
@use "sass:map";
@use "./_input.config.scss" as cfg;
@use "@/assets/styles/var.scss" as *;
@use "@/assets/styles/mixins" as *;

.my-input {
	width: 100%;
	margin: 0;
	font-family: inherit;
	min-height: var(--component-height-md);
	transition: var(--transition-base);

	&::placeholder {
		color: var(--c-neutral-400);
	}

	@each $name, $v in cfg.$input-variants {
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
			border-bottom: map.get($v, border-bottom);
		}
	}
}
</style>
