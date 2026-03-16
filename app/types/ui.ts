// ============================================================================
// Типы для UI-компонентов и интерфейса.
//
// Использование:
//   import type { ToastMessage, MenuItem } from "~/types/ui";
// ============================================================================

/** Toast-уведомление (всплывающее сообщение). */
export interface ToastMessage {
	id: string;
	type: "success" | "error" | "warning" | "info";
	title: string;
	message?: string;
	/** Время жизни в мс. 0 = не скрывать автоматически. */
	duration?: number;
}

/** Элемент навигационного меню. */
export interface MenuItem {
	label: string;
	to?: string;
	href?: string;
	icon?: string;
	/** Дочерние элементы для подменю. */
	children?: MenuItem[];
	/** Условие видимости (например, только для авторизованных). */
	visible?: boolean;
}

/** Элемент хлебных крошек. */
export interface BreadcrumbItem {
	label: string;
	to?: string;
	/** true для последнего элемента — не будет ссылкой. */
	current?: boolean;
}

/** Вариант компонента (общий тип для всех UI-компонентов). */
export type ComponentVariant = "base" | "primary" | "secondary";
