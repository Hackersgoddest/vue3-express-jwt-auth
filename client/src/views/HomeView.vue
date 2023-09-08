<script setup>
import { store } from "../store";

</script>

<template>
  <main>
    <h1>Welcome {{ store?.username || 'Comrade' }}</h1>
  </main>
</template>
