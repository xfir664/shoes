import { createVuetify } from "vuetify";

export default defineNuxtPlugin(nuxtApp => {
	const vuetify = createVuetify({
		ssr: true,
		display: {
			mobileBreakpoint: "sm", // Когда считать мобильным
			thresholds: {
				xs: 0, // очень маленькие мобильные
				sm: 320, // мобильные
				md: 768, // планшеты
				lg: 1440, // десктопы
			},
		},
	});

	nuxtApp.vueApp.use(vuetify);
});
