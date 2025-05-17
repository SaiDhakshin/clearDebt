import { createRouter, createWebHistory } from "vue-router";
import Home from '@/pages/Home.vue';

const routes = [
    { path: '/', name: 'Home', component: Home, meta: { layout: 'DefaultLayout' } },
    { path: '/add', name: 'AddDebt', component: () => import('@/pages/debtForm.vue'),  meta: { layout: 'DefaultLayout' } },
    { path: '/edit/:id', name: 'edit', component: () => import('@/pages/debtForm.vue'),  meta: { layout: 'DefaultLayout' } },
    { path: '/graph', name: 'graph', component: () => import('@/pages/chartPage.vue'),  meta: { layout: 'DefaultLayout' } },
]

export default createRouter({
    history: createWebHistory(),
    routes
})