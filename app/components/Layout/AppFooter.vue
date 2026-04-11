<!--
  AppFooter — подвал магазина обуви.
  Навигация, контакты, доставка, копирайт.
-->
<script setup lang="ts">
const year = new Date().getFullYear();

const navLinks = [
	{ label: "Каталог", to: "/catalog" },
	{ label: "Акции", to: "/promos" },
	{ label: "Доставка", to: "/delivery" },
	{ label: "Контакты", to: "/contacts" },
];
</script>

<template>
	<footer class="footer">
		<div class="footer__container">
			<div class="footer__grid">
				<!-- Навигация -->
				<div class="footer__col">
					<h4 class="footer__heading">Навигация</h4>
					<nav class="footer__nav">
						<NuxtLink
							v-for="link in navLinks"
							:key="link.to"
							:to="link.to"
							class="footer__link"
						>
							{{ link.label }}
						</NuxtLink>
					</nav>
				</div>

				<!-- Контакты -->
				<div class="footer__col">
					<h4 class="footer__heading">Контакты</h4>
					<div class="footer__contacts">
						<a href="tel:+74951234567" class="footer__link">
							<span class="mdi mdi-phone" />
							+7 (495) 123-45-67
						</a>
						<a href="tel:+78001234567" class="footer__link">
							<span class="mdi mdi-phone" />
							8 (800) 123-45-67
						</a>
						<p class="footer__text">
							<span class="mdi mdi-map-marker" />
							г. Москва, ул. Обувная, д. 1
						</p>
						<p class="footer__text">
							<span class="mdi mdi-clock-outline" />
							Пн–Вс: 10:00 – 21:00
						</p>
					</div>
				</div>

				<!-- Доставка -->
				<div class="footer__col">
					<h4 class="footer__heading">Доставка</h4>
					<p class="footer__text">
						Бесплатная доставка от 5 000 &#8381; по Москве и МО. Доставка по
						России — от 290 &#8381;.
					</p>
					<p class="footer__text footer__text--muted">
						Возврат и обмен в течение 30 дней.
					</p>
				</div>
			</div>

			<div class="footer__bottom">
				<p class="footer__copy">
					&copy; {{ year }} ShoeStore. Все права защищены.
				</p>
			</div>
		</div>
	</footer>
</template>

<style scoped lang="scss">
@use "@/assets/styles/var.scss" as *;

.footer {
	background-color: var(--c-secondary);
	color: var(--c-secondary-text);
	margin-top: auto;

	&__container {
		max-width: var(--container-max);
		margin-inline: auto;
		padding: var(--spacing-2xl) var(--spacing-md) var(--spacing-md);
	}

	&__grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--spacing-xl);
		margin-bottom: var(--spacing-xl);

		@media (max-width: $breakpoint-tablet) {
			grid-template-columns: 1fr;
			gap: var(--spacing-lg);
		}
	}

	&__col {
		display: flex;
		flex-direction: column;
	}

	&__heading {
		margin: 0 0 var(--spacing-md);
		font-size: var(--fs-md);
		font-family: var(--font-accent);
		color: var(--c-primary);
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	&__nav {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	&__contacts {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	&__link {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-sm);
		color: var(--c-secondary-text);
		text-decoration: none;
		font-size: var(--fs-sm);
		transition: var(--transition-base);
		opacity: 0.85;

		&:hover {
			color: var(--c-primary);
			opacity: 1;
		}
	}

	&__text {
		display: flex;
		align-items: flex-start;
		gap: var(--spacing-sm);
		margin: 0;
		color: var(--c-secondary-text);
		font-size: var(--fs-sm);
		line-height: 1.6;
		opacity: 0.85;

		&--muted {
			opacity: 0.6;
			margin-top: var(--spacing-sm);
		}
	}

	&__bottom {
		padding-top: var(--spacing-md);
		border-top: 1px solid rgba(255, 255, 255, 0.15);
		text-align: center;
	}

	&__copy {
		margin: 0;
		font-size: var(--fs-sm);
		opacity: 0.6;
	}
}
</style>
