<template>
    <div>
        <div class="bestOfBest">
            <div class="title-section main-font">
                <h1>명예의 전당</h1>
            </div>
            <div class="content-section">
                <div class="row">
                    <div class="col">
                        <div class="box">
                            <div class="box-content">
                                <div class="box-1"></div>
                            </div>
                            <div class="box-title-story">
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="box" style="align-self: flex-start;">
                            <div class="box-content">
                                <div class="box-1"></div>
                            </div>
                            <div class="box-title-story">
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="box" style="align-self: flex-end;">
                            <div class="box-content">
                                <div class="box-1"></div>
                            </div>
                            <div class="box-title-story">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="flex-grow: 2"></div>
            <div class="content-section">
                <div class="row">
                    <div class="col">
                        <div class="box">
                            <div class="box-content">
                                <div class="box-1"></div>
                            </div>
                            <div class="box-title-story">
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="box" style="align-self: flex-start;">
                            <div class="box-content">
                                <div class="box-1"></div>
                            </div>
                            <div class="box-title-story">
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="box" style="align-self: flex-end;">
                            <div class="box-content">
                                <div class="box-1"></div>
                            </div>
                            <div class="box-title-story">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="flex-grow: 2"></div>
        </div>
        <div class="other-section-title-wrapper">
            <div class="title-section main-font">
                <h1>한식당</h1>
            </div>
            <div class="subheader-section caption-font">
                <h3>Designed by Koeans in Korea, assembled in Sweden</h3>
            </div>
        </div>
        <div class="other-section">
            <div class="smaller-box"></div>
        </div>
        <div class="other-section-title-wrapper">
            <div class="title-section main-font">
                <h1>한식당<span style="font-size: 10px;">은 아니지만</span> <span style="font-size: 50px;">비슷한거당</span></h1>
            </div>
            <div class="subheader-section caption-font">
                <h3>중식, 일식, 베트남식, 태국식 등등 대충 비슷한 음식들</h3>
            </div>
        </div>
        <div class="other-section">
            <div class="smaller-box"></div>
        </div>
        <div class="other-section-title-wrapper">
            <div class="title-section main-font">
                <h1>그냥 맛있는거당</h1>
            </div>
            <div class="subheader-section caption-font">
                <h3>프렌치, 이탈리안, 스페니쉬, 포르투갈식 등등 걍 맛있는 음식들</h3>
            </div>
        </div>
        <div class="other-section">
            <div class="smaller-box"></div>
        </div>
    </div>
</template>

<style scoped>
.bestOfBest {
  background: linear-gradient(
    to top,
    #EDEDE9 0%,
    #EDEDE9 55%,
    #D9D9D9 55%,
    #D9D9D9 100%
  );
  height: 150vh;
  display: flex;
  flex-direction: column;
}

.title-section {
    margin-top: 3em;
    margin-left: 1em;
    flex-grow: 1;
}

.title-section h1 {
    font-size: 100px;
}

.subheader-section {
    font-size: 24px;
    margin-left: 2em;
    flex-grow: 4;
}

.content-section {
    flex-grow: 12;
}

.other-section-title-wrapper {
    background-color: #EDEDE9;
    height: 25vh;
    display: flex;
    flex-direction: column;
}

.other-section {
    background-color: #EDEDE9;
    height: 40vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem;
}

.box {
  width: 50%;
  height: 90%;
  background-color: #e3d5ca;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-size: cover;
}

.box-1 {
  width: 100%;
  height: 90%;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-size: cover;
}

.box:hover {
    cursor: pointer;
    transform: scale(1.1);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.box-content {
  height: 75%;
  display: flex;
  flex-direction: column;
}

.box-title {
  font-size: 6em;
  margin: 0;
}

.box-title-story {
  font-size: 1em;
  margin: 0;
  text-align: center;
}

.box-text {
  font-size: 1em;
}

.smaller-box {
  width: 15em;
  height: 15em;
  background-color: #e3d5ca;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-size: cover;
}

.smaller-box:hover {
    cursor: pointer;
    transform: scale(1.1);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}
</style>

<script>
export default {
  name: 'University',
  data: function () {
    return {
      koreans: []
    }
  },
}
</script>
