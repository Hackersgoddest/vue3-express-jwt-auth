<script setup>
import { shallowRef, computed } from "vue";
import { useRouter } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
  useFetch,
  hasErrorOccured,
  errorMessage,
  usernameError,
  emailError,
  passwordError,
  turnOffError,
  passwordErrorMessge
} from "../fetch";
import { store } from "../store";

const props = defineProps({
  authName: String,
});

const user = shallowRef({
  username: null,
  email: null,
  password: null,
});

const router = useRouter();
const showPassword = shallowRef(false);

const hideAllErrors = () => {
  turnOffError();
};

const handleAuth = async () => {
  try {
    await useFetch(`auth/${props?.authName}/`, user.value);
    if (store.hasLogin) router.push("/");
  } catch (err) {
    console.log(err);
  }
};

const goTo = () => {
  if(props.authName == 'login') router.push("/register");
  else router.push("/login")
};

</script>
<template>
  <div class="container">
    <form class="form" @submit.prevent="handleAuth" @click="hideAllErrors">
      <p :class="{ Gerror: hasErrorOccured }" v-show="hasErrorOccured">
        {{ errorMessage }}
      </p>
      <h2 class="title">
        Comrade {{ props?.authName || "Authentication" }}
      </h2>
      <div class="input-group" v-if="props?.authName == 'register'">
        <label for="username" class="input-label"
          >Username
          <span v-show="usernameError" :class="{ error: usernameError }"
            >required</span
          ></label
        >
        <input
          type="text"
          id="username"
          name="username"
          v-model="user.username"
          class="input-field"
          autocomplete="name"
          :class="{ inpError: usernameError }"
        />
      </div>
      <div class="input-group">
        <label for="email" class="input-label"
          >Email
          <span v-show="emailError" :class="{ error: emailError }"
            >required</span
          ></label
        >
        <input
          type="email"
          id="email"
          name="email"
          v-model="user.email"
          class="input-field"
          autocomplete="email"
          :class="{ inpError: emailError }"
        />
      </div>
      <div class="input-group">
        <label for="password" class="input-label"
          >Password
          <span v-show="passwordError" :class="{ error: passwordError }">{{
            passwordErrorMessge ? passwordErrorMessge : "required"
          }}</span></label
        >
        <input
          :type="showPassword ? 'text' : 'password'"
          id="password"
          name="password"
          v-model="user.password"
          class="input-field"
          autocomplete="current-password"
          :class="{ inpError: passwordError }"
        />
        <span class="password-toggle" @click="showPassword = !showPassword">
          <font-awesome-icon
            :icon="showPassword ? faEyeSlash : faEye"
            class="eye-icon"
          />
        </span>
      </div>
      <button type="submit" class="auth-button">{{props.authName == 'register' ? 'Register' : 'Login'}}</button>
      <p class="auth-link">Click <a @click="goTo">here</a> to {{props?.authName == 'register' ? 'login' : 'register'}}</p>
    </form>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.input-group {
  width: 100%;
  margin-bottom: 15px;
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  color: #93c5fd;
}

.password-toggle:hover {
  cursor: pointer;
}

.input-label {
  font-size: 16px;
}

.input-field {
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  border: 1px solid #93c5fd;
  border-radius: 4px;
  font-size: 16px;
  padding: 5px;
}

.input-field:focus {
  outline: currentColor;
}

.auth-button {
  width: 100%;
  height: 40px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.auth-button:hover {
  background-color: #0056b3;
}

.auth-link {
  font-size: 16px;
  margin-top: 15px;
}

.auth-link a {
  color: #007bff;
  text-decoration: none;
}

.auth-link a:hover {
  text-decoration: underline;
  cursor: pointer;
}

.error {
  position: absolute;
  color: #f29191;
  top: 0;
  top: 0;
  right: 10px;
  font-size: 15px;
  margin: 0;
}

.Gerror {
  position: absolute;
  color: #f29191;
  margin: 0;
  top: 5px;
  right: 5px;
  font-size: 17px;
}

.inpError {
  border: 1px solid #ffcccc;
}
</style>
