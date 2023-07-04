<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <header>
      <button>Login</button>
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
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
}
</style>
