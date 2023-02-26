<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)"/>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import CityCard from './CityCard.vue';

const router = useRouter()
const openweatherAPIKey = import.meta.env.VITE_OPENWEATHER_API_KEY
const savedCities = ref([])
const getCities = async () => {
  if (localStorage.getItem('savedCities')) {
    savedCities.value = JSON.parse(localStorage.getItem('savedCities'))
  }

  const requests = []
  savedCities.value.forEach((city) => {
    requests.push(
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=${openweatherAPIKey}&units=metric`)
    )
  })

  const weatherData = await Promise.all(requests)

  // Delay
  await new Promise((res) => setTimeout(res, 500))

  weatherData.forEach((value, index) => {
    savedCities.value[index].weather = value.data
  })
}

await getCities()

const goToCityView = (city) => {
  router.push({
    name: 'cityView',
    params: { state: city.state, city: city.city },
    query: { lat: city.coords.lat, lng: city.coords.lng, id: city.id },
  })
}
</script>
