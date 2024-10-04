<template>
  <button
    type="button"
    class="ui-button-next"
    :class="`ui-button-next--${props.direction}`"
  >
    <ui-svg :name="iconName" class="ui-button-next__icon" />
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    direction?: "right" | "left";
    iconName?: string;
  }>(),
  {
    direction: "right",
    iconName: "arrow",
  }
);
</script>

<style lang="scss" scoped>
.ui-button-next {
  $block: &;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  outline: 0;
  border: 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  width: 50px;
  height: 50px;
  background-color: $primary;
  &:hover {
    background: $primary-hover;
  }

  &:disabled {
    pointer-events: none;
    border-color: transparent;
  }

  &--left {
    #{$block}__icon {
      transform: rotate(180deg);
    }
  }

  &__icon {
    width: 100%;
    height: 100%;
    max-width: 20px;
    max-height: 20px;
    color: $text-light-primary;
  }
}
</style>
