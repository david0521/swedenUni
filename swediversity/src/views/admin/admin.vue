<template>
    <div class="admin">
        <h1>Admin Page</h1>
        <p>Select the option that you would like to perform</p>

        <div class="options">
            <button type="button" class="btn btn-light btn-lg">Add University</button>
            <button type="button" class="btn btn-light btn-lg">Add Course</button>
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

  .options{
    margin-top: 5em;
    display: flex;
    gap: 1rem;
    
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
  