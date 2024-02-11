<template>
  <div class="wrapper">
    <NavbarBlock />
    <div class="content">
      <slot></slot>
    </div>
  </div>
  <FooterBlock />
</template>

<script setup lang="ts">
import NavbarBlock from '@/components/navbar/NavbarBlock.vue'
import FooterBlock from '@/components/footer/FooterBlock.vue'
</script>
