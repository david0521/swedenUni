<template>
    <div>
         <div class="outer-layer">
             <div class="outer-box">
                <div class="register-welcome">
                    <h3 class="main-font">회원가입</h3>
                    <h6 class="caption-font">다음 정보를 입력하여 회원가입을 완료하여 주시기 바랍니다.</h6>
                </div>
                <div class="register-form">
                    <div class="mb-3">
                        <label for="emailInput" class="form-label">이메일 주소</label>
                        <input type="email" class="form-control" id="emailInput" v-model="email">
                        <div v-if="emailErrorMessage" class="error-message">
                            <p>{{ emailErrorMessage }}</p>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="usernameInput" class="form-label">유저네임</label>
                        <div class="username">
                        <input type="username" class="form-control" id="usernameInput" v-model="username">
                        <button type="button" class="btn btn-secondary" style="width: 10%" @click="checkDuplicate">중복 확인</button>
                        </div>
                        <div v-if="duplicateMessage" class="error-message">
                            <p>{{ duplicateMessage }}</p>
                        </div>
                        <div v-if="idErrorMessage" class="error-message">
                            <p>{{ idErrorMessage }}</p>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="passwordInput" class="form-label">비밀번호</label>
                        <input type="password" class="form-control" id="passwordInput" v-model="password">
                        <div v-if="passwordErrorMessage" class="error-message">
                            <p>{{ passwordErrorMessage }}</p>
                        </div>
                    </div>
                    <div class="account-type">
                        <label for="account-type" class="form-check-label">계정 종류</label>
                        <div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="student" v-model="accountType">
                                <label class="form-check-label" for="inlineRadio1">스웨덴 대학생</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="prospective" v-model="accountType">
                                <label class="form-check-label" for="inlineRadio2">대학 진학 예정</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="normal" v-model="accountType">
                                <label class="form-check-label" for="inlineRadio3">일반인</label>
                            </div>
                        </div>
                        <div v-if="accountErrorMessage" class="error-message">
                            <p>{{ accountErrorMessage }}</p>
                        </div>
                    </div>
                </div>
                <div v-if="errorMessage" class="error-message">
                        <p>{{ errorMessage }}</p>
                </div>
                <div class="register-button">
                    <button type="button" class="btn btn-secondary" style="width: 30%" @click="register">로그인</button>
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
     width: 70%;
     height: 80%;
     padding: 10px;
     display: flex;
     flex-direction: column;
     overflow-y: auto;
     border: 2px solid gray;
     margin: 0;
     border-radius: 15px;
     color: gray;
     box-shadow: 0 8px 16px 8px rgba(0, 0, 0, 0.1);
 }

 .register-welcome {
    height: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
 }

 .register-form {
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

 .register-button {
    height: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
 }

 .other-option {
    height: 15%;
    display: flex;
    flex-direction: row;
 }

 .account-type {
    display: flex;
    flex-direction: column;
 }

 .submit {
    width: 50%;
    display: flex;
    justify-content: center;
 }

 .username {
    display: flex;
    justify-content: space-between;
 }
 
 </style>

 <script>
 import axios from 'axios';

 export default {
    data() {
        return {
            email: '',
            username: '',
            password: '',
            accountType: '',
            errorMessage: '',
            duplicateMessage: '',
            emailErrorMessage: '',
            idErrorMessage: '',
            accountErrorMessage: '',
            passwordErrorMessage: '',
            duplicateStatus: true,
        };
    },
    methods: {
        async checkDuplicate() {
            this.idErrorMessage = ''
            try {
                const response = await axios.get(`https://swediversity.norwayeast.cloudapp.azure.com/api/auth/userName/${this.username}`);
                this.duplicateMessage = response.data.message;
                if (this.duplicateMessage == "사용가능한 아이디입니다.") {
                    this.duplicateStatus = false;
                }
            } catch(err) {

            }
        },
        validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },
        async register() {
            let hasError = false;

            if (this.duplicateStatus === true) {
                    this.idErrorMessage = "아이디 중복확인을 해주십시오.";
                    hasError = true;
            } else {
                this.idErrorMessage = '';
            }

            if (!this.validateEmail(this.email)) {
                this.emailErrorMessage = '유효한 이메일 주소를 입력하십시오.';
                hasError = true;
            } else {
                this.emailErrorMessage = '';
            }

            if (this.password.length < 8) {
                this.passwordErrorMessage = '비밀번호는 최소 8자리 이상이어야합니다.'
                hasError = true;
            } else {
                this.passwordErrorMessage = '';
            }

            if (this.accountType == '') {
                this.accountErrorMessage = '계정 종류를 선택해 주십시오'
                hasError = true;
            } else {
                this.accountErrorMessage = '';
            }

            if (hasError) {
                return;
            }
            try {
                const consents = localStorage.getItem('consentId');

                const response = await axios.post('https://swediversity.norwayeast.cloudapp.azure.com/api/auth/register', {
                    email: this.email,
                    userName: this.username,
                    userType: this.accountType,
                    password: this.password,
                    consents: consents

                });

                console.log('Registration successful', response.data);
                this.errorMessage = '';

                localStorage.removeItem('consentId');

                this.$router.push('/login');
            } catch (err) {
                console.error('Registration failed', err)
                this.errorMessage = err.response.data.error
            }
        }
    },

 }

 </script>
 
 