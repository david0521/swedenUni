<template>
<div id="carouselExampleDark" class="carousel carousel-dark slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 4"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="4" aria-label="Slide 5"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="5" aria-label="Slide 6"></button>
  </div>
  <!-- Introduction for each universities. Order based on QS rankings. -->
  <!-- Change the information later. -->
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="../assets/KTH_Main.png" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5 class="main-font">스웨덴 왕립 공과 대학교</h5>
        <p class="caption-font">QS 세계랭킹 2024년 기준 73등을 자랑하는 공과대학교</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="../assets/Lund_Main.png" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5 class="main-font">룬드 대학교</h5>
        <p class="caption-font">QS 세계랭킹 2024년 기준 85등을 자랑하는 종합대학교 </p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="../assets/Uppsala_Main.png" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5 class="main-font">웁살라 대학교</h5>
        <p class="caption-font">QS 세계랭킹 2024년 기준 105등의 스웨덴에서 가장 오래된 종합대학교</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="../assets/Stockholm_Main.png" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5 class="main-font">스톡홀름 대학교</h5>
        <p class="caption-font">QS 세계랭킹 2024년 기준 118등의 스웨덴의 종합대학교</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="../assets/Chalmers_Main.png" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5 class="main-font">샬머스 공과대학교</h5>
        <p class="caption-font">QS 세계랭킹 2024년 기준 129등의 스웨덴의 공과 대학교</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="../assets/Gothenburg_Main.png" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5 class="main-font">예테보리 대학교</h5>
        <p class="caption-font">QS 세계랭킹 2024년 기준 187등의 스웨덴의 종합대학교</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
</template>

<style>
/* Define font family */
@import url('https://fonts.googleapis.com/css2?family=Song+Myung&family=Stylish&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo&family=Song+Myung&family=Stylish&display=swap');

/* Apply font to Korean text */
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