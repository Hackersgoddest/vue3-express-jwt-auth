<script setup>
import { ref, onMounted} from "vue";
import axios from "../axios";

const user = ref({});
async function getUserDetails() {
  try {
    const response = await axios.get("profile/");
    user.value = response.data;
  } catch (err) {
    console.error(err);
  }
}

onMounted(async () => {
  getUserDetails();
});
</script>

<template>
  <main>
    <h1>Welcome {{ user?.username || 'Comrade' }}</h1>
  </main>
</template>
