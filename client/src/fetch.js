import axios from "./axios";
import { shallowRef } from "vue";
import { store } from "./store";

export const hasErrorOccured = shallowRef(false);
export const errorMessage = shallowRef(null);
export const emailError = shallowRef(false);
export const passwordError = shallowRef(false);
export const passwordErrorMessge = shallowRef(null);
export const usernameError = shallowRef(false);

export const useFetch = async (path, userData) => {
  try {
    const response = await axios.post(path, userData);
    localStorage.setItem("token", response.data.token);
    store.updateHasLogin(true);
  } catch (err) {
    console.log("error: ", err.response.data);
    if (err.response.data.error == "Username field is required") {
      usernameError.value = true;
    } else if (err.response.data.error == "Email field is required") {
      emailError.value = true;
    } else if (err.response.data.error == "Password field is required") {
      passwordErrorMessge.value = null;
      passwordError.value = true;
    } else if (err.response.data.error == "Invalid password") {
      passwordError.value = true;
      passwordErrorMessge.value = err.response.data.error;
    } else {
      hasErrorOccured.value = true;
      errorMessage.value = err.response.data.error;
    }
  }
};

export const turnOffError = () => {
  emailError.value = false;
  usernameError.value = false;
  passwordError.value = false;
  hasErrorOccured.value = false;
};
