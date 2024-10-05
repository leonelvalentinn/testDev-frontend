<script setup>
import { ref } from 'vue'
import { toast } from "vue3-toastify"
import "vue3-toastify/dist/index.css"

const notify = (text, type) => {
  toast(text, {
    "theme": "dark",
    "type": type,
    "pauseOnHover": false,
    "pauseOnFocusLoss": false,
    "dangerouslyHTMLString": true
  })
}

const showPassword = ref(false)
const loading = ref(false)

const registerUser = (event) => {
  event.preventDefault()

  loading.value = true

  const form = event.target
  const formData = new FormData(form)

  const data = {
    email: formData.get('email'),
    password: formData.get('password')
  }

  if (data.email === '') {
    notify('El email es requerido', 'error')
    return
  }

  if (data.email === '') {
    notify('La contraseña es requerida', 'error')
    return
  }

  fetch('http://127.0.0.1:8000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(async (response) => {
      if (!response.ok) {
        const text = await response.text()
        throw new Error(text)
      } else {
        return response.json()
      }
    })
    .then((response) => {
      notify('Sesión iniciada', 'success')
      window.localStorage.setItem('user', JSON.stringify({ token: response.token, name: response.name, email: response.email }))
      window.location.assign('/')
    })
    .catch((error) => {
      console.log(error.message)
      if (error.message === '{"message":"Wrong password or email"}') {
        notify('Credenciales inválidas', 'error')
      }
    })
    .finally(() => { loading.value = false })
}


</script>

<template>
  <section class="container-full">
    <form class="form" @submit="registerUser($event)">
      <p class="title">Inicia Sesión </p>
      <p class="message">Inicia sesión en tu cuenta. </p>
      <label>
        <input class="input" name="email" type="email" placeholder="" required="">
        <span>Email</span>
      </label> 
      <label>
        <input class="input" name="password" :type="showPassword ? 'text' : 'password'" placeholder="" required="">
        <span>Contraseña</span>
        <button type="button" class="show-password" @click="showPassword = !showPassword">
          <svg v-if="showPassword" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-eye-off"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" /><path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" /><path d="M3 3l18 18" /></svg>
          <svg v-else viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
        </button>
      </label>
      <button class="submit" :disabled="loading">
        {{ loading ? 'Cargando...' : 'Enviar' }}
      </button>
      <p class="signin">¿No tienes cuenta? <RouterLink to="/registro">Crea una</RouterLink> </p>
    </form>
  </section>
</template>

<style scoped>

</style>