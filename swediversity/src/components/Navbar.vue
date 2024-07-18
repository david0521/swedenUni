<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand main-font" href="/">스웨대학</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item dropdown ms-5">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            학과 정보
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="/search/program">학과 검색</a></li>
            <li><a class="dropdown-item" href="#">학과 관심 순위</a></li>
          </ul>
        </li>
        <li class="nav-item dropdown ms-5">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            대학교 정보
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="/search/university">대학교 검색</a></li>
            <li><a class="dropdown-item" href="#">대학교 관심 순위</a></li>
          </ul>
        </li>
        <li class="nav-item dropdown ms-5">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            지원 정보
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="/admissions/process">지원 과정</a></li>
            <li><a class="dropdown-item" href="/admissions/documents">구비 서류</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">메리트 점수 설명</a></li>
            <li><a class="dropdown-item" href="/admissions/prerequisites/explain">선수강 요건 설명</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="/admissions/prerequisites/change">선수강 요건 수정</a></li>
          </ul>
        </li>
      </ul>
<!-- Right side -->
      <li class="nav-item dropdown list-unstyled">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa fa-user"></i>
            <fa :icon="['far', 'user']" />
          </a>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a v-if="isLoggedIn" class="dropdown-item" href="/my-page/account">나의 계정</a></li>
            <li><a v-if="isLoggedIn" class="dropdown-item" @click="logout()">로그아웃</a></li>
            <li><a v-if="!isLoggedIn" class="dropdown-item" href="/login">로그인</a></li>
            <li><a v-if="!isLoggedIn" class="dropdown-item" href="/register">회원가입</a></li>
          </ul>
      </li>
    </div>
  </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false
    }
  },
  methods: {
    logout() {
      localStorage.setItem('jwtToken', null);
      localStorage.setItem('userId', null);
      this.isLoggedIn = false;
    },
    checkLogin() {
      const jwtToken = localStorage.getItem('jwtToken');
      const userId = localStorage.getItem('userId');

      if (jwtToken !== null) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    }
  },
  created() {
    this.checkLogin();
  }
}

</script>

