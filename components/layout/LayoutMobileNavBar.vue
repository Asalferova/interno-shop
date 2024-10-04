<template>
  <client-only>
    <div v-if="isSmallScreen" class="layout-mobile-navbar">
      <nav class="container">
        <ul class="list layout-mobile-navbar__menu">
          <li class="layout-mobile-navbar__menu-item">
            <ui-button
              :to="'/'"
              :append-icon="'home'"
              :color="'transparent'"
              :aria-label="$t('home')"
              class="layout-mobile-navbar__menu-link"
            ></ui-button>
          </li>
          <li class="layout-mobile-navbar__menu-item">
            <catalog-menu></catalog-menu>
          </li>
          <li class="layout-mobile-navbar__menu-item">
            <ui-button
              :to="'/'"
              :append-icon="'like'"
              :color="'transparent'"
              :aria-label="$t('favorites')"
              class="layout-mobile-navbar__menu-link"
            ></ui-button>
          </li>
          <li class="layout-mobile-navbar__menu-item">
            <ui-button
              :to="'/'"
              :append-icon="'cart'"
              :color="'transparent'"
              :aria-label="$t('cart')"
              class="layout-mobile-navbar__menu-link"
            ></ui-button>
          </li>
          <li class="layout-mobile-navbar__menu-item">
            <ui-button
              @click="openAuthModal"
              :append-icon="'userDefault'"
              :color="'transparent'"
              :aria-label="$t('personal account')"
              class="layout-mobile-navbar__menu-link"
            ></ui-button>
          </li>
          <li class="layout-mobile-navbar__menu-item">
            <ui-button
              :to="'/'"
              :append-icon="'more'"
              :color="'transparent'"
              :aria-label="$t('more')"
              class="layout-mobile-navbar__menu-link"
            ></ui-button>
          </li>
        </ul>
      </nav>
    </div>
  </client-only>
</template>

<script lang="ts" setup>
import { useMediaQuery } from "@vueuse/core";
import { useModal } from "vue-final-modal";
import AuthModal from "~/components/auth/modal/AuthModal.vue";

const isSmallScreen = useMediaQuery("(max-width:1024px)");

const { open: openAuthModal } = useModal({
  component: AuthModal,
});
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
    }

    &-link {
      padding-top: 28px;
      padding-bottom: 28px;
      max-width: none;
      width: 100%;
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
</style>
