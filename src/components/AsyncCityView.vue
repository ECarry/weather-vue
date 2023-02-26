<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div v-if="route.query.preview" class="text-white p-4 bg-weather-secondary w-full text-center">
      <p>你现在正在预览该城市的天气， 点击 '+' 添加收藏。</p>
    </div>

    <!-- Weather Overview -->
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <!-- Time -->
      <p class="text-sm mb-12">
        {{ 
          new Date(weatherData.currentTime).toLocaleDateString(
            'zh-cn',
            {
              weekday: 'short',
              day: '2-digit',
              month: 'long'
            }
          )
        }}
        {{ 
          new Date(weatherData.currentTime).toLocaleTimeString(
            'zh-cn',
            {
              timeStyle: 'short'
            }
          )
        }}
      </p>
      <!-- Temper -->
      <p class="text-8xl mb-8">
        <!-- Math.round() 函数用于将当前温度值四舍五入为最接近的整数。&deg; 实体引用用于将度数符号（°）添加到温度值后面，以便将其显示为温度单位 -->
        {{ Math.round(weatherData.current.temp) }}&deg;
      </p>
      <!-- feels like temper -->
      <p>体感温度 {{ Math.round(weatherData.current.feels_like) }}&deg;</p>
      <p class="capitalize">{{ weatherData.current.weather[0].description }}</p>
      <img class="w-[150px] h-auto" :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`">

    </div>

    <hr class="border-white border-opacity-10 w-full">

    <!-- Hourly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">每小时天气预报</h2>
        <div class="flex gap-10 overflow-x-scroll">
          <div v-for="hourData in weatherData.hourly" :key="hourData.dt" class="flex flex-col gap-4 items-center">
            <p class="whitespace-nowrap text-md">
              {{ 
                new Date(hourData.currentTime).toLocaleTimeString(
                  'zh-cn',
                  {
                    hour: 'numeric',
                  }
                )  
              }}
            </p>
            <img class="w-[50px] h-[50px] object-cover" :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`">
            <p>{{ Math.round(hourData.temp) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-white border-opacity-10 w-full">

    <!-- Weekly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">7日天气预报</h2>
        <div v-for="day in weatherData.daily" :key="day.dt" class="flex items-center">
          <p class="flex-1">
            {{ 
              new Date(day.dt * 1000).toLocaleDateString(
                'zh-cn',
                {
                  weekday: 'short'
                }
              )  
            }}
          </p>
          <img class="w-[50px] h-[50px] object-cover" :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`">
          <div class="flex gap-2 flex-1 justify-end">
            <p>最高：{{ Math.round(day.temp.max) }}&deg;</p>
            <p>最低：{{ Math.round(day.temp.min) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Remove City -->
    <div class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500" @click="removeCity">
      <i class="fa-solid fa-trash"></i>
      <p>删除城市</p>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const openweatherAPIKey = import.meta.env.VITE_OPENWEATHER_API_KEY

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lng}&appid=${openweatherAPIKey}&units=metric&lang=zh_cn`
    )

    // 计算当前时间
    const localOffset = new Date().getTimezoneOffset() * 60000
    const utc = weatherData.data.current.dt * 1000 + localOffset
    weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone_offset

    weatherData.data.hourly.forEach( hour => {
      const utc = hour.dt * 1000 + localOffset
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset
    });

    // Delay
    await new Promise((res) => setTimeout(res, 500))

    return weatherData.data
  } catch (error) {
    console.log('-----getWeatherData error-----', error);
  }
}

const weatherData = await getWeatherData()

const router = useRouter()
const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem('savedCities'))

  const updateCities = cities.filter((city) => city.id !== route.query.id)

  localStorage.setItem('savedCities', JSON.stringify(updateCities))

  router.push({
    name: 'home'
  })
}
</script>
