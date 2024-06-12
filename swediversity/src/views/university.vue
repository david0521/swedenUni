<template>
  <div :style="{ backgroundImage: `url(${imageUrl})` }" class="photo-section">
    <h1 class="main-font">{{ universityName }}</h1>
  </div>
  
  <div class="explanation">
    <div class="row">
      <div class="col">
        <div class="box">
          <div class="box-content">
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
          <div class="box-content">
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
          <div class="box-content">
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
    <div v-for="(program, index) in programNames" :key="index" class="card-wrapper">
      <div class="card shadow-sm p-3 mb-5 bg-body-tertiary rounded">
        <div class="card-body">
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
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
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
      uniLocation: ''
    }
  },
  methods: {
    async getProgramName() {
      try {
        const response = await axios.get(`http://localhost:3000/api/programs/byUniversity?universityName=${this.backendIdentifier}`);
        this.programNames = response.data.programs;
      } catch (error) {
        console.error("Error fetching program names:", error);
      }
    }
  },
  created() {
    const uniName = this.$route.params.uniName;
    const universityMap = {
      '예테보리대학교': { universityName: '예테보리 대학교', backend: 'University%20of%20Gothenburg', image: GUImage },
      '스톡홀름대학교': { universityName: '스톡홀름 대학교', backend: 'University%20of%20Stockholm', image: StockholmImage },
      'KTH': { universityName: '왕립 공과대학교', backend: 'KTH', image: KTHImage },
      '룬드대학교': { universityName: '룬드 대학교', backend: 'Lund%20University', image: LundImage },
      '웁살라대학교': { universityName: '웁살라 대학교', backend: 'Uppsala%20University', image: UppsalaImage },
    }

    if (universityMap[uniName]) {
      this.universityName = universityMap[uniName].universityName;
      this.backendIdentifier = universityMap[uniName].backend;
      this.imageUrl = universityMap[uniName].image;
      this.getProgramName();
    }
    else {
      console.error('존재하지 않는 대학교:', uniName);
    }
  }
}
</script>
