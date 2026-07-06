<template>
  <div class="ui-input">
    <label>
      <p>{{ label }}</p>
      <select
        v-model="modelValue"
        :required="required"
        @change="emit('change')"
      >
        <!-- Пустой/плейсхолдерный option, если нужен -->
        <option v-if="placeholder" value="" disabled hidden>
          {{ placeholder }}
        </option>
        <option
          v-for="option in options"
          :key="option.value || 0"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </label>
  </div>
</template>

<script setup lang="ts">
  export interface SelectOption {
    value: string | number | null;
    label: string;
  }

  interface Props {
    label?: string;
    placeholder?: string; // текст для первого пустого элемента
    required?: boolean;
    options: SelectOption[];
  }

  const emit = defineEmits<{
    change: [];
  }>();

  const modelValue = defineModel<string | number | null>({ required: true });
  const props = defineProps<Props>();
</script>

<style scoped lang="scss">
  .ui-input {
    flex: 1;
    width: 100%;
    min-width: 300px;
    label {
      position: relative;
      display: block;
    }
    p {
      width: 100%;
      margin: 0;
      font-weight: 500;
      text-indent: 0;
    }
    select {
      width: 100%;
      padding: 0 10px;
      font-size: 1.1em;
      text-align: left;
      background: transparent;
      border: 4px solid var(--accent);
      cursor: pointer;
      &::-ms-expand {
        display: none;
      }
    }
  }
</style>
