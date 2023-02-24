<template>
  <header class=" sticky top-0 bg-weather-primary shadow-lg">
    <nav class="container flex felx-col sm:flex-row items-center gap-4 text-white py-6">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">The Local Weather</p>
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end">
        <i @click="toggleModal" class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"></i>
        <i class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"></i>
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
import { RouterLink } from 'vue-router'
import BaseModal from './BaseModal.vue'

const modalActive = ref(null)
const toggleModal = () => {
  modalActive.value = !modalActive.value
}
</script>
