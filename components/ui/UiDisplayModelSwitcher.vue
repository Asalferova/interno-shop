<template>
  <div class="ui-display-model-switcher" aria-hidden="true">
    <ui-button
      :append-icon="'cards-small'"
      :color="'transparent'"
      :class="[
        'ui-display-model-switcher__btn',
        { active: props.cardsSize === 'medium' },
      ]"
      @click="emit('change-display-mode', 'medium')"
    ></ui-button>
    <ui-button
      :append-icon="'cards-medium'"
      :color="'transparent'"
      :class="[
        'ui-display-model-switcher__btn',
        { active: props.cardsSize === 'small' },
      ]"
      @click="emit('change-display-mode', 'small')"
    ></ui-button>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    cardsSize?: "medium" | "small";
  }>(),
  {
    cardsSize: "small",
  }
);

const emit = defineEmits<{
  (e: "change-display-mode", mode: "small" | "medium"): void;
}>();
</script>

<style lang="scss" scopes>
.ui-display-model-switcher {
  display: flex;

  &__btn {
    svg {
      width: 38px;
      height: 38px;
      margin-left: 10px;
      use {
        color: rgb(90, 90, 90);
        transition: all 0.3s;
      }
    }

    &:hover {
      svg {
        use {
          color: $primary;
        }
      }
    }
  }
}

.active {
  svg {
    use {
      color: $primary;
    }
  }
}
</style>
