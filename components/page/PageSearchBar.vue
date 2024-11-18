<template>
	<div class="page-search-bar">
		<div class="page-search-bar__form">
			<ui-input :type="'search'" v-model="searchString" :autocomplete="'off'" :placeholder="$t('mainSearch')"
				:border-radius="'big'" class="page-search-bar__input" :aria-label="$t('mainSearch')" id="mainInput"></ui-input>
			<ui-button @click="startSearch" :append-icon="'search'" :color="'primary'" :aria-label="$t('mainSearch')">
			</ui-button>
		</div>
		<div>
			<ul class="list page-search-bar__autocomplette-list" v-if="suggestions.length">
				<li class="page-search-bar__autocomplette-item" v-for="(item, index) in suggestions" :key="index"
					@click="startSearch(item.author, item.name)">
					{{ item.author }} / {{ item.name }}</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { refDebounced } from '@vueuse/core'
import api from "~/api";
import type { Search } from "~/types/search";

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()

const searchString = ref('');
const debouncedSearch = refDebounced(searchString, 500)
const suggestions = ref<Search[]>([]);

const startSearch = async (author?: string, name?: string) => {
	let searchTerms;
	if (author && name) {
		searchTerms = [author, name];
	} else {
		searchTerms = searchString.value.trim().split(' ').filter(term => term !== '');
	}

	if (route.name === 'catalog') {
		router.replace({ query: { search: searchTerms }, replace: true })
		searchString.value = ''
	} else {
		await navigateTo({
			name: 'catalog',
			query: { search: searchTerms }
		});
		searchString.value = ''
	}
};

const fetchSuggestions = async () => {
	if (debouncedSearch.value.length > 0) {
		const searchTerms = debouncedSearch.value.trim().split(' ').filter(term => term !== '');
		const res = await api.search.getSuggestions(searchTerms, locale.value)
		suggestions.value = res.documents
	} else {
		suggestions.value = [];
	}
};

watch(debouncedSearch, fetchSuggestions);

</script>

<style lang="scss" scoped>
.page-search-bar {
	position: relative;
	width: 100%;

	&__form {
		display: flex;
		background-color: $primary;
		border-radius: 13px;
		padding: 3px;
		height: 42px;
		width: 100%;
	}

	&__autocomplette-list {
		background-color: $background;
		border-radius: 13px;
		padding: 13px;
		border: 2px solid $primary;
		position: absolute;
		top: 125%;
		width: 100%;
	}

	&__autocomplette-item {
		color: $text-primary;
		transition: color .3s ease-in-out;
		cursor: pointer;
		padding-top: 5px;
		@include text-ellipsis();

		&:not(:last-child) {
			border-bottom: 1px solid $primary;
			padding-bottom: 5px;
		}

		&:hover {
			color: $primary-hover-text;
		}
	}
}
</style>
