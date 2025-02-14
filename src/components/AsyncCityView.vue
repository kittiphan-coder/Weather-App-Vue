<template>
    <div class="flex flex-col flex-1 items-center text-white">
      <!-- Banner -->
      <div
        v-if="route.query.preview"
        class=" p-4 bg-weather-secondary w-full text-center"
      >
        <p>
          You are currently previewing this city, click the "+"
          icon to start tracking this city.
        </p>
      </div>
      <!-- Weather Overview -->
      <div class="flex flex-col items-center py-12">
        <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
        <p class="text-sm mb-12">
          {{
            new Date(weatherData.currentTime).toLocaleDateString(
              "en-us",
              {
                weekday: "short",
                day: "2-digit",
                month: "long",
              }
            )
          }}
          {{
            new Date(weatherData.currentTime).toLocaleTimeString(
              "en-us",
              {
                timeStyle: "short",
              }
            )
          }}
        </p>
        <p class="text-8xl mb-8">
          {{ Math.round((weatherData.current.temp - 32)*5/9) }}&deg; C
        </p>
        <p>
          Feels like
          {{ Math.round((weatherData.current.temp - 32)*5/9) }} &deg; C
        </p>
        <p class="capitalize">
          {{ weatherData.current.weather[0].description }}
        </p>
        <img
          class="w-[150px] h-auto"
          :src="
            `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
          "
          alt=""
        />
      </div>
  
      <hr class="border-white border-opacity-10 border w-full" />
  
      <!-- Hourly Weather -->
      <div class="max-w-screen-md w-full py-12">
        <div class="mx-8">
          <h2 class="mb-4">Hourly Weather</h2>
          <div class="flex gap-10 overflow-x-scroll">
            <div
              v-for="hourData in weatherData.hourly"
              :key="hourData.dt"
              class="flex flex-col gap-4 items-center"
            >
              <p class="whitespace-nowrap text-md">
                {{
                  new Date(
                    hourData.currentTime
                  ).toLocaleTimeString("en-us", {
                    hour: "numeric",
                  })
                }}
              </p>
              <img
                class="w-auto h-[50px] object-cover"
                :src="
                  `http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`
                "
                alt=""
              />
              <p class="text-xl">
                {{ Math.round((hourData.temp - 32)*5/9)}}&deg;C
              </p>
            </div>
          </div>
        </div>
      </div>
  
      <hr class="border-white border-opacity-10 border w-full" />
  
      <!-- Weekly Weather -->
      <div class="max-w-screen-md w-full py-12">
        <div class="mx-8">
          <h2 class="mb-4">7 Day Forecast</h2>
          <div
            v-for="day in weatherData.daily"
            :key="day.dt"
            class="flex items-center"
          >
            <p class="flex-1">
              {{
                new Date(day.dt * 1000).toLocaleDateString(
                  "en-us",
                  {
                    weekday: "long",
                  }
                )
              }}
            </p>
            <img
              class="w-[50px] h-[50px] object-cover"
              :src="
                `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
              "
              alt=""
            />
            <div class="flex gap-2 flex-1 justify-end">
              <p>H: {{ Math.round((day.temp.max- 32)*5/9) }}</p>
              <p>L: {{ Math.round((day.temp.max- 32)*5/9) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!--Button back to home page-->
      <div class=" flex items-center py-12 gap-6">
        <button  
        class=" bg-weather-secondary hover:bg-weather-secondary-hover 
        rounded-full  px-5 py-2.5 text-center me-2 mb-2 "
        @click="()=>{
          router.push({
            name: 'home'
          })
        }"
        >
          <i class="fa fa-home"></i> HOME
        </button>
        <button
        v-if="route.query.id"
        class="bg-red hover:text-red hover:bg-red-hover  px-5 py-2.5 
        text-center me-2 mb-2 rounded-full"
        @click="removeCity"
        >
          <i class="fa fa-trash"></i> Delete
        </button>

      </div>
    </div>
  </template>
  
  <script setup>
  import axios from "axios";
  import { useRoute, useRouter } from "vue-router";
  
  const route = useRoute();

  // Get weather data from openweathermap api
  const getWeatherData = async () => {
    try {
      const weatherData = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
      );
  
      // cal current date & time
      const localOffset = new Date().getTimezoneOffset() * 60000;
      const utc = weatherData.data.current.dt * 1000 + localOffset;
      weatherData.data.currentTime =
        utc + 1000 * weatherData.data.timezone_offset;
  
      // cal hourly weather offset
      weatherData.data.hourly.forEach((hour) => {
        const utc = hour.dt * 1000 + localOffset;
        hour.currentTime =
          utc + 1000 * weatherData.data.timezone_offset;
      });

      // Delay load page.
      await new Promise((res) => setTimeout(res,200));
      
      return weatherData.data;
    } catch (err) {
      console.log(err);
    };
  };
  const weatherData = await getWeatherData();
  
  const router = useRouter();


  // Remove City from local Storage.
  const removeCity = () => {
    const cities = JSON.parse(localStorage.getItem("savedCities"));
    const updateCites = cities.filter((city) => city.id !== route.query.id);
    localStorage.setItem("savedCities",JSON.stringify(updateCites))

    router.push({
      name: 'home',
    });
  };
  


  </script>