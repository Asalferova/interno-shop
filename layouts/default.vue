<template>
	<div class="layout">
		<layout-header />
		<div class="layout__main-page">
			<slot />
			<ModalsContainer />
		</div>
		<page-cookie-message></page-cookie-message>
		<layout-mobile-nav-bar />
		<layout-footer :menu-socials="socials" :menu-contacts="contacts" :menu-rules="menuRules" class="layout__footer" />
	</div>
</template>

<script lang="ts" setup>
import { ModalsContainer } from 'vue-final-modal'
import type { MenuType } from '~/types/menu'

const socials: MenuType[] = [
	{
		key: 'Telegram',
		label: 'Telegram',
		icon: 'telegram',
		path: 'https://web.telegram.org/'
	},
	{
		key: 'Youtube',
		label: 'Youtube',
		icon: 'youtube',
		path: 'https://www.youtube.com/'
	}
]

const contacts: MenuType[] = [
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

const menuRules: MenuType[] = [
	{
		key: 'terms',
		label: 'termsOfUse',
		to: {
			name: 'termsOfUse'
		}
	},
	{
		key: 'private',
		label: 'privatePolicy',
		to: {
			name: 'privacyPolicy'
		}
	}
]
</script>

<style lang="scss" scoped>
.layout {
	display: flex;
	flex-direction: column;
	min-height: 100vh;

	&__main-page {
		flex: 1;
		padding-top: 143px;

		@include adaptive(1024) {
			padding-top: 108px;
		}
	}

	&__footer {
		margin-top: auto;

		@include adaptive(1024) {
			margin-bottom: 82px;
		}
	}
}
</style>
