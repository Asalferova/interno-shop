<template>
	<div class="container main-page">
		<main-page-banner
			v-if="banners?.length > 0"
			:banners="banners"
		/>
		<template v-if="sortBooks && sortBooks.length">
			<main-page-articles
				:type="'slider'"
				:title="$t('for you')"
				:cards="sortBooks"
				with-sort
			>
				<template #sort>
					<ui-button
						v-for="item in bookSortItems"
						:key="item.key"
						:color="'transparent'"
						:class="[
							'main-page__sort',
							{ 'main-page__sort_active': currentSortKey === item.key },
						]"
						@click="() => (currentSortKey = item.key)"
					>
						{{ $t(item.label) }}
					</ui-button>
				</template>
				<template #slide="{ item }">
					<products-card :card="item" />
				</template>
			</main-page-articles>
		</template>
		<template v-if="allBooks && allBooks.length">
			<main-page-articles :type="'list'" :title="$t('all books')">
				<products-card
					v-for="product in allBooks"
					:key="product.$id"
					:card="product"
				/>
			</main-page-articles>
		</template>
	</div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useMainPageAdsStore } from '~/store/ads'
import { useMainPageStore } from '~/store/mainPage'

const mainPageAdsStore = useMainPageAdsStore()

const { banners } = storeToRefs(mainPageAdsStore)

const mainPageStore = useMainPageStore()
const { allBooks, sortBooks, currentSortKey } = storeToRefs(mainPageStore)

const bookSortItems = [
	{ key: 'isNew', label: 'new' },
	{ key: 'isBestseller', label: 'bestseller' },
	{ key: 'isDiscounted', label: 'sale' }
]
</script>

<style lang="scss" scoped>
.main-page {
  &__sort {
    @include text-style(600, 19);

    &_active {
      color: $primary;
    }

    @include adaptive(600) {
      @include text-style(400, 16);
    }
  }
}
</style>
