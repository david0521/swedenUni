<template>
    <div class="row" style="background-color: #EDEDE9;">
        <div class="col">
            <div :style="{ backgroundImage: `url(${travelImage})` }" class="box">
                <router-link :to="generateRoute('여행하고')" class="main-font" style="color: black; text-decoration: none;">
                <div class="box-content">
                    <h5 class="box-title main-font">여행하고</h5>
                    <h5 class="box-title-story caption-font">
                    </h5>
                </div>
                </router-link>
            </div>
        </div>
        <div class="col">
            <div :style="{ backgroundImage: `url(${drinkImage})` }" class="box">
                <router-link :to="generateRoute('먹고마시고')" class="main-font" style="color: black; text-decoration: none;">
                <div class="box-content">
                    <h5 class="box-title main-font">
                        먹고&<br>
                        마시고
                    </h5>
                    <h5 class="box-title-story caption-font">
                    </h5>
                </div>
                </router-link>
            </div>
        </div>
        <div class="col">
            <div :style="{ backgroundImage: `url(${transportImage})` }" class="box">
                <router-link :to="generateRoute('이동하고')" class="main-font" style="color: black; text-decoration: none;">
                <div class="box-content">
                    <h5 class="box-title main-font">
                        이동하고
                    </h5>
                    <h5 class="box-title-story caption-font">
                    </h5>
                </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.box {
  width: 80%;
  height: 90%;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  background-size: cover;
}

.box:hover {
    cursor: pointer;
    transform: scale(1.1);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.box-content {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.box-title {
  font-size: 6em;
  margin: 0;
  margin-bottom: 0.5em;
  text-align: left;
}

.box-title-story {
  font-size: 1em;
  margin: 0;
  text-align: left;
  line-height: 1.3;
}

.box-text {
  font-size: 1em;
}
</style>

<script>
import transportImage from '../assets/CityInfo/city_info_transport.jpg';
import drinkImage from '../assets/CityInfo/city_info_drink.jpg';
import travelImage from '../assets/CityInfo/city_info_travel.jpg';

export default {
    name: 'CityInfo',
    data() {
        return {
            transportImage,
            drinkImage,
            travelImage
        }
    },
    methods: {
        generateRoute(subPage) {
            const uniName = this.$route.params.uniName;
            return `/university/${uniName}/cityInfo/${subPage}`;
        }
    }
}
</script>
