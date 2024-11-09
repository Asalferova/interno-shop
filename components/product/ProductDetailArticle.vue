<template>
	<div class="object-detail-article">
		<product-detail-gallery :images="product.images" class="object-detail-article__gallery">
		</product-detail-gallery>
		<product-detail-info :product="product" class="object-detail-article__info"></product-detail-info>
	</div>
</template>
<script lang="ts" setup>
import type { ProductItem } from "~/types/products/products.item";

withDefaults(
	defineProps<{
		product: ProductItem;
	}>(),
	{
		product: () => ({} as ProductItem),
	}
);
</script>

<style lang="scss" scoped>
.object-detail-article {
	display: flex;
	gap: 26px;

	&__gallery {
		width: 35%;
		border-radius: 12px;
	}

	&__info {
		width: 60%;
	}

	@include adaptive(1024) {
		&__gallery {
			width: 48%;
		}

		&__info {
			width: 45%;
		}
	}

	@include adaptive(460) {
		flex-direction: column;
		gap: 13px;

		&__gallery {
			width: 100%;
		}

		&__info {
			width: 100%;
		}
	}
}
</style>
