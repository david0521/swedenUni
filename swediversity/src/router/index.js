import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import University from '../views/university.vue'
import CityInfo from '../views/CityInfo.vue'
import Admin from '../views/admin/admin.vue'
import AddUni from '../views/admin/AddUni.vue'
import AddProgram from '../views/admin/AddProgram.vue'
import EatDrink from '../views/EatDrink.vue'
import Travel from '../views/Travel.vue'
import Transportation from '../views/Transportation.vue'


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
            path: '/university/:uniName',
            name: 'University',
            component: University
        },
        {
            path: '/university/:uniName/cityInfo',
            name: 'CityInfo',
            component: CityInfo
        },
        {
            path: '/university/:uniName/cityInfo/여행하고',
            name: 'Travel',
            component: Travel
        },
        {
            path: '/university/:uniName/cityInfo/먹고마시고',
            name: 'Eat&Drink',
            component: EatDrink
        },
        {
            path: '/university/:uniName/cityInfo/이동하고',
            name: 'Transportation',
            component: Transportation
        }
        
    ]
})

export default router