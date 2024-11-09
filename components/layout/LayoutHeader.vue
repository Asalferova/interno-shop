<template>
	<header class="layout-header">
		<client-only>
			<div v-if="!isSmallScreen" class="container layout-header__top">
				<div class="layout-header__address-currency">
					<ui-button class="link layout-header__link layout-header__link--special">{{ $t("address") }}</ui-button>
					<tippy theme="menu" tag="null" content-tag="div" content-class="actions" interactive trigger="click"
						:hide-on-click="true" :arrow="false" placement="bottom">
						<ui-button class="link layout-header__link layout-header__link--special">{{ currentCurrency }}</ui-button>
						<template #content="{ hide }">
							<ui-currency-switcher @click="hide"></ui-currency-switcher>
						</template>
					</tippy>
				</div>
				<nav class="layout-header__top-menu">
					<ul class="list layout-header__links">
						<li>
							<ui-button class="link layout-header__link layout-header__link--special" @click="onPlaceAd">{{ $t(`aditionalMenu.become a seller`)
								}}</ui-button>
						</li>
						<li>
							<ui-button :to="'https://asalferova.github.io/SiteInterno/'" :color="'transparent'" target="_blank"
								class="link layout-header__link">{{ $t(`aditionalMenu.blog`) }}</ui-button>
						</li>
						<li>
							<tippy theme="menu" tag="null" content-tag="div" content-class="actions" interactive trigger="click"
								:hide-on-click="true" :arrow="false" placement="bottom-end">
								<ui-button :color="'transparent'" class="link layout-header__link">{{ $t(`aditionalMenu.promotional code`)
									}}</ui-button>
								<template #content="{ hide }">
									<ui-promotional-codes @click="hide" :promocodes="promoCodesForLocale"></ui-promotional-codes>
								</template>
							</tippy>
						</li>
						<li>
							<ui-button :color="'transparent'" class="link layout-header__link" @click="openHelpModal">{{ $t(`aditionalMenu.help`)
								}}</ui-button>
						</li>
					</ul>
				</nav>
			</div>
		<div class="container layout-header__bottom">
				<page-logo v-if="!isSmallScreen" class="layout-header__logo" />
			<div class="layout-header__wrapper-search" ref="filter">
					<div v-if="!isSmallScreen" class="layout-header__catalog">
						<ui-button :prepend-icon="isOpen ? 'cross' : 'catalog'" :color="'primary'" :aria-label="$t('catalog')"
							@click="openCatalog">
							<span class="layout-header__catalog-text">{{ $t("catalog") }}</span>
						</ui-button>
						<div class="layout-header__catalog-content" v-if="isOpen">
							<nav :aria-label="$t('catalog')">
								<ul class="list layout-header__categories">
									<li v-for="category in categoryOptions" :key="category.label" class="layout-header__category">
										<span class="layout-header__category-name">{{
											$t(`categories.${category.label}`)
											}}</span>
										<nav class="layout-header__categories-nav">
											<ul class="list layout-header__category-sub">
												<li v-for="subcategory in category.subcategories" :key="subcategory.label"
													class="list layout-header__category-sub-name">
													<ui-button class="list layout-header__category-btn" :color="'transparent'"
														target="_blank" :to="{
															name: 'catalog',
															query: {
																subcategories: subcategory.label,
															},
														}">{{ $t(`subCategories.${subcategory.label}`) }}
													</ui-button>
												</li>
											</ul>
										</nav>
									</li>
								</ul>
							</nav>
						</div>
					</div>
				<div class="layout-header__search">
					<ui-input :type="'search'" :autocomplete="'off'" :placeholder="$t('mainSearch')" :border-radius="'big'"
						class="layout-header__search-input" :aria-label="$t('mainSearch')"></ui-input>
					<ui-button :append-icon="'search'" :color="'primary'" :aria-label="$t('mainSearch')">
					</ui-button>
				</div>
			</div>
				<nav v-if="!isSmallScreen" class="list layout-header__nav">
					<ul class="list layout-header__menu">
						<li class="layout-header__menu-item">
							<ui-button :to="{
								name: 'favorites',
							}" :prepend-icon="'like'" :color="'transparent'" :aria-label="$t('favorites')"></ui-button>
							<div v-if="favoritesProducts && favoritesProducts.length" class="layout-header__menu-item--marker"></div>
						</li>
						<li class="layout-header__menu-item">
							<ui-button :to="{
								name: 'cart',
							}" :prepend-icon="'cart'" :color="'transparent'" :aria-label="$t('cart')"></ui-button>
							<div v-if="cartProducts && Object.keys(cartProducts).length" class="layout-header__menu-item--marker">
							</div>
						</li>
						<li class="layout-header__menu-item">
							<ui-button :prepend-icon="'userDefault'" :color="'transparent'" :aria-label="$t('personal account')"
								@click="onProfile"></ui-button>
						</li>
						<li class="layout-header__menu-item">
							<tippy theme="menu" tag="null" content-tag="div" content-class="actions" interactive trigger="click"
								:hide-on-click="true" :arrow="false" placement="bottom-end">
								<ui-button :prepend-icon="'settings'" :color="'transparent'" :aria-label="$t('settings')"></ui-button>
								<template #content>
									<ui-language-switcher></ui-language-switcher>
									<ui-theme-switcher></ui-theme-switcher>
								</template>
							</tippy>
						</li>
					</ul>
				</nav>
		</div>
	</client-only>
	</header>
</template>

<script lang="ts" setup>
import { useModal } from "vue-final-modal";
import { useMediaQuery, onClickOutside } from "@vueuse/core";
import AuthModal from "~/components/auth/modal/AuthModal.vue";
import AuthModalSignUpBySeller from "~/components/auth/modal/AuthModalSignUpBySeller.vue";
import HelpModal from "~/components/modals/HelpModal.vue";
import { useRouter } from "#app";
import { storeToRefs } from "pinia";
import { useFavoritesStore } from "~/store/favorites";
import { useAuthStore } from "~/store/auth";
import { useCartStore } from "~/store/cart";
import { promotionalCodes } from "~/helpers/promotionalCodes";
import { computed, ref, useI18n } from "#imports";
import { useCurrencyStore } from "~/store/currensy";
import { categoryOptions } from "~/helpers/filterOptions";

const router = useRouter();
const isSmallScreen = useMediaQuery("(max-width:1024px)");
const { locale } = useI18n()

const favoritesStore = useFavoritesStore();
const { favoritesProducts } = storeToRefs(favoritesStore);

const cartStore = useCartStore();
const { cartProducts } = storeToRefs(cartStore);

const currencyStore = useCurrencyStore()
const { currentCurrency } = storeToRefs(currencyStore)

const authStore = useAuthStore();
const { loggedIn } = storeToRefs(authStore);

const { open: openAuthModal } = useModal({
	component: AuthModal,
});

const { open: openAuthModalSignUpBySeller } = useModal({
	component: AuthModalSignUpBySeller
});

const { open: openHelpModal } = useModal({
	component: HelpModal,
});

const onProfile = () => {
	if (loggedIn.value) {
		router.push({
			name: "profile",
		});
	} else {
		openAuthModal();
	}
};

const { open: openAuthModalWithRedirect } = useModal({
	component: AuthModal,
	attrs: {
		onAuth: () => openAuthModalSignUpBySeller()
	}
})

const onPlaceAd = () => {
	if (loggedIn.value) {
		openAuthModalSignUpBySeller()
	} else {
		openAuthModalWithRedirect()
	}
}

const promoCodesForLocale = computed(() => {
	return promotionalCodes.filter(code => code.locale === locale.value)
})

const isOpen = ref(false);

const openCatalog = () => {
	isOpen.value = !isOpen.value;
};

const filter = ref(null);

onClickOutside(filter, () => {
	closeFilter();
});

const closeFilter = () => {
	isOpen.value = false;
};
</script>

<style lang="scss" scoped>
.layout-header {
	$block: &;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1000;
	width: 100%;
	background-color: $background;
	padding: 17px 0;
	box-shadow: $shadow;
	height: 117px;

	@include adaptive(1024) {
		height: 76px;
	}

	@include adaptive(600) {
		height: 82px;
	}

	&__top {
		@include in-center();
		justify-content: space-between;
		padding-bottom: 15px;
	}

	&__bottom {
		@include in-center();
		gap: 30px;
	}

	@include adaptive(600) {
		position: block;
		padding: 20px 0;
	}

	&__address-currency,
	&__links {
		display: flex;
		align-items: center;
		gap: 15px;
		font-size: 14px;
		color: $text-secondary;
		margin: 0;
	}

	&__wrapper-search {
		display: flex;
		gap: 25px;
		margin: auto;
		width: 100%;
	}

	&__search {
		display: flex;
		background-color: $primary;
		border-radius: 13px;
		padding: 3px;
		height: 42px;
		width: 100%;
	}

	&__nav {
		margin-left: auto;
	}

	&__menu {
		display: flex;
		align-items: center;
		gap: 32px;

		&-item {
			position: relative;

			&--marker {
				position: absolute;
				top: -2px;
				right: -4px;
				border-radius: 50%;
				width: 12px;
				height: 12px;
				border: 2px solid $background;
				background-color: $primary;
			}
		}
	}

	&__catalog {
		&-content {
			overflow-x: hidden;
			height: fit-content;
			border-radius: 16px;
			overflow-y: scroll;
			border: 2px solid $primary;
			background: $background;
			color: $text-primary;
			position: absolute;
			top: calc(100% + 20px);
			left: 50%;
			transform: translate(-50%);
			width: calc(100% - 104px);
			max-width: 1338px;
			padding: 32px 26px;
			&__nav {
			width: 100%;
		}

		& :deep(.ui-button) {
			text-align: start;
		}
		}

		&-text {
			@include adaptive(1200) {
				display: none;
			}
		}
	}
	&__categories {
			display: flex;
			flex-direction: column;
			gap: 26px;
			text-align: center;
			&-nav {
				width: 100%;
			}
		}

		&__category {
			display: flex;
			gap: 54px;
			position: relative;
			padding-bottom: 10px;
			align-items: center;

			&:not(:last-child) {
				border-bottom: 1px solid $primary;
			}

			&-sub {
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-wrap: wrap;
				gap: 40px;
				font-size: 18px;
				width: 100%;

				&-name {
					width: 110px;
				}
			}

			&-name {
				pointer-events: none;
				font-weight: bold;
				min-width: 200px;
				max-width: 200px;
				font-size: 20px;
			}
		}

	&__link {
		font-size: 14px;

		&--special {
			padding: 6px;
		}
	}

	& :deep(.ui-button__icon--right) {
		margin: 0;
		padding: 0;
	}

	& :deep(.ui-button__icon--left) {
		@include adaptive(1200) {
			margin: 0;
			padding: 0;
		}
	}
}

.router-link-active {
	color: $primary-hover;
}
</style>
