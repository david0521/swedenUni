<template>
    <div v-if="isAlertvisible" class="alert alert-danger alert-dismissible fade show d-flex align-items-center" role="alert">
        <strong>{{ alertMessage }}</strong>
        <button type="button" class="btn-close" @click="dismissAlert" aria-label="Close"></button>
    </div>
    <div :style="{ backgroundImage: `url(${imageUrl})` }" class="photo-section">
      <h1 class="main-font">{{ universityName }}</h1>
      <h5 class="caption-font"> <strong>{{ program.name }}</strong></h5>
    </div>
    
    <div class="explanation">
        <div class="explanation-about fade-in">
            <h1 class="main-font">어떤 학과인가요?</h1>
            <p class="caption-font">{{ program.programDescription }}</p>
        </div>
    </div>
    <div class="explanation">
        <div class="explanation-about fade-in">
            <h1 class="main-font">무엇을 배우나요?</h1>
            <p class="caption-font">{{ program.programDescription }}</p>
        </div>
    </div>
    <div class="explanation">
        <div class="explanation-about fade-in">
            <h1 class="main-font">무엇이 필요한가요?</h1>
            <div class="explanation-box-wrapper">
                <div class="box">
                    <div class="box-header third-font">
                        <h2>학비</h2>
                    </div>
                    <div class="box-content">
                        <h3>{{ program.tuitionFee }} SEK</h3>
                        <p>단, 스웨덴 거주비자 소지시 면제</p>
                    </div>
                </div>
                <div class="box">
                    <div class="box-header third-font">
                        <h2>선수강 과목</h2>
                    </div>
                    <div class="box-content">
                        <ul class="list-unstyled">
                            <h3 v-for="(prerequisite, index) in program.prerequisite" :key="index" style="display: flex; justify-content: center;">
                                {{ prerequisite }}
                            </h3>
                        </ul>
                    </div>
                </div>
                <div class="box">
                    <div class="box-header third-font">
                        <h2>메리트 포인트</h2>
                    </div>
                    <div class="box-content">
                        <div v-for="(avgRecord, index) in avgRecords" :key="index">
                          <h3>{{ avgRecord.round }}  {{ avgRecord.selectionGroup }}: {{ roundUpScore(avgRecord.score) }}</h3>
                        </div>
                        <p>과거 3년치 입시 정보의 평균입니다.</p>
                    </div>
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
    align-items: center;
    height: 180vh;
    background-color: #e9ecef;
  }

  .explanation-about {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1em;
    width: 40em;

  }

  .explanation-box-wrapper {
    display: flex;
    flex-direction: row;
    margin: 2em;
  }

  .box {
    display: flex;
    flex-direction: column;
    width: 20em;
    height: 30em;
    margin: 3em  
  }

  .box-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1em;
  }

  .box-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fade-in {
    opacity: 0;
    transition: opacity 1s ease-in-out;
  }

  .fade-in-visible {
    opacity: 1;
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
        avgRecords: [],
        imageUrl: '',
        program: '',
        isAlertvisible: false,
        alertMessage: '',
      }
    },
    methods: {
      roundUpScore(score) {
        return (Math.ceil(score * 100) / 100).toFixed(2);
      },
      async getProgram() {
        try {
            const response = await axios.get(`http://localhost:3000/api/programs/name/${this.programName}`);
            this.program = response.data.programs[0];

        } catch (err) {
            console.log(err)
        }
      },
      async getMinMeritPoint() {
        try {
          const response = await axios.get(`http://localhost:3000/api/records/name/${this.programName}/avg`)
          this.avgRecords = response.data.stats;

        } catch (err) {

        }
      },
      async dismissAlert() {
        this.isAlertvisible = false;
      },
      observeElements() {
        const options = {
            threshold: 0.1
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-visible')
                }
            });
        }, options);

        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(e1 => {
            observer.observe(e1);
        });
      }
    },
    created() {
      const uniName = this.$route.params.uniName;
      const programName = this.$route.params.programName;
      const universityMap = {
        'University of Gothenburg': { universityName: '예테보리 대학교', image: GUImage },
        'University of Stockholm': { universityName: '스톡홀름 대학교', image: StockholmImage },
        'KTH': { universityName: '왕립 공과대학교', image: KTHImage },
        'Lund University': { universityName: '룬드 대학교', image: LundImage },
        'Uppsala University': { universityName: '웁살라 대학교', image: UppsalaImage },
      }
  
      if (universityMap[uniName]) {
        this.universityName = universityMap[uniName].universityName;
        this.imageUrl = universityMap[uniName].image;
        this.programName = programName
        this.getProgram();
      }
      else {
        console.error('존재하지 않는 대학교:', uniName);
        this.alertMessage = `${uniName}는 아직 시스템에 등록되지 않은 대학교입니다`
        this.isAlertvisible = true;
      }

      this.getMinMeritPoint();
    },
    mounted() {
        this.observeElements();
    }
  }
  </script>
  