<template>
  <div class="auth">
    <h1>Авторизация</h1>

    <div class="flex flex-col gap-2">
        <label for="username">Имя пользователя или почта</label>
        <InputText id="username" v-model="username"/>
    </div>

    <div class="flex flex-col gap-2 mt-4">
        <label for="password">Пароль</label>
        <Password inputClass="w-full" id="password" v-model="password" :feedback="false" toggleMask/>
    </div>

    <Button label="Войти" severity="primary" class="w-full mt-4"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            username: '',
            password: ''
        }
    }
})
</script>

<style lang="scss">
@import './auth.scss';
</style>
