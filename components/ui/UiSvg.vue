<template>
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <use :href="symbolId()" :fill="color"></use>
  </svg>
</template>

<script lang="ts" setup>
const props = defineProps({
  prefix: {
    type: String,
    default: "icon",
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#333",
  },
});

const symbolId = () => `#${props.prefix}-${props.name}`;
</script>
