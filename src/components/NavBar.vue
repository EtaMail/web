<template>
  <nav class="navbar navbar-expand navbar-light bg-light">
    <div class="container-fluid">
<!--      <a class="navbar-brand" href="#">Navbar</a>-->
<!--      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"-->
<!--              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">-->
<!--        <span class="navbar-toggler-icon"></span>-->
<!--      </button>-->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
          <li class="nav-item" v-if="auth.isLogged">
            <RouterLink class="nav-link" to="/">Home</RouterLink>
          </li>

          <li class="nav-item" v-if="auth.isLogged">
            <span class="nav-link" @click="auth.logout()">Logout</span>
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

const auth = useAuthStore();
</script>

<style scoped>
</style>
