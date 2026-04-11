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
				<button
					type="button"
					class="lightbox__close"
					aria-label="Закрыть"
					@click="close"
				>
					<span class="mdi mdi-close" />
				</button>
				<div class="lightbox__content" @click.self="close">
					<Swiper
						:modules="modules"
						:initial-slide="startIndex ?? 0"
						:navigation="true"
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
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<style scoped lang="scss">
.lightbox {
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.92);
	z-index: 10000;
	display: flex;
	align-items: center;
	justify-content: center;

	&__close {
		position: absolute;
		top: 24px;
		right: 24px;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		border: none;
		background: rgba(255, 255, 255, 0.1);
		color: #fff;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2;
		transition: background 0.2s ease;

		.mdi {
			font-size: 28px;
		}

		&:hover {
			background: rgba(255, 255, 255, 0.2);
		}
	}

	&__content {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 64px 16px;
	}

	&__swiper {
		width: 100%;
		max-width: 1200px;
		height: 100%;

		:deep(.swiper-pagination) {
			bottom: 0;
		}

		:deep(.swiper-button-next),
		:deep(.swiper-button-prev) {
			color: #fff;
			width: 48px;
			height: 48px;
			background: rgba(255, 255, 255, 0.08);
			border-radius: 50%;
			transition: background 0.2s ease;

			&::after {
				font-size: 20px;
				font-weight: 700;
			}

			&:hover {
				background: rgba(255, 255, 255, 0.2);
			}
		}

		// Pill-стиль как в популярных/акциях
		:deep(.swiper-pagination-bullet) {
			width: 10px;
			height: 10px;
			background: rgba(255, 255, 255, 0.5);
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
	}

	&__image {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		user-select: none;
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
