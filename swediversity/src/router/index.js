import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GothenburgInfo from '../views/GothenburgUni.vue'
import Admin from '../views/admin/admin.vue'
import AddUni from '../views/admin/AddUni.vue'
import AddProgram from '../views/admin/AddProgram.vue'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/admin',
            name: 'Admin',
            component: Admin
        },
        {
            path: '/admin/addUni',
            name: 'AddUni',
            component: AddUni
        },
        {
            path: '/admin/addProgram',
            name: 'AddProgram',
            component: AddProgram
        },
        {
            path: '/gothenburg-uni',
            name: 'Gothenburg',
            component: GothenburgInfo
        },
        
    ]
})

export default router