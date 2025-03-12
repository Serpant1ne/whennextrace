<template>
  <button
    class="items-center border border-gray-300 rounded text-sm transition-all flex pl-3 font-medium gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-300"
    :class="currentMainStyle"
    @click="series.selected = !series.selected">
    {{ series.name }}
    <div
      class="h-full w-6 items-center flex py-2 rounded-r-sm transition-all bg-opacity-50"
      :class="currentIconStyle">
      <X class="size-4 mx-auto" v-if="!series.selected" />
      <Check class="size-4 mx-auto" v-if="series.selected" />
    </div>
  </button>
</template>

<script lang="ts" setup>
import type { SeriesModified } from "@/types/supabase";
import { X, Check } from "lucide-vue-next";

const series = defineModel<SeriesModified>({ required: true });

const currentMainStyle = computed(() => {
  return series.value.selected
    ? "bg-green-100 border-green-300 hover:bg-green-200"
    : "bg-transparent hover:bg-gray-100";
});

const currentIconStyle = computed(() => {
  return series.value.selected ? "bg-green-300" : "bg-gray-300 ";
});
</script>

<style></style>
