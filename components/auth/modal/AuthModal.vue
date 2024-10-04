<template>
  <centered-modal
    class="auth-modal"
    @update:model-value="(val) => emit('update:modelValue', val)"
  >
    <template #title>
      <transition name="fade" mode="out-in">
        <span v-if="currentAuthState === AuthState.SIGN_IN">
          {{ $t("button.signIn") }}
        </span>
        <span v-else-if="currentAuthState === AuthState.SIGN_UP">
          {{ $t("Join") }}
        </span>
        <ui-svg v-else name="verified" class="auth-modal__verified-icon" />
      </transition>
    </template>
    <div v-if="authError" class="auth-modal__error text-medium-15-19">
      {{ authError }}
    </div>
    <transition name="fade" mode="out-in">
      <component
        :is="currentAuthForm"
        @change-auth-state="changeAuthForm"
        @error-message="setErrorMessage"
        @close-modal="emit('update:modelValue', false)"
        @on-auth="doAfterAuth"
      />
    </transition>
  </centered-modal>
</template>

<script lang="ts" setup>
import CenteredModal from "~/components/modals/CenteredModal.vue";
import AuthSignUpForm from "~/components/auth/AuthSignUpForm.vue";
import AuthSignInForm from "~/components/auth/AuthSignInForm.vue";
import { AuthState } from "~/types/auth";

const props = withDefaults(
  defineProps<{
    onAuth?: null | (() => void);
  }>(),
  {
    onAuth: null,
  }
);

const doAfterAuth = () => {
  if (props.onAuth) {
    props.onAuth();
  }
};

const emit = defineEmits<{
  (e: "update:modelValue", modelValue: boolean): void;
}>();

const authStates = new Map<AuthState, Component>();
authStates.set(AuthState.SIGN_IN, AuthSignInForm);
authStates.set(AuthState.SIGN_UP, AuthSignUpForm);

const currentAuthState = ref<AuthState>(AuthState.SIGN_IN);
const currentAuthForm = shallowRef(authStates.get(currentAuthState.value));

const changeAuthForm = (state: AuthState) => {
  setErrorMessage("");
  currentAuthState.value = state;
  currentAuthForm.value = authStates.get(currentAuthState.value);
};

const authError = ref("");

const setErrorMessage = (error: string) => {
  authError.value = error;
};
</script>
<style lang="scss">
.auth-modal {
  &__error {
    padding: 10px;
    margin-bottom: 16px;
    color: $white;
    border-radius: 8px;
  }
}
</style>

