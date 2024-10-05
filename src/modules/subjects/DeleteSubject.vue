<script setup>
import { inject, ref } from 'vue'
import { toast } from "vue3-toastify"
import "vue3-toastify/dist/index.css"

defineProps({
  open: Boolean,
  id: Number,
  index: Number
})

const openDeleteSubject = inject('openDeleteSubject')
const indexSubjectSelected = inject('indexSubjectSelected')
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

const deleteSubject = () => {
  loading.value = true

  fetch(`http://127.0.0.1:8000/api/delete-subject/${indexSubjectSelected.value.id}`, {
    method: 'DELETE'
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
      console.log(response)
      notify('Materia borrada', 'success')   
      subjects.value.splice(indexSubjectSelected.value.index, 1)
    })
    .catch((error) => {
      console.log(error)
      notify('Error al borrar', 'error')
    })
    .finally(() => { 
      loading.value = false
      openDeleteSubject.value = false
    })
}


</script>

<template>
  <section class="container-full container-form-new" :class="openDeleteSubject && 'open'">
    <div class="form">
      <p class="title">¡Alerta! </p>
      <p class="message">¿Estás seguro que quieres borrar {{ indexSubjectSelected && subjects[indexSubjectSelected.index].name }}? </p>
      <div class="container-btn">
        <button class="btn" :disabled="loading" @click="deleteSubject">
          {{ loading ? 'Cargando...' : 'Borrar' }}
        </button>
        <button class="submit" @click="openDeleteSubject = false">
          Cancelar
        </button>
      </div>
    </div>
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

.container-btn {
  display: flex;
  gap: 10px;
}

.btn {
  border: 1px gray solid;
  padding: 0 1rem;
  border-radius: 10px;
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