<template>
  <button
    class="inline-flex items-center justify-center shadow rounded-md text-sm font-medium ring-offset-inherit transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    :class="[style, size]"
    :disabled="props.disabled">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  variant: {
    type: String,
    required: true,
    validator: (value: string) =>
      ["primary", "secondary", "destructive", "outline", "ghost"].includes(
        value
      ),
  },
  disabled: {
    type: Boolean,
  },
  size: {
    type: String,
    validator: (value: string) => ["default", "icon"].includes(value),
  },
});

const style = computed(() => {
  switch (props.variant) {
    case "primary":
      return "bg-blue-600 text-white ring-blue-600";
    case "secondary":
      return "bg-slate-100 text-slate-950 ring-slate-600";
    case "destructive":
      return "bg-red-600 text-white ring-red-600";
    case "outline":
      return "bg-inherit text-slate-950 border ring-slate-600 hover:bg-slate-100";
    case "ghost":
      return "bg-inherit text-slate-950 ring-slate-600 hover:bg-slate-100 shadow-none";
  }
});

const size = computed(() => {
  switch (props.size) {
    case "icon":
      return "size-9";
    default:
      return "w-max px-4 py-2";
  }
});
</script>

<style></style>
