<template>
  <nav class="breadcrumbs">
    <ol class="breadcrumbs__list">
      <li
        class="breadcrumbs__crumb"
        v-for="(crumb, index) in displayedCrumbs"
        :key="`breadcrumb-${index}`"
      >
        <nuxt-link
          class="breadcrumbs__link"
          :to="crumb.path || ''"
          :class="{ 'breadcrumbs__link--current': !crumb.path }"
          :disabled="!crumb.path"
        >
          {{ $t(crumb.name) }}
        </nuxt-link>
        <span v-if="crumb.path" class="breadcrumbs__circle"></span>
      </li>
    </ol>
  </nav>
</template>
<script lang="ts" setup>
interface Breadcrumbs {
  name: string;
  path: string | null;
}
const props = withDefaults(
  defineProps<{
    crumbs: Breadcrumbs[];
  }>(),
  {
    crumbs: () => [{ name: "Main", path: "/" }],
  }
);

const displayedCrumbs = computed<Breadcrumbs[]>(() => {
  return [{ name: "Main", path: "/" }, ...props.crumbs];
});
</script>
<style lang="scss">
.breadcrumbs {
  margin: 0;

  &__crumb {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  &__list {
    display: flex;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__link {
    @include text-style(600, 19);
    padding: 10px 8px;
    text-decoration: none;
    color: $text-primary;

    @include adaptive(600) {
      padding: 10px 6px 8px;
      @include text-style(400, 19);
      max-width: 200px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    @include adaptive(320) {
      max-width: 150px;
    }

    &:hover {
      color: $primary-hover-text;
    }

    &--current {
      color: $text-primary;

      &:hover {
        color: $text-primary;
      }
    }
  }
  &__circle {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: $primary;
  }
}
</style>
