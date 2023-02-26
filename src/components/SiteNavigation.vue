<template>
  <header class=" sticky top-0 bg-weather-primary shadow-lg">
    <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">天气预报</p>
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end">
        <i @click="toggleModal" class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"></i>
        <i @click="addCity" v-if="route.query.preview" class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"></i>
      </div>

      <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
        <div class="text-black">
          <h1 class="text-2xl mb-1">About:</h1>
          <p class="mb-4">The local weather always you to track the current and future weather of cities of you choosing.</p>
          <h1 class="text-2xl">How it works:</h1>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Search for you city by entering the name into the search bar.
            </li>
            <li>Select a city.</li>
            <li>Track the city by clicking on the '+' icon in the top right.</li>
          </ol>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup>

import { ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router'
import BaseModal from './BaseModal.vue'
import { uid } from 'uid'

const savedCities = ref([])
const route = useRoute()
const router = useRouter()
const addCity = () => {
  if (localStorage.getItem('savedCities')) {
    savedCities.value = JSON.parse(localStorage.getItem('savedCities'))
  }

  const locationObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng
    }
  }

  savedCities.value.push(locationObj)
  localStorage.setItem('savedCities', JSON.stringify(savedCities.value))

  let query = Object.assign({}, route.query)
  query.id = locationObj.id
  delete query.preview
  router.replace({ query })
}

const modalActive = ref(null)
const toggleModal = () => {
  modalActive.value = !modalActive.value
}
</script>
