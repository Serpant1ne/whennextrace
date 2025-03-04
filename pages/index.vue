<template>
  <div class="h-fit max-w-lg place-self-center flex flex-col">
    <h1 class="text-2xl font-bold text-center mb-2">WhenNextRace</h1>
    <p class="mb-2">
      I hate making calendar events for races each year manually. This service
      can combine multiple racing series in the 2025 season and give it as a
      events for your calendar. Choose your favorite racing series and click
      export below. After that import the file to the calendar of your choice.
      Enjoy! If there isn't a racing series that you wanted - I didn't make a
      database for that yet.
    </p>
    <p class="mb-2">
      If you want to contribute - check
      <External href="#">this</External>. If you found a problem / want to give
      an idea - go <External href="#">here</External>. Enjoy!
    </p>
    <div class="grid grid-cols-3"><Toggle /></div>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
type gp = {
  id: Number;
  name?: string;
  start?: Date;
  finish?: Date;
  round?: number;
};

import { supabase } from "../utils/supabase";
const race = ref([]);

async function getGP() {
  const { data } = await supabase.from("f1_gp").select();
  race.value = data;
}

onMounted(() => {
  getGP();
});
</script>

<style></style>
