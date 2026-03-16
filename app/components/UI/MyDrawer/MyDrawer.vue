<!--
  MyDrawer — выдвижная панель справа.
  Teleport, backdrop, slide-in анимация.

  Использование:
    <MyDrawer v-model="isOpen" title="Фильтры">
      Содержимое
    </MyDrawer>
-->
<script setup lang="ts">
defineProps<{
	modelValue: boolean;
	title?: string;
}>();

const emit = defineEmits<{
	"update:modelValue": [value: boolean];
}>();

function close() {
	emit("update:modelValue", false);
}
</script>

<template>
	<Teleport to="body">
		<Transition name="drawer">
			<div v-if="modelValue" class="drawer-overlay" @click.self="close">
				<aside class="drawer">
					<div class="drawer__header">
						<h3 v-if="title" class="drawer__title">{{ title }}</h3>
						<button class="drawer__close" @click="close">
							<span class="mdi mdi-close" />
						</button>
					</div>
					<div class="drawer__body">
						<slot />
					</div>
				</aside>
			</div>
		</Transition>
	</Teleport>
</template>

<style scoped lang="scss">
.drawer-overlay {
	position: fixed;
	inset: 0;
	z-index: var(--z-modal-backdrop);
	background: rgba(0, 0, 0, 0.5);
}

.drawer {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	width: 320px;
	max-width: 90vw;
	background: var(--c-surface);
	z-index: var(--z-modal);
	box-shadow: var(--shadow-xl);
	display: flex;
	flex-direction: column;
	overflow-y: auto;

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-lg);
		border-bottom: 1px solid var(--c-border-light);
		flex-shrink: 0;
	}

	&__title {
		font-family: var(--font-accent);
		font-size: var(--fs-lg);
		font-weight: var(--fw-semibold);
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
		flex: 1;
		padding: var(--spacing-lg);
		overflow-y: auto;
	}
}

.drawer-enter-active,
.drawer-leave-active {
	transition: opacity 0.2s ease;

	.drawer {
		transition: transform 0.2s ease;
	}
}

.drawer-enter-from,
.drawer-leave-to {
	opacity: 0;

	.drawer {
		transform: translateX(100%);
	}
}
</style>
