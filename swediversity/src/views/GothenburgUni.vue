<template>
  <div class="photo-section">
    <h1 class="main-font">예테보리 대학교</h1>
  </div>
  <div class="explanation">
    <div class="explanation-left"></div>
    <div class="explanation-right"></div>
  </div>
  <div class="courses-explanation">
    <div v-for="(program, index) in programNames" :key="index" class="card-wrapper">
      <div class="card">
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
  background-image: url("../assets/GU_pic.jpg");
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
  height: 80vh;
}

.card-wrapper {
  margin-bottom: 20px;
}

</style>

<script>
import axios from "axios";

export default {
  name: 'GothenburgUni',
  data: function () {
    return {
      programNames: [],
      programDescription: {},
      uniLocation: ''
    }
  },
  methods: {
    async getProgramName() {
      try {
        const response = await axios.get("http://localhost:3000/api/programs/byUniversity?universityName=University%20of%20Gothenburg");
        this.programNames = response.data.programs
      } catch (error) {
        console.error("Error fetching program names:", error);
      }
    }
  },
  beforeMount() {
    this.getProgramName();
  }
}
</script>
