<!--
  ProductGallery — галерея товара с миниатюрами и Swiper на мобильном.
-->
<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const props = defineProps<{
	images: string[];
	name: string;
	discount?: number;
}>();

const activeImageIndex = ref(0);
const activeImage = computed(() => props.images[activeImageIndex.value] ?? "");
const swiperModules = [Pagination];

function onSlideChange(swiper: any) {
	activeImageIndex.value = swiper.activeIndex;
}
</script>

<template>
	<div class="gallery">
		<!-- Десктоп -->
		<div class="gallery__desktop">
			<div class="gallery__main">
				<img
					:src="activeImage"
					:alt="name"
					class="gallery__main-image"
				/>
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

		<!-- Мобильный Swiper -->
		<div class="gallery__mobile">
			<Swiper
				:modules="swiperModules"
				:pagination="{ clickable: true }"
				:slides-per-view="1"
				class="gallery__swiper"
				@slide-change="onSlideChange"
			>
				<SwiperSlide v-for="(img, idx) in images" :key="idx">
					<div class="gallery__slide">
						<img :src="img" :alt="`${name} — фото ${idx + 1}`" />
					</div>
				</SwiperSlide>
			</Swiper>
			<MyBadge v-if="discount" variant="sale">
				-{{ discount }}%
			</MyBadge>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/var.scss" as *;

.gallery {
	position: relative;

	&__desktop {
		display: none;

		@media (min-width: $breakpoint-tablet) {
			display: block;
		}
	}

	&__mobile {
		display: block;
		position: relative;

		@media (min-width: $breakpoint-tablet) {
			display: none;
		}
	}

	&__main {
		position: relative;
		border-radius: var(--radius-lg);
		overflow: hidden;
		background: var(--c-beige-100);
		aspect-ratio: 1 / 1;
		margin-bottom: var(--spacing-md);
	}

	&__main-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	&__thumbnails {
		display: flex;
		gap: var(--spacing-sm);
		overflow-x: auto;
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

	&__swiper {
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	&__slide {
		aspect-ratio: 1 / 1;
		background: var(--c-beige-100);

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			display: block;
		}
	}
}
</style>
