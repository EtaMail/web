<template>
  <div class="login">

    <h2 class="mt-5 text-center"> Login </h2>

    <b-form>

      <b-form-group
          id="input-group-1"
          label="Indirizzo email:"
          label-for="input-1"
          description="Non condivideremo mai la tua mail con nessuno..."
      >
        <b-form-input
            @keydown.enter="login"
            id="email"
            v-model="user.email"
            type="email"
            placeholder="Email"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="password"
          label="Password:"
          label-for="input-2"
          description="... e nemmeno la tua passsword"
      >
        <b-form-input
            @keydown.enter="login"
            id="input-1"
            v-model="user.password"
            type="password"
            placeholder="Password"
            required
        ></b-form-input>
      </b-form-group>


      <div class="text-center">
        <b-button class="text-center" @click="login">Login</b-button>
      </div>

    </b-form>

    <div class="m-5 text-center">
      Non sei ancora registrato?
      <RouterLink to="/register"> Registrati</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useAuthStore} from "@/stores/auth";
import {BButton, BForm, BFormInput} from "bootstrap-vue-3";

const user = ref({
  email: '',
  password: '',
})

let auth = useAuthStore();

function login() {
  auth.login(user.value);
}

</script>

<style scoped>

</style>