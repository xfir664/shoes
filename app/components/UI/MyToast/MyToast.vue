<!--
  MyToast — рендерит useUiStore().toasts.
  Fixed bottom-right, slide-in анимация.

  Использование:
    В layouts/default.vue: <MyToast />
-->
<script setup lang="ts">
const uiStore = useUiStore();

const iconMap: Record<string, string> = {
	success: "mdi-check-circle",
	error: "mdi-alert-circle",
	warning: "mdi-alert",
	info: "mdi-information",
};
</script>

<template>
	<Teleport to="body">
		<div class="toast-container">
			<TransitionGroup name="toast">
				<div
					v-for="toast in uiStore.toasts"
					:key="toast.id"
					class="toast"
					:class="`toast--${toast.type}`"
				>
					<span class="toast__icon mdi" :class="iconMap[toast.type]" />
					<div class="toast__content">
						<span class="toast__title">{{ toast.title }}</span>
						<span v-if="toast.message" class="toast__message">{{ toast.message }}</span>
					</div>
					<button class="toast__close" @click="uiStore.removeToast(toast.id)">
						<span class="mdi mdi-close" />
					</button>
				</div>
			</TransitionGroup>
		</div>
	</Teleport>
</template>

<style scoped lang="scss">
.toast-container {
	position: fixed;
	bottom: var(--spacing-lg);
	right: var(--spacing-lg);
	z-index: var(--z-toast, 9999);
	display: flex;
	flex-direction: column-reverse;
	gap: var(--spacing-sm);
	max-width: 380px;
	width: 100%;
	pointer-events: none;
}

.toast {
	display: flex;
	align-items: flex-start;
	gap: var(--spacing-sm);
	padding: var(--spacing-md);
	border-radius: var(--radius-md);
	background: var(--c-surface);
	box-shadow: var(--shadow-lg);
	border-left: 4px solid;
	pointer-events: all;

	&--success {
		border-color: var(--c-success);
	}
	&--error {
		border-color: var(--c-error);
	}
	&--warning {
		border-color: var(--c-warning, #f59e0b);
	}
	&--info {
		border-color: var(--c-info);
	}

	&__icon {
		font-size: var(--fs-xl);
		flex-shrink: 0;
		margin-top: 1px;

		.toast--success & {
			color: var(--c-success);
		}
		.toast--error & {
			color: var(--c-error);
		}
		.toast--warning & {
			color: var(--c-warning, #f59e0b);
		}
		.toast--info & {
			color: var(--c-info);
		}
	}

	&__content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	&__title {
		font-size: var(--fs-sm);
		font-weight: var(--fw-semibold);
		color: var(--c-text);
	}

	&__message {
		font-size: var(--fs-xs);
		color: var(--c-text-secondary);
	}

	&__close {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		background: none;
		border: none;
		cursor: pointer;
		color: var(--c-text-muted);
		font-size: var(--fs-sm);
		flex-shrink: 0;
		transition: var(--transition-base);

		&:hover {
			color: var(--c-text);
		}
	}
}

.toast-enter-active,
.toast-leave-active {
	transition: all 0.3s ease;
}

.toast-enter-from {
	opacity: 0;
	transform: translateX(100%);
}

.toast-leave-to {
	opacity: 0;
	transform: translateX(100%);
}
</style>
