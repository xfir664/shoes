<!--
  ProductGallery — галерея товара с основным фото, zoom при наведении и миниатюрами.
-->
<script setup lang="ts">
const props = defineProps<{
	images: string[];
	name: string;
	discount?: number;
}>();

const activeImageIndex = ref(0);
const activeImage = computed(() => props.images[activeImageIndex.value] ?? "");

// Zoom при наведении — через CSS background (надёжнее чем img)
const mainRef = ref<HTMLElement | null>(null);
const mainImgRef = ref<HTMLImageElement | null>(null);
const zoomVisible = ref(false);
const zoomBlockStyle = ref<Record<string, string>>({});

const ZOOM_SIZE = 200;
const ZOOM_FACTOR = 2.5;
const CURSOR_OFFSET = 16;

function onZoomMove(e: MouseEvent) {
	if (!mainRef.value || !mainImgRef.value) return;

	const img = mainImgRef.value;
	const containerRect = mainRef.value.getBoundingClientRect();
	const containerX = e.clientX - containerRect.left;
	const containerY = e.clientY - containerRect.top;

	const naturalW = img.naturalWidth;
	const naturalH = img.naturalHeight;
	const containerW = containerRect.width;
	const containerH = containerRect.height;

	const hasNaturalSize = naturalW > 0 && naturalH > 0;
	const scale = hasNaturalSize
		? Math.max(containerW / naturalW, containerH / naturalH)
		: 1;
	const displayedW = hasNaturalSize ? naturalW * scale : containerW;
	const displayedH = hasNaturalSize ? naturalH * scale : containerH;
	const offsetX = (displayedW - containerW) / 2;
	const offsetY = (displayedH - containerH) / 2;

	const imgX = containerX + offsetX;
	const imgY = containerY + offsetY;
	const halfZoom = ZOOM_SIZE / 2;

	const spaceRight = window.innerWidth - e.clientX;
	const spaceLeft = e.clientX;
	const showRight = spaceRight >= ZOOM_SIZE + CURSOR_OFFSET || spaceRight >= spaceLeft;
	const blockLeft = showRight
		? e.clientX + CURSOR_OFFSET
		: e.clientX - ZOOM_SIZE - CURSOR_OFFSET;
	const blockTop = Math.max(
		CURSOR_OFFSET,
		Math.min(window.innerHeight - ZOOM_SIZE - CURSOR_OFFSET, e.clientY - halfZoom),
	);

	// CSS-переменные для background-position (px) и background-size
	const bgPosX = -(imgX * ZOOM_FACTOR - halfZoom);
	const bgPosY = -(imgY * ZOOM_FACTOR - halfZoom);
	const bgSizeW = displayedW * ZOOM_FACTOR;
	const bgSizeH = displayedH * ZOOM_FACTOR;
	const imgUrl = activeImage.value ? `url("${activeImage.value.replace(/"/g, "%22")}")` : "none";

	zoomBlockStyle.value = {
		left: `${blockLeft}px`,
		top: `${blockTop}px`,
		"--zoom-bg": imgUrl,
		"--zoom-bg-size": `${bgSizeW}px ${bgSizeH}px`,
		"--zoom-bg-pos": `${bgPosX}px ${bgPosY}px`,
	};
}
</script>

<template>
	<div class="gallery">
		<div
			ref="mainRef"
			class="gallery__main"
			@mousemove="onZoomMove"
			@mouseenter="(e) => { zoomVisible = true; onZoomMove(e); }"
			@mouseleave="zoomVisible = false"
		>
			<img
				ref="mainImgRef"
				:src="activeImage"
				:alt="name"
				class="gallery__main-image"
			/>
			<!-- Приближённый фрагмент через CSS background -->
			<Teleport to="body">
				<div
					v-show="zoomVisible"
					class="gallery__zoom-block"
					:style="zoomBlockStyle"
					:aria-label="`Увеличение: ${name}`"
				/>
			</Teleport>
			<MyBadge v-if="discount" variant="sale">
				-{{ discount }}%
			</MyBadge>
		</div>
		<div v-if="images.length > 1" class="gallery__thumbnails">
			<button
				v-for="(img, idx) in images"
				:key="idx"
				class="gallery__thumb"
				:class="{ 'gallery__thumb--active': idx === activeImageIndex }"
				@click="activeImageIndex = idx"
			>
				<img :src="img" :alt="`${name} — фото ${idx + 1}`" loading="lazy" />
			</button>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/var.scss" as *;

.gallery {
	position: relative;

	&__main {
		position: relative;
		border-radius: var(--radius-lg);
		overflow: hidden;
		background: var(--c-beige-100);
		aspect-ratio: 1 / 1;
		margin-bottom: var(--spacing-md);
		cursor: zoom-in;

		@media (hover: none) {
			cursor: default;
		}
	}

	&__main-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	&__zoom-block {
		position: fixed;
		width: 200px;
		height: 200px;
		border-radius: var(--radius-lg);
		overflow: hidden;
		pointer-events: none;
		box-shadow: var(--shadow-xl);
		border: 1px solid var(--c-border-light);
		z-index: 9999;
		background-color: var(--c-surface);
		background-image: var(--zoom-bg);
		background-repeat: no-repeat;
		background-size: var(--zoom-bg-size);
		background-position: var(--zoom-bg-pos);

		@media (hover: none) {
			display: none;
		}
	}

	&__thumbnails {
		display: flex;
		gap: var(--spacing-sm);
		overflow-x: auto;
		scrollbar-width: none;
		-ms-overflow-style: none;

		&::-webkit-scrollbar {
			display: none;
		}
	}

	&__thumb {
		flex-shrink: 0;
		width: 72px;
		height: 72px;
		border-radius: var(--radius-md);
		overflow: hidden;
		border: 2px solid transparent;
		cursor: pointer;
		padding: 0;
		background: var(--c-beige-100);
		transition: var(--transition-base);

		&--active {
			border-color: var(--c-primary);
		}

		&:hover:not(&--active) {
			border-color: var(--c-border);
		}

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			display: block;
		}
	}
}
</style>
