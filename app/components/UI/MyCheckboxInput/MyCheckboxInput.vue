<script setup lang="ts">
import { computed, type CSSProperties } from "vue";

const props = defineProps<{
  disabled?: boolean;
  className?: string;
  styles?: CSSProperties;
  variant?: "base" | "primary" | "secondary";
  checked?: boolean;
}>();

const classes = computed(() => {
  return [
    "checkbox",
    props.className && props.className,
    props.variant && `checkbox--${props.variant}`,
  ]
    .filter(Boolean)
    .join(" ");
});

const emit = defineEmits<{
  (e: "change", value: boolean): void;
}>();

const handleChange = (event: Event) => {
  if (!event.target) return;
  emit("change", (event.target as HTMLInputElement).checked);
};
</script>

<template>
  <input
    type="checkbox"
    :disabled="props.disabled"
    :checked="checked"
    :class="classes"
    :style="props.styles"
    @change="handleChange"
  />
</template>

<style scoped lang="scss">
@use "sass:map";
@use "./_checkbox.config.scss" as cfg;
@use "@/assets/styles/var.scss" as *;
@use "@/assets/styles/mixins" as *;

.checkbox {
	transition: var(--transition-base);
	appearance: none;
	position: relative;
	cursor: pointer;
	flex-shrink: 0;

	@each $name, $v in cfg.$checkbox-variants {
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
				background-color: map.get($v, bg-checked);
				border: map.get($v, border-checked);

				&::before {
					content: "";
					position: absolute;
					top: 40%;
					left: 50%;
					width: 5px;
					height: 9px;
					border: solid var(--c-white);
					border-width: 0 2px 2px 0;
					transform: translate(-50%, -50%) rotate(45deg);
				}
			}

			&:disabled {
				opacity: 0.5;
				cursor: not-allowed;
			}

			&.active:checked {
				background-color: map.get($v, bg-checked-active);

				&::before {
					border-color: var(--c-white);
				}
			}
		}
	}
}
</style>
