<template>
  <div class="ui-language-switcher">
    <span class="ui-language-switcher__text">{{ $t("Language") }}</span>
    <div class="ui-language-switcher__btns">
      <ui-button
        v-for="lang in languageNames"
        :key="lang"
        @click="switchLocale(lang)"
        :color="'transparent'"
        :class="{ active: locale === lang }"
        >{{ $t(lang) }}
      </ui-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const emit = defineEmits(["localeChanged"]);

const languageNames = ["ru", "en"] as const;
type Language = (typeof languageNames)[number];

const switchLocale = (newLocale: Language) => {
  locale.value = newLocale;
  emit("localeChanged", newLocale);
};
</script>

<style lang="scss">
.ui-language-switcher {
  padding: 10px;
  &__text {
    display: inline-block;
    color: $text-primary;
    font-weight: 600;
    margin-bottom: 10px;
  }

  &__btns {
    display: flex;
    gap: 30px;
  }
  .active {
    color: $primary-hover;
  }
}
</style>
