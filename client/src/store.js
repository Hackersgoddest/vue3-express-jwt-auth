// store.js
import { reactive } from 'vue';

export const store = reactive({
  username: null,
  updateName(name) {
    this.username = name;
  },
  hasLogin: false,
  updateHasLogin(value) {
    this.hasLogin = value;
  }
})