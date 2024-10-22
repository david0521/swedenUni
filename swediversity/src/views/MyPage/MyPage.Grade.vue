<template>
    <div>
        <div class="outer-boundary">
            <div class="upper-part">
                <div class="title main-font">
                    <h1>계정 설정</h1>
                </div>
                <div class="option-container third-font">
                    <div class="option-box" @click="account">
                        <h3>계정정보</h3>
                    </div>
                    <div class="option-box" @click="university">
                        <h3>관심 대학교</h3>
                    </div>
                    <div class="option-box" @click="program">
                        <h3>관심 학과</h3>
                    </div>
                    <div class="option-box" @click="grade">
                        <h3>성적설정</h3>
                    </div>
                </div>
            </div>
            <div class="bottom-part">
                <div class="explanation-group">
                    <div class="explanation-header third-font">
                        <h1>성적 관리 페이지</h1>
                    </div>
                    <div class="explanaztion-content caption-font">
                        <p>
                        스웨덴 교육청 (UHR)에서 변환 받은 Merit Point와 Prerequisite 과목을 입력해주세요. <br>
                        모든 정보는 암호화되어 저장됩니다.
                        </p>
                    </div>
                </div>
                <div class="grade-management-group" style="width: 45%">
                    <div class="meritpoint-group">
                        <div class="mb-3" style="width: 60%">
                            <label for="merit-point" class="form-label">Merit Point</label>
                            <input type="merit-point" class="form-control" id="merit-point" style="background-color: #f5ebe0;" v-model="merit" placeholder="Merit point 정보를 입력하시오.">
                        </div>
                        <button type="button" class="btn btn-secondary" style="width: 15%; height: 40%; transform: translateY(2em);" @click="changeMerit">입력</button>
                    </div>
                    <div class="prerequisite-group">
                        <label for="prerequisite" class="form-label">Prerequisites</label>
                        <div class="prerequisites-and-button">
                            <div class="prerequisites-container">
                                <div v-for="prerequisite in programPrerequisites" :key="prerequisite.value" class="form-check form-check-inline">
                                    <input type="checkbox" :id="prerequisite.id" :value="prerequisite.value" v-model="selectedPrerequisites">
                                    <label :for="prerequisite.id">{{ prerequisite.label }}</label>
                                </div>
                            </div>
                            <button type="button" class="btn btn-secondary" style="width: 25%; height: 20%;" @click="changePrerequisite">입력</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.outer-boundary {
    display: flex;
    height: 100vh;
    flex-direction: column;
    align-items: center;
}

.upper-part {
    width: 100%;
    height: 40%;
    padding: 2em;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-color: #f5ebe0;
    margin: 0;
    position: relative;
}

.title {
    display: flex;
    align-items: center;
    justify-content: center;
}

.option-container {
    position: relative;
    display: flex;
    justify-content: space-evenly;
    transform: translateY(4.5em);
    z-index: 1;
}

.option-box {
    width: 12%;
    height: 5em;
    background-color: #d6ccc2;
    color: #6c757d;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.bottom-part {
    width: 100%;
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #e3d5ca;
}

.explanation-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.grade-management-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.meritpoint-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%
}

.prerequisite-group {
    display: flex;
    flex-direction: column;
}

.prerequisites-and-button {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
}

.prerequisites-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
</style>


<script>
import axios from 'axios';

export default {
    data() {
        return {
            merit: '',
            selectedPrerequisites: [],
            programPrerequisites: [
                { id: 'inlineCheckbox1', value: 'Math3B', label: 'Math3B' },
                { id: 'inlineCheckbox2', value: 'Math4', label: 'Math4' },
                { id: 'inlineCheckbox3', value: 'Math5', label: 'Math5' },
                { id: 'inlineCheckbox4', value: 'Physics1A', label: 'Physics1A' },
                { id: 'inlineCheckbox5', value: 'Physics2', label: 'Physics2' },
                { id: 'inlineCheckbox6', value: 'Chemistry1', label: 'Chemistry1' },
                { id: 'inlineCheckbox7', value: 'Chemistry2', label: 'Chemistry2' },
                { id: 'inlineCheckbox8', value: 'Biology1', label: 'Biology1' },
                { id: 'inlineCheckbox9', value: 'Biology2', label: 'Biology2' },
                { id: 'inlineCheckbox10', value: 'Science2', label: 'Science2' },
                { id: 'inlineCheckbox11', value: 'Civics1B', label: 'Civics1B' },
                { id: 'inlineCheckbox12', value: 'History1B', label: 'History1B' },
                { id: 'inlineCheckbox13', value: 'Language3', label: 'Language3' },
                { id: 'inlineCheckbox15', value: 'SpecialRequirement', label: 'Special' }
            ]
        }
    },
    methods: {
        async changeMerit() {
            try {
                const token = localStorage.getItem('jwtToken');
                if(!token) {
                    throw new Error('토큰이 존재하지 않습니다.')
                }
                axios.defaults.headers.common['Authorization'] = `${token}`;

                const userId = localStorage.getItem('userId');
                const response = await axios.post(`https://swediversity.norwayeast.cloudapp.azure.com/api/users/modify/${userId}/meritPoint`, {
                    meritPoint: this.merit
                });

                console.log(response.data)
            } catch (err) {
                console.log(err)
            }
        },
        async changePrerequisite() {
            try {
                const token = localStorage.getItem('jwtToken');
                if(!token) {
                    throw new Error('토큰이 존재하지 않습니다.')
                }
                axios.defaults.headers.common['Authorization'] = `${token}`;

                const userId = localStorage.getItem('userId');
                const response = await axios.post(`https://swediversity.norwayeast.cloudapp.azure.com/api/users/modify/${userId}/prerequisites`, {
                    prerequisites: this.selectedPrerequisites
                });

                console.log(response.data)
            } catch (err) {
                console.log(err)
            }
        },
        account() {
            this.$router.push('/my-page/account');
        },
        university() {
            this.$router.push('/my-page/university');
        },
        program() {
            this.$router.push('/my-page/program');
        },
        grade() {
            this.$router.push('/my-page/grade');
        }
    },
}
</script>
