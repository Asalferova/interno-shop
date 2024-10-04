<template>
	<div class="layout">
		<layout-header :header-top-links="menuItemsHeaderAditional" />
		<div class="layout__main-page">
			<slot />
			<ModalsContainer />
		</div>
		<layout-mobile-nav-bar />
		<layout-footer
			:menu-socials="socials"
			:menu-contacts="contacts"
			:menu-rules="menuRules"
			class="layout__footer"
		/>
	</div>
</template>

<script lang="ts" setup>
import { ModalsContainer } from 'vue-final-modal'
import type { MenuType } from '~/types/menu'

const menuItemsHeaderAditional: MenuType[] = [
	{ label: 'become a seller', key: 'become a seller' },
	{
		label: 'blog',
		key: 'blog',
		path: 'https://asalferova.github.io/SiteInterno/'
	},
	{ label: 'mobile application', key: 'mobile application', path: '/' },
	{ label: 'coupons', key: 'coupons', path: '/' },
	{ label: 'help', key: 'help', path: '/' }
]

const socials = [
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

const menuRules = [
	{
		key: 'terms',
		label: 'termsOfUse',
		to: {
			name: 'index'
		}
	},
	{
		key: 'private',
		label: 'privatePolicy',
		to: {
			name: 'index'
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
    padding-top: 138px;

    @include adaptive(1024) {
      padding-top: 97px;
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
