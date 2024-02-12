<template>
  <div class="auth">
    <h1>Авторизация</h1>

    <div class="flex flex-col gap-2">
      <label for="username">Имя пользователя или почта</label>
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
      @click="auth"
      :disabled="isLoading"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useToast } from 'primevue/usetoast'
import { auth } from '@/http/authApi'
import { useUserStore } from '@/stores/user.store'
import type { UserStore } from '@/stores/user.store'


export default defineComponent({
  data() {
    const toast = useToast()
    const userStore = useUserStore()

    return {
      toast: toast,
      user: userStore as UserStore,
      username: '',
      password: '',
      isLoading: false,
      isInvalid: false
    }
  },

  methods: {
    show_error() {
      this.toast.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Не верный логин или пароль',
        life: 3000
      })
    },

    async auth() {
      this.isLoading = true
      if (this.username.trim() === '' || this.password.trim() === '') {
        this.isInvalid = true
        this.isLoading = false
        this.show_error()
        return
      }

      try {
        const { data } = await auth(this.username, this.password)

        if (data.access_token) {
          await this.user.loadUser(data.access_token)
          this.toast.add({
            severity: 'success',
            summary: 'Успешно',
            detail: 'Вы успешно авторизовались',
            life: 3000
          })
          this.$router.push('/')
        }
      } catch (e) {
        this.show_error()
        return
      }

      this.isLoading = false
    }

  }
})
</script>

<style lang="scss">
@import './auth.scss';
</style>
