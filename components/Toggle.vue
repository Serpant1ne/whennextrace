<template>
  <button
    class="py-2 px-4 border rounded-lg font-medium text-gray-500 border-gray-500 w-fit hover:border-red-500 hover:text-red-500 transition-all data-[state]:bg-red-500 active:text-white active:border-red-500">
    Formula 1
  </button>
</template>

<script lang="ts" setup>
const active = ref(false);

const currentStyle = computed(() => {
  return active ? "text-gray-50" : "";
});
</script>

<style></style>
