<template>
  <div class="app-shell">
    <div class="app-shell__glow app-shell__glow--left"></div>
    <div class="app-shell__glow app-shell__glow--right"></div>
    <NavbarBlock />
    <main class="content">
      <slot></slot>
    </main>
    <FooterBlock />
  </div>
</template>

<script setup lang="ts">
import FooterBlock from '@/components/footer/FooterBlock.vue';
import NavbarBlock from '@/components/navbar/NavbarBlock.vue';
</script>
