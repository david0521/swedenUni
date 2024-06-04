<template>
    <div class="admin">
        <h1>Add New University</h1>
        <p>Fill in the form to add new university to the database</p>

        <div class="form-section">
            <input class="form-control" type="text" placeholder="University Name" aria-label="default input example">
            <select class="form-select" aria-label="Default select example">
                <option selected>University Area</option>
                <option value="1">Stockholm</option>
                <option value="2">Gothenburg</option>
                <option value="3">Lund</option>
                <option value="4">Uppsala</option>
                <option value="5">Umeå</option>
                <option value="6">Linköping</option>
                <option value="7">Luleå</option>
                <option value="8">Karlstad</option>
                <option value="9">Örebro</option>
                <option value="10">Jönköping</option>
                <option value="11">Malmö</option>
                
                
                
            </select>
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
  