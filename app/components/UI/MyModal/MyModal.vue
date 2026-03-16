<!--
  MyModal — модальное окно.
  Teleport to body, backdrop-blur, scale-in анимация.

  Использование:
    <MyModal v-model="isOpen" title="Заголовок">
      Содержимое
    </MyModal>
-->
<script setup lang="ts">
const props = defineProps<{
	modelValue: boolean;
	title?: string;
	maxWidth?: string;
}>();

const emit = defineEmits<{
	"update:modelValue": [value: boolean];
}>();

function close() {
	emit("update:modelValue", false);
}

function onBackdropClick(e: MouseEvent) {
	if (e.target === e.currentTarget) close();
}
</script>

<template>
	<Teleport to="body">
		<Transition name="modal">
			<div
				v-if="modelValue"
				class="modal-overlay"
				@click="onBackdropClick"
			>
				<div
					class="modal"
					:style="maxWidth ? { maxWidth } : undefined"
					role="dialog"
					aria-modal="true"
				>
					<div v-if="title || $slots.header" class="modal__header">
						<slot name="header">
							<h3 class="modal__title">{{ title }}</h3>
						</slot>
						<button class="modal__close" @click="close">
							<span class="mdi mdi-close" />
						</button>
					</div>
					<div class="modal__body">
						<slot />
					</div>
					<div v-if="$slots.footer" class="modal__footer">
						<slot name="footer" />
					</div>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<style scoped lang="scss">
.modal-overlay {
	position: fixed;
	inset: 0;
	z-index: var(--z-modal-backdrop);
	background: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(4px);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: var(--spacing-md);
}

.modal {
	background: var(--c-surface);
	border-radius: var(--radius-lg);
	box-shadow: var(--shadow-xl);
	max-width: 600px;
	width: 100%;
	max-height: 90vh;
	overflow-y: auto;
	z-index: var(--z-modal);

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-lg);
		border-bottom: 1px solid var(--c-border-light);
	}

	&__title {
		font-size: var(--fs-lg);
		font-weight: var(--fw-bold);
		margin: 0;
	}

	&__close {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		background: none;
		border: none;
		cursor: pointer;
		border-radius: var(--radius-full);
		color: var(--c-text-secondary);
		font-size: var(--fs-xl);
		transition: var(--transition-base);

		&:hover {
			background: var(--c-beige-100);
			color: var(--c-text);
		}
	}

	&__body {
		padding: var(--spacing-lg);
	}

	&__footer {
		padding: var(--spacing-md) var(--spacing-lg);
		border-top: 1px solid var(--c-border-light);
	}
}

.modal-enter-active,
.modal-leave-active {
	transition: opacity 0.2s ease;

	.modal {
		transition: transform 0.2s ease;
	}
}

.modal-enter-from,
.modal-leave-to {
	opacity: 0;

	.modal {
		transform: scale(0.95);
	}
}
</style>
