// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import createVuetifyPlugin from "vite-plugin-vuetify";

export default defineNuxtConfig({
	compatibilityDate: "2025-01-15",

	modules: ["@pinia/nuxt"],

	components: [
		{
			path: "~/components",
			pathPrefix: false,
		},
	],

	css: [
		"vuetify/styles",
		"~/assets/styles/main.scss",
		"@mdi/font/css/materialdesignicons.css",
		"animate.css/animate.min.css",
	],

	vite: {
		define: {
			"process.env.DEBUG": false,
		},
		ssr: {
			noExternal: ["vuetify"],
		},
		plugins: [createVuetifyPlugin({ autoImport: true })],
	},

	build: {
		transpile: ["vuetify"],
	},

	devtools: { enabled: true },

	devServer: {
		port: 3000,
		host: "localhost",
	},

	// Runtime config для API
	runtimeConfig: {
		// Приватные переменные (только на сервере)
		fastApiUrl: process.env.FASTAPI_URL || "http://localhost:8000",
		// Публичные переменные (доступны и на клиенте)
		public: {
			apiUrl: process.env.NUXT_PUBLIC_API_URL || "http://localhost:8000",
		},
	},

	// Заголовки безопасности (перенесены из nginx)
	nitro: {
		routeRules: {
			"/**": {
				headers: {
					// Безопасность
					"X-Frame-Options": "SAMEORIGIN",
					"X-Content-Type-Options": "nosniff",
					"X-XSS-Protection": "1; mode=block",
					"Referrer-Policy": "no-referrer-when-downgrade",
					// HSTS для HTTPS (только в продакшене)
					// 'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
				},
			},
		},
	},
});
