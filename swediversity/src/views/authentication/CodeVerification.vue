<template>
    <div>
         <div class="outer-layer">
             <div class="outer-box">
                <div class="password-welcome">
                    <h3 class="main-font">새로운 비밀번호</h3>
                    <h6 class="caption-font">새로운 비밀번호를 입력해주십시오.</h6>
                </div>
                <div class="password-form">
                    <div class="mb-3">
                        <input type="password" class="form-control" id="emailInput" placeholder="비밀번호" v-model="password">
                    </div>
                </div>
                <div v-if="successMessage" class="error-message">
                    <p>{{ successMessage }}</p>
                </div>
                <div v-if="errorMessage" class="error-message">
                    <p>{{ errorMessage }}</p>
                </div>
                <div class="submit-button">
                    <button type="button" class="btn btn-secondary" style="width: 30%" @click="submit">제출</button>
                </div>
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
            password: '',
            successMessage: '',
            errorMessage: ''
        };
    },
    methods: {
        async submit() {
            try {
                const resetToken = this.$route.params.token;
                console.log(resetToken)
                const response = await axios.post('http://localhost:3000/api/auth/resetPassword', {
                    newPassword: this.password,
                    token: resetToken
                });

                this.successMessage = response.data.message

                console.log('Password change successful', response.data);
                this.errorMessage = '';

                this.$router.push('/login')
            } catch (err) {
                console.error('Password change failed', err)
                this.errorMessage = err.response.data.error
            }
        }
    }
 }

 </script>
 
 