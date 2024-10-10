<template>
  <div class="admin">
    <h1>Add New Program</h1>
    <p>Fill in the form to add a new program to the database</p>
  </div>

    <div class="form-section">
      <input v-model="programName" class="form-control" type="text" placeholder="Program Name" aria-label="default input example">
      <input v-model="programCode" class="form-control" type="text" placeholder="Program Code" aria-label="default input example">
      <select v-model="universityName" class="form-select" aria-label="Default select example">
        <option selected>University Name</option>
        <option v-for="university in universities" :key="university.id" :value="university.name">{{ university.name }}</option>
      </select>
      
      <h6>Prerequisites</h6>
      <div class="prerequisites-container">
        <div v-for="prerequisite in prerequisites" :key="prerequisite.value" class="form-check form-check-inline">
          <input type="checkbox" :id="prerequisite.id" :value="prerequisite.value" v-model="programPrerequisites">
          <label :for="prerequisite.id">{{ prerequisite.label }}</label>
        </div>
      </div>
      <h6>Tuition Fee SEK</h6>
      <input v-model="programTuition" class="form-control" type="text" placeholder="Program Tuition" aria-label="default input example">
      <h6>Program Type</h6>
      <input v-model="programType" class="form-control" type="text" placeholder="Program Type" aria-label="default input example">
      <textarea v-model="programDescription" class="form-control form-control-sm" id="exampleFormControlTextarea1" rows="8" placeholder="Program Description"></textarea>

      <button @click="postProgram" class="btn btn-primary">Add Program</button>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'GothenburgUni',
  data() {
    return {
      programName: '',
      programCode: '',
      programType: '',
      programDescription: '',
      programPrerequisites: [],
      programTuition: 0,
      universityName: '',
      universities: [],
      prerequisites: [
        { id: 'inlineCheckbox1', value: 'Math3B', label: 'Math3B' },
        { id: 'inlineCheckbox2', value: 'Math4', label: 'Math4' },
        { id: 'inlineCheckbox3', value: 'Math5', label: 'Math5' },
        { id: 'inlineCheckbox4', value: 'Physics1A', label: 'Physics1A' },
        { id: 'inlineCheckbox5', value: 'Physics2', label: 'Physics2' },
        { id: 'inlineCheckbox6', value: 'Chemistry1', label: 'Chemistry1' },
        { id: 'inlineCheckbox7', value: 'Chemistry2', label: 'Chemistry2' },
        { id: 'inlineCheckbox8', value: 'Biology1', label: 'Biology1' },
        { id: 'inlineCheckbox9', value: 'Biology2', label: 'Biology2' },
        { id: 'inlineCheckbox10', value: 'Science2', label: 'Science2' },
        { id: 'inlineCheckbox11', value: 'Civics1B', label: 'Civics1B' },
        { id: 'inlineCheckbox12', value: 'History1B', label: 'History1B' },
        { id: 'inlineCheckbox13', value: 'Language3', label: 'Language3' },
        { id: 'inlineCheckbox15', value: 'SpecialRequirement', label: 'SpecialRequirement' }
      ]
    };
  },
  methods: {
    async fetchUniversities() {
      try {
        const response = await axios.get("https://swediversity.norwayeast.cloudapp.azure.com/api/universities");
        this.universities = response.data.univeristies;

      } catch (error) {
        console.error("There was an error fetching universities", error);
      }
    },
    async postProgram() {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          throw new Error('토큰이 존재하지 않습니다.')
        } 
        axios.defaults.headers.common['Authorization'] = `${token}`;

        const response = await axios.post("https://swediversity.norwayeast.cloudapp.azure.com/api/programs", {
          programName: this.programName,
          programCode: this.programCode,
          programDescription: this.programDescription,
          programUniversity: this.universityName,
          programPrerequisites: this.programPrerequisites,
          programTuition: this.programTuition,
          type: this.programType
        });
      } catch (error) {
        console.error("There is an error: ", error);
      }
    }
  },
  created() {
    this.fetchUniversities();
  }
};
</script>

<style>
.admin {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
}

.form-section {
  margin-top: 5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.prerequisites-container {
  display: flex;
  flex-wrap: wrap;
  margin-right: 1rem;
  margin-left: 1rem;
}

.prerequisites-container .form-check {
  margin-right: 0.5rem;
  flex-basis: calc(25% - 0.5rem);
}
</style>
