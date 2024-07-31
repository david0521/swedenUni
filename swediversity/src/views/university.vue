<template>
  <div v-if="isAlertvisible" class="alert alert-danger alert-dismissible fade show d-flex align-items-center" role="alert">
    
      <strong>{{ alertMessage }}</strong>
      <button type="button" class="btn-close" @click="dismissAlert" aria-label="Close"></button>
    </div>
  <div :style="{ backgroundImage: `url(${imageUrl})` }" class="photo-section">
    <h1 class="main-font">{{ universityName }}</h1>
  </div>
  <div class="explanation">
    <div class="header">
      <h2 class="third-font">대학 정보</h2>
      <p class="caption-font">다음 대학교에 대한 기본적인 정보입니다.</p>
    </div>
    <div class="row">
      <div class="col">
        <div class="box">
          <div class="box-content city-image">
            <h5 class="box-title main-font">도시 정보</h5>
            <h5 class="box-title-story caption-font">
              어떻게 돌아다닐지... <br>
              어디에서 먹을지... <br>
              어디에서 마실지... <br>
              어디를 구경할지... <br>
            </h5>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="box">
          <div class="box-content student-image" @click="pushToReview()">
            <h5 class="box-title main-font">학생 후기</h5>
            <h5 class="box-title-story caption-font">
              학교에 대한 경험은 어땠는지... <br>
              학교에 대한 불만은 있었는지... <br>
              학교에 대한 만족은 없었는지... <br>
              학교에 대해 더 궁금한 점은 없는지... <br>
            </h5>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="box">
          <div class="box-content housing-image">
            <h5 class="box-title main-font">기숙사 정보</h5>
            <h5 class="box-title-story caption-font">
              어떤 방에서 지낼지... <br>
              한 달 가격은 어느정도인지... <br>
              어떤 지역에서 거주할 수 있는지... <br>
              집 대기 시간은 어느 정도인지... <br>
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="program-explanation">
    <div class="header">
      <h2 class="third-font">학과</h2>
      <p class="caption-font">다음 대학교에서 지원할 수 있는 영어로 진행되는 학과 입니다.</p>
    </div>
    <div v-for="(program, index) in programNames" :key="index" class="card-wrapper">
      <div class="card shadow-sm p-3 mb-5 bg-body-tertiary rounded">
        <div class="card-body" @click="pushToProgram(this.uniName, program.name)">
          <h5 class="card-title text-center main-font">{{ program.name }}</h5>
          <p class="card-text caption-font">{{ program.programDescription }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.photo-section {
  background-size: cover;
  background-position: center;
  padding: 20px;
  text-align: center;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.explanation {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 180vh;
  background-color: #e9ecef;
}

.row {
  display: flex;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  height: 100%
}

.col {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

}

.card-body {
  text-align: center;
}

.program-explanation {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #dee2e6;
}

.card-wrapper {
  margin-bottom: 20px;
  width: 55%;
}

.card {
  width: 100%;
}

.box {
  width: 60%;
  height: 70%;
  background-color: #f0f0f0;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.header {
  width: 100%;
  height: 8em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.student-image {
  background-image: url('../assets/studentReview.jpg');
}

.city-image {
  background-image: url('../assets/Stockholm_view.jpg');
  background-size: 170% 100%;
}

.housing-image {
  background-image: url('../assets/housing.jpg');
  background-size: 100% 100%;
}

.box-content {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.box-title {
  font-size: 1.25em;
  margin: 0;
  margin-bottom: 0.5em;
  text-align: left;
}

.box-title-story {
  font-size: 1em;
  margin: 0;
  text-align: left;
  line-height: 1.3;
}

.box-text {
  font-size: 1em;
}

.info-header {
  font-size: 2em;
  margin-bottom: 20px;
  text-align: left;
  text-decoration: underline;
}


</style>

<script>
import axios from "axios";

import GUImage from '../assets/gothenburg_explain.jpg';
import StockholmImage from '../assets/stockholm_explain.jpg';
import KTHImage from '../assets/KTH_explain.jpg';
import LundImage from '../assets/lund_explain.jpg';
import UppsalaImage from '../assets/uppsala_explain.jpg';

export default {
  name: 'University',
  data: function () {
    return {
      universityName: '',
      backendIdentifier: '',
      imageUrl: '',
      programNames: [],
      programDescription: {},
      uniName: '',
      uniLocation: '',
      isAlertvisible: false,
      alertMessage: '',
    }
  },
  methods: {
    async getProgramName() {
      try {
        const response = await axios.get(`http://51.13.63.57/api/programs/byUniversity?universityName=${this.backendIdentifier}`);
        this.programNames = response.data.programs;
      } catch (error) {
        console.error("Error fetching program names:", error);
        this.alertMessage = "프로그램을 가져오는데 오류가 있었습니다."
        this.isAlertvisible = true;
      }
    },
    async dismissAlert() {
      this.isAlertvisible = false;
    },
    pushToProgram(university, programName) {
            this.$router.push(`/program/${university}/${programName}`);
    },
    pushToReview() {
      this.$router.push(`/university/${this.uniName}/posts`)
    }
  },
  created() {
    const uniName = this.$route.params.uniName;
    this.uniName = uniName;
    const universityMap = {
      'University of Gothenburg': { universityName: '예테보리 대학교', backend: 'University%20of%20Gothenburg', image: GUImage },
      'University of Stockholm': { universityName: '스톡홀름 대학교', backend: 'University%20of%20Stockholm', image: StockholmImage },
      'KTH': { universityName: '왕립 공과대학교', backend: 'KTH', image: KTHImage },
      'Lund University': { universityName: '룬드 대학교', backend: 'Lund%20University', image: LundImage },
      'Uppsala University': { universityName: '웁살라 대학교', backend: 'Uppsala%20University', image: UppsalaImage },
    }

    if (universityMap[uniName]) {
      this.universityName = universityMap[uniName].universityName;
      this.backendIdentifier = universityMap[uniName].backend;
      this.imageUrl = universityMap[uniName].image;
      this.getProgramName();
    }
    else {
      console.error('존재하지 않는 대학교:', uniName);
      this.alertMessage = `${uniName}는 아직 시스템에 등록되지 않은 대학교입니다`
      this.isAlertvisible = true;
    }
  }
}
</script>
