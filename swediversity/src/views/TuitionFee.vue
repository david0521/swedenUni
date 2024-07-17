<template>
    <div class="section">
        <h1 class="main-font">학비 계산기</h1>
        <p style="text-align: center;">
            학비를 원화 환산으로 계산한 결과입니다. <br>
            비용문제로 인해 환율은 3시간에 한 번씩 자동으로 업데이트 됩니다. <br>
        </p>
        <div class="box-wrapper">
            <div class="currency-box">
                <div class="input-group mb-3" style="width: 40%;">
                    <span class="input-group-text" id="basic-addon1">SEK</span>
                    <input class="form-control" type="text" v-model="tuitionFee" aria-label="readonly input example" readonly>
                </div>
                <img src="../assets/down-arrow-svgrepo-com.svg" style="width:6%;">
                <div class="input-group mb-3" style="width: 40%">
                    <span class="input-group-text" id="basic-addon1">KRW</span>
                    <input class="form-control" type="text" v-model="koreanCost" aria-label="readonly input example" readonly>
                </div>
                <div class="third-font">
                    <h5>1 SEK = {{ exchangeRate }} KRW</h5>
                </div>
            </div>
            <div class="tuition-semester third-font">
                <h5>한 학기 당 {{ semesterRate }} 원이 필요합니다</h5>
            </div>
        </div>
    </div>
</template>

<style>
.section {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #edede9;
}

.box-wrapper {
    height: 70vh;
    width: 70em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.currency-box {
    height: 30vh;
    width: 50em;
    display: flex;
    flex-direction: column;
    background-color: #e3d5ca;
    border-radius: 2em;
    justify-content: center;
    align-items: center;
}

.tuition-semester {
    height: 20vh;
    width: 50em;
    margin: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

<script>
import axios from 'axios';
export default {
    data: function () {
        return {
            tuitionFee: '',
            exchangeRate: '',
            koreanCost: '',
            semesterRate: ''
        }
    },
    methods: {
      roundUp(fee) {
        return (Math.ceil(fee * 100) / 100).toFixed(1);
      },
      async getTuitionFee() {
        try {
            const programName = this.$route.params.programName;
            const response = await axios.get(`http://localhost:3000/api/programs/name/${programName}`);
            const cost = response.data.programs[0].tuitionFee;

            this.tuitionFee = cost
        } catch (err) {
            console.log(err)
        }
      },
      async getExchange() {
        try {
            const response = await axios.get(`http://localhost:3000/api/records/exchange-rate`);

            this.exchangeRate = response.data.exchangeRate
        } catch (err) {
            console.log(err)
        }
      },
      conversionRate() {
        this.koreanCost = this.roundUp(this.tuitionFee * this.exchangeRate)
        this.semesterRate = this.roundUp(this.koreanCost / 6);
      }
    },
    async created() {
        await this.getTuitionFee()
        await this.getExchange()
        this.conversionRate()
    }
}
</script>
