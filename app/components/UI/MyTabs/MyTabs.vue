<!--
  MyTabs — табы с золотым underline и анимированным переключением.

  Использование:
    <MyTabs v-model="activeTab" :tabs="[
      { key: 'desc', label: 'Описание' },
      { key: 'specs', label: 'Характеристики' },
    ]">
      <template #desc>...</template>
      <template #specs>...</template>
    </MyTabs>
-->
<script setup lang="ts">
export interface TabItem {
	key: string;
	label: string;
}

const props = defineProps<{
	modelValue: string;
	tabs: TabItem[];
}>();

const emit = defineEmits<{
	"update:modelValue": [value: string];
}>();

function selectTab(key: string) {
	emit("update:modelValue", key);
}
</script>

<template>
	<div class="tabs">
		<div class="tabs__header" role="tablist">
			<button
				v-for="tab in tabs"
				:key="tab.key"
				class="tabs__btn"
				:class="{ 'tabs__btn--active': modelValue === tab.key }"
				role="tab"
				:aria-selected="modelValue === tab.key"
				@click="selectTab(tab.key)"
			>
				{{ tab.label }}
			</button>
		</div>
		<div class="tabs__content">
			<Transition name="tab-fade" mode="out-in">
				<div :key="modelValue" role="tabpanel">
					<slot :name="modelValue" />
				</div>
			</Transition>
		</div>
	</div>
</template>

<style scoped lang="scss">
.tabs {
	&__header {
		display: flex;
		gap: 0;
		border-bottom: 2px solid var(--c-border-light);
	}

	&__btn {
		padding: var(--spacing-sm) var(--spacing-lg);
		background: none;
		border: none;
		border-bottom: 2px solid transparent;
		margin-bottom: -2px;
		font-family: var(--font-accent);
		font-size: var(--fs-base);
		font-weight: var(--fw-medium);
		color: var(--c-text-secondary);
		cursor: pointer;
		white-space: nowrap;
		transition: var(--transition-base);

		&:hover {
			color: var(--c-text);
		}

		&--active {
			color: var(--c-primary);
			border-bottom-color: var(--c-primary);
			font-weight: var(--fw-semibold);
		}
	}

	&__content {
		padding: var(--spacing-lg) 0;
	}
}

.tab-fade-enter-active,
.tab-fade-leave-active {
	transition: opacity 0.15s ease;
}

.tab-fade-enter-from,
.tab-fade-leave-to {
	opacity: 0;
}
</style>
