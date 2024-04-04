<template>
  <div class="auth">
    <h1>Авторизация</h1>

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
      />
    </div>

    <Button
      label="Войти"
      severity="primary"
      class="w-full mt-4"
      v-ripple
      @click="auth"
      :disabled="isLoading"
    />
  </div>
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
      toast: toast,
      user: userStore as UserStore,
      username: '',
      password: '',
      isLoading: false,
      isInvalid: false
    };
  },

  methods: {
    show_error() {
      this.toast.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Не верный логин или пароль',
        life: 3000
      });
    },

    async auth() {
      this.isLoading = true;
      if (this.username.trim() === '' || this.password.trim() === '') {
        this.isInvalid = true;
        this.show_error();
        return;
      }

      try {
        const { data } = await UserApi.login(this.username, this.password);

        if (data.accessToken) {
          await this.user.loadUser(data.accessToken);
          this.toast.add({
            severity: 'success',
            summary: 'Успешно',
            detail: 'Вы успешно авторизовались',
            life: 3000
          });
          this.$router.push('/');
        }
      } catch (e) {
        this.show_error();
      }

      this.isLoading = false;
    }
  }
});
</script>
