<template>
  <div class="m-3">
    <h2>Registrazione</h2>

    <b-form>
      <div class="mb-2">
        <span>Nome</span>
        <b-form-input required v-model="user.name" />
      </div>

      <div class="mb-2">
        <span>Cognome</span>
        <b-form-input v-model="user.surname" />
      </div>

      <div class="mb-2">
        <span>Email</span>
        <b-form-input v-model="user.email" />
      </div>

      <div class="mb-2">
        <span>Conferma email</span>
        <b-form-input v-model="emailConfirmation" />
      </div>

      <div class="mb-2">
        <span>Password</span>
        <b-form-input type="password" v-model="user.password" />
      </div>

      <div class="mb-2">
        <span>Conferma password</span>
        <b-form-input type="password" v-model="passwordConfirmation" />
      </div>

      <b-button class="float-end" @click.prevent="register">Registrati</b-button>
    </b-form>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {BButton, BForm, BFormInput} from "bootstrap-vue-3";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "RegisterView",
  components: {BButton, BFormInput, BForm},
  setup() {
    // eslint-disable-next-line no-undef
    const auth = useAuthStore();
    return {
      auth,
      user: ref({
        name: '',
        surname: '',
        email: '',
        password: '',
      }),
      emailConfirmation: '',
      passwordConfirmation: '',
    };
  },
  methods: {
    async register() {
      if (this.user.email !== this.emailConfirmation) {
        alert('Emails do not match!')
        return
      }
      if (this.user.password !== this.passwordConfirmation) {
        alert('Passwords do not match!')
        return
      }

      await this.auth.registerUser(this.user);
    }
  }
});
</script>

<style scoped>
.my-btn {
  width: 400px;
}
</style>
