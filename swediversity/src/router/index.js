import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import University from '../views/university.vue'
import Program from '../views/Program.vue'
import CityInfo from '../views/CityInfo/CityInfo.vue'
import Admin from '../views/admin/admin.vue'
import AddUni from '../views/admin/AddUni.vue'
import AddProgram from '../views/admin/AddProgram.vue'
import EatDrink from '../views/CityInfo/EatDrink.vue'
import Travel from '../views/CityInfo/Travel.vue'
import Transportation from '../views/CityInfo/Transportation.vue'
import Login from '../views/authentication/Login.vue'
import Register from '../views/authentication/Register.vue'
import Consent from '../views/authentication/Consent.vue'
import EmailVerification from '../views/authentication/EmailVerification.vue'
import CodeVerification from '../views/authentication/CodeVerification.vue'
import MyPageGen from '../views/MyPage/MyPageGen.vue'
import MyPageAccount from '../views/MyPage/MyPage.Account.vue'
import MyPageUniversity from '../views/MyPage/MyPage.University.vue'
import MyPageProgram from '../views/MyPage/MyPage.Program.vue'
import MyPageGrade from '../views/MyPage/MyPage.Grade.vue'
import UniversitySearch from '../views/UniversitySearch.vue'
import ProgramSearch from '../views/ProgramSearch.vue'
import AddRecord from '../views/admin/AddRecord.vue'
import Process from '../views/admissions/Process.vue'
import Document from '../views/admissions/Documents.vue'
import PrerequisiteExplain from '../views/admissions/PrerequisiteExplain.vue'
import AdmissionRecords from '../views/AdmissionRecords.vue'
import TuitionFee from '../views/TuitionFee.vue'
import CurriculumChange from '../views/admissions/CurriculumChange.vue'
import UniversityReview from '../views/UniversityReview.vue'
import ProgramReview from '../views/ProgramReview.vue'
import UniversityPostList from '../views/UniversityPostList.vue'
import ProgramPostList from '../views/ProgramPostList.vue'
import UniversityPost from '../views/UniversityPost.vue'
import ProgramPost from '../views/ProgramPost.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/consent',
            name: 'Consent',
            component: Consent
        },
        {
            path: '/email-verify',
            name: 'Email Verify',
            component: EmailVerification
        },
        {
            path: '/email-verify/code/:token',
            name: 'Code Verify',
            component: CodeVerification
        },
        {
            path: '/my-page/account',
            name: 'MyPageAccount',
            component: MyPageGen
        },
        {
            path: '/my-page/university',
            name: 'MyPageUniversity',
            component: MyPageUniversity
        },
        {
            path: '/my-page/program',
            name: 'MyPageProgram',
            component: MyPageProgram
        },
        {
            path: '/my-page/grade',
            name: 'MyPageGrade',
            component: MyPageGrade
        },
        {
            path: '/search/university',
            name: 'University Search',
            component: UniversitySearch
        },
        {
            path: '/search/program',
            name: 'Program Search',
            component: ProgramSearch
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
            path: '/admin/addRecord',
            name: 'AddRecord',
            component: AddRecord
        },
        {
            path: '/university/:uniName',
            name: 'University',
            component: University
        },
        {
            path: '/program/:uniName/:programName',
            name: 'Program',
            component: Program
        },
        {
            path: '/program/:uniName/:programName/stats',
            name: 'Admission Stats',
            component: AdmissionRecords
        },
        {
            path: '/program/:uniName/:programName/tuitions',
            name: 'Tuition Fee',
            component: TuitionFee
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
        },
        {
            path: '/admissions/process',
            name: 'Process',
            component: Process
        },
        {
            path: '/admissions/documents',
            name: 'Documents',
            component: Document
        },
        {
            path: '/admissions/prerequisites/explain',
            name: 'Prerequiste Explain',
            component: PrerequisiteExplain
        },
        {
            path: '/admissions/prerequisites/change',
            name: 'Curriculum Change',
            component: CurriculumChange
        },
        {
            path: '/myUni/university/review',
            name: 'University Review',
            component: UniversityReview
        },
        {
            path: '/myUni/program/review',
            name: 'Program Review',
            component: ProgramReview
        },
        {
            path: '/university/:uniName/posts',
            name: 'University Post List',
            component: UniversityPostList
        },
        {
            path: '/program/:uniName/:programName/posts',
            name: 'Program Post List',
            component: ProgramPostList
        },
        {
            path: '/university/:uniName/posts/:id',
            name: 'University Post',
            component: UniversityPost
        },
        {
            path: '/university/:uniName/:programName/posts/:id',
            name: 'Progrma Post',
            component: ProgramPost
        }
        
    ]
})

export default router