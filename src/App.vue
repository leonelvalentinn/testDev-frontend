<script setup>
import LayoutComponent from './layout/LayoutComponent.vue'
import { RouterView } from 'vue-router'
import { getSession } from './hooks/useGetSession'

const { logged } = getSession()
</script>

<template>
  <LayoutComponent :logged="logged">
    <main>
      <RouterView />
    </main>
  </LayoutComponent>
</template>

<style scoped>

</style>
