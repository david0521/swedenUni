<template>
  <div id="app">
    <header>
      <Navbar />
    </header>

    <router-view />
    
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'app',
  components: {
    Navbar
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Song+Myung&family=Stylish&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo&family=Song+Myung&family=Stylish&display=swap');

.main-font {
  font-family: "Song Myung", serif;
  font-weight: 400;
  font-style: normal;
}

.caption-font {
  font-family: "Nanum Myeongjo", serif;
  font-weight: 400;
  font-style: normal;
}

</style>

