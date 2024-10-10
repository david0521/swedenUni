<template>
    <div class="admin">
        <h1>Add New University</h1>
        <p>Fill in the form to add new university to the database</p>

        <div class="form-section">
            <input v-model="universityName" class="form-control" type="text" placeholder="University Name" aria-label="default input example">
            <select v-model="universityCity" class="form-select" aria-label="Default select example">
                <option selected>University Area</option>
                <option value="스톡홀름">Stockholm</option>
                <option value="예테보리">Gothenburg</option>
                <option value="룬드">Lund</option>
                <option value="웁살라">Uppsala</option>
                <option value="우메오">Umeå</option>
                <option value="린쇼핑">Linköping</option>
                <option value="룰레오">Luleå</option>
                <option value="카를스타드">Karlstad</option>
                <option value="외레브로">Örebro</option>
                <option value="옌셰핑">Jönköping</option>
                <option value="말뫼">Malmö</option>
            </select>

            <button @click="addUniversity" class="btn btn-primary">Add University</button>
        </div>
        
    </div>
  </template>
  
  <style>
  .admin{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh
  }

  .form-section{
    margin-top: 5em;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    
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
        universityName: '',
        universityCity: ''

      }
    },
    methods: {
      async addUniversity() {
        try {
          const response = await axios.post("https://51.13.63.57/api/universities/", {
              name: this.universityName,
              city: this.universityCity
          });
          console.log("Tried sending request", response)
        }

        catch (error) {
          console.error("Error Posting New University: ", error)
        }
      }
    },
  }
  </script>
  