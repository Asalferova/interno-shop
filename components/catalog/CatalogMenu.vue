<template>
  <div class="catalog-menu" ref="filter">
    <ui-button
      v-if="!isSmallScreen"
      :prepend-icon="isOpen ? 'cross' : 'catalog'"
      :color="'primary'"
      class="catalog-menu__btn"
      :aria-label="$t('catalog')"
      @click="toggleCatalog"
    >
      <span class="catalog-menu__text">{{ $t("catalog") }}</span>
    </ui-button>
    <ui-button
      v-else
      @click="toggleCatalog"
      :append-icon="'catalog'"
      :color="'transparent'"
      :aria-label="$t('catalog')"
      class="catalog-menu__link"
    ></ui-button>
    <transition name="dropdown">
      <div class="catalog-menu-content" v-if="isOpen">
        <div class="catalog-menu-content__close" v-if="isSmallScreen">
          <ui-svg
            name="close"
            @click="toggleCatalog"
            class="catalog-menu-content__close-icon"
          />
        </div>
        <nav :aria-label="$t('catalog')">
          <ul class="list catalog-menu-content__categories">
            <li
              v-for="category in CategoryOptions"
              :key="category.label"
              class="catalog-menu-content__category"
              @click="toggleCategory(category.label)"
            >
              <span class="catalog-menu-content__category-name">{{
                $t(`categories.${category.label}`)
              }}</span>
              <nav class="catalog-menu-content__nav">
                <ul
                  class="list catalog-menu-content__category-sub"
                  :class="{
                    active: activeCategory === category.label || isLargeScreen,
                  }"
                  @click.stop
                >
                  <li
                    v-for="subcategory in category.subcategories"
                    :key="subcategory.label"
                    class="list catalog-menu-content__category-sub-name"
                  >
                    <ui-button
                      class="list catalog-menu-content__category-btn"
                      :color="'transparent'"
                      :to="{
                        name: 'catalog',
                        query: {
                          subcategories: subcategory.label,
                        },
                      }"
                      target="_blank"
                      >{{ $t(`subCategories.${subcategory.label}`) }}
                    </ui-button>
                  </li>
                </ul>
              </nav>
            </li>
          </ul>
        </nav>
      </div>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { useMediaQuery } from "@vueuse/core";
import { CategoryOptions } from "~/helpers/filterOptions";
import { onClickOutside } from "@vueuse/core";

const isSmallScreen = useMediaQuery("(max-width:1024px)");
const isLargeScreen = useMediaQuery("(min-width:768px)");
const activeCategory = ref<string | null>(null);

const toggleCategory = (categoryId: string) => {
  activeCategory.value =
    activeCategory.value === categoryId ? null : categoryId;
};
const isOpen = ref(false);
const filter = ref(null);

const toggleCatalog = () => {
  isOpen.value = !isOpen.value;
};

onClickOutside(filter, () => {
  closeFilter();
});

const closeFilter = () => {
  isOpen.value = false;
};
</script>
<style lang="scss" scoped>
.catalog-menu {
  &__link {
    padding-top: 28px;
    padding-bottom: 28px;
    max-width: none;
    width: 100%;
  }

  &__btn {
    @include adaptive(1220) {
      padding-right: 0;
    }
  }
  &__text {
    @include adaptive(1220) {
      display: none;
    }
  }
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

    @include adaptive(1024) {
      height: calc(100vh - 158px);
      top: auto;
      bottom: 82px;
      width: calc(100% - 104px);
    }
    @include adaptive(767) {
      height: calc(100vh - 82px);
      width: 100%;
      border: none;
      border-radius: 0;
    }

    &__categories {
      display: flex;
      flex-direction: column;
      gap: 26px;
      text-align: center;
    }

    &__nav {
      width: 100%;
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

      @include adaptive(767) {
        flex-direction: column;
        gap: 26px;
      }
      &-btn {
        @include adaptive(767) {
          font-size: 19px;
        }
      }

      &-sub {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 40px;
        font-size: 18px;
        width: 100%;

        &:last-child {
          margin-bottom: 26px;
        }

        @include adaptive(767) {
          flex-direction: column;
          align-items: center;
          opacity: 0;
          height: 0;
          transition: opacity 0s ease-out;
          text-align: center;
        }

        &-name {
          width: 120px;

          @include adaptive(767) {
            width: fit-content;
            text-align: center;
          }
        }
      }

      &-name {
        pointer-events: none;
        font-weight: bold;
        min-width: 200px;
        max-width: 200px;
        font-size: 20px;

        @include adaptive(767) {
          min-width: none;
          max-width: none;
        }
      }
    }

    &__close {
      position: relative;
      opacity: 0;
      height: 0;
      margin-bottom: 26px;
      @include adaptive(767) {
        opacity: 1;
        padding: 26px;
        height: fit-content;
      }
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

    & :deep(.ui-button) {
      text-align: start;

      @include adaptive(767) {
        text-align: center;
      }
    }
  }
}
.active {
  opacity: 1;
  height: fit-content;
  transition: opacity 1s ease-out;
}
</style>
