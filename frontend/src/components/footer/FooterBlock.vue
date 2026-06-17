<template>
  <footer class="footer-block">
    <div class="wrapper footer-block__content">
      <div>
        <p class="footer-block__brand">MarKmib</p>
        <p class="footer-block__text">Система учета журналов, групп и пользователей.</p>
      </div>
      <div class="footer-block__meta">
        <span>Vue 3 + PrimeVue</span>
        <span>NestJS + Prisma</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.footer-block {
  margin-top: auto;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(18px);
}

.footer-block__content {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  padding-top: 1.25rem;
  padding-bottom: 1.5rem;
}

.footer-block__brand {
  margin: 0 0 0.25rem;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.footer-block__text,
.footer-block__meta {
  margin: 0;
  color: rgba(15, 23, 42, 0.62);
  font-size: 0.95rem;
}

.footer-block__meta {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .footer-block__content {
    flex-direction: column;
  }
}
</style>
