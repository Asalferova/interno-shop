<template>
  <div
    ref="filter"
    class="filters-sort-menu"
    :class="`filters-sort-menu--${isOpen ? 'opened' : 'closed'}`"
    :tabindex="tabindex"
    itemprop="additionalType"
		role="radiogroup"
  >
    <div class="filters-sort-menu__selected" @click="toggleSort">
      <div class="filters-sort-menu__label">
        <span class="filters-sort-menu__label-default">{{
          $t(`sorting.${selectedSort}`)
        }}</span>
      </div>
      <ui-svg name="arrow" class="filters-sort-menu__icon" />
    </div>
    <transition name="dropdown">
      <nav v-if="isOpen" class="filters-sort-menu__options">
        <li
          class="filters-sort-menu__option"
          v-for="(sort, i) of sorts"
          :key="`filters-sort-menu-option-${i}`"
          @click="onItemChange(sort)"
        >
          <span
            class="filters-sort-menu__option--decor"
            :class="{
              'filters-sort-menu__option--decor-selected':
                selectedSort === sort,
            }"
          ></span>
          <span class="filters-sort-menu__option--text">{{
            $t(`sorting.${sort}`)
          }}</span>
        </li>
      </nav>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside, useVModel } from "@vueuse/core";
import { Sorting } from "~/helpers/constants";

const props = withDefaults(
  defineProps<{
    sorts: Sorting[];
    tabindex: number;
    selectedSort: string;
  }>(),
  {
    sorts: () => [] as Sorting[],
    tabindex: 0,
    selectedSort: "NEW",
  }
);

const emit = defineEmits<{
  "update:selectedSort": [selectedSort: string];
}>();

const model = useVModel(props, "selectedSort", emit);

const isOpen = ref(false);
const filter = ref(null);

onClickOutside(filter, () => {
  closeFilter();
});

const closeFilter = () => {
  isOpen.value = false;
};

const toggleSort = () => {
  isOpen.value = !isOpen.value;
};

const onItemChange = (sort: string) => {
  model.value = sort;
  closeFilter();
};
</script>

<style lang="scss" scoped>
.filters-sort-menu {
  $filter: &;
  position: relative;
  user-select: none;
  font-size: 17px;

  &--opened {
    & #{$filter}__icon {
      transform: rotate(270deg);
    }
  }

  &__selected {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 24px;
    background: $primary;
    border-radius: 13px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0.24px;
    cursor: pointer;
    transition: background 0.2s ease;
    white-space: nowrap;
    color: $white;

    &:hover {
      background: $primary-hover;
    }
  }

  &__icon {
    width: 18px;
    height: 18px;
    margin-left: 20px;
    transform: rotate(90deg);
    transition: transform 0.2s ease;
  }

  &__options {
    overflow: hidden;
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    padding: 8px 24px;
    border-radius: 13px;
    background: $background;
    border: 2px solid $primary;
    box-shadow: $shadow;
    z-index: 10;
    color: $text-primary;
    @include adaptive(1024) {
      position: static;
      margin-top: 15px;
    }
  }

  &__option {
    margin-bottom: 12px;
    display: flex;
    gap: 12px;
    align-items: center;
    white-space: nowrap;

    &:last-child {
      margin-bottom: 0;
    }
    &:hover {
      color: $primary-hover-text;
    }

    &--decor {
      border: 2px solid $primary;
      background: $background;
      border-radius: 50%;
      display: block;
      height: 22px;
      width: 22px;
      position: relative;

      &-selected {
        &:after {
          background: $primary;
          border-radius: 50%;
          content: "";
          height: 10px;
          left: 4px;
          position: absolute;
          top: 4px;
          width: 10px;
        }
      }
    }
  }
}
</style>
