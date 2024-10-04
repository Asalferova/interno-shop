<template>
  <component
    :is="props.href ? 'a' : props.to ? NuxtLink : 'button'"
    class="ui-button"
    :class="[
      `ui-button--${props.color}`,
      `ui-button--${props.size}`,
      { 'ui-button--icon': !!props.prependIcon || !!props.appendIcon },
    ]"
    :disabled="disabled"
    v-bind="bindAttributes()"
    @click="emit('click', $event)"
  >
    <ui-svg
      v-if="prependIcon"
      :name="prependIcon"
      class="ui-button__icon ui-button__icon--left"
    />
    <slot />
    <ui-svg
      v-if="appendIcon"
      :name="appendIcon"
      class="ui-button__icon ui-button__icon--right"
    />
  </component>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import { resolveComponent } from "#imports";

const NuxtLink = resolveComponent("NuxtLink");
const emit = defineEmits(["click"]);

const props = defineProps({
  prependIcon: {
    type: String,
    default: "",
  },
  appendIcon: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String as PropType<"secondary" | "primary" | "transparent">,
    default: "",
  },
  size: {
    type: String as PropType<"big" | "small" | "medium">,
    default: "",
  },
  icon: {
    type: Boolean,
    default: false,
  },
  to: {
    type: [String, Object],
    default: "",
  },
  href: {
    type: String,
    default: "",
  },
});

const bindAttributes = () => {
  return props.to
    ? {
        to: props.to,
      }
    : props.href
    ? {
        href: props.href,
        target: "_blank",
      }
    : {};
};
</script>

<style lang="scss">
.ui-button {
  @include btn();
  $block: &;

  &--icon {
    padding-left: 20px;
    padding-right: 20px;
  }

  &__icon {
    width: 24px;
    height: 24px;
    fill: currentColor;
    stroke: currentColor;
    transition: all 0.3s;
    &--left {
      margin-right: 20px;
    }

    &--right {
      margin-left: 20px;
    }
  }
  &--transparent {
    padding: 0;
    height: fit-content;
    svg {
      stroke: transparent;
      margin-right: 0;
    }
  }

  @each $classBtn, $color, $colorBorder, $colorText, $hoverColor,
    $hoverColorText,
    $activeColor
      in (
        primary,
        $primary,
        transparent,
        $text-light-primary,
        $primary-hover,
        $text-light-primary,
        $primary-hover
      ),
    (
      transparent,
      transparent,
      transparent,
      $text-primary,
      transparent,
      $primary-hover-text,
      transparent
    )
  {
    &#{"--" + $classBtn} {
      background: $color;
      color: $colorText;
      border: 0.4px solid $colorBorder;

      #{$block}__icon {
        color: $colorText;
        fill: $colorText;
      }
      #{$block}__icon use {
        fill: $colorText;
      }

      &:hover {
        background: $hoverColor;
        color: $hoverColorText;

        #{$block}__icon {
          color: $hoverColorText;
        }
      }

      &:active {
        background: $activeColor;
        color: $hoverColorText;
        outline: none;
      }
    }
  }

  @each $classBtn, $padding, $fontSize in (medium, 16px 32px),
    (small, 10px 22px 9px)
  {
    &#{"--" + $classBtn} {
      padding: $padding;
    }
  }
}
</style>
