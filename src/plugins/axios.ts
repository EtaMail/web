import axios from 'axios'
import {useAuthStore} from '@/stores/auth'
import type {useToast} from "bootstrap-vue-3";

// ---------------- Use localhost setting ----------------
const useApiLocalhostUrl = true

const isLocalhost = location.hostname === 'localhost'
const isDev = location.hostname === 'easylocker-staging.herokuapp.com'

const baseURL = (!isLocalhost ? isDev
  ? 'https://easylocker-staging-api.herokuapp.com' : 'https://easylocker-api.herokuapp.com'
  : useApiLocalhostUrl
    ? 'http://localhost:8000'
    : 'https://easylocker-staging-api.herokuapp.com'
) + '/api/v1'

const axiosInstance = axios.create({
  baseURL
})

let authStore: ReturnType<typeof useAuthStore>;

axiosInstance.interceptors.request.use(config => {
  authStore = authStore || useAuthStore(); // Cache the store
  const token = authStore.token;

  if (token) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    config.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return config;
}, error => {
  return Promise.reject(error);
});

let toast: ReturnType<typeof useToast>;

function showError (text: string, callback?: () => void) {
  // FIXME: useToast is not working
  // toast = toast || useToast();

  // toast?.danger({
  //   title: 'Errore nella modifica dell\'armadietto',
  //   body: text,
  // });

  alert(text)
  if (callback) callback()
}

let errorOpen = false

axiosInstance.interceptors.response.use(
  value => value,
  error => {
    const auth = useAuthStore();
    if (!error.response) {
      if (!errorOpen) {
        errorOpen = true
        showError('Nessuna connessione al server!', () => { errorOpen = false })
      }
    } else if (error.response.status === 401 && auth.isLogged) {
      if (!errorOpen) {
        errorOpen = true
        showError("Sessione scaduta! Per favore, rieffettua l'accesso.", () => { errorOpen = false })
        auth.logout()
      }
    } else if (error.response.status === 403) {
      if (!errorOpen) {
        errorOpen = true
        showError('Non hai i permessi per eseguire questa azione!', () => {
          errorOpen = false
        })
      }
    } else {
      if (!error.response.data) console.log(error)
      showError(error.response.data?.message || 'C\'è stato un errore inaspettato, ci scusiamo per l\'inconveniente!')
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
