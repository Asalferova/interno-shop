<template>
  <vue-final-modal
    class="catalog-modal"
    content-class="catalog-modal__content"
    teleport-to="body"
    content-transition="vfm-fade"
    :hide-overlay="true"
    :background="interactive"
    @update:model-value="(val) => emit('update:modelValue', val)"
  >
    <div class="catalog-modal__close" @click="emit('update:modelValue', false)">
      <ui-svg name="close" class="catalog-modal__close-icon" />
    </div>
    <catalog-menu></catalog-menu>
  </vue-final-modal>
</template>
<script lang="ts" setup>
import { VueFinalModal } from "vue-final-modal";

const emit = defineEmits<{
  (e: "update:modelValue", modelValue: boolean): void;
}>();
</script>
<style lang="scss">
.catalog-modal {
  display: flex;
  justify-content: center;
  padding-top: 138px;

  @include adaptive(1024) {
    padding-top: 97px;
  }

  @include adaptive(767) {
    padding-top: 0;
    padding-bottom: 82px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 26px;
    max-width: 1336px;
    margin: 0 52px;
    position: relative;
    width: 100%;
    height: fit-content;
    padding: 26px;
    border-radius: 16px;
    overflow-y: scroll;
    border: 2px solid $primary;
    background: $background;
    color: $text-primary;

    @include adaptive(767) {
      min-width: 100%;
      height: 100%;
      border-radius: 0;
      border: none;
      text-align: center;
    }
  }
  &__close {
    position: relative;
    opacity: 0;
    height: 0;
    @include adaptive(767) {
      opacity: 1;
      padding: 26px;
      height: fit-content;
    }
    &-icon {
      @include adaptive(767) {
        position: absolute;
        top: 15px;
        right: 0;
        width: 24px;
        height: 24px;
        cursor: pointer;
        color: $text-primary;
      }
    }
  }
}
</style>
