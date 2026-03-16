module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:vue/vue3-recommended",
		"@nuxtjs/eslint-config-typescript",
		"prettier",
	],
	parser: "vue-eslint-parser",
	parserOptions: {
		ecmaVersion: "latest",
		parser: "@typescript-eslint/parser",
		sourceType: "module",
	},
	plugins: ["@typescript-eslint", "vue"],
	rules: {
		// Основные правила размера файлов и функций
		"max-lines": [
			"error",
			{
				max: 350,
				skipBlankLines: false,
				skipComments: false,
			},
		],
		"max-lines-per-function": [
			"error",
			{
				max: 20,
				skipBlankLines: true,
				skipComments: true,
				IIFEs: true,
			},
		],

		// Правила для Vue файлов
		// Примечание: vue/max-lines не существует, используем max-lines через overrides

		// Проверка одной функции на файл (для .ts/.js файлов)
		"max-statements": ["warn", 1],
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/no-explicit-any": "warn",

		// Vue специфичные правила
		"vue/component-name-in-template-casing": ["error", "PascalCase"],
		"vue/multi-word-component-names": "off",
		"vue/no-v-html": "warn",
		"vue/require-default-prop": "off",
		"vue/require-explicit-emits": "error",

		// Комментарии функций (проверка через документацию)
		"require-jsdoc": "off", // Отключено, т.к. используем TypeScript типы
		"valid-jsdoc": "off",

		// Общие правила качества кода
		"no-console": ["warn", { allow: ["warn", "error"] }],
		"no-debugger": "error",
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": [
			"error",
			{
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_",
			},
		],
	},
	overrides: [
		{
			// Для Vue файлов более мягкие правила по количеству функций
			files: ["*.vue"],
			rules: {
				"max-statements": "off", // В Vue компонентах может быть несколько функций
				// Максимум 350 строк для Vue файлов (переопределяем общее правило)
				"max-lines": [
					"error",
					{
						max: 350,
						skipBlankLines: false,
						skipComments: false,
					},
				],
				"max-lines-per-function": [
					"error",
					{
						max: 20,
						skipBlankLines: true,
						skipComments: true,
					},
				],
			},
		},
		{
			// Для TypeScript/JavaScript файлов - строго одна функция
			files: ["*.ts", "*.js"],
			rules: {
				"max-statements": ["error", 20],
			},
		},
	],
	ignorePatterns: [
		"node_modules/",
		".nuxt/",
		".output/",
		"dist/",
		"*.config.*",
	],
};
