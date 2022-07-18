import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {useAuthStore} from "@/stores/auth"
import {useToast} from "bootstrap-vue-3";


function redirect(next: any, path: any) {
    next({
        path: path,
        replace: true
    })
}

function beforeEnter(to: any, from: any, next: any) {
    const auth = useAuthStore();
    if (!auth.isLogged) {
        redirect(next, '/login')
    } else {
        next()
    }
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            beforeEnter
        },
        {
            path: '/register',
            name: 'register',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/RegisterView.vue'),
            beforeEnter(to, from, next) {
                const auth = useAuthStore();
                if (!auth.isLogged) {
                    next()
                } else {
                    redirect(next, '/')
                }
            }
        },
        {
            path: '/login',
            name: 'login',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/LoginView.vue'),
            beforeEnter(to, from, next) {
                const auth = useAuthStore();
                if (!auth.isLogged) {
                    next()
                } else {
                    redirect(next, '/')
                }
            }
        }
    ]
})

export default router
