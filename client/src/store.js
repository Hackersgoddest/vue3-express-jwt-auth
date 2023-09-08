// store.js
import { reactive } from 'vue';

export const store = reactive({
  username: null,
  updateName(name) {
    this.username = name;
  }
})