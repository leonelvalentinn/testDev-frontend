<script setup>
import { RouterLink } from 'vue-router'
import { getSession } from '../hooks/useGetSession'

const { user, logged } = getSession()
</script>

<template>
  <section class="container container-hero">
    <h1>Hola, {{ user ? user.name : 'visitante'}}</h1>
    <p>{{ logged ? 'Puedes ver las materias' : 'Inicia sesión para poder ver las materias.' }}</p>
    <RouterLink to="/login" v-if="!logged">
      Iniciar Sesión
    </RouterLink>
    <RouterLink to="/materias" v-else>
      Materias
    </RouterLink>
  </section>
</template>

<style scoped>
  .container-hero {
    flex-direction: column;
    gap: 1rem;
    padding: 5rem 1rem;
    text-align: center;
  }

  .container-hero h1 {
    font-size: 2rem;
  }

  .container-hero p {
    font-size: 1.1rem;
  }

  .container-hero a {
    padding: 6px 1rem;
    background-color: var(--primary-400);
    border-radius: 8px;
    transition: background, color 0.12s linear;
  }

  .container-hero a:hover {
    background-color: var(--secondary-400);
    color: var(--dark-100);
  }
</style>