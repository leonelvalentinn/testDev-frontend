<script setup>
import { provide, ref } from 'vue'
import CardSubject from '../modules/subjects/CardSubject.vue';
import CreateSubject from '../modules/subjects/CreateSubject.vue';
import EditSubject from '../modules/subjects/EditSubject.vue';
import DeleteSubject from '../modules/subjects/DeleteSubject.vue';

const subjects = ref(null)
const isLoading = ref(true)
const openNewSubject = ref(false)
const openEditSubject = ref(false)
const openDeleteSubject = ref(false)
const indexSubjectSelected = ref(null)

provide('openDeleteSubject', openDeleteSubject)
provide('openNewSubject', openNewSubject)
provide('openEditSubject', openEditSubject)
provide('indexSubjectSelected', indexSubjectSelected)
provide('subjects', subjects)

fetch('http://127.0.0.1:8000/api/subjects')
  .then(async (response) => {
    if (!response.ok) {
      const text = await response.text()
      throw new Error(text)
    } else {
      return response.json()
    }
  })
  .then((response) => {
    subjects.value = response.data
    isLoading.value = false
  })
  .catch((err) => console.error(err))
</script>

<template>
  <section class="container-full">
    <div class="container-full container-data">
      <button class="btn-create" @click="openNewSubject = true" :disabled="isLoading">
        Nueva materia
      </button>
      <div class="container-full">
        <div class="container-subjects">
          <span v-if="isLoading">Cargando información...</span>
          <CardSubject v-else v-for="subject, i in subjects" :key="i" :subject="subject" :index="i" />
        </div>
      </div>
    </div>
  </section>

  <CreateSubject :open="openNewSubject" />
  <EditSubject />
  <DeleteSubject />
</template>

<style scoped>
.container-subjects {
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
}

.container-data {
  max-width: 1000px;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 40px;
}

.btn-create {
  font-size: 0.75rem;
  line-height: 1rem;
  background-color: rgb(59, 31, 71);
  font-weight: 500;
  border-radius: 0.5rem;
  color: #fff;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  border: none;
  transition: all .15s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (min-width: 1024px) {
  .container-subjects {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>