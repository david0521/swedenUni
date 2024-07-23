<template>
    <div>
         <div class="outer-layer">
             <div class="outer-box">
                <div class="login-welcome">
                    <h3 class="main-font">환영합니다</h3>
                    <h6 class="caption-font">다시 찾아주셔서 감사합니다</h6>
                </div>
                <div class="login-form">
                    <div class="mb-3">
                        <label for="emailInput" class="form-label">이메일 주소</label>
                        <input type="email" class="form-control" id="emailInput" v-model="email">
                    </div>
                    <div class="mb-3">
                        <label for="passwordInput" class="form-label">비밀번호</label>
                        <input type="password" class="form-control" id="passwordInput" v-model="password">
                    </div>
                </div>
                <div v-if="errorMessage" class="error-message">
                        <p>{{ errorMessage }}</p>
                    </div>
                <div class="login-button">
                    <button type="button" class="btn btn-secondary" style="width: 30%" @click="login">로그인</button>
                </div>
                <div class="other-option">
                    <div class="register">
                        <button type="button" class="btn btn-link" style="color: gray" @click="toRegistration">회원가입</button>
                    </div>
                    <div class="find-password">
                        <button type="button" class="btn btn-link" style="color: gray" @click="toPasswordChange">비밀번호 변경</button>
                    </div>
                </div>
             </div>
         </div>
    </div> 
 </template>
 
 <style scoped>
 .outer-layer {
     display: flex;
     justify-content: center;
     align-items: center;
     height: 100vh;
     margin: 0;
 }
 
 .outer-box {
     width: 40%;
     height: 50%;
     padding: 10px;
     display: flex;
     flex-direction: column;
     border: 2px solid gray;
     margin: 0;
     border-radius: 15px;
     color: gray;
     box-shadow: 0 8px 16px 8px rgba(0, 0, 0, 0.1);
 }

 .login-welcome {
    height: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
 }

 .login-form {
    height: 50%;
 }

 .error-message {
    align-items: center;
    justify-content: center;
    display: flex;
    -webkit-animation: fadein 2s linear forwards;
    animation: fadein 2s linear forwards;
    opacity: 0;
 }

 @-webkit-keyframes fadein {
  0% { opacity: 0; }
  100% { opacity: 1; }
 }

 @keyframes fadein {
  0% { opacity: 0; }
  100% { opacity: 1; }
 }

 .login-button {
    height: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
 }

 .other-option {
    height: 15%;
    display: flex;
    flex-direction: row;
 }

 .register {
    width: 50%;
    display: flex;
    justify-content: center;
 }
 
 .find-password {
    width: 50%;
    display: flex;
    justify-content: center;
 }
 
 </style>

 <script>
 import axios from 'axios';

 export default {
    data() {
        return {
            email: '',
            password: '',
            errorMessage: ''
        };
    },
    methods: {
        toRegistration() {
            this.$router.push('/consent');
        },
        toPasswordChange() {
            this.$router.push('/email-verify');
        },
        async login() {
            try {
                const response = await axios.post('http://localhost:3000/api/auth/login', {
                    email: this.email,
                    password: this.password
                });

                const { token, refreshToken, userId, userType } = response.data;

                localStorage.setItem('jwtToken', token);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('userId', userId);
                localStorage.setItem('userType', userType)

                axios.defaults.headers.common['Authorization'] = `${token}`;

                console.log('Login successful', response.data);
                this.errorMessage = '';

                this.$router.push('/');
            } catch (err) {
                console.error('Login failed', err)
                this.errorMessage = err.response.data.message
            }
        }
    },
    created() {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `${token}`;
        }
    }

 }

 </script>
 
 