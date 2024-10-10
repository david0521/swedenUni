<template>
    <div>
        <div class="outer-boundary">
            <div class="upper-part">
                <div class="title main-font">
                    <h1>관심 대학교 설정</h1>
                </div>
                <div class="option-container third-font">
                    <div class="option-box" @click="account">
                        <h3>계정정보</h3>
                    </div>
                    <div class="option-box" @click="university">
                        <h3>관심 대학교</h3>
                    </div>
                    <div class="option-box" @click="program">
                        <h3>관심 학과</h3>
                    </div>
                    <div class="option-box" @click="grade">
                        <h3>성적설정</h3>
                    </div>
                </div>
            </div>
            <div class="bottom-part">
                <div class="section-title third-font">
                </div>
                <div v-for="(university, index) in universityNames" :key="index">
                    <div class="university-card">
                        <div class="university-card-inner" @click="pushToUniversity(university)">
                            <h3>{{ university }}</h3>
                        </div>
                        <div class="university-card-down">
                            <button class="like-button btn btn-sm" @click="like(index)">
                                <fa :icon="isliked(index) ? 'heart' : 'fa-regular fa-heart'" />
                            </button>
                            <div class="like-number">
                                <h5>{{ getLikesForUniversity(index) }}</h5>
                            </div>
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
    height: auto;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
}

.upper-part {
    width: 100%;
    height: 35em;
    padding: 2em;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-color: #f5ebe0;
    margin: 0;
    position: relative;
}

.title {
    display: flex;
    align-items: center;
    justify-content: center;
}

.option-container {
    position: relative;
    display: flex;
    justify-content: space-evenly;
    transform: translateY(4.5em);
    z-index: 1;
}

.option-box {
    width: 12%;
    height: 5em;
    background-color: #d6ccc2;
    color: #6c757d;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.bottom-part {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: bottom;
    align-items: center;
    flex-direction: column;
    background-color: #e3d5ca;
    min-height: 50vh;
    gap: 2em;
}

.section-title {
    margin-top: 2.5%
}

.university-card {
    width: 50em;
    height: 10em;
    background-color: #d6ccc2;
    border-radius: 0.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;

}

.university-card-inner {
    height: 70%;
    width: 98%;
    margin-top: 1%;
    border-radius: 0.6em;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: #edede9;
}

.university-card-down {
    display: flex;
    justify-content: flex-end;
    width: 95%;
    
}

.like-button {
    border: none;
    cursor: pointer;
    font-size: 2em;
    color: red;
    transition: color 0.3s;
}

.like-number {
    display: flex;
    align-items: center;
    margin-top: 0.8%

}
.like-button .liked {
    color: #ed4956;
}

.like-button .fa-heart {
    transition: transform 0.2s ease-in-out;
}

.like-button:active .fa-heart {
    transform: scale(1.3);
}
</style>


<script>
import axios from 'axios';

export default {
    data() {
        return {
            liked: [],
            universityNames: [],
            universityLikes: [],
            universityIds: []
        };
    },
    methods: {
        async getUniversityName() {
            try {
                const token = localStorage.getItem('jwtToken');
                if(!token) {
                    throw new Error('토큰이 존재하지 않습니다.')
                }
                axios.defaults.headers.common['Authorization'] = `${token}`;

                const userId = localStorage.getItem('userId');
                const response = await axios.get(`https://swediversity.norwayeast.cloudapp.azure.com/api/users/${userId}/prospective/universities`);

                const universityNames = response.data.universities.map(university => university.name);
                const universityIds = response.data.universities.map(university => university._id);

                this.universityNames = universityNames;
                this.universityIds = universityIds;
                this.getUniLikes();
            } catch (err) {
                console.log(err)
            }
        },
        async getUniLikes() {
            try {
                const universityNames = this.universityNames;
                const requests = universityNames.map(async (uniName) => {
                try {
                    const encodedUniName = encodeURIComponent(uniName);
                    const response = await axios.get(`https://swediversity.norwayeast.cloudapp.azure.com/api/universities/prospective/university?university=${encodedUniName}`);
                    return { name: uniName, likes: response.data.message };
                } catch (error) {
                    console.error(`Failed to fetch likes for ${uniName}:`, error);
                }
                });

                const results = await Promise.all(requests);

                this.liked = new Array(this.universityNames.length).fill(true);

                const universityLikes = results.map(result => ({ name: result.name, likes: result.likes }));

                console.log(universityLikes);
                this.universityLikes = universityLikes;
            } catch (error) {
                console.error(`Failed to fetch likes for ${uniName}:`, error);
            }

        },
        async like(index) {
            try {
                const currentLikeStatus = this.liked[index];
                const universityId = this.universityIds[index];

                console.log(universityId)


                // Delete university if the user unlikes it
                if (currentLikeStatus == true) {
                    const userId = localStorage.getItem('userId');
                    const response = axios.delete(`https://swediversity.norwayeast.cloudapp.azure.com/api/users/${userId}/universities`, 
                        {
                            data: {
                                universities: universityId
                            }
                        }
                    )

                // Regfresh the number of likes for all universities
                this.getUniLikes();

                // Toggle like status locally
                this.liked[index] = !currentLikeStatus;
                }
                // Like university again if the user presses the like button again
                else {
                    const userId = localStorage.getItem('userId');
                    const response = axios.post(`https://swediversity.norwayeast.cloudapp.azure.com/api/users/${userId}/universities`, {
                        universities: universityId
                    })
                }
                
            } catch (err) {
                console.error(`Failed to toggle like for ${universityName}:`, err);
            }
        },
        isliked(index) {
            return this.liked[index]
        },
        getLikesForUniversity(index) {
            const uniLike = this.universityLikes[index];
            return uniLike ? uniLike.likes : 0;
        },
        change() {
            this.$router.push('/email-verify');
        },
        account() {
            this.$router.push('/my-page/account');
        },
        university() {
            this.$router.push('/my-page/university');
        },
        program() {
            this.$router.push('/my-page/program');
        },
        grade() {
            this.$router.push('/my-page/grade');
        },
        pushToUniversity(universityName) {
            this.$router.push(`/university/${universityName}`);
        }
    },
    created() {
        this.getUniversityName();
    }
};
</script>
