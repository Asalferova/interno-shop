<template>
  <div class="product-detail-gallery">
		<template v-if="images[0]">
				<img :src="images[0].src" itemprop="image" class="product-detail-gallery__image">
		</template>
	</div>
</template>
<script lang="ts" setup>
import type { MediaImage } from '~/types/media'

withDefaults(defineProps<{
	images: MediaImage[];
}>(), {
	images: () => [],
})
</script>

<style lang="scss" scoped>
.product-detail-gallery {
	&__image {
	width: 100%;
	object-fit: cover;
	object-position: center;
  border-radius: 16px;
	}
}
</style>
