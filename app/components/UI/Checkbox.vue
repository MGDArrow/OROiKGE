<template>
  <div class="ui-checkbox" @click="modelValue = !modelValue">
    <input v-model="modelValue" type="checkbox" :required />
    <span class="ui-checkbox__box">
      <span v-if="modelValue" class="ui-checkbox__check" />
    </span>
    <span class="ui-checkbox__label"><slot /></span>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    required?: boolean;
  }

  const props = defineProps<Props>();

  const modelValue = defineModel<boolean>({ required: true });

  defineSlots<{
    default: string;
  }>();
</script>

<style lang="scss" scoped>
  .ui-checkbox {
    margin: 10px 0 5px;
    & > input {
      display: none;
    }
    &__box {
      position: relative;
      top: 0.1em;
      display: inline-block;
      width: 1em;
      height: 1em;
      border: 0.15em solid var(--accent);
      cursor: pointer;
      transition: 0.2s ease-in-out;
      content: ' ';
    }
    &__label {
      margin-left: 0.5em;
    }
    &:hover &__box {
      border: 0.15em solid var(--accent);
    }
    & > input:checked + span {
      border: 0.15em solid var(--accent);
    }
    &__check {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      transform: rotate(45deg) translate(-30%, -15%);
      content: ' ';
      &::before {
        position: absolute;
        bottom: 0;
        left: 40%;
        display: block;
        width: 60%;
        height: 15%;
        background: var(--accent);
        animation: kf-check-1 0.1s linear 0s;
        content: ' ';
      }
      &::after {
        position: absolute;
        right: 0;
        bottom: 0;
        display: block;
        width: 15%;
        height: 100%;
        background: var(--accent);
        animation: kf-check-2 0.1s linear 0.1s both;
        content: ' ';
      }
    }
  }

  @keyframes kf-check-1 {
    0% {
      width: 0%;
    }
    100% {
      width: 60%;
    }
  }

  @keyframes kf-check-2 {
    0% {
      height: 0%;
    }
    100% {
      height: 100%;
    }
  }
</style>
