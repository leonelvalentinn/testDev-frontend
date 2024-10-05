<script setup>
import { inject } from 'vue'

const props = defineProps({
  subject: Object,
  index: Number
})

const openEditSubject = inject('openEditSubject')
const openDeleteSubject = inject('openDeleteSubject')
const indexSubjectSelected = inject('indexSubjectSelected')


const openEditForm = () => {
  openEditSubject.value = true
  indexSubjectSelected.value = { id: props.subject.id, index: props.index }
}

const openDelete = () => {
  openDeleteSubject.value = true
  indexSubjectSelected.value = { id: props.subject.id, index: props.index }
}

</script>

<template>
  <article class="subject-card">
    <span class="title">📕 {{ subject.name }}</span>
    <p class="description">{{ subject.description }}</p>
    <div class="actions">
      <button class="edit" @click="openEditForm">
        <svg viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
      </button>
      <button class="delete" @click="openDelete">
        <svg viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
      </button>
    </div>
  </article>
</template>

<style scoped>
.subject-card {
  max-width: 320px;
  padding: 1rem;
  background-color: var(--dark-100);
  border-radius: 10px;
  box-shadow: 20px 20px 30px rgba(0, 0, 0, .05);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 10px;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--neutral-100);
}

.description {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--neutral-100);

}

.description a {
  --tw-text-opacity: 1;
  color: var(--neutral-100);

}

.description a:hover {
  -webkit-text-decoration-line: underline;
  text-decoration-line: underline;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1rem;
  gap: 10px;
}

.delete, .edit {
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

.delete svg, .edit svg {
  width: 25px;
  height: auto;
}

.delete:hover, .edit:hover {
  background-color: rgb(55 65 81);
}

.delete:focus, .edit:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
</style>