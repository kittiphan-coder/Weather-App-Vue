<script setup>
import { RouterView } from 'vue-router';
import SiteNavigation from './components/SiteNavigation.vue'
</script>

<template>  
        <SiteNavigation/>
        <RouterView class="flex-1" v-slot="{ Component }">
                <Transition name="page">
                        <component :is="Component" />
                </Transition>
        </RouterView>   
</template>

<style scoped>
.page-enter-active {
  transition: 600ms ease all;
}

.page-enter-from {
  opacity: 0;
}
</style>
