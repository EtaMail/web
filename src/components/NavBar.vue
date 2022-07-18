<template>
  <nav class="navbar navbar-expand navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <b-img src="./src/assets/logo.png" alt="EtaMail" height="45"/>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item" v-if="auth.isLogged">
            <RouterLink class="nav-link" to="/">Home</RouterLink>
          </li>

          <li class="nav-item" v-if="auth.isLogged">
            <span class="nav-link" @click="auth.logout()" style="cursor: pointer">Logout</span>
          </li>

          <li class="nav-item" v-if="!auth.isLogged">
            <RouterLink class="nav-link" to="/login">Login</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import {useAuthStore} from "@/stores/auth";
import {BImg} from "bootstrap-vue-3";

const auth = useAuthStore();
</script>

<style scoped>
</style>
