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

<style>
@import url('https://fonts.googleapis.com/css2?family=Song+Myung&family=Stylish&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo&family=Song+Myung&family=Stylish&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Nanum+Brush+Script&family=Nanum+Gothic+Coding:wght@700&display=swap');

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

.third-font {
  font-family: "Nanum Gothic Coding", monospace;
  font-weight: 700;
  font-style: normal;
}

</style>

