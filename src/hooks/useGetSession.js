import { ref } from 'vue'
const logged = ref(false)

export const getSession = () => {
  const user = JSON.parse(window.localStorage.getItem('user'))

  if (user) {
    logged.value = true
  } else {
    logged.value = false
  }

  return { user, logged }
}
