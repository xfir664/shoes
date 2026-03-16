<!--
  Layout по умолчанию: Header + контент + Footer.
  Контейнер управляется на уровне страниц.
-->
<script setup lang="ts"></script>

<template>
	<div class="layout">
		<AppHeader />
		<main class="layout__main">
			<slot />
		</main>
		<AppFooter />
	</div>
</template>

<style scoped lang="scss">
.layout {
	min-height: 100vh;
	display: flex;
	flex-direction: column;

	&__main {
		flex: 1;
	}
}
</style>
