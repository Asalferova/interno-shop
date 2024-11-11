<template>
	<client-only>
		<div v-if="isSmallScreen" class="layout-mobile-navbar">
			<nav class="container">
				<ul class="list layout-mobile-navbar__menu">
					<li class="layout-mobile-navbar__menu-item">
						<ui-button :to="'/'" :append-icon="'home'" :color="'transparent'" :aria-label="$t('home')"
							class="layout-mobile-navbar__menu-link"></ui-button>
					</li>
					<li class="layout-mobile-navbar__menu-item">
						<tippy theme="mobile-menu" tag="null" content-tag="div" content-class="actions" interactive trigger="click"
							:hide-on-click="true" :arrow="false" placement="top" maxWidth="100%">
							<ui-button :append-icon="'catalog'" :color="'transparent'" :aria-label="$t('catalog')"
								class="layout-mobile-navbar__menu-link"></ui-button>
							<template #content="{ hide }">
								<div class="layout-mobile-navbar__mm">
									<div class="layout-mobile-navbar__close" @click="hide"><ui-svg :name="'close'"
											class="layout-mobile-navbar__close-icon"></ui-svg></div>

									<nav :style="'width: 100%;'">
										<ul class="list layout-mobile-navbar__mm-menu">
											<li class="layout-mobile-navbar__mm-menu-link" v-for="category in categoryOptions"
												:key="category.label" @click="toggleCategory(category.label)">
												<span class="layout-mobile-navbar__category-name">{{
													$t(`categories.${category.label}`)
												}}</span>
												<nav class="layout-mobile-navbar__nav">
													<ul class="list layout-mobile-navbar__category-sub" :class="{
														active: activeCategory === category.label
													}" @click.stop>
														<li v-for="subcategory in category.subcategories" :key="subcategory.label"
															class="list layout-mobile-navbar__category-sub-name">
															<nuxt-link v-slot="{ href, navigate }" :to="{
														name: 'catalog',
														query: {
															subcategories: subcategory.label,
														},
													}" custom>
														<a :href="href" class="link layout-mobile-navbar__category-btn"
															@click="clearQueryAndNavigate(navigate)">
															{{ $t(`subCategories.${subcategory.label}`) }}
														</a>
													</nuxt-link>
														</li>
													</ul>
												</nav>
											</li>
										</ul>
									</nav>
								</div>
							</template>
						</tippy>
					</li>
					<li class="layout-mobile-navbar__menu-item">
						<ui-button :to="'/favorites'" :append-icon="'like'" :color="'transparent'" :aria-label="$t('favorites')"
							class="layout-mobile-navbar__menu-link"></ui-button>
						<div v-if="favoritesProducts && favoritesProducts.length" class="layout-mobile-navbar__menu-item--marker">
						</div>
					</li>
					<li class="layout-mobile-navbar__menu-item">
						<ui-button :to="'/cart'" :append-icon="'cart'" :color="'transparent'" :aria-label="$t('cart')"
							class="layout-mobile-navbar__menu-link"></ui-button>
						<div v-if="cartProducts && Object.keys(cartProducts).length"
							class="layout-mobile-navbar__menu-item--marker">
						</div>
					</li>
					<li class="layout-mobile-navbar__menu-item">
						<ui-button @click="onProfile" :append-icon="'userDefault'" :color="'transparent'"
							:aria-label="$t('personal account')" class="layout-mobile-navbar__menu-link"></ui-button>
					</li>
					<li class="layout-mobile-navbar__menu-item">
						<tippy theme="mobile-menu" tag="null" content-tag="div" content-class="actions" interactive trigger="click"
							:hide-on-click="true" :arrow="false" placement="top" maxWidth="100%">
							<ui-button :append-icon="'more'" :color="'transparent'" :aria-label="$t('more')"
								class="layout-mobile-navbar__menu-link"></ui-button>
							<template #content="{ hide }">
								<div class="layout-mobile-navbar__mm">
									<div class="layout-mobile-navbar__close" @click="hide"><ui-svg :name="'close'"
											class="layout-mobile-navbar__close-icon"></ui-svg></div>
									<nav :style="'width: 100%;'">
										<ul class="list layout-mobile-navbar__mm-menu">
											<li class="layout-mobile-navbar__mm-menu-link">
												<ui-button class="link" :color="'transparent'" @click="onPlaceAd">{{ $t(`aditionalMenu.become a seller`)
													}}</ui-button>
											</li>
											<li class="layout-mobile-navbar__mm-menu-link">
													<ui-button :color="'transparent'" @click="toggleCategory('settings')">{{ $t('settings') }}</ui-button>
													<div class="list layout-mobile-navbar__category-sub" :class="{
														active: activeCategory === 'settings'
													}" @click.stop>
														<ui-currency-switcher></ui-currency-switcher>
														<ui-language-switcher></ui-language-switcher>
														<ui-theme-switcher></ui-theme-switcher>
													</div>
											</li>
											<li class="layout-mobile-navbar__mm-menu-link">
												<ui-button class="link" :color="'transparent'" @click="openHelpModal">{{ $t(`aditionalMenu.help`)
													}}</ui-button>
											</li>
											<li class="layout-mobile-navbar__mm-menu-link">
												<ui-button :to="'https://asalferova.github.io/SiteInterno/'" :color="'transparent'"
													target="_blank">{{
														$t(`aditionalMenu.blog`) }}</ui-button>
											</li>
											<li class="layout-mobile-navbar__mm-menu-link">
													<ui-button :color="'transparent'" @click="toggleCategory('promo')">{{ $t(`aditionalMenu.promotional code`) }}</ui-button>
													<div class="list layout-mobile-navbar__category-sub" :class="{
														active: activeCategory === 'promo'
													}" @click.stop>
														<ui-promotional-codes :promocodes="promoCodesForLocale"></ui-promotional-codes>
													</div>

											</li>
										</ul>
									</nav>
								</div>
							</template>
						</tippy>
					</li>
				</ul>
			</nav>
		</div>
	</client-only>
</template>

<script lang="ts" setup>
import { useRouter } from "#app";
import { useI18n } from "#imports";
import { useMediaQuery } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useModal } from "vue-final-modal";
import AuthModal from "~/components/auth/modal/AuthModal.vue";
import AuthModalSignUpBySeller from "~/components/auth/modal/AuthModalSignUpBySeller.vue";
import HelpModal from "~/components/modals/HelpModal.vue";
import { promotionalCodes } from "~/helpers/promotionalCodes";
import { useAuthStore } from "~/store/auth";
import { useCartStore } from "~/store/cart";
import { useFavoritesStore } from "~/store/favorites";
import { categoryOptions } from "~/helpers/filterOptions";

const router = useRouter()
const isSmallScreen = useMediaQuery("(max-width:1024px)");
const { locale } = useI18n()

const favoritesStore = useFavoritesStore();
const { favoritesProducts } = storeToRefs(favoritesStore);

const cartStore = useCartStore();
const { cartProducts } = storeToRefs(cartStore);

const authStore = useAuthStore();
const { loggedIn } = storeToRefs(authStore);

const { open: openAuthModal } = useModal({
	component: AuthModal,
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

const { open: openAuthModalSignUpBySeller } = useModal({
	component: AuthModalSignUpBySeller
});

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

const activeCategory = ref<string | null>(null);

const toggleCategory = (categoryId: string) => {
	activeCategory.value =
		activeCategory.value === categoryId ? null : categoryId;
};

const clearQueryAndNavigate = (navigate: () => void) => {
	router.replace({ query: {}, replace: true })
	navigate()
}
</script>

<style lang="scss" scoped>
.layout-mobile-navbar {
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 1000;
	width: 100%;
	background-color: $background;
	box-shadow: $shadow-top;

	&__menu {
		display: flex;
		align-items: center;
		justify-content: space-between;

		&-item {
			width: 100%;
			flex-grow: 1;
			position: relative;

			&--marker {
				position: absolute;
				top: 28px;
				left: 55%;
				border-radius: 50%;
				width: 12px;
				height: 12px;
				border: 2px solid $background;
				background-color: $primary;
			}
		}

		&-link {
			padding-top: 28px;
			padding-bottom: 28px;
			max-width: none;
			width: 100%;
		}
	}

	&__nav {
			width: 100%;
		}

		&__category {
			&-sub {
				  display: flex;
					flex-direction: column;
					display: none;
					gap: 15px;

				&-name {
					width: fit-content;
					font-size: 20px;
				}
			}
		}

	&__mm {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: calc(100vh - 130px);
		overflow: auto;

		&-menu {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 20px;
			padding: 25px 10px;

			&-link {
				width: 100%;
				display: flex;
				justify-content: center;
				flex-direction: column;
				padding-bottom: 20px;

				&:not(:last-child) {
					border-bottom: 1px solid $primary;
				}
			}
		}
	}

	&__close {
		position: relative;
		opacity: 1;
		padding: 26px;
		height: fit-content;
		width: 100%;

		&-icon {
			position: absolute;
			top: 15px;
			right: 0;
			width: 24px;
			height: 24px;
			cursor: pointer;
			color: $text-primary;
		}
	}

	&:deep(.ui-button__icon--left) {
		margin: 0;
		padding: 0;
	}

	&:deep(.ui-button__icon--right) {
		margin: 0;
		padding: 0;
	}
}

.active {
	margin-top: 15px;
	display: flex;
}
</style>
