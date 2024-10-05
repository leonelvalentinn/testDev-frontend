<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router'

const showMenu = ref(false)

defineProps({
  logged: Boolean
})

const logout = () => {
  window.localStorage.removeItem('user')

  window.location.assign('/')
}

</script>

<template>
  <header class="container-full container-header">
    <nav class="container-full container-navbar">
      <RouterLink to="/" class="container container-logo">
        <img src="/logo-example.svg" alt="Example Logo">
        <span class="text-logo">Example Logo</span>
      </RouterLink>
      <button :class="showMenu && 'open-btn'" class="btn-menu container" @click="showMenu = !showMenu">
        <div></div>
        <div></div>
        <div></div>
      </button>
      <div class="container-full container-overlay" :class="showMenu && 'show'">
        <div class="container overlay-content">
          <RouterLink to="/">
            Inicio
          </RouterLink>
          <RouterLink to="/materias" v-if="logged">
            Materias
          </RouterLink>
          <RouterLink to="/login" v-if="!logged">
            Iniciar sesión
          </RouterLink>
          <RouterLink to="/registro" v-if="!logged">
            Registrarse
          </RouterLink>
          <button v-if="logged" @click="logout">
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  </header>
  <slot />
  <footer>

  </footer>
</template>

<style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container-full {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container-navbar {
    width: 100%;
    padding: 10px 0;
    justify-content: space-between;
    max-width: 1280px;
  }

  .container-header {
    -webkit-box-shadow: 0px 2px 10px 0px rgba(240,240,240,1);
    -moz-box-shadow: 0px 2px 10px 0px rgba(240,240,240,1);
    box-shadow: 0px 2px 10px 0px rgba(240,240,240,1);
  }

  .container-logo {
    text-wrap: nowrap;
    gap: 10px;
  }
  .btn-menu {
    flex-direction: column;
    gap: 6px;
  }

  .btn-menu div {
    width: 30px;
    height: 2px;
    background-color: var(--neutral-100);
    transition: all 0.12s linear;
  }

  .container-overlay {
    transition: all 0.2s linear;
    position: absolute;
    top: 50px;
    right: 0;
    transform: scaleX(0);
    transform-origin: left;
    height: 100svh;
    background-color: rgba(31, 31, 31, 0.664);
    align-items: flex-start;
    justify-content: flex-start;
  }

  .container-overlay .overlay-content {
    flex-direction: column;
    gap: 1rem;
    padding: 20px 0 0 40px;
    align-items: flex-start;
  }

  .container-overlay .overlay-content button {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container-overlay .overlay-content a, .container-overlay .overlay-content button {
    transition: color 0.1s linear;
  }

  .container-overlay .overlay-content a:hover, .container-overlay .overlay-content button:hover {
    color: var(--primary-200);
  }

  .show {
    transform: scaleX(1);
    transform-origin: left;
  }

  .open-btn div:nth-child(1) {
    transform: rotate(30deg)  translateY(-1px) translateX(8px);
  }
  .open-btn div:nth-child(2) {
    transform: scale(0);
  }
  .open-btn div:nth-child(3) {
    transform: rotate(-30deg) translateY(-7px) translateX(12px);
  }
  @media (min-width: 1024px) {
    .btn-menu {
      display: none;
    }
    .container-overlay {
      position: initial;
      transform: scaleX(1);
      transform-origin: left;
      height: auto;
      background-color: transparent;
      align-items: center;
      justify-content: flex-end;
    }

    .container-overlay .overlay-content {
      flex-direction: row;
      gap: 1rem;
      padding: 10px 0 0 0px;
      align-items: flex-start;
    }
  }
</style>