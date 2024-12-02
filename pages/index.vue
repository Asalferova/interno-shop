<template>
	<div class="container main-page">
		<template v-if="statusAllBooks === 'pending' || status === 'pending'">
       <ui-loader></ui-loader>
		</template>
		<main-page-banner v-if="banners?.length > 0" :banners="banners" class="main-page__banners" />
		<template v-if="sortBooks && sortBooks.length">
			<main-page-articles
				:type="'slider'"
				:title="$t('for you')"
				:cards="sortBooks"
				with-sort
				class="main-page__articles"
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
			<main-page-articles :type="'list'" :title="$t('all books')" class="main-page__articles">
				<products-card v-for="product in allBooks" :key="product.$id" :card="product" />
			</main-page-articles>
		</template>
	</div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useMainPageAdsStore } from '~/store/ads'
import { useMainPageStore } from '~/store/mainPage'

const mainPageAdsStore = useMainPageAdsStore()

const { banners, status } = storeToRefs(mainPageAdsStore)

const mainPageStore = useMainPageStore()
const { allBooks, sortBooks, currentSortKey, statusSortBooks, statusAllBooks } = storeToRefs(mainPageStore)

const bookSortItems = [
	{ key: 'isNew', label: 'new' },
	{ key: 'isBestseller', label: 'bestseller' },
	{ key: 'isDiscounted', label: 'sale' }
]

const el = ref<Document | null>(null);

onMounted(() => {
	el.value = document;
	useInfiniteScroll(el, mainPageStore.loadMore, { distance: 100 });
});

</script>

<style lang="scss" scoped>
.main-page {
	&__sort {
		@include text-style(600, 19);

		&_active {
			color: $primary-hover-text;
		}

		@include adaptive(600) {
			@include text-style(400, 16);
		}
	}

	&__banners {
		margin-bottom: 26px;
	}

	&__articles {
		margin-bottom: 26px;
	}
}
</style>
