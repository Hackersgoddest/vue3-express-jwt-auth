<script setup>
import { RouterLink, RouterView, useRouter, useRoute } from "vue-router";
import { store } from "./store";

const router = useRouter();
const route = useRoute();
const logout = async () => {
  localStorage.clear();
  store.updateHasLogin(false);
  store.updateName(null);
  router.push("/login");
};
</script>

<template>
  <header class="header">
    <div class="header-title">
      <h2>Comrade Authentication</h2>
    </div>
    <nav class="header-nav">
      <template v-if="route.name === 'home'">
        <RouterLink
          class="nav-link"
          :class="{ active: route.name === 'home' }"
          to="/"
          >Home</RouterLink
        >
        <a @click="logout" class="logout nav-link">Logout</a>
      </template>

      <template v-else>
        <RouterLink
          class="nav-link"
          :class="{ active: route.name === 'login' }"
          to="/login"
          >Login</RouterLink
        >
        <RouterLink
          class="nav-link"
          :class="{ active: route.name === 'register' }"
          to="/register"
          >SignUp</RouterLink
        >
      </template>
    </nav>
  </header>

  <router-view v-slot="{ Component}">
    <!-- Use any custom transition and  to `fade` -->
    <transition name="fade" mode="out-in">
      <component :is="Component" :key="$route.path" />
    </transition>
  </router-view>
</template>

<style>
* {
  font-family: Arial, Helvetica, sans-serif;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0 20px;
  background-color: #101014;
  color: #fff;
}

.header-title {
  flex: 1;
}

.header-nav {
  display: flex;
  gap: 12px;
}

.nav-link {
  text-decoration: none;
  color: #fff;
}

.nav-link:hover {
  color: rgb(87, 87, 163);
}

.active {
  border-bottom: 2px solid #fff;
  padding-bottom: 5px;
}

.logout {
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
