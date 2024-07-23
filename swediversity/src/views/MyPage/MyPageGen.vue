<template>
    <div>
        <ProspectiveStudentPage v-if="userType === 'prospectiveStudent'" />
        <UniversityStudentPage v-if="userType === 'universityStudent'" />
    </div>
</template>

<script>
import ProspectiveStudentPage from './MyPage.Account.vue'
import UniversityStudentPage from './MyPage.Student.vue'

export default {
    data () {
        return {
            userType: ''
        }
    },

    methods: {
        setUserType() {
            this.userType = localStorage.getItem("userType")
        }
    },

    created() {
        this.setUserType()
    },

    components: {
        ProspectiveStudentPage,
        UniversityStudentPage
    }
}
</script>
