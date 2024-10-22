<template>
    <div class="admin">
      <h1>Add New Record</h1>
      <p>Fill in the form to add a new record to the database</p>
    </div>
  
      <div class="form-section">
        <select v-model="programName" class="form-select" aria-label="Default select example">
          <option selected>Program Name</option>
          <option v-for="program in programs" :key="program.id" :value="program.name">{{ program.name }}</option>
        </select>
        <input v-model="minScore" class="form-control" type="text" placeholder="Minimum merit point" aria-label="default input example">
        <input v-model="numOfApplicants" class="form-control" type="text" placeholder="Number of applicants" aria-label="default input example">
        <input v-model="numOfQualified" class="form-control" type="text" placeholder="Number of  qualified applicants" aria-label="default input example">
        <input v-model="acceptedApplicants" class="form-control" type="text" placeholder="Number of accepted applicants" aria-label="default input example">
        <input v-model="year" class="form-control" type="text" placeholder="Year of admission" aria-label="default input example">
        <input v-model="numOfFirstChoice" class="form-control" type="text" placeholder="Number of first choice applicants" aria-label="default input example">
        <select v-model="selectedRound" class="form-select" aria-label="Default select example">
          <option selected>Selected round</option>
          <option v-for="round in rounds" :key="round" :value="round">{{ round }}</option>
        </select>
        <select v-model="selectedSelection" class="form-select" aria-label="Default select example">
          <option selected>Selected selection</option>
          <option v-for="selection in selections" :key="selection" :value="selection">{{ selection }}</option>
        </select>
        <select v-model="selectedSelectionGroup" class="form-select" aria-label="Default select example">
          <option selected>Selected selection group</option>
          <option v-for="selectionGroup in selectionGroups" :key="selectionGroup" :value="selectionGroup">{{ selectionGroup }}</option>
        </select>
        <button @click="postRecords" class="btn btn-primary">Add Record</button>
      </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: 'GothenburgUni',
    data() {
      return {
        programs: [],
        programName: '',
        minScore: '',
        numOfApplicants: '',
        numOfQualified: '',
        acceptedApplicants: '',
        year: '',
        numOfFirstChoice: '',
        rounds: ['round1', 'round2'],
        selectedRound: '',
        selections: ['selection1', 'selection2'],
        selectedSelection: '',
        selectionGroups: ['B1', 'B2', 'B1AV', 'B1BF', 'B2AV', 'B2BF', 'B1AB', 'B2AB', 'AB1', 'BB1', 'AB2', 'BB2'],
        selectedSelectionGroup: ''

      };
    },
    methods: {
      async fetchPrograms() {
        try {
          const response = await axios.get("https://swediversity.norwayeast.cloudapp.azure.com/api/programs");
          this.programs = response.data.programs;
          console.log(response);
        } catch (error) {
          console.error("There was an error fetching universities", error);
        }
      },
      async postRecords() {
        
        try {
            const token = localStorage.getItem('jwtToken');
            if(!token) {
                throw new Error('토큰이 존재하지 않습니다.')
            }
            axios.defaults.headers.common['Authorization'] = `${token}`;
            
            const response = await axios.post("https://swediversity.norwayeast.cloudapp.azure.com/api/records", {
                programName: this.programName,
                minScore: this.minScore,
                applicants: this.numOfApplicants,
                qualified: this.numOfQualified,
                accepted: this.acceptedApplicants,
                year: this.year,
                firstApplicants: this.numOfFirstChoice,
                round: this.selectedRound,
                selection: this.selectedSelection,
                group: this.selectedSelectionGroup
          });
          console.log(response)
        } catch (error) {
          console.error("There is an error: ", error);
        }
      }
    },
    created() {
      this.fetchPrograms();
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
  