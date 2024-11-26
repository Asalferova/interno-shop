<template>
	<div class="products-create-page container">
		<page-breadcrumbs :crumbs="crumbs" class="products-create-page__breadcrumbs" />
		<h1 class="products-create-page__title h2">
			{{ title }}
		</h1>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	middleware: 'auth',
	requiresAuth: true
})

const route = useRoute()
const { t } = useI18n()

const title = computed(() => {
	if (route.query.id) {
		return t('ad.editAds')
	} else {
		return t('ad.newAds')
	}
})

const crumbs = [{ name: 'ad.newAds', path: null }]
</script>

<style lang="scss" scoped>
.products-create-page {
	&__title {
		@include text-style(600, 35);
		color: $text-primary;
		margin-bottom: 26px;

		@include adaptive(600) {
			@include text-style(600, 25);
			margin-bottom: 26px;
		}
	}
	&__breadcrumbs {
		margin-bottom: 10px;
	}
}
</style>
