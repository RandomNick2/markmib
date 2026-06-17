<template>
  <section class="auth-panel">
    <div class="auth-panel__hero">
      <span class="auth-panel__eyebrow">MarKmib</span>
      <h1>Учет журналов</h1>
      <p>
        Войдите в систему, чтобы работать с журналами, группами и пользователями в одном интерфейсе.
      </p>
      <ul class="auth-panel__features">
        <li>Быстрый доступ к журналам и оценкам</li>
        <li>Управление ролями и составом групп</li>
        <li>Простая работа с учебным процессом</li>
      </ul>
    </div>

    <div class="auth-card">
      <h2>Авторизация</h2>

      <div class="flex flex-col gap-2">
        <label for="username">Имя пользователя</label>
        <InputText required id="username" v-model="username" :invalid="isInvalid" />
      </div>

      <div class="flex flex-col gap-2 mt-4">
        <label for="password">Пароль</label>
        <Password
          required
          inputClass="w-full"
          id="password"
          v-model="password"
          :invalid="isInvalid"
          :feedback="false"
          toggleMask
          @keyup.enter="auth"
        />
      </div>

      <Button
        label="Войти"
        severity="primary"
        class="w-full mt-5"
        @click="auth"
        :loading="isLoading"
        :disabled="isLoading"
      />
    </div>
  </section>
</template>

<script lang="ts">
import UserApi from '@/api/users.api';
import type { UserStore } from '@/stores/user.store';
import { useUserStore } from '@/stores/user.store';
import { useToast } from 'primevue/usetoast';
import { defineComponent } from 'vue';
import './auth.scss';

export default defineComponent({
  data() {
    const toast = useToast();
    const userStore = useUserStore();

    return {
      toast,
      user: userStore as UserStore,
      username: '',
      password: '',
      isLoading: false,
      isInvalid: false
    };
  },

  methods: {
    showError(detail = 'Неверный логин или пароль') {
      this.toast.add({
        severity: 'error',
        summary: 'Ошибка',
        detail,
        life: 3000
      });
    },

    async auth() {
      if (this.isLoading) return;

      this.isLoading = true;
      this.isInvalid = false;

      if (this.username.trim() === '' || this.password.trim() === '') {
        this.isInvalid = true;
        this.showError('Заполните логин и пароль');
        this.isLoading = false;
        return;
      }

      try {
        const { data } = await UserApi.login(this.username, this.password);

        if (!data.accessToken) {
          throw new Error('No access token');
        }

        await this.user.loadUser(data.accessToken);
        this.toast.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Вы успешно авторизовались',
          life: 3000
        });
        this.$router.push('/');
      } catch (e) {
        this.isInvalid = true;
        this.showError();
      } finally {
        this.isLoading = false;
      }
    }
  }
});
</script>
