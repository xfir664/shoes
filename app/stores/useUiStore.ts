// ============================================================================
// useUiStore — состояние интерфейса (тема, sidebar, toast-уведомления).
//
// Использование:
//   const ui = useUiStore();
//
//   // Sidebar:
//   ui.toggleSidebar();
//
//   // Toast:
//   ui.addToast({ type: "success", title: "Сохранено" });
//   ui.addToast({ type: "error", title: "Ошибка", message: "Сервер недоступен" });
//
//   // В шаблоне:
//   <div v-for="toast in ui.toasts" :key="toast.id">{{ toast.title }}</div>
// ============================================================================

import { defineStore } from "pinia";
import type { ToastMessage } from "~/types/ui";

interface UiState {
	sidebarOpen: boolean;
	toasts: ToastMessage[];
}

export const useUiStore = defineStore("ui", {
	state: (): UiState => ({
		sidebarOpen: false,
		toasts: [],
	}),

	getters: {
		isSidebarOpen: (state) => state.sidebarOpen,
	},

	actions: {
		toggleSidebar() {
			this.sidebarOpen = !this.sidebarOpen;
		},

		openSidebar() {
			this.sidebarOpen = true;
		},

		closeSidebar() {
			this.sidebarOpen = false;
		},

		addToast(toast: Omit<ToastMessage, "id">) {
			const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
			const duration = toast.duration ?? 5000;
			const newToast: ToastMessage = { ...toast, id, duration };

			this.toasts.push(newToast);

			if (duration > 0) {
				setTimeout(() => this.removeToast(id), duration);
			}
		},

		removeToast(id: string) {
			this.toasts = this.toasts.filter((t) => t.id !== id);
		},
	},
});
