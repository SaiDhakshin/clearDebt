<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import DefaultLayout from '@/layout/DefaultLayout.vue';

const route  = useRoute();

const layoutComponent = computed(() => {
  const layout = route.meta.layout || 'DefaultLayout';
  switch(layout) {
    case 'DefaultLayout':
      return DefaultLayout;
    default:
      return DefaultLayout;
  }
})
</script>

<template>
  <component :is="layoutComponent">
    <router-view></router-view>
  </component>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
