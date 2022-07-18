import {defineStore} from 'pinia'
import axios from "../plugins/axios";
import axiosInstance from "../plugins/axios";
import router from "@/router";

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => {
    const savedStateStr = localStorage.getItem("authStore");

    return savedStateStr ? JSON.parse(savedStateStr) : {
      id: '',
      token: '',
      email: '',
      role: '',
      name: '',
      surname: ''
    };
  },
  getters: {
    isLogged: (state) => {
      return state.token && state.token !== ''
    },
    isAdmin: (state) => {
      return state.role === 'Admin'
    }
  },
  actions: {
    async login(authData: { email: string, password: string }) {
      try {
        const { data } = await axios.post('authenticate', authData);
        await this.completeAuthentication(data);
      } catch (err) {
      }
    },
    async registerUser(user: {name: string, surname: string, email: string, password: string}) {
      try {
        const { data } = await axiosInstance.post('users/register', user);
        alert('Registration completed successfully!')
        await this.completeAuthentication(data);
      } catch (err) {
      }
    },
    async completeAuthentication(data: {id: string, token: string, email: string, role: string, name: string, surname: string}) {
      this.id = data.id;
      this.token = data.token;
      this.email = data.email;
      this.role = data.role;
      this.name = data.name;
      this.surname = data.surname;

      await router.push('/');
    },
    async logout() {
      this.id = '';
      this.token = '';
      this.email = '';
      this.role = '';
      this.name = '';
      this.surname = '';

      await router.push('/login');
    },
  }
})
