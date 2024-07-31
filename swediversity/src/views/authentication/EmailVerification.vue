<template>
    <div>
         <div class="outer-layer">
             <div class="outer-box">
                <div class="password-welcome">
                    <h3 class="main-font">비밀번호 재설정</h3>
                    <h6 class="caption-font">회원가입시 사용했던 이메일을 통해 비밀번호를 재설정 하십시오.</h6>
                </div>
                <div class="password-form">
                    <div class="mb-3">
                        <input type="email" class="form-control" id="emailInput" placeholder="email@email.com" v-model="email">
                    </div>
                </div>
                <div v-if="successMessage" class="error-message">
                    <p>{{ successMessage }}</p>
                </div>
                <div v-if="errorMessage" class="message error-message">
                    <p>{{ errorMessage }}</p>
                </div>
                <div class="submit-button">
                    <button type="button" class="btn btn-secondary" style="width: 30%" @click="submit">제출</button>
                </div>
             </div>
             <div class="caption-font">
                이메일이 메일함에 없을시 스팸 메일함을 확인해주십시오.
             </div>
         </div>
    </div> 
 </template>
 
 <style scoped>
 .outer-layer {
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     height: 100vh;
     margin: 0;
 }
 
 .outer-box {
     width: 40%;
     height: 30%;
     padding: 10px;
     display: flex;
     flex-direction: column;
     border: 2px solid gray;
     margin: 0;
     border-radius: 15px;
     color: gray;
     box-shadow: 0 8px 16px 8px rgba(0, 0, 0, 0.1);
 }

 .password-welcome {
    height: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
 }

 .password-form {
    height: 50%;
    align-content: center;
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

 .submit-button {
    height: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
 }
 
 </style>

 <script>
 import axios from 'axios';

 export default {
    data() {
        return {
            email: '',
            successMessage: '',
            errorMessage: ''
        };
    },
    methods: {
        async submit() {
            try {
                const response = await axios.post('http://51.13.63.57/api/auth/resetPassword/emailRequest', {
                    email: this.email
                });

                this.successMessage = response.data.message

                console.log('Login successful', response.data);
                this.errorMessage = '';

            } catch (err) {
                console.error('Login failed', err)
                this.errorMessage = err.response.data.error
            }
        }
    }
 }

 </script>
 
 