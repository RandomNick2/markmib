<script setup lang="ts">
import { RouterView } from 'vue-router'
import Toast from 'primevue/toast'
import 'primeicons/primeicons.css'
import '@/assets/styles/style.css'
</script>

<template>
  <RouterView />
  <Toast />
</template>

<style lang="scss">
@import '@/assets/styles/index.scss';
</style>
