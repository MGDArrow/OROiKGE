<template>
  <div class="ui-input">
    <label>
      <p>{{ label }}</p>
      <input
        :type="typeof modelValue === 'number' ? 'number' : 'text'"
        v-model="modelValue"
        :placeholder="placeholder"
        :required
        :min
        :max
      />
    </label>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    label?: string;
    placeholder?: string;
    required?: boolean;
    min?: number;
    max?: number;
  }

  const modelValue = defineModel<string | number>({ required: true });

  const props = defineProps<Props>();
</script>

<style scoped lang="scss">
  .ui-input {
    flex: 1;
    width: 100%;
    min-width: 300px;
    & p {
      width: 100%;
      margin: 0;
      font-weight: 500;
      text-indent: 0;
    }
    & input {
      width: 100%;
      padding: 0 10px;
      font-size: 1.1em;
      border: 4px solid var(--accent);
    }
  }
</style>
