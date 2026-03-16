<!--
  AppEmpty — пустое состояние (нет данных).

  Использование:
    <AppEmpty title="Список пуст" message="Добавьте первый элемент" />
    <AppEmpty title="Ничего не найдено" icon="search" />

  Props:
    title   — заголовок (обязательный)
    message — подробное описание
    icon    — id иконки из SVG-спрайта (необязательно)
-->
<script setup lang="ts">
defineProps<{
	title: string;
	message?: string;
	icon?: string;
}>();
</script>

<template>
	<div class="empty">
		<div v-if="icon" class="empty__icon">
			<MyIcon :id="icon" variant="base" />
		</div>
		<div v-else class="empty__placeholder">—</div>
		<h3 class="empty__title">{{ title }}</h3>
		<p v-if="message" class="empty__message">{{ message }}</p>
		<slot />
	</div>
</template>

<style scoped lang="scss">
.empty {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: var(--spacing-xl);
	text-align: center;

	&__icon {
		margin-bottom: var(--spacing-md);
		opacity: 0.4;
	}

	&__placeholder {
		margin-bottom: var(--spacing-md);
		font-size: var(--fs-3xl);
		color: var(--c-neutral-300);
	}

	&__title {
		margin: 0 0 var(--spacing-xs);
		font-size: var(--fs-lg);
		color: var(--c-text);
	}

	&__message {
		margin: 0;
		color: var(--c-brown-500);
		font-size: var(--fs-base);
	}
}
</style>
