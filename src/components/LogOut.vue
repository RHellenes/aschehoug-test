<template>
  <div>
    <p>{{ user.nickname || user.name }}</p>
    <button @click="handleLogout">Log out</button>
  </div>
</template>
<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';

const { user, logout } = useAuth0();

const handleLogout = () => {
  logout({ logoutParams: { returnTo: window.location.origin } });
}

</script>
<style scoped>
div {
  display: flex;
  flex-direction: row;
  align-items: center;
}
div > * {
  margin: 0 var(--spacer-2);
}
</style>
