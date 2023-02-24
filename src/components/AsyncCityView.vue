<template>
  <div>

  </div>
</template>

<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router';

const router = useRouter()
const openweatherAPIKey = 'b726fe0ceccc42c0b27846e18951b0e1'

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${router.query.lat}&lon=${router.query.lng}&exclude=current&appid=${openweatherAPIKey}&units=metric&lang=zh_cn`
    )
    return weatherData
  } catch (error) {
    console.log(error);
  }
}

const weatherData = await getWeatherData()
console.log(weatherData);
</script>
