<script setup>
import axios from "../axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; 

const user = ref({
  email: null,
  password: null,
});
const showPassword = ref(false);
const router = useRouter();
const hasErrorOccured = ref(false);
const errorMessage = ref(null);
const emailError = ref(false);
const passwordError = ref(false);
const passwordErrorMessge = ref(null)

const login = async () => {
  try {
    const response = await axios.post("auth/login/", {
      email: user.value.email,
      password: user.value.password,
    });
    localStorage.setItem("token", response.data.token);
    user.value.email = null;
    user.value.password = null;
    router.push("/");
  } catch (err) {
    console.log("error: ", err.response.data);
    if (err.response.data.error == "Email field is required") {
      emailError.value = true;
    } else if (err.response.data.error == "Password field is required") {
      passwordErrorMessge.value = null
      passwordError.value = true;
    } else if(err.response.data.error == "Invalid password") {
      passwordError.value = true;
      passwordErrorMessge.value = err.response.data.error;
    }
    else {
      hasErrorOccured.value = true;
      errorMessage.value = err.response.data.error;
    }
  }
};

const turnOffError = () => {
  emailError.value = false;
  passwordError.value = false;
  hasErrorOccured.value = false;
};

const goToRegister = () => {
  router.push("/register");
};
</script>
<template>
  <div class="login-container">
    <form
      class="login-form"
      @submit.prevent="login"
      @click="turnOffError"
    >
      <p :class="{ Gerror: hasErrorOccured }" v-show="hasErrorOccured">
        {{ errorMessage }}
      </p>
      <h2 class="login-title">Comrade Login</h2>
      <div class="input-group">
        <label for="email" class="input-label"
          >Email
          <span v-show="emailError" :class="{ error: emailError }"
            >required</span
          >
        </label>
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
          <span v-show="passwordError" :class="{ error: passwordError }"
            >{{ passwordErrorMessge ? passwordErrorMessge : 'required'}}</span
          >
        </label>
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
      <button type="submit" class="login-button">Login</button>
      <p class="register-link">
        Click <a @click="goToRegister">here</a> to register
      </p>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-form {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.login-title {
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

.login-button {
  width: 100%;
  height: 40px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #0056b3;
}

.register-link {
  font-size: 16px;
  margin-top: 15px;
}

.register-link a {
  color: #007bff;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
  cursor: pointer;
}

.error {
  position: absolute;
  color: #f29191;
  top: 0;
  right: 0;
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
  box-sizing: border-box;
  border: 1px solid #ffcccc;
}
</style>
