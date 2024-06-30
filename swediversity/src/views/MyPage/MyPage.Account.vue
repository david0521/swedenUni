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
                <div class="mb-3" style="width: 50%">
                    <label for="emailInput" class="form-label">유저네임</label>
                    <input class="form-control" style="background-color: #f5ebe0;" type="text" :value="username" aria-label="Disabled input example" disabled readonly>
                </div>
                <div class="mb-3" style="width: 50%">
                    <label for="emailInput" class="form-label">이메일 주소</label>
                    <input class="form-control" style="background-color: #f5ebe0;"  type="text" :value="email" aria-label="Disabled input example" disabled readonly>
                </div>
                <div class="password-wrapper" style="width: 50%">
                    <div class="mb-3" style="width:60%">
                        <label for="emailInput" class="form-label">비밀번호</label>
                        <input class="form-control" style="background-color: #f5ebe0;"  type="text" value="비밀번호 변경을 원하신다면 변경을 누르십시오." aria-label="Disabled input example" disabled readonly>
                    </div>
                    <button type="button" class="btn btn-secondary" style="width: 15%; height: 40%; transform: translateY(0.5em);" @click="change">변경</button>
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

.password-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
</style>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            username: '',
            email: ''
        }
    },
    methods: {
        async fetchUserName() {
            try {
                const token = localStorage.getItem('jwtToken');
                if(!token) {
                    throw new Error('토큰이 존재하지 않습니다.')
                }
                axios.defaults.headers.common['Authorization'] = `${token}`;

                const userId = localStorage.getItem('userId');
                const response = await axios.get(`http://localhost:3000/api/users/id/${userId}`);

                console.log(response.data)

                this.username = response.data.userName;
                this.email = response.data.email;
            } catch (err) {
                console.log(err)
                if (err.response && err.response.status === 401) {
                    this.$router.push('/login');
                }
            }
        },
        change() {
            this.$router.push('/email-verify');
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
    created() {
        this.fetchUserName();
    }
}
</script>
