<template>
	<div class="privacy-policy-page container">
		<page-breadcrumbs :crumbs="crumbs" class="privacy-policy-page__breadcrumbs" />
		<h1 class="privacy-policy-page__title">
			{{ $t('privatePolicy') }}
		</h1>
		<main class="privacy-policy-page__main">
			<div class="privacy-policy-page__content">
				<p>
					{{ $t('privacyPolicyObj.introduction') }}
				</p>
				<ol>
					<li v-for="item, title of privacyPolicy" :key="item">
						<strong>{{ $t(`privacyPolicyObj.${title}.title`) }}</strong>
						<p>{{ $t(`privacyPolicyObj.${title}.desc`) }}</p>
						<ul class="privacy-policy-page__inner-list">
							<li v-for="i in item" :key="i">
								{{ $t(`privacyPolicyObj.${title}.items.${i}`) }}
							</li>
						</ul>
					</li>
				</ol>
				<ol>
					<li>
						<strong>{{ $t(`privacyPolicyObj.contactInformation.title`) }}</strong>
						<p>{{ $t(`privacyPolicyObj.contactInformation.desc`) }}</p>
						<ul class="privacy-policy-page__inner-list">
							<li v-for="contact in contacts" :key="contact.key">
								<nuxt-link :to="contact.path" target="_blank" class="link">
									{{ contact.label }}
								</nuxt-link>
							</li>
						</ul>
					</li>
				</ol>
			</div>
		</main>
	</div>
</template>
<script lang="ts" setup>

useHead({
	title: 'privatePolicy'
})

const crumbs = [{ name: 'privatePolicy', path: null }]

const privacyPolicy = {
	collectionOfInformation: 3,
	useOfInformation: 5,
	disclosure: 3,
	protectionInformation: 0,
	rights: 5
}

const contacts = [
	{
		key: 'Address',
		label: 'Moscow, Pushkin street',
		path: 'https://www.google.com/maps/'
	},
	{
		key: 'Mail',
		label: 'contact@interno.com',
		path: 'mailto:interno@.ru'
	},
	{
		key: 'Phone',
		label: '(123) 456 - 7890',
		path: 'tel:+5656notfound'
	}
]
</script>

<style lang="scss" scoped>
.privacy-policy-page {
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

	&__inner-list {
		margin: 15px;
	}

	ol {
		padding: 0;
		list-style: none;
	}
}
</style>
