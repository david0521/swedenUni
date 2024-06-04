<template>
    <div class="introduction-section">
      <h2 class="main-font">스웨대학이란...</h2>
      <p></p>
      <p class="caption-font">
        저는 2022년 스웨덴 대학 입시로 예테보리 대학교 'Software Engineering and Management'에 합격해 현재 2학년에 재학중인 한국인 학생입니다. <br>
        스웨덴 대학에서 배운 것을 토대로 한인 사회에 도움이 되는 개인 프로젝트를 진행하고 싶다는 마음으로 <br>
        '스웨대학'이라는 프로젝트를 진행하게 되었습니다. <br>
      </p>
      <p class="caption-font">
        이번 프로젝트를 통해 스웨덴 대학에 지원하는 방법, 점수 변환 과정, 합격예측, 실제 학생의 리뷰 등의 정보를 담은 <br>
        한국의 대학교 입시 사이트와 비슷한 사이트를 만들고자 합니다. <br>
        물론 첫 개인 프로젝트인만큼 버그또한 존재하겠지만, 이에 대한 피드백을 주시면 저에게 큰 도움이 될 것 같습니다. <br>        
      </p>
      <p class="caption-font">
        감사합니다!!!
      </p>
    </div>
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
        <router-link to="/KTH" class="main-font" style="color: black;">스웨덴 왕립 공과 대학교</router-link>
        <p class="caption-font">QS 세계랭킹 2024년 기준 73등을 자랑하는 공과대학교</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="../assets/Lund_Main.png" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <router-link to="/lund-uni" class="main-font" style="color: black;">룬드 대학교</router-link>
        <p class="caption-font">QS 세계랭킹 2024년 기준 85등을 자랑하는 종합대학교 </p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="../assets/Uppsala_Main.png" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <router-link to="/uppsala-uni" class="main-font" style="color: black;">웁살라 대학교</router-link>
        <p class="caption-font">QS 세계랭킹 2024년 기준 105등의 스웨덴에서 가장 오래된 종합대학교</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="../assets/Stockholm_Main.png" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <router-link to="/stockholm-uni" class="main-font" style="color: black;">스톡홀름 대학교</router-link>
        <p class="caption-font">QS 세계랭킹 2024년 기준 118등의 스웨덴의 종합대학교</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="../assets/Chalmers_Main.png" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <router-link to="/chalmers" class="main-font" style="color: black;">샬머스 대학교</router-link>
        <p class="caption-font">QS 세계랭킹 2024년 기준 129등의 스웨덴의 공과 대학교</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="../assets/Gothenburg_Main.png" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <router-link to="/gothenburg-uni" class="main-font" style="color: black;">예테보리 대학교</router-link>
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

.introduction-section {
  background-color: #f8f9fa;
  padding: 20px;
  text-align: center;
  height: 80vh; /* Adjust this value as needed */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.introduction-section h2 {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
}

.introduction-section p {
  color: #666;
  font-size: 16px;
  line-height: 1.5;
}

/* Ensure the introduction section takes full height */
#app {
  height: 100vh;
}
</style>