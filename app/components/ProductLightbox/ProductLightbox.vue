<!--
  ProductLightbox — полноэкранный просмотр изображений товара со Swiper.
-->
<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const props = defineProps<{
	open: boolean;
	images: string[];
	name: string;
	startIndex?: number;
}>();

const emit = defineEmits<{
	"update:open": [value: boolean];
}>();

const modules = [Navigation, Pagination, Keyboard];

const prevBtnRef = ref<HTMLElement | null>(null);
const nextBtnRef = ref<HTMLElement | null>(null);

const navigationConfig = computed(() => ({
	prevEl: prevBtnRef.value,
	nextEl: nextBtnRef.value,
}));

function close() {
	emit("update:open", false);
}

function onKeydown(e: KeyboardEvent) {
	if (e.key === "Escape") close();
}

watch(
	() => props.open,
	isOpen => {
		if (typeof document === "undefined") return;
		if (isOpen) {
			document.body.style.overflow = "hidden";
			document.addEventListener("keydown", onKeydown);
		} else {
			document.body.style.overflow = "";
			document.removeEventListener("keydown", onKeydown);
		}
	}
);

onUnmounted(() => {
	if (typeof document === "undefined") return;
	document.body.style.overflow = "";
	document.removeEventListener("keydown", onKeydown);
});
</script>

<template>
	<Teleport to="body">
		<Transition name="fade">
			<div v-if="open" class="lightbox" @click.self="close">
				<div class="lightbox__card" @click.self="close">
					<header class="lightbox__header">
						<div class="lightbox__title-group">
							<span class="lightbox__eyebrow">Просмотр товара</span>
							<h2 class="lightbox__title">{{ name }}</h2>
						</div>
						<button
							type="button"
							class="lightbox__close"
							aria-label="Закрыть"
							@click="close"
						>
							<span class="mdi mdi-close" />
						</button>
					</header>
					<div class="lightbox__body" @click.self="close">
						<Swiper
							:modules="modules"
							:initial-slide="startIndex ?? 0"
							:navigation="navigationConfig"
							:pagination="{ clickable: true }"
							:keyboard="{ enabled: true }"
							:space-between="16"
							class="lightbox__swiper"
						>
							<SwiperSlide
								v-for="(img, idx) in images"
								:key="idx"
								class="lightbox__slide"
							>
								<img
									:src="img"
									:alt="`${name} — фото ${idx + 1}`"
									class="lightbox__image"
								/>
							</SwiperSlide>
						</Swiper>
						<button
							ref="prevBtnRef"
							type="button"
							class="lightbox__nav lightbox__nav--prev"
							aria-label="Предыдущее фото"
						>
							<span class="mdi mdi-arrow-left" />
						</button>
						<button
							ref="nextBtnRef"
							type="button"
							class="lightbox__nav lightbox__nav--next"
							aria-label="Следующее фото"
						>
							<span class="mdi mdi-arrow-right" />
						</button>
					</div>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<style scoped lang="scss">
.lightbox {
	position: fixed;
	inset: 0;
	background: rgba(26, 26, 26, 0.72);
	backdrop-filter: blur(8px);
	-webkit-backdrop-filter: blur(8px);
	z-index: var(--z-modal);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: var(--spacing-lg);

	&__card {
		position: relative;
		width: 100%;
		max-width: 1100px;
		max-height: calc(100vh - var(--spacing-2xl));
		background: var(--c-surface);
		border-radius: var(--radius-lg);
		border: 1px solid var(--c-border-light);
		box-shadow: var(--shadow-xl);
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--spacing-md);
		padding: var(--spacing-md) var(--spacing-lg);
		border-bottom: 1px solid var(--c-border-light);
		background: var(--c-page-bg);
	}

	&__title-group {
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
	}

	&__eyebrow {
		font-size: var(--fs-xs);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--c-primary);
		font-weight: var(--fw-semibold);
	}

	&__title {
		margin: 0;
		font-family: var(--font-accent);
		font-size: var(--fs-lg);
		font-weight: var(--fw-semibold);
		color: var(--c-text);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	&__close {
		flex-shrink: 0;
		width: 40px;
		height: 40px;
		border-radius: var(--radius-full);
		border: 1px solid var(--c-border);
		background: var(--c-surface);
		color: var(--c-text);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: var(--transition-base);

		.mdi {
			font-size: 22px;
		}

		&:hover {
			background: var(--c-primary);
			border-color: var(--c-primary);
			color: var(--c-primary-text);
		}
	}

	&__body {
		position: relative;
		flex: 1;
		min-height: 0;
		padding: var(--spacing-lg);
		background: var(--c-page-bg);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&__nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 44px;
		height: 44px;
		border-radius: var(--radius-full);
		background: var(--c-surface);
		border: 1px solid var(--c-border);
		box-shadow: var(--shadow-sm);
		color: var(--c-text);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2;
		transition: var(--transition-base);

		.mdi {
			font-size: 22px;
		}

		&:hover {
			background: var(--c-primary);
			border-color: var(--c-primary);
			color: var(--c-primary-text);
		}

		&--prev {
			left: var(--spacing-md);
		}

		&--next {
			right: var(--spacing-md);
		}

		&.swiper-button-disabled {
			opacity: 0.4;
			cursor: not-allowed;
		}
	}

	&__swiper {
		width: 100%;
		height: 100%;
		min-height: 0;

		:deep(.swiper-pagination) {
			bottom: 0;
		}

		// Pill-стиль как в популярных/акциях
		:deep(.swiper-pagination-bullet) {
			width: 10px;
			height: 10px;
			background: var(--c-border);
			opacity: 1;
			transition: all 0.2s ease;
		}

		:deep(.swiper-pagination-bullet-active) {
			background: var(--c-primary);
			width: 24px;
			border-radius: 5px;
		}
	}

	&__slide {
		display: flex;
		align-items: center;
		justify-content: center;
		height: auto;
		padding: var(--spacing-md) var(--spacing-sm) var(--spacing-xl);
		box-sizing: border-box;
	}

	&__image {
		max-width: 100%;
		max-height: 70vh;
		object-fit: contain;
		border-radius: var(--radius-md);
		background: var(--c-surface);
		user-select: none;
	}

	@media (max-width: 640px) {
		padding: 0;

		&__card {
			max-height: 100vh;
			height: 100%;
			border-radius: 0;
			border: none;
		}

		&__header {
			padding: var(--spacing-sm) var(--spacing-md);
		}

		&__title {
			font-size: var(--fs-md);
		}

		&__body {
			padding: var(--spacing-md);
		}

		&__image {
			max-height: 60vh;
		}
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
