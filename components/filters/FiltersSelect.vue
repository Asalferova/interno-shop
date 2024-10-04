<template>
  <div
    ref="filter"
    class="filters-select"
    :class="`filters-select--${isOpen ? 'opened' : 'closed'}`"
    :tabindex="tabindex"
    itemprop="additionalType"
  >
    <div class="filters-select__selected" @click="toggleFilter">
      {{ categoryText }}

      <ui-svg
        v-if="!props.selectedOption"
        name="arrow"
        class="filters-select__icon"
      />
      <ui-svg
        v-if="props.selectedOption"
        name="cross"
        class="filters-select__icon--close"
        @click.stop="emit('close')"
      />
    </div>
    <transition name="dropdown">
      <nav v-if="isOpen" class="filters-select__options scrollable-component">
        <li
          v-for="(option, i) of options"
          :key="`filters-select-option-${i}`"
          class="filters-select__option"
          @click="onOptionSelect(option.label)"
        >
          {{ $t(`subCategories.${option.label}`) }}
			</li>
      </nav>
    </transition>
    <div
      v-if="!props.hasInteractiveLabel && props.selectedOption"
      class="filters-select__marker"
    />
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from "#imports";
import { useVModel, onClickOutside } from "@vueuse/core";
import type { FiltersSubCategoryOption } from "~/types/filterOptions";

const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    selectedOption: string;
    options: FiltersSubCategoryOption[];
    defaultLabel: string;
    tabindex?: number;
    hasInteractiveLabel?: boolean;
  }>(),
  {
    selectedOption: "",
    options: () => [],
    defaultLabel: "all",
    tabindex: 0,
    hasInteractiveLabel: true,
  }
);

const emit = defineEmits<{
  "update:selectedOption": [selectedOption: string];
  close: [];
}>();

const model = useVModel(props, "selectedOption", emit);

const isOpen = ref(false);
const filter = ref(null);

const categoryText = computed(() => {
  let result = "";
  if (props.selectedOption) {
    result = `${t(`categories.${props.defaultLabel}`)}: ${t(
      `subCategories.${props.selectedOption}`
    )}`;
  } else {
    result = `${t(`categories.${props.defaultLabel}`)}`;
  }
  return result;
});

onClickOutside(filter, () => {
  closeFilter();
});

const closeFilter = () => {
  isOpen.value = false;
};

const toggleFilter = () => {
  isOpen.value = !isOpen.value;
};

const onOptionSelect = (option: string) => {
  model.value = option;
  closeFilter();
};
</script>

<style lang="scss" scoped>
.filters-select {
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
    line-height: 22px;
    letter-spacing: 0.24px;
    cursor: pointer;
    transition: background 0.2s ease;
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
    &--close {
      width: 18px;
      height: 18px;
      margin-left: 20px;
    }
  }

  &__options {
    overflow-x: hidden;
    overflow-y: scroll;
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    border-radius: 13px;
    z-index: 10;
    max-height: 165px;
    background: $background;
    border: 2px solid $primary;
    box-shadow: $shadow;
    color: $text-primary;
    @include adaptive(1024) {
      position: static;
      margin-top: 15px;
    }
  }

  &__option {
    padding: 8px 24px;
    margin-bottom: 12px;
    display: flex;
    gap: 12px;
    align-items: center;
    line-height: 17px;
    letter-spacing: 0.24px;
    cursor: pointer;
    transition: background 0.2s ease;

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      color: $primary-hover-text;
    }
  }

  &__marker {
    position: absolute;
    top: -2px;
    right: -1px;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    border: 2px solid $background;
    background-color: $primary;
  }
}

.scrollable-component::-webkit-scrollbar {
  display: block !important;
}
</style>
