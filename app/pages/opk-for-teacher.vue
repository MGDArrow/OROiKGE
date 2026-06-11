<template>
  <div>
    <OPKMeeting :is-teachers="true" />
    <OPKLessons :addressee="'teachers'" />
    <OPKLaws />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
