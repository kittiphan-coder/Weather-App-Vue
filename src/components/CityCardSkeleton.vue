<template>
    <div class="flex flex-col sm:flex-row py-6 px-3  bg-weather-secondary rounded-md shadow-md " >
        <div class="flex sm:items-start items-center flex-col flex-1">
            <AnimatedPlaceholder class=" w-[50%] " />
            <AnimatedPlaceholder class=" w-[40%]" />
        </div>
        <div class="flex sm:items-end items-center flex-col flex-1">
            <AnimatedPlaceholder class=" max-w-[50px] w-full" />
            <AnimatedPlaceholder class=" max-w-[75px] w-full" />
        </div>

        
    </div>
</template>

<script setup>
import AnimatedPlaceholder from "./AnimatedPlaceholder.vue";


</script>

<style lang="scss" scoped>

</style>