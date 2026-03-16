---
name: create-composable
description: Создание нового composable (хука) для Nuxt-проекта с типизацией и реактивностью. Используй когда нужно создать composable, хук, переиспользуемую логику, обёртку над API или утилиту с реактивным состоянием.
---

# Создание Composable

## Файл

Composable живут в `app/composables/`. Nuxt авто-импортирует их по имени.

Имя файла: `useSomething.ts`. Экспорт: `export function useSomething()`.

## Шаблон

```typescript
// ============================================================================
// useSomething — краткое описание.
//
// Использование:
//   const { data, isLoading } = useSomething();
// ============================================================================

export function useSomething() {
	const data = ref<string | null>(null);
	const isLoading = ref(false);
	const error = ref<string | null>(null);

	async function fetch() {
		isLoading.value = true;
		error.value = null;
		try {
			const { get } = useApi();
			data.value = await get<string>("/endpoint");
		} catch (e) {
			error.value = e instanceof Error ? e.message : "Неизвестная ошибка";
		} finally {
			isLoading.value = false;
		}
	}

	return { data, isLoading, error, fetch };
}
```

## Принципы

1. **Имя** начинается с `use`.
2. **Экспорт** — именованная функция (не `default`).
3. **Реактивность** — `ref`, `computed`, `watch` из Vue.
4. **SSR** — проверяй `import.meta.client` перед `window`, `document`, `localStorage`.
5. **Cleanup** — `onUnmounted()` для event listeners и таймеров.
6. **Типизация** — generic-параметры для универсальных composables.

## SSR-безопасный паттерн

```typescript
export function useWindowSize() {
	const width = ref(0);
	const height = ref(0);

	function update() {
		width.value = window.innerWidth;
		height.value = window.innerHeight;
	}

	if (import.meta.client) {
		update();
		window.addEventListener("resize", update);
		onUnmounted(() => window.removeEventListener("resize", update));
	}

	return { width, height };
}
```

## Существующие composables

- `useApi()` — HTTP-запросы (`get`, `post`, `put`, `patch`, `del`)
- `useApiFetch()` — SSR-совместимый fetch
- `useTheme()` — управление темой (`toggleTheme`, `isDark`)
- `useBreakpoint()` — реактивный брейкпоинт (`isMobile`, `isTablet`, `isDesktop`)

## Чеклист

- [ ] Файл `app/composables/useName.ts`
- [ ] Функция `export function useName()`
- [ ] Комментарий с описанием и примером использования
- [ ] SSR-безопасность (`import.meta.client`)
- [ ] Cleanup в `onUnmounted` если нужно
- [ ] Возвращает объект с реактивными данными и методами
