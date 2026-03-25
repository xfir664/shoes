# app/plugins/ - Плагины Nuxt

Папка `plugins/` содержит JavaScript/TypeScript файлы, которые автоматически загружаются и выполняются при инициализации приложения. Плагины позволяют расширять функциональность Nuxt и Vue.

## 📁 Структура папки

```
plugins/
└── (пусто или пользовательские плагины)
```

## 🎯 Назначение папки

### 1. **Автоматическая регистрация**

Все файлы в этой папке автоматически загружаются Nuxt при старте приложения.

### 2. **Расширение функциональности**

Плагины используются для:

- Инициализации библиотек (i18n, dayjs, etc.)
- Добавления глобальных компонентов
- Регистрации директив
- Настройки Vue плагинов
- Внедрения зависимостей

### 3. **SSR совместимость**

Плагины могут работать на сервере и клиенте, или только на одной стороне.

## 🔧 Как использовать

### Базовая структура плагина

```typescript
// plugins/my-plugin.ts
export default defineNuxtPlugin(nuxtApp => {
	// nuxtApp - экземпляр Nuxt приложения

	return {
		provide: {
			// Предоставляем функции/объекты для использования в приложении
			myFunction: () => "Hello!",
		},
	};
});
```

### Использование в компонентах

```vue
<script setup lang="ts">
const { $myFunction } = useNuxtApp();

console.log($myFunction()); // 'Hello!'
</script>
```

## 🚀 Типы плагинов

### 1. Client-only плагин

Выполняется только на клиенте (браузере):

```typescript
// plugins/analytics.client.ts
export default defineNuxtPlugin(() => {
	// Код выполнится только в браузере
	if (window.gtag) {
		window.gtag("config", "GA_MEASUREMENT_ID");
	}
});
```

**Именование:** `.client.ts` суффикс

### 2. Server-only плагин

Выполняется только на сервере:

```typescript
// plugins/logger.server.ts
export default defineNuxtPlugin(() => {
	// Код выполнится только на сервере
	console.log("Server initialized");
});
```

**Именование:** `.server.ts` суффикс

### 3. Universal плагин (по умолчанию)

Выполняется и на сервере, и на клиенте:

```typescript
// plugins/api.ts
export default defineNuxtPlugin(() => {
	// Код выполнится везде
	const api = {
		get: (url: string) => $fetch(url),
		post: (url: string, data: any) =>
			$fetch(url, { method: "POST", body: data }),
	};

	return {
		provide: {
			api,
		},
	};
});
```

## 💡 Примеры плагинов

### API Plugin

```typescript
// plugins/api.ts
export default defineNuxtPlugin(() => {
	const config = useRuntimeConfig();

	const api = $fetch.create({
		baseURL: config.public.apiBase,
		onRequest({ request, options }) {
			// Добавляем токен к каждому запросу
			const token = useCookie("auth_token");
			if (token.value) {
				options.headers = {
					...options.headers,
					Authorization: `Bearer ${token.value}`,
				};
			}
		},
		onResponseError({ response }) {
			// Обработка ошибок
			if (response.status === 401) {
				navigateTo("/login");
			}
		},
	});

	return {
		provide: {
			api,
		},
	};
});
```

Использование:

```vue
<script setup lang="ts">
const { $api } = useNuxtApp();

const { data } = await useAsyncData("users", () => $api("/users"));
</script>
```

### Toast Notifications

```typescript
// plugins/toast.client.ts
export default defineNuxtPlugin(() => {
	const show = (
		message: string,
		type: "success" | "error" | "info" = "info"
	) => {
		// Логика показа уведомления
		console.log(`[${type.toUpperCase()}] ${message}`);
	};

	return {
		provide: {
			toast: {
				success: (msg: string) => show(msg, "success"),
				error: (msg: string) => show(msg, "error"),
				info: (msg: string) => show(msg, "info"),
			},
		},
	};
});
```

Использование:

```vue
<script setup lang="ts">
const { $toast } = useNuxtApp();

const handleSubmit = async () => {
	try {
		await $fetch("/api/save");
		$toast.success("Сохранено!");
	} catch (error) {
		$toast.error("Ошибка сохранения");
	}
};
</script>
```

### Директивы Vue

```typescript
// plugins/directives.ts
export default defineNuxtPlugin(nuxtApp => {
	// Директива для автофокуса
	nuxtApp.vueApp.directive("focus", {
		mounted(el) {
			el.focus();
		},
	});

	// Директива для форматирования телефонов
	nuxtApp.vueApp.directive("phone", {
		mounted(el) {
			el.addEventListener("input", e => {
				const target = e.target as HTMLInputElement;
				target.value = formatPhone(target.value);
			});
		},
	});
});

function formatPhone(value: string) {
	// Логика форматирования
	return value.replace(/\D/g, "");
}
```

Использование:

```vue
<template>
	<input v-focus v-phone />
</template>
```

### i18n (Интернационализация)

```typescript
// plugins/i18n.ts
export default defineNuxtPlugin(() => {
	const messages = {
		en: {
			welcome: "Welcome",
			goodbye: "Goodbye",
		},
		ru: {
			welcome: "Добро пожаловать",
			goodbye: "До свидания",
		},
	};

	const locale = ref("ru");

	const t = (key: string) => {
		return messages[locale.value]?.[key] || key;
	};

	return {
		provide: {
			i18n: {
				t,
				locale,
			},
		},
	};
});
```

Использование:

```vue
<template>
	<div>
		<h1>{{ $i18n.t("welcome") }}</h1>
		<button @click="$i18n.locale = 'en'">English</button>
		<button @click="$i18n.locale = 'ru'">Русский</button>
	</div>
</template>
```

### Глобальные компоненты

```typescript
// plugins/global-components.ts
import MyButton from "~/components/UI/Button/Button.vue";
import MyCard from "~/components/UI/Card/Card.vue";

export default defineNuxtPlugin(nuxtApp => {
	nuxtApp.vueApp.component("MyButton", MyButton);
	nuxtApp.vueApp.component("MyCard", MyCard);
});
```

### Dayjs для работы с датами

```typescript
// plugins/dayjs.ts
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ru";

export default defineNuxtPlugin(() => {
	dayjs.extend(relativeTime);
	dayjs.locale("ru");

	return {
		provide: {
			dayjs,
		},
	};
});
```

Использование:

```vue
<script setup lang="ts">
const { $dayjs } = useNuxtApp();

const formattedDate = $dayjs("2025-01-01").format("DD.MM.YYYY");
const relative = $dayjs("2025-01-01").fromNow(); // "2 месяца назад"
</script>
```

## 🎯 Best Practices

### 1. Именование плагинов

```
✅ Хорошо:
- api.ts
- toast.client.ts
- logger.server.ts
- directives.ts

❌ Плохо:
- plugin.ts
- myPlugin.ts
- p1.ts
```

### 2. Используйте TypeScript

```typescript
// plugins/api.ts
interface ApiInstance {
	get: <T = any>(url: string) => Promise<T>;
	post: <T = any>(url: string, data: any) => Promise<T>;
}

export default defineNuxtPlugin(() => {
	const api: ApiInstance = {
		get: url => $fetch(url),
		post: (url, data) => $fetch(url, { method: "POST", body: data }),
	};

	return {
		provide: { api },
	};
});

// Типизация для useNuxtApp()
declare module "#app" {
	interface NuxtApp {
		$api: ApiInstance;
	}
}
```

### 3. Минимальная логика

Плагины должны только инициализировать, основную логику выносите в composables:

```typescript
// ✅ Хорошо
// plugins/api.ts - только инициализация
export default defineNuxtPlugin(() => {
	const api = createApiInstance();
	return { provide: { api } };
});

// composables/useApi.ts - логика
export const useApi = () => {
	const { $api } = useNuxtApp();

	const fetchUsers = () => $api.get("/users");
	const createUser = data => $api.post("/users", data);

	return { fetchUsers, createUser };
};
```

### 4. Обработка ошибок

```typescript
export default defineNuxtPlugin(() => {
	try {
		// Инициализация
		const lib = initializeLibrary();
		return { provide: { lib } };
	} catch (error) {
		console.error("Plugin initialization failed:", error);
		// Возвращаем mock или default
		return { provide: { lib: null } };
	}
});
```

### 5. Условная загрузка

```typescript
// plugins/analytics.client.ts
export default defineNuxtPlugin(() => {
	const config = useRuntimeConfig();

	// Загружаем только в production
	if (config.public.environment === "production") {
		// Инициализация аналитики
	}
});
```

## 🔍 Порядок загрузки плагинов

По умолчанию плагины загружаются в алфавитном порядке. Для управления порядком:

```typescript
// plugins/01.first.ts
// plugins/02.second.ts
// plugins/03.third.ts
```

Или используйте `parallel: false`:

```typescript
export default defineNuxtPlugin({
	name: "my-plugin",
	parallel: false, // Ждать завершения предыдущих плагинов
	setup(nuxtApp) {
		// ...
	},
});
```

## 🛠️ Debugging плагинов

```typescript
export default defineNuxtPlugin(nuxtApp => {
	console.log("[Plugin] Loading...");

	// Проверка окружения
	if (import.meta.server) {
		console.log("[Plugin] Running on server");
	}

	if (import.meta.client) {
		console.log("[Plugin] Running on client");
	}

	return {
		provide: {
			debug: () => console.log("Debug info"),
		},
	};
});
```

## 📚 Дополнительные ресурсы

- [Nuxt Plugins Documentation](https://nuxt.com/docs/guide/directory-structure/plugins)
- [Vue 3 Plugins](https://vuejs.org/guide/reusability/plugins.html)
---

[← Назад к app/](../README.md) | [← Назад к главному README](../../README.md)
