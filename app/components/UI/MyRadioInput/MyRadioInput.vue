<script setup lang="ts">
import { computed, type CSSProperties } from "vue";

const props = defineProps<{
  className?: string;
  styles?: CSSProperties;
  variant?: "base" | "primary" | "secondary";
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: "change"): void;
}>();

const classes = computed(() => {
  return [
    "my-radio-input",
    props.className && props.className,
    props.variant && `my-radio-input--${props.variant}`,
  ]
    .filter(Boolean)
    .join(" ");
});

const handleChange = () => {
  emit("change");
};
</script>

<template>
  <input
    type="radio"
    :class="classes"
    :style="styles"
    :disabled="disabled"
    @change="handleChange"
  />
</template>

<style scoped lang="scss">
@use "sass:map";
@use "./_radio.config.scss" as cfg;
@use "@/assets/styles/var.scss" as *;
@use "@/assets/styles/mixins" as *;

.my-radio-input {
	transition: var(--transition-base);
	appearance: none;
	position: relative;
	cursor: pointer;
	flex-shrink: 0;

	@each $name, $v in cfg.$radio-variants {
		&--#{$name} {
			@include responsive-size(
				map.get($v, w-mob), map.get($v, h-mob),
				map.get($v, w-tab), map.get($v, h-tab),
				map.get($v, w-desk), map.get($v, h-desk)
			);
			background-color: map.get($v, bg);
			border: map.get($v, border);
			border-radius: map.get($v, radius);

			&:hover:not(:disabled) {
				background-color: map.get($v, bg-hover);
				border-color: var(--c-primary);
			}

			&:focus-visible:not(:disabled) {
				outline: none;
				box-shadow: 0 0 0 3px var(--c-focus-ring);
			}

			&:checked {
				border: map.get($v, border-checked);

				&::before {
					content: "";
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 8px;
					height: 8px;
					border-radius: 50%;
					background-color: map.get($v, bg-checked);
				}
			}

			&:disabled {
				opacity: 0.5;
				cursor: not-allowed;
			}

			&.active:checked::before {
				background-color: map.get($v, bg-checked-active);
			}
		}
	}
}
</style>
