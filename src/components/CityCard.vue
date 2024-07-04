<template>
    <div
      class="flex flex-col sm:flex-row py-6 px-3  bg-weather-secondary rounded-md shadow-md cursor-pointer "
    >
      <div class="flex sm:text-left text-center flex-col flex-1">
        <h2 class="text-3xl">{{ city.city }}</h2>
        <h3>{{ city.state }}</h3>
      </div>
  
      <div class="flex flex-col gap-2 sm:text-right text-center">
        <p class="text-3xl" >
          {{ Math.round((city.weather.main.temp-32)*5/9) }}&deg;C
        </p>
        <div class="flex gap-2 self-center">
          <span class="text-xs">
            H:
            {{ Math.round((city.weather.main.temp_max-32)*5/9) }}&deg;
          </span>
          <span class="text-xs">
            L:
            {{ Math.round((city.weather.main.temp_min-32)*5/9) }}&deg;
          </span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    city: {
      type: Object,
      default: () => {},
    },
  });
  </script>