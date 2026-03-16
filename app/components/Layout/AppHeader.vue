<!--
  AppHeader — шапка магазина обуви.
  Лого, навигация, поиск, телефон, корзина, переключатель темы.
  Мобильное меню (бургер).
-->
<script setup lang="ts">
import type { MenuItem } from "~/types/ui";

const navItems: MenuItem[] = [
	{ label: "Каталог", to: "/catalog" },
	{ label: "Акции", to: "/promos" },
	{ label: "Доставка", to: "/delivery" },
	{ label: "Контакты", to: "/contacts" },
];

const { isDark, toggleTheme } = useTheme();
const cartStore = useCartStore();
const isMobileMenuOpen = ref(false);
const searchQuery = ref("");

/** Переход к каталогу с поиском */
function handleSearch() {
	if (searchQuery.value.trim()) {
		navigateTo({ path: "/catalog", query: { q: searchQuery.value.trim() } });
		searchQuery.value = "";
		isMobileMenuOpen.value = false;
	}
}

/** Закрыть мобильное меню при переходе */
const route = useRoute();
watch(
	() => route.path,
	() => {
		isMobileMenuOpen.value = false;
	},
);
</script>

<template>
	<header class="header">
		<!-- Верхняя полоса: телефон + тема -->
		<div class="header__top">
			<div class="header__top-container">
				<a href="tel:+74951234567" class="header__phone">
					<span class="mdi mdi-phone" />
					+7 (495) 123-45-67
				</a>
				<a href="tel:+78001234567" class="header__phone">
					<span class="mdi mdi-phone" />
					8 (800) 123-45-67
				</a>
				<button class="header__theme-toggle" @click="toggleTheme">
					<span :class="isDark ? 'mdi mdi-weather-sunny' : 'mdi mdi-weather-night'" />
				</button>
			</div>
		</div>

		<!-- Основная шапка: лого + поиск + корзина -->
		<div class="header__main">
			<div class="header__main-container">
				<NuxtLink to="/" class="header__logo">
					<span class="header__logo-icon mdi mdi-shoe-sneaker" />
					<span class="header__logo-text">ShoeStore</span>
				</NuxtLink>

				<form class="header__search" @submit.prevent="handleSearch">
					<input
						v-model="searchQuery"
						type="search"
						class="header__search-input"
						placeholder="Поиск по каталогу..."
					/>
					<button type="submit" class="header__search-btn">
						<span class="mdi mdi-magnify" />
					</button>
				</form>

				<div class="header__actions">
					<NuxtLink to="/cart" class="header__cart">
						<span class="mdi mdi-cart-outline" />
						<span v-if="cartStore.totalItems > 0" class="header__cart-badge">
							{{ cartStore.totalItems }}
						</span>
					</NuxtLink>

					<button
						class="header__burger"
						@click="isMobileMenuOpen = !isMobileMenuOpen"
					>
						<span :class="isMobileMenuOpen ? 'mdi mdi-close' : 'mdi mdi-menu'" />
					</button>
				</div>
			</div>
		</div>

		<!-- Навигация -->
		<nav class="header__nav" :class="{ 'header__nav--open': isMobileMenuOpen }">
			<div class="header__nav-container">
				<NuxtLink
					v-for="item in navItems"
					:key="item.to"
					:to="item.to!"
					class="header__nav-link"
				>
					{{ item.label }}
				</NuxtLink>
			</div>
		</nav>
	</header>
</template>

<style scoped lang="scss">
@use "@/assets/styles/var.scss" as *;

.header {
	position: sticky;
	top: 0;
	z-index: var(--z-sticky);
	background-color: var(--c-surface);
	box-shadow: var(--shadow-sm);

	&__top {
		background-color: var(--c-secondary);
		color: var(--c-secondary-text);
		font-size: var(--fs-sm);
	}

	&__top-container {
		display: flex;
		align-items: center;
		gap: var(--spacing-lg);
		max-width: var(--container-max);
		margin-inline: auto;
		padding: var(--spacing-xs) var(--spacing-md);
	}

	&__phone {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xs);
		color: var(--c-secondary-text);
		text-decoration: none;
		font-size: var(--fs-sm);
		transition: var(--transition-base);

		&:hover {
			color: var(--c-primary);
		}
	}

	&__theme-toggle {
		margin-left: auto;
		background: none;
		border: none;
		color: var(--c-secondary-text);
		cursor: pointer;
		font-size: var(--fs-md);
		padding: var(--spacing-xs);
		transition: var(--transition-base);

		&:hover {
			color: var(--c-primary);
		}
	}

	&__main {
		border-bottom: 1px solid var(--c-border-light);
	}

	&__main-container {
		display: flex;
		align-items: center;
		gap: var(--spacing-lg);
		max-width: var(--container-max);
		margin-inline: auto;
		padding: var(--spacing-md);
	}

	&__logo {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		text-decoration: none;
		flex-shrink: 0;
	}

	&__logo-icon {
		font-size: 32px;
		color: var(--c-primary);
	}

	&__logo-text {
		font-family: var(--font-accent);
		font-size: var(--fs-xl);
		font-weight: 700;
		color: var(--c-text);
		letter-spacing: -0.5px;
	}

	&__search {
		flex: 1;
		display: flex;
		max-width: 500px;

		@media (max-width: $breakpoint-tablet) {
			display: none;
		}
	}

	&__search-input {
		flex: 1;
		padding: var(--spacing-sm) var(--spacing-md);
		border: 1px solid var(--c-border);
		border-right: none;
		border-radius: var(--radius-sm) 0 0 var(--radius-sm);
		background: var(--c-input-bg);
		color: var(--c-text);
		font-size: var(--fs-sm);
		font-family: var(--font-base);
		outline: none;
		transition: var(--transition-base);

		&:focus {
			border-color: var(--c-primary);
		}

		&::placeholder {
			color: var(--c-text-muted);
		}
	}

	&__search-btn {
		padding: var(--spacing-sm) var(--spacing-md);
		background: var(--c-primary);
		color: var(--c-primary-text);
		border: 1px solid var(--c-primary);
		border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
		cursor: pointer;
		font-size: var(--fs-md);
		transition: var(--transition-base);

		&:hover {
			background: var(--c-primary-hover);
		}
	}

	&__actions {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		flex-shrink: 0;
	}

	&__cart {
		position: relative;
		display: flex;
		align-items: center;
		color: var(--c-text);
		text-decoration: none;
		font-size: 24px;
		transition: var(--transition-base);

		&:hover {
			color: var(--c-primary);
		}
	}

	&__cart-badge {
		position: absolute;
		top: -6px;
		right: -10px;
		min-width: 18px;
		height: 18px;
		padding: 0 4px;
		border-radius: var(--radius-full);
		background: var(--c-primary);
		color: var(--c-primary-text);
		font-size: 11px;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&__burger {
		display: none;
		background: none;
		border: none;
		color: var(--c-text);
		font-size: 24px;
		cursor: pointer;
		padding: var(--spacing-xs);

		@media (max-width: $breakpoint-tablet) {
			display: flex;
		}
	}

	&__nav {
		background: var(--c-surface);
		border-bottom: 2px solid var(--c-primary);

		@media (max-width: $breakpoint-tablet) {
			display: none;

			&--open {
				display: block;
			}
		}
	}

	&__nav-container {
		display: flex;
		align-items: center;
		gap: 0;
		max-width: var(--container-max);
		margin-inline: auto;
		padding: 0 var(--spacing-md);

		@media (max-width: $breakpoint-tablet) {
			flex-direction: column;
			padding: var(--spacing-sm) var(--spacing-md);
		}
	}

	&__nav-link {
		display: block;
		padding: var(--spacing-sm) var(--spacing-md);
		color: var(--c-text);
		text-decoration: none;
		font-size: var(--fs-base);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		transition: var(--transition-base);
		border-bottom: 2px solid transparent;
		margin-bottom: -2px;

		&:hover {
			color: var(--c-primary);
		}

		&.router-link-active {
			color: var(--c-primary);
			border-bottom-color: var(--c-primary);
		}

		@media (max-width: $breakpoint-tablet) {
			width: 100%;
			text-align: center;
			border-bottom: 1px solid var(--c-border-light);
			margin-bottom: 0;
		}
	}
}
</style>
