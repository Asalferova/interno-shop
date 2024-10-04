<template>
  <div class="form-input-password">
    <ui-input
      v-model="model"
      :type="currentType"
      border-radius="big"
      :placeholder="placeholder"
      class="auth-modal__input auth-modal__input--password"
      :icon-name="currentIcon"
      icon-position="right"
      :error="error"
      :show-error-text="showErrorText"
      @icon-click="showPassword"
      @input="emit('input')"
    />
  </div>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";

const props = withDefaults(
  defineProps<{
    modelValue: string;
    required?: boolean;
    placeholder?: string;
    error?: string | boolean;
    showErrorText?: boolean;
  }>(),
  {
    modelValue: "",
    required: false,
    placeholder: "",
    error: false,
    showErrorText: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  input: [];
}>();

const model = useVModel(props, "modelValue", emit);
const currentType = ref<"password" | "text">("password");
const currentIcon = ref<"hide" | "eye">("hide");

const showPassword = () => {
  currentType.value = currentType.value === "password" ? "text" : "password";
  currentIcon.value = currentIcon.value === "hide" ? "eye" : "hide";
};
</script>

<style lang="scss" scoped>
.form-input-password {
  & :deep(.ui-input__icon) {
    cursor: pointer;
  }
}
</style>
