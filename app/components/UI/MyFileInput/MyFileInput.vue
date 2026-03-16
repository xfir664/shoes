<script setup lang="ts">
import { computed, type CSSProperties } from "vue";

const props = defineProps<{
  disabled?: boolean;
  styles?: CSSProperties;
  className?: string;
  variant?: "base" | "primary" | "secondary";
  isActive?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const handleChange = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
};

const classes = computed(() => {
  return [
    "file-input",
    props.className && props.className,
    props.variant && `file-input--${props.variant}`,
    props.isActive && `active`,
  ]
    .filter(Boolean)
    .join(" ");
});
</script>

<template>
  <input
    type="file"
    :disabled="props.disabled"
    :class="classes"
    :style="props.styles"
    @change="handleChange"
  />
</template>

<style scoped lang="scss">
@use "sass:map";
@use "./_file.config.scss" as cfg;
@use "@/assets/styles/var.scss" as *;
@use "@/assets/styles/mixins" as *;

.file-input {
	transition: var(--transition-base);
	cursor: pointer;
	font-family: inherit;
	font-size: var(--fs-sm);
	min-height: var(--component-height-md);

	@each $name, $v in cfg.$file-variants {
		&--#{$name} {
			@include interactive-bg(
				map.get($v, bg),
				map.get($v, bg-hover),
				map.get($v, bg-click),
				map.get($v, bg-active)
			);
			padding: map.get($v, padding);
			border-radius: map.get($v, radius);
			border: map.get($v, border);
		}
	}
}
</style>
