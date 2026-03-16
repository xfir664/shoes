<!--
  MyBadge — бейдж для карточки товара.
  variant: sale / new / popular
  Позиционируется абсолютно внутри relative-родителя.
-->
<script setup lang="ts">
withDefaults(
	defineProps<{
		variant?: "sale" | "new" | "popular";
		text?: string;
	}>(),
	{
		variant: "sale",
		text: "",
	},
);
</script>

<template>
	<span class="badge" :class="`badge--${variant}`">
		<slot>{{ text }}</slot>
	</span>
</template>

<style scoped lang="scss">
.badge {
	position: absolute;
	top: var(--spacing-sm);
	left: var(--spacing-sm);
	padding: var(--spacing-xs) var(--spacing-sm);
	font-family: var(--font-accent);
	font-size: var(--fs-xs);
	font-weight: var(--fw-bold);
	border-radius: var(--radius-sm);
	z-index: 1;
	line-height: 1;
	letter-spacing: 0.02em;
	text-transform: uppercase;

	&--sale {
		background: var(--c-error);
		color: var(--c-white);
	}

	&--new {
		background: var(--c-primary);
		color: var(--c-primary-text);
	}

	&--popular {
		background: var(--c-gold-600);
		color: var(--c-white);
	}
}
</style>
