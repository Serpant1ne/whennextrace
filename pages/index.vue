<template>
  <transition>
    <div class="flex gap-2 flex-col" v-if="series.length > 0">
      <p class="mt-2">1. Choose calendars to download</p>
      <div class="flex gap-2">
        <Toggle v-model="series[i]" v-for="(item, i) in series" />
      </div>
      <p class="mt-2">2. Click "Get Calendar"</p>
      <Button variant="primary" class="flex gap-2">
        Get calendar <ArrowUpFromLine class="size-4" />
      </Button>
      <p class="mt-2">3. Import to the calendar app of your choice. Enjoy!</p>
    </div>
  </transition>
  <div class="h-48 grid" v-if="series.length <= 0">
    <p class="place-self-center">Loading data, please wait...</p>
  </div>
</template>

<script lang="ts" setup>
import type { SeriesModified } from "@/types/supabase";
import { supabase } from "../utils/supabase";
import { ArrowUpFromLine } from "lucide-vue-next";

const series = ref<SeriesModified[]>([]);

async function getSeries() {
  const { data, error } = await supabase.from("series").select();
  console.log(data);
  if (error) {
    throw error;
  }
  data.forEach((item) => (item.selected = false));
  series.value = data;
}

onMounted(() => {
  getSeries();
});
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
