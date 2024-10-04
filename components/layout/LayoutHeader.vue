<template>
  <header class="layout-header">
    <client-only>
      <div v-if="!isSmallScreen" class="container layout-header__top">
        <div class="layout-header__address-currency">
          <ui-button
            class="link layout-header__link layout-header__link--special"
            >{{ $t("address") }}</ui-button
          >
          <ui-button
            class="link layout-header__link layout-header__link--special"
            >{{ $t("rub") }}</ui-button
          >
        </div>
        <nav class="layout-header__top-menu">
          <ul class="list layout-header__links">
            <li v-for="link in headerTopLinks" :key="link.key">
              <ui-button
                v-if="link.path"
                :to="link.path"
                :color="'transparent'"
                target="_blank"
                class="link layout-header__link"
                >{{ $t(`aditionalMenu.${link.label}`) }}</ui-button
              >
              <ui-button
                v-else
                class="link layout-header__link layout-header__link--special"
                >{{ $t(`aditionalMenu.${link.label}`) }}</ui-button
              >
            </li>
          </ul>
        </nav>
      </div>
      <div class="container layout-header__bottom">
        <page-logo v-if="!isSmallScreen" class="layout-header__logo" />
        <div class="layout-header__wrapper-search">
          <div v-if="!isSmallScreen" class="layout-header__catalog">
            <catalog-menu></catalog-menu>
          </div>
          <div class="layout-header__search">
            <ui-input
              :type="'search'"
              :autocomplete="'off'"
              :placeholder="$t('mainSearch')"
              :border-radius="'big'"
              class="layout-header__search-input"
              :aria-label="$t('mainSearch')"
            ></ui-input>
            <ui-button
              :append-icon="'search'"
              :color="'primary'"
              :aria-label="$t('mainSearch')"
            >
            </ui-button>
          </div>
        </div>
        <nav v-if="!isSmallScreen" class="list layout-header__nav">
          <ul class="list layout-header__menu">
            <li class="layout-header__menu-item">
              <ui-button
                :to="'/'"
                :prepend-icon="'like'"
                :color="'transparent'"
                :aria-label="$t('favorites')"
              ></ui-button>
            </li>
            <li class="layout-header__menu-item">
              <ui-button
                :to="'/'"
                :prepend-icon="'cart'"
                :color="'transparent'"
                :aria-label="$t('cart')"
              ></ui-button>
            </li>
            <li class="layout-header__menu-item">
              <ui-button
                :prepend-icon="'userDefault'"
                :color="'transparent'"
                :aria-label="$t('personal account')"
                @click="openAuthModal"
              ></ui-button>
            </li>
            <li class="layout-header__menu-item">
              <tippy
                theme="menu"
                tag="null"
                content-tag="div"
                content-class="actions"
                interactive
                trigger="click"
                :hide-on-click="true"
                :arrow="false"
                placement="bottom-end"
              >
                <ui-button
                  :prepend-icon="'settings'"
                  :color="'transparent'"
                  :aria-label="$t('settings')"
                ></ui-button>
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
import { useMediaQuery } from "@vueuse/core";
import type { MenuType } from "~/types/menu";
import AuthModal from "~/components/auth/modal/AuthModal.vue";

defineProps<{ headerTopLinks: MenuType[] }>();

const isSmallScreen = useMediaQuery("(max-width:1024px)");

const { open: openAuthModal } = useModal({
  component: AuthModal,
});
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
  }

  &__link {
    font-size: 14px;
    &--special {
      padding: 6px;
      &:hover {
        color: $primary-hover-text;
      }
    }
  }

  & :deep(.ui-button__icon--right) {
    margin: 0;
    padding: 0;
  }
}

.router-link-active {
  color: $primary-hover;
}
</style>
