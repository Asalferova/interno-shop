<template>
  <vue-final-modal
    v-model="show"
    v-bind="options"
    content-transition="vfm-fade"
    :content-class="`centered-modal__content centered-modal__content_bg_${props.bgColor}`"
    class="centered-modal"
  >
    <ui-svg name="close" class="centered-modal__close" @click="show = false" />
    <h4 v-if="$slots.title" class="centered-modal__title">
      <slot name="title" />
    </h4>

    <div class="centered-modal__inner">
      <slot />
    </div>
  </vue-final-modal>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import { VueFinalModal, type UseModalOptions } from "vue-final-modal";

export interface Props {
  modelValue: boolean;
  options?: Partial<UseModalOptions<any>>;
  bgColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  options: () => ({} as Partial<UseModalOptions<any>>),
  bgColor: "white",
});
const emit = defineEmits<{
  (e: "update:modelValue", modelValue: boolean): void;
}>();
const show = useVModel(props, "modelValue", emit);
</script>

<style lang="scss">
.centered-modal {
  @include in-center;
  &__content {
    display: flex;
    flex-direction: column;
    position: relative;
    min-width: 505px;
    padding: 26px;
    border-radius: 16px;
    overflow-y: scroll;
    max-height: 100svh;
    border: 2px solid $primary;
    @include adaptive(600) {
      min-width: calc(100% - 20px);
      padding: 10px;
    }
    @each $classBtn, $bgColor in (white, $background),(black, $background) {
      &#{"_bg_" + $classBtn} {
        background: $bgColor;
      }
    }
  }

  &__inner {
    @include adaptive(550) {
      display: flex;
      flex-grow: 1;
    }
  }

  &__title {
    margin: 0 0 26px;
    color: $text-primary;
    @include adaptive(600) {
      margin: 26px 0;
      text-align: center;
    }
  }

  &__close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    color: $text-primary;
  }
}
</style>
