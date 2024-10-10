<template>
    <div class="outer-layer">
        <div class="outer-box">
            <div class="consent-title">
                <h2 class="main-font">개인정보 활용</h2>
            </div>
            <div class="consent-section">
                <div class="title">
                    <h3 class="main-font">동의 이유</h3>
                </div>
                <div class="content">
                    <p>스웨대학 서비스는 유럽 연합에 속한 스웨덴에서 운영됨으로 유럽연합의 개인정보 규제인 GDPR을 따라야합니다. <br>
                        따라서, 로그인과 안내 메일을 전송하기 위한 목적으로 GDPR 7항에 의거해 개인정보 수집 동의를 요청드립니다.
                    </p>
                </div>
            </div>
            <div class="consent-section">
                <div class="title">
                    <h3 class="main-font">수집 데이터</h3>
                </div>
                <div class="content">
                    <p>스웨대학에서는 원활한 서비스를 위해 회원가입시 이메일 주소를 수집합니다.
                    </p>
                </div>
            </div>
            <div class="consent-section">
                <div class="title">
                    <h3 class="main-font">데이터 수집 목적</h3>
                </div>
                <div class="content">
                    <p>수집된 데이터는 다음과 같은 용도로 사용됩니다:</p>
                    <ul>
                        <li>로그인시 본인확인</li>
                        <li>비밀번호 변경시 본인확인</li>
                        <li>중요한 정보 전달을 위한 목적</li>
                    </ul>
                </div>
            </div>
            <div class="consent-section">
                <div class="title">
                    <h3 class="main-font">권리</h3>
                </div>
                <div class="content">
                    <p>본인 개인정보에 대해 다음과 같은 권리를 가집니다:</p>
                    <ul>
                        <li>개인정보에 대한 접근 권한</li>
                        <li>잘못된 개인정보에 대한 수정 권한</li>
                        <li>개인정보 삭제를 요구할 권리</li>
                        <li>개인정보 활용을 제한할 권리</li>
                        <li>개인정보 활용을 거부할 권리</li>
                        <li>개인정보를 활용할 권리</li>
                        <li>개인정보 수집에 대해 언제든지 철회할 권리</li>
                    </ul>
                </div>
            </div>
            <div class="consent-agreement">
                <div class="consent-phrase">
                    <p>아래에 있는 박스를 클릭하신다면, 다음 개인정보 수집 정책에 따라 <strong>이메일 수집에 동의한</strong> 것으로 간주됩니다.</p>
                </div>
                <div class="consent-check">
                    위에 서술된 개인정보 수집 정책에 동의합니다<input type="checkbox" v-model="consentGiven"> 
                </div>
                <div class="consent-next">
                    <button type="button" class="btn btn-secondary" style="width: 20%" @click="submitConsent" :disabled="!consentGiven">다음</button>
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
     height: 60%;
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

 .consent-title {
    display: flex;
    justify-content: center;
 }

 .consent-section {
    display: flex;
    justify-content: left;
    flex-direction: column;
 }

 .title {
    text-decoration: underline;
    padding-left: 3%;
 }

 .content {
    padding-left: 5%;
 }

.consent-agreement {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.consent-phrase {
    display: flex;
    justify-content: center;
}

.consent-check {
    display: flex;
    justify-content: center;
}

.consent-next{
    display: flex;
    justify-content: center;
}
</style>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            consentGiven: false
        };
    },
    methods: {
        async submitConsent() {
            if(this.consentGiven) {
                const response = await axios.post('https://swediversity.norwayeast.cloudapp.azure.com/api/consents/', {
                    topic: 'registerAgreement(v1)',
                    collectedData: 'email',
                    timestamp: new Date(),
                }); 

                const id = response.data.id;
                console.log(id)

                localStorage.setItem('consentId', id);
                this.$router.push('/register')

            } else {
                console.log("Consent not given")
            }
        }
    }
}
</script>
