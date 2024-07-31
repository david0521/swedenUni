<template>
    <div class="outer-boundary">
        <div :style="upperLayerStyle" class="upper-layer">
            <div class="explain-header third-font">
                <h1>대학교 검색</h1>
                <p class="caption-font">
                    스웨덴에 존재하는 대학교에 대해서 검색해보세요 <br>
                    한정된 작업시간으로 인해 스웨덴 메이저 5개 대학만 서비스 중입니다.
                </p>
            </div>
            <div class="search-bar-wrapper">
                <div class="search-bar">
                    <input class="form-control form-control-lg" type="text" placeholder="대학교 이름" aria-label=".form-control-lg example" v-model="uniName">
                </div>
                <div class="search-region">
                    <select class="form-select form-select-lg" aria-label="Default select example" v-model="cityName">
                        <option selected>도시</option>
                        <option value="스톡홀름">스톡홀름</option>
                        <option value="예테보리">예테보리</option>
                        <option value="말뫼">말뫼</option>
                        <option value="웁살라">웁살라</option>
                        <option value="룬드">룬드</option>
                    </select>
                </div>
                <div class="search-button">
                    <button type="button" class="btn btn-secondary btn-lg" @click="search()">검색</button>
                </div>
            </div>
        </div>
        <div class="lower-layer">
            <div v-for="(university, index) in universities" :key="index">
                <div class="card-outer">
                    <div class="card-upper" @click="pushToUniversity(university.name)">
                        <h3>{{ university.name }}</h3>
                    </div>
                    <div class="card-lower">
                        <button class="like-button btn" @click="like(index)">
                            <fa :icon="university.userLiked ? 'heart' : 'fa-regular fa-heart'" />
                        </button>
                        <div class="like-number">
                            <h5> {{ university.likes }} </h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.outer-boundary {
    display: flex;
    flex-direction: column;
    height: auto;
    align-items: center;
    overflow-y: auto;
}

.upper-layer {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 60vh;
    background-size: cover;
    background-position: center;
    position: relative;
    padding: 2em;
}

.explain-header {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    margin: auto;
    text-align: center;
}

.search-bar-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 1em;
    width: 100%;
    padding: 0 1em;
    transform: translateY(3.5em);
    z-index: 1;
    gap: 0.5rem;
}

.search-bar {
    width: 40%;
}
.search-region {
    width: 20%
}

.search-button {
    width: 10%
}

.lower-layer {
    height: 80vh;
    width: 100%;
    background-color: #edede9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.card-outer {
    width: 50em;
    height: 10em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1em;
    background-color: #d6ccc2;
    border-radius: 0.5em;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;

}

.card-upper {
    height: 70%;
    width: 98%;
    margin-top: 1%;
    border-radius: 0.6em;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #edede9;
    cursor: pointer;
}

.card-lower {
    height: 30%;
    display: flex;
    justify-content: flex-end;
}

.like-button {
    border: none;
    cursor: pointer;
    font-size: 1.5em;
    color: red;
    transition: color 0.3s;
}

.like-number {
    display: flex;
    align-items: center;
    margin-top: 13%;
}

.like-button .liked {
    color: #ed4956
}

.like-button .fa-heart {
    transition: transform 0.2s ease-in-out;
}

.like-button:active .fa-heart {
    transform: scale(1.3);
}
</style>

<script>
import axios from 'axios'
import backgroundImage from '../assets/Stockholm_view.jpg'

export default {
    data() {
        return {
            img: backgroundImage,
            uniName: '',
            cityName: '',
            universities: [],
        }
    },
    methods: {
        isliked(index) {
            return this.universities[index].userLiked
        },
        async search() {
            try {
                /* Search based on four cases
                 * Nothing given: Return all universities
                 * University name given: Search for that particular university
                 * City name given: Search for all universities in that city
                 * City & University name given: Search for that particular university
                 */

                 let response;

                 if (!this.uniName && !this.cityName) {
                    response = await axios.get('http://51.13.63.57/api/universities')
                 }

                 else if ((this.uniName && !this.cityName) || (this.uniName && this.cityName)) {
                    const encodedUniName = encodeURIComponent(this.uniName);
                    response = await axios.get(`http://51.13.63.57/api/universities/name/${encodedUniName}`)

                 } else {
                    response = await axios.get(`http://51.13.63.57/api/universities/byCity?city=${this.cityName}`)
                 }

                 console.log(response)

                 if (response.data.universities) {
                    if (Array.isArray(response.data.universities)) {
                        this.universities = response.data.universities.map(university => ({
                            name: university.name,
                            city: university.city,
                            _id: university._id,
                            programs: university.programs,
                            likes: 0,
                            userLiked: false
                    }));
                } 
                else {
                    const university = response.data.universities;
                    this.universities = [{
                        name: university.name,
                        city: university.city,
                        _id: university._id,
                        programs: university.programs,
                        likes: 0,
                        userLiked: false
                    }];
                }
            } else {
                this.universities = [];
            }

            await this.getUniLikes();

            await this.checkLiked();

            } catch (err) {
                console.error(err);
            }        
        },
        async getUniLikes() {
            try {
                const universityNames = this.universities.map(university => university.name);
                const requests = universityNames.map(async (uniName) => {
                    try {
                        const encodedUniName = encodeURIComponent(uniName);
                        const response = await axios.get(`http://51.13.63.57/api/universities/prospective/university?university=${encodedUniName}`);
                        return { name: uniName, likes: response.data.message };
                    } catch (err) {
                        console.error('Failed to fetch likes:', err)
                    }
                })

                const results = await Promise.all(requests);

                this.universities = this.universities.map(university => {
                    const likeData = results.find(result => result.name === university.name);
                    return { ...university, likes: likeData ? likeData.likes : 0};
                })
            } catch (err) {
                console.error('Failed to fetch likes:', err)
            }
        },
        async checkLiked() {
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    throw new Error('토큰이 존재하지 않습니다.')
                } 
                axios.defaults.headers.common['Authorization'] = `${token}`;

                const userId = localStorage.getItem('userId');
                const response = await axios.get(`http://51.13.63.57/api/users/${userId}/prospective/universities`);

                const likedUniversities = response.data.universities;

                this.universities = this.universities.map(university => {
                    const userLiked = likedUniversities.some(likedUni => likedUni.name === university.name);
                    return { ...university, userLiked: userLiked }
                })

            } catch (err) {
                console.error('error: ', err);
            }
        },
        async like(index) {
            try {
                const universityId = this.universities[index]._id;
                const currentLikeStatus = this.universities[index].userLiked;
                const userId = localStorage.getItem('userId');

                let response;
                
                if (currentLikeStatus) {
                    response = axios.delete(`http://51.13.63.57/api/users/${userId}/universities`, 
                        {
                            data: {
                                universities: universityId
                            }
                        }
                    )

                    this.getUniLikes();

                    this.universities[index].userLiked = !currentLikeStatus;
                }

                else {
                    response = axios.post(`http://51.13.63.57/api/users/${userId}/universities`, {
                        universities: universityId
                    })

                    this.getUniLikes();

                    this.universities[index].userLiked = !currentLikeStatus;
                }

            } catch (err) {
                console.error('An error occured:', err)
            }
        },
        pushToUniversity(universityName) {
            this.$router.push(`/university/${universityName}`);
        }
    },
    computed: {
        upperLayerStyle() {
            return {
                backgroundImage: `url(${this.img})`
            }
        }
    }
}
</script>