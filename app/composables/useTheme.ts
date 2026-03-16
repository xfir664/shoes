// ============================================================================
// useTheme — управление темой (light / dark).
//
// Использование:
//   const { theme, isDark, toggleTheme, setTheme } = useTheme();
//
//   // В шаблоне:
//   <button @click="toggleTheme">
//     {{ isDark ? "Светлая тема" : "Тёмная тема" }}
//   </button>
//
//   // Принудительная установка:
//   setTheme("dark");
//
// Как работает:
//   1. При инициализации проверяет localStorage ("theme")
//   2. Если нет — берёт системную настройку (prefers-color-scheme)
//   3. Устанавливает data-theme="dark" или data-theme="light" на <html>
//   4. При переключении сохраняет выбор в localStorage
//
// Стили:
//   Переопределение токенов находится в _dark.scss.
//   Компоненты автоматически подхватывают новые значения.
// ============================================================================

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

export function useTheme() {
	const theme = useState<Theme>("app-theme", () => "light");
	const isDark = computed(() => theme.value === "dark");

	function applyTheme(value: Theme) {
		if (import.meta.client) {
			document.documentElement.setAttribute("data-theme", value);
			localStorage.setItem(STORAGE_KEY, value);
		}
	}

	function setTheme(value: Theme) {
		theme.value = value;
		applyTheme(value);
	}

	function toggleTheme() {
		setTheme(theme.value === "light" ? "dark" : "light");
	}

	function getInitialTheme(): Theme {
		if (!import.meta.client) return "light";

		const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
		if (stored === "light" || stored === "dark") return stored;

		return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	}

	if (import.meta.client) {
		const initial = getInitialTheme();
		theme.value = initial;
		applyTheme(initial);
	}

	return { theme, isDark, toggleTheme, setTheme };
}
