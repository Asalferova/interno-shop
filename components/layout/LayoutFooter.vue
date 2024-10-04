<template>
  <footer class="container layout-footer text-body-reg">
    <div class="layout-footer__main">
      <page-logo></page-logo>
      <div class="layout-footer__main-description">
        {{ $t("description") }}
      </div>
      <nav class="list layout-footer__nav">
        <ul class="list layout-footer__social">
          <li
            v-for="social in menuSocials"
            :key="social.key"
            class="layout-footer__social-item"
          >
            <ui-button
              :to="social.path"
              target="_blank"
              :color="'transparent'"
              :append-icon="social.icon"
              class="link layout-footer__link"
              :aria-label="social.label"
            ></ui-button>
          </li>
        </ul>
      </nav>
    </div>
    <nav class="list layout-footer__nav">
      <ul class="list layout-footer__contacts">
        <li
          v-for="contact in menuContacts"
          :key="contact.key"
          class="layout-footer__contacts-item"
        >
          <nuxt-link
            :to="contact.path"
            class="link layout-footer__link"
            target="_blank"
            >{{ contact.label }}</nuxt-link
          >
        </li>
      </ul>
      <ul class="list layout-footer__menu">
        <li
          v-for="item in props.menuRules"
          :key="item.key"
          class="layout-footer__menu-item"
        >
          <nuxt-link
            :to="item.to"
            target="_blank"
            class="link layout-footer__link"
          >
            {{ $t(item.label) }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </footer>
</template>
<script lang="ts" setup>
import type { PropType } from "#imports";
import type { MenuType } from "~/types/menu";

const props = defineProps({
  menuSocials: {
    type: Array as PropType<MenuType[]>,
    default: () => [],
  },
  menuContacts: {
    type: Array as PropType<MenuType[]>,
    default: () => [],
  },
  menuRules: {
    type: Array as PropType<MenuType[]>,
    default: () => [],
  },
});
</script>
<style lang="scss">
.layout-footer {
  display: flex;
  justify-content: space-between;
  background-color: $background;
  padding-top: 20px;
  padding-bottom: 20px;
  @include adaptive(600) {
    flex-direction: column;
    gap: 16px;
  }
  &__main {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-right: 100px;
    @include adaptive(800) {
      margin-right: 30px;
    }
    &-description {
      color: $text-primary;
    }
  }
  &__nav {
    display: flex;
    align-items: center;
    gap: 100px;
    @include adaptive(800) {
      gap: 30px;
    }
  }
  &__social {
    display: flex;
    gap: 16px;
  }
  &__link {
    svg {
      margin: 0;
    }
  }
}
</style>
