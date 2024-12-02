<template>
	<div class="products-create-progress">
		<div class="products-create-progress__list">
			<span v-for="(segment, i) in progress" :key="`products-create-progress-${i}`"
				class="products-create-progress__item"
				:class="{ 'products-create-progress__item--complete': segment.isComplete }">
				<div class="products-create-progress__item-circle">
					<ui-svg name="check" class="products-create-progress__item-circle-icon" />
				</div>
				<p v-if="!isSmallScreen" class="products-create-progress__item-label">
					{{ segment.label }}
				</p>
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { get } from 'lodash-es'
import { storeToRefs } from 'pinia'
import { useMediaQuery } from '@vueuse/core'
import { useProductsCreateStore } from '~/store/productsCreate'
import type { CreateProductAccomplishedModel } from '~/types/productsCreate';

const route = useRoute()
const { t } = useI18n()

const productsCreateStore = useProductsCreateStore(route.query.id as string || '')
const {
	accomplishedSegmentsModel,
	specsStep
} = storeToRefs(productsCreateStore)

const isSmallScreen = useMediaQuery('(max-width: 900px)')

const progress = computed(() => {
	let progressLabels: Partial<Record<keyof CreateProductAccomplishedModel, string>> = {
		name: t('ad.name')
	}

	if (specsStep.value) {
		progressLabels = {
			...progressLabels,
			descriptionAndPhotos: t('DescriptionAndPhotos'),
			price: t('Price'),
			additionalSpecs: t('ad.additionalSpecs')
		}
	}

	return Object.keys(progressLabels).map((key) => {
		return {
			key,
			label: get(progressLabels, key),
			isComplete: get(accomplishedSegmentsModel.value, key)
		}
	})
})
</script>

<style lang="scss" scoped>
.products-create-progress {
	$block: &;

	min-width: 296px;

	@include adaptive(1300) {
		min-width: 220px;
	}

	@include adaptive(900) {
		min-width: 22px;
	}

	&__list {
		position: sticky;
		top: 143px;
	}

	&__item {
		display: flex;
		align-items: center;
		column-gap: 19px;
		text-decoration: none;

		&--complete {
			& #{$block}__item-circle {
				background-color: $primary;
				color: $white;

			}

			& #{$block}__item-circle::before {
				background: $primary !important;
			}
		}

		&-label {
			@include text-style(500, 17);
			color: #6C6C6C;

		}

		&:not(:last-child) {
			margin-bottom: 8px;

			#{$block}__item-circle {
				&::before {
					content: '';
					position: absolute;
					top: 100%;
					display: block;
					width: 1px;
					min-height: 19px;
					background: $text-secondary;
				}
			}
		}

		&:not(:last-child) {
			margin-bottom: 19px;
		}

		&:not(:first-child) {
			#{$block}__item-circle {
				&::before {
					content: '';
					position: absolute;
					top: calc(-100% + 3px);
					display: block;
					width: 1px;
					min-height: 19px;
					background: $text-secondary;
				}
			}
		}

		&-circle {
			@include in-center;
			position: relative;
			width: 22px;
			height: 22px;
			border-radius: 50%;
			background-color: $text-secondary;
			color: $white;

			&-icon {
				width: 18px;
				height: 18px;
			}
		}
	}
}
</style>
