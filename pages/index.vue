<template>
  <transition>
    <div class="flex gap-2 flex-col" v-if="series.length > 0">
      <p class="mt-2">1. Choose calendars to download</p>
      <div class="flex gap-2">
        <Toggle
          v-model="series[i]"
          v-for="(item, i) in series"
          :key="item.id" />
      </div>
      <p class="mt-2">2. Click "Get Calendar"</p>
      <Button
        variant="primary"
        class="flex gap-2"
        @click="getCalendarFile"
        :disabled="!hasSelectedCalendars">
        Get calendar <CalendarArrowDown class="size-4" />
      </Button>
      <p class="mt-2">3. Import to the calendar app of your choice. Enjoy!</p>

      <!-- Status message for user feedback -->
      <div
        v-if="statusMessage"
        class="mt-2 p-2 rounded text-center"
        :class="statusClass">
        {{ statusMessage }}
      </div>
    </div>
  </transition>

  <div class="h-48 grid" v-if="series.length <= 0">
    <p class="place-self-center">Loading data, please wait...</p>
  </div>

  <a
    :href="fileNameUrl"
    :download="getDownloadFileName()"
    ref="downloadLink"
    class="hidden"></a>
</template>

<script lang="ts" setup>
import type { SeriesModified } from "@/types/supabase";
import { CalendarArrowDown } from "lucide-vue-next";

const series = ref<SeriesModified[]>([]);
const downloadLink = ref(null);
const fileNameUrl = ref("");
const statusMessage = ref("");
const statusType = ref("");
const blobUrls = ref<string[]>([]);

const { data } = await useFetch("/api/getSeries");
if (data.value != null) {
  series.value = data.value;
}

const hasSelectedCalendars = computed(() => {
  return series.value.some((item) => item.selected);
});

const statusClass = computed(() => {
  switch (statusType.value) {
    case "success":
      return "bg-green-100 text-green-800";
    case "error":
      return "bg-red-100 text-red-800";
    default:
      return "bg-blue-100 text-blue-800";
  }
});

async function getCalendarFile() {
  statusMessage.value = "";

  let selectedIds: Number[] = [];
  series.value.forEach((item) => {
    if (item.selected) {
      selectedIds.push(item.id);
    }
  });

  console.log(selectedIds);

  if (selectedIds.length === 0) {
    showStatus("Please select at least one calendar", "error");
    return;
  }

  try {
    showStatus("Generating calendar file...", "info");

    const { data, error } = await useFetch("/api/createCalendarFile", {
      method: "post",
      body: {
        ids: selectedIds,
      },
    });

    if (error.value) {
      showStatus("Error generating calendar file", "error");
      console.error(error.value);
      return;
    }

    if (data.value == null) {
      showStatus("No data received", "error");
      return;
    }

    console.log(data.value);

    // Create blob and URL for download
    const blob = new Blob([data.value], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    fileNameUrl.value = url;
    blobUrls.value.push(url);

    // Trigger download
    setTimeout(() => {
      downloadLink.value.click();
      showStatus("Calendar downloaded successfully!", "success");
    }, 100);
  } catch (err) {
    console.error("Error in getCalendarFile:", err);
    showStatus("An unexpected error occurred", "error");
  }
}

// Helper function to display status messages
function showStatus(message: string, type: string = "info") {
  statusMessage.value = message;
  statusType.value = type;

  // Clear success messages after delay
  if (type === "success" || type === "info") {
    setTimeout(() => {
      if (statusMessage.value === message) {
        statusMessage.value = "";
      }
    }, 3000);
  }
}

// Generate download filename based on selected calendars
function getDownloadFileName() {
  const selectedCount = series.value.filter((item) => item.selected).length;
  return selectedCount === 1
    ? "calendar-event.ics"
    : `calendar-events-${selectedCount}.ics`;
}

// Clean up blob URLs when component is unmounted
onBeforeUnmount(() => {
  blobUrls.value.forEach((url) => {
    URL.revokeObjectURL(url);
  });
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

.hidden {
  display: none;
}
</style>
