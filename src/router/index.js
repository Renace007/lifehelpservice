import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AreaCodeTool from '../views/AreaCodeTool.vue'
import ServiceDetail from '../views/ServiceDetail.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/tools/area-code',
        name: 'AreaCodeTool',
        component: AreaCodeTool
    },
    {
        path: '/service/:number',
        name: 'ServiceDetail',
        component: ServiceDetail,
        props: true
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
