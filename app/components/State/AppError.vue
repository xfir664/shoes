<!--
  AppError — компонент отображения ошибки.

  Использование:
    <AppError title="Что-то пошло не так" message="Попробуйте позже" />
    <AppError title="Ошибка загрузки" retryable @retry="fetchData" />

  Props:
    title     — заголовок ошибки (обязательный)
    message   — подробное описание
    retryable — показывать кнопку "Повторить"

  Emits:
    retry — клик по кнопке "Повторить"
-->
<script setup lang="ts">
defineProps<{
	title: string;
	message?: string;
	retryable?: boolean;
}>();

const emit = defineEmits<{
	(e: "retry"): void;
}>();
</script>

<template>
	<div class="error" role="alert">
		<div class="error__icon">!</div>
		<h3 class="error__title">{{ title }}</h3>
		<p v-if="message" class="error__message">{{ message }}</p>
		<button v-if="retryable" class="error__retry" @click="emit('retry')">
			Повторить
		</button>
	</div>
</template>

<style scoped lang="scss">
.error {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: var(--spacing-xl);
	text-align: center;

	&__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		margin-bottom: var(--spacing-md);
		border-radius: 50%;
		background-color: var(--c-error);
		color: var(--c-white);
		font-size: var(--fs-xl);
		font-weight: 700;
	}

	&__title {
		margin: 0 0 var(--spacing-xs);
		font-size: var(--fs-lg);
		color: var(--c-text);
	}

	&__message {
		margin: 0 0 var(--spacing-md);
		color: var(--c-text-secondary);
		font-size: var(--fs-base);
	}

	&__retry {
		padding: var(--spacing-sm) var(--spacing-lg);
		border: 2px solid var(--c-info);
		border-radius: var(--radius-md);
		background: transparent;
		color: var(--c-info);
		font-size: var(--fs-base);
		cursor: pointer;
		transition: var(--transition-base);

		&:hover {
			background-color: var(--c-info);
			color: var(--c-white);
		}
	}
}
</style>
