<script setup lang="ts">
import { RouterView } from 'vue-router'
import Login from '@/components/Login.vue'
import LogOut from './components/LogOut.vue';

import { useAuth0 } from '@auth0/auth0-vue';
const { isAuthenticated } = useAuth0();
</script>

<template>
    <header>
      <Login v-if="!isAuthenticated"/>
      <LogOut v-else/>
    </header>
    
    <RouterView />
  </template>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding: 1rem;  
  border-bottom: 1px solid #e5e5e5;
}
</style>
