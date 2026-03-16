// ============================================================================
// useBreakpoint — реактивный текущий брейкпоинт (mobile / tablet / desktop).
//
// Использование:
//   const { breakpoint, isMobile, isTablet, isDesktop } = useBreakpoint();
//
//   // В шаблоне:
//   <div v-if="isMobile">Мобильная версия</div>
//   <div v-else-if="isTablet">Планшетная версия</div>
//   <div v-else>Десктопная версия</div>
//
//   // В скрипте:
//   watch(breakpoint, (bp) => console.log("Breakpoint:", bp));
//
// Значения брейкпоинтов синхронизированы с var.scss:
//   mobile:  < 768px
//   tablet:  768px — 1439px
//   desktop: >= 1440px
// ============================================================================

type Breakpoint = "mobile" | "tablet" | "desktop";

const TABLET = 768;
const DESKTOP = 1440;

export function useBreakpoint() {
	const breakpoint = ref<Breakpoint>("desktop");

	const isMobile = computed(() => breakpoint.value === "mobile");
	const isTablet = computed(() => breakpoint.value === "tablet");
	const isDesktop = computed(() => breakpoint.value === "desktop");

	function update() {
		const width = window.innerWidth;
		if (width < TABLET) {
			breakpoint.value = "mobile";
		} else if (width < DESKTOP) {
			breakpoint.value = "tablet";
		} else {
			breakpoint.value = "desktop";
		}
	}

	if (import.meta.client) {
		update();

		const mqTablet = window.matchMedia(`(min-width: ${TABLET}px)`);
		const mqDesktop = window.matchMedia(`(min-width: ${DESKTOP}px)`);

		mqTablet.addEventListener("change", update);
		mqDesktop.addEventListener("change", update);

		onUnmounted(() => {
			mqTablet.removeEventListener("change", update);
			mqDesktop.removeEventListener("change", update);
		});
	}

	return { breakpoint, isMobile, isTablet, isDesktop };
}
