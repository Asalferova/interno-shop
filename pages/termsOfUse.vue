<template>
	<div class="terms-of-use-page container">
		<page-breadcrumbs :crumbs="crumbs" class="terms-of-use-page__breadcrumbs" />
		<h1 class="terms-of-use-page__title">
			{{ $t('termsOfUse') }}
		</h1>
		<main class="terms-of-use-page__main">
			<div class="terms-of-use-page__content">
				<p>
					{{ $t('termsOfUseObj.introduction') }}
				</p>
				<ol>
					<li v-for="item, title of termsOfUse" :key="item">
						<strong>{{ $t(`termsOfUseObj.${title}.title`) }}</strong>
						<ol class="terms-of-use-page__inner-list">
							<li v-for="i in item" :key="i">
								{{ $t(`termsOfUseObj.${title}.items.${i}`) }}
							</li>
						</ol>
					</li>
				</ol>
			</div>
		</main>
	</div>
</template>
<script lang="ts" setup>
useHead({
	title: 'termsOfUse'
})

const crumbs = [{ name: 'termsOfUse', path: null }]

const termsOfUse = {
	definitions: 4,
	registration: 3,
	userObligations: 2,
	transactions: 3,
	paymentsAndFees: 2,
	privacy: 1,
	changes: 2,
	finalProvisions: 3
}
</script>

<style lang="scss" scoped>
.terms-of-use-page {
	&__title {
		@include text-style(600, 35);
		margin-bottom: 26px;
		color: $text-primary;

		@include adaptive(600) {
			@include text-style(600, 25);
			margin-bottom: 15px;
		}
	}

	&__breadcrumbs {
		margin-bottom: 10px;
	}

	&__content {
		color: $text-primary;
		line-height: 1.3;
		@include adaptive(1024) {
			@include text-style(400, 16);
		}
	}
	&__inner-list{
    margin: 15px;
	}

	ol {
		padding: 0;
		list-style: none;
		counter-reset: li;
	}

	li:before {
		counter-increment: li;
		content: counters(li, ".") ". ";
	}
}
</style>
