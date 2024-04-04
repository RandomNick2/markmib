<script setup lang="ts">
import { RouterView } from 'vue-router';
import Toast from 'primevue/toast';
import 'primeicons/primeicons.css';
import '@/assets/styles/index.scss';
</script>

<template>
  <RouterView />
  <Toast />
</template>
