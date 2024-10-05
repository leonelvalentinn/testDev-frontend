<script setup>
import { inject, ref } from 'vue'
import { toast } from "vue3-toastify"
import "vue3-toastify/dist/index.css"

defineProps({
  open: Boolean
})

const openNewSubject = inject('openNewSubject')
const subjects = inject('subjects')

const notify = (text, type) => {
  toast(text, {
    "theme": "dark",
    "type": type,
    "pauseOnHover": false,
    "pauseOnFocusLoss": false,
    "dangerouslyHTMLString": true
  })
}

const loading = ref(false)

const createSubject = (event) => {
  event.preventDefault()

  loading.value = true

  const form = event.target
  const formData = new FormData(form)
  const formEl = document.getElementById('form')

  const data = {
    name: formData.get('name'),
    description: formData.get('description')
  }

  fetch('http://127.0.0.1:8000/api/create-subject', {
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
      notify('Materia guardada', 'success')
      const newSubject = { id: response.subject.id, name: response.subject.name, description: response.subject.description }
      subjects.value.push(newSubject)
      formEl.reset()
    })
    .catch((error) => {
      console.log(error)
      notify('Error al guardar', 'error')
    })
    .finally(() => { 
      loading.value = false
      openNewSubject.value = false
    })
}


</script>

<template>
  <section class="container-full container-form-new" :class="open && 'open'">
    <form id="form" class="form" @submit="createSubject($event)">
      <button @click="openNewSubject = false" type="button" class="btn-close"><svg  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg></button>
      <p class="title">Registra una materia </p>
      <label>
        <input class="input" name="name" type="text" placeholder="" required="">
        <span>Nombre</span>
      </label>
      <label>
        <input class="input" name="description" type="text" placeholder="" required="">
        <span>Description</span>
      </label> 
      <button class="submit" :disabled="loading">
        {{ loading ? 'Cargando...' : 'Guardar' }}
      </button>
    </form>
  </section>
</template>

<style scoped>
.container-form-new {
  transition: all 0.2s linear;
  transform: scale(0);
  width: 100%;
  height: 100svh;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(39, 39, 39, 0.774);
}

.open {
  transform: scale(1);
}

.btn-close {
  padding: 5px;
  border-radius: 50%;
  background-color: tomato;
  position: absolute;
  top: -10px;
  right: -10px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>