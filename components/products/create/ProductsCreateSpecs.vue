<template>
	<div class="products-create-specs">
		<div class="products-create-specs__segments">
			<products-create-segment id="name" :title="$t('ad.name')" class="products-create-specs__segment">
				<products-create-segment-name v-model:complete="accomplishedSegmentsModel.name" />
			</products-create-segment>
			<template v-if="specsStep">
				<products-create-segment id="descriptionAndPhotos" :title="$t('DescriptionAndPhotos')"
					class="products-create-specs__segment">
					<products-create-segment-images v-model:complete="accomplishedSegmentsModel.descriptionAndPhotos" />
				</products-create-segment>

				<products-create-segment id="price" :title="$t('Price')" class="products-create-specs__segment">
					<products-create-segment-price v-model:complete="accomplishedSegmentsModel.price" />
				</products-create-segment>

				<products-create-segment id="additionalSpecs" :title="$t('ad.additionalSpecs')"
					class="products-create-specs__segment">
					<products-create-segment-specs v-model:complete="accomplishedSegmentsModel.additionalSpecs" />
				</products-create-segment>
			</template>
		</div>
		<div class="products-create-specs__buttons">
			<ui-button :color="'primary'" class="products-create-specs__place" :disabled="!formIsComplete"
				@click="createProduct">
				{{ $t('button.postProduct') }}
			</ui-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProductsCreateStore } from '~/store/productsCreate'
import { v4 as uuid } from "uuid";

const route = useRoute()

const productsCreateStore = useProductsCreateStore(route.query.id as string || '')

const {
	accomplishedSegmentsModel,
	formIsComplete,
	specsStep,
	newProductId
} = storeToRefs(productsCreateStore)

const segmentData = ref({
	isNew: false,
	seller: ''
})

if (!route.query.id) {
	segmentData.value = {
		isNew: true,
		seller: route.query.seller as string
	}
	newProductId.value = uuid()
	productsCreateStore.setPropsToPayload(segmentData.value)
}

async function createProduct() {
	await productsCreateStore.createNewProduct()
}

onUnmounted(() => {
	segmentData.value = {
		isNew: false,
		seller: ''
	}
	productsCreateStore.setPropsToPayload(segmentData.value)
})
</script>

<style lang="scss" scoped>
.products-create-specs {
	width: 100%;
	max-width: 77%;

	@include adaptive(900) {
		max-width: unset;
	}

	&__segment {
		padding: 30px 30px;
		border: 2px solid $primary;

		@include adaptive(600) {
			padding: 24px 12px;
		}

		&:first-child {
			border-top-left-radius: 12px;
			border-top-right-radius: 12px;
		}

		&:not(:first-child) {
			border-top: 0;
		}

		&:last-child {
			border-bottom-left-radius: 12px;
			border-bottom-right-radius: 12px;
		}
	}

	&__place {
		margin-top: 26px;
		white-space: nowrap;

		@include adaptive(375) {
			margin-top: 0;
		}
	}

	&__buttons {
		display: flex;
		gap: 8px;

		@include adaptive(375) {
			flex-direction: column;
			margin-top: 10px;
		}
	}
}
</style>
