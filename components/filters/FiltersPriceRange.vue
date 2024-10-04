<template>
  <div
    ref="filter"
    class="filters-price-range"
    :class="`filters-price-range--${isOpen ? 'opened' : 'closed'}`"
    :tabindex="tabindex"
    itemprop="additionalType"
  >
    <div class="filters-price-range__selected" @click="toggleFilter">
      <div class="filters-price-range__label">
        <span class="filters-price-range__label-default"
          >{{ $t(props.defaultLabel) }}{{ priceText }}</span
        >
      </div>
      <ui-svg
        v-if="!props.fromValue && !props.toValue"
        name="arrow"
        class="filters-price-range__icon"
      />
      <ui-svg
        v-if="props.fromValue || props.toValue"
        name="cross"
        class="filters-price-range__icon--close"
        @click.stop="emit('close')"
      />
    </div>
    <transition name="dropdown">
      <div v-if="isOpen" class="filters-price-range__range">
        <div class="filters-price-range__range-wrapper">
          <div>
            <div class="label">
              {{ $t("from") }}
            </div>
            <div class="filters-price-range__range-container">
              <ui-input
                v-model="fromModel"
                :size="'small'"
                :only-number="true"
                placeholder="0"
                min="0"
                class="filters-price-range__range-input"
              >
              </ui-input>
            </div>
          </div>
          <div>
            <div class="label">
              {{ $t("to") }}
            </div>
            <div class="filters-price-range__range-container">
              <ui-input
                v-model="toModel"
                size="small"
                :only-number="true"
                min="0"
                placeholder="0"
                class="filters-price-range__range-input"
              />
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div
      v-if="!props.hasInteractiveLabel && (props.fromValue || props.toValue)"
      class="filters-price-range__marker"
    />
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from "#imports";
import { onClickOutside, useVModel } from "@vueuse/core";
import getPriceFormat from "~/utils/priceFormat";

const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    tabindex: number;
    defaultLabel: string;
    fromValue: string;
    toValue: string;
    hasInteractiveLabel?: boolean;
  }>(),
  {
    tabindex: 0,
    defaultLabel: "",
    fromValue: "",
    toValue: "",
    hasInteractiveLabel: true,
  }
);

const emit = defineEmits<{
  "update:fromValue": [price: string];
  "update:toValue": [price: string];
  close: [];
}>();

const fromModel = useVModel(props, "fromValue", emit);
const toModel = useVModel(props, "toValue", emit);

const isOpen = ref(false);
const filter = ref(null);

const priceText = computed(() => {
  let result = "";
  if (props.fromValue && props.toValue) {
    result = `: ${getPriceFormat(
      +props.fromValue,
      "ru-RU",
      "RUB"
    )} — ${getPriceFormat(+props.toValue, "ru-RU", "RUB")}`;
  } else if (props.fromValue) {
    result = `: ${t("from")} ${getPriceFormat(
      +props.fromValue,
      "ru-RU",
      "RUB"
    )}`;
  } else if (props.toValue) {
    result = `: ${t("to")} ${getPriceFormat(+props.toValue, "ru-RU", "RUB")}`;
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
</script>
<style lang="scss" scoped>
.filters-price-range {
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
    white-space: nowrap;
    @include adaptive(1024) {
      white-space: normal;
    }
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

  &__range {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    padding: 8px 24px;
    border-radius: 13px;
    box-shadow: $shadow;
    z-index: 10;
    background: $background;
    border: 2px solid $primary;
    color: $text-primary;
    @include adaptive(1024) {
      position: static;
      margin-top: 15px;
    }

    &-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    &-input {
      text-transform: capitalize;
      font-size: 17px;
      height: 40px;
      width: 80px;
      @include adaptive(1024) {
        width: fit-content;
      }

      & :deep(.ui-input__wrapper) {
        overflow: hidden;
        border: 2px solid $primary;
        border-radius: 13px;
        line-height: 1.2;
      }
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
</style>
