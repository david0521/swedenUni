<template>
    <div class="outer-boundary">
        <div :style="upperLayerStyle" class="upper-layer">
            <div class="explain-header third-font">
                <h1>학과 검색</h1>
                <p class="caption-font">
                    스웨덴 대학교에 존재하는 학과에 대해서 검색해보세요. <br>
                    현재, 한정된 작업시간으로 인해, 5개 대학에 대해서만 서비스중입니다.
                </p>
            </div>
            <div class="search-bar-wrapper">
                <div class="search-bar">
                    <input class="form-control form-control-lg" type="text" placeholder="학과 이름" aria-label=".form-control-lg example" v-model="programName">
                </div>
                <div class="search-button">
                    <button type="button" class="btn btn-secondary btn-lg" @click="search()">검색</button>
                </div>
            </div>
        </div>
        <div class="lower-layer">
            <div class="search-option-wrapper">
                <div class="search-option-header third-font">
                    <h1>검색 옵션</h1>
                </div>
                <div class="search-option-content">
                    <div class="search-option-content-left">
                        <div class="search-option">
                            <strong>계열선택</strong>
                            <div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="이과" v-model="programType">
                                <label class="form-check-label" for="inlineRadio1">이과</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="문과" v-model="programType">
                                <label class="form-check-label" for="inlineRadio2">문과</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="예체능" v-model="programType">
                                <label class="form-check-label" for="inlineRadio3">예체능</label>
                            </div>
                            </div>
                        </div>
                        <div class="search-option">
                            <strong>최대 학비 선택</strong>
                                <input class="form-control form-control-sm" type="text" placeholder="최대 학비" aria-label=".form-control-sm example" style="width: 50%;" v-model="fee">
                        </div>
                    </div>
                    <div class="search-option-content-right">
                        <div class="search-option">
                            <strong>자격요건 선택</strong>
                            <div class="checkbox-container">
                                <div v-for="prerequisite in programPrerequisites" :key="prerequisite.value" class="form-check form-check-inline">
                                <input type="checkbox" :id="prerequisite.id" :value="prerequisite.value" v-model="selectedPrerequisites">
                                <label :for="prerequisite.id">{{ prerequisite.label }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-for="(program, index) in programs" :key="index">
                <div class="card-outer">
                    <div class="card-upper" @click="pushToProgram(program.university, program.name)">
                        <div class="card-upper-left">
                            <h5>{{ program.name }}</h5>
                        </div>
                        <div class="card-upper-right">
                            <h6><strong>소속 대학교:</strong> {{ program.university }}</h6>
                            <h6><strong>계열:</strong> {{ program.type }}</h6>
                            <h6><strong>학비:</strong> {{ program.tuition }} SEK</h6>
                        </div>
                    </div>
                    <div class="card-lower">
                        <button class="btn like-button" @click="like(index)">
                            <fa :icon="program.userLiked ? 'heart' : 'fa-regular fa-heart'" />
                        </button>
                        <div class="like-number">
                            <h5> {{ program.likes }} </h5>
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
    height: auto;
    width: 100%;
    background-color: #edede9;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.search-option-wrapper {
    height: 20em;
    width: 80%;
    display: flex;
    flex-direction: column;
    margin-top: 3em;
    border-radius: 0.8em;
    background-color: #d6ccc2;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}

.search-option-header {
    height: 25%;
    color: #6c757d;
    display: flex;
    align-items: center;
    justify-content: center;
}

.search-option-content {
    height: 75%;
    width: 95%;
    display: flex;
    flex-direction: row;
    align-self: center;
    justify-content: center;

}

.search-option-content-left {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.search-option-content-right {
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.search-option {
    height: 50%;
    display: flex;
    flex-direction: column;
    margin: 0.7em;
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
    flex-direction: row;
    cursor: pointer;
    background-color: #edede9;
}

.card-upper-left {
    width: 55%;
    display: flex;
    margin-left: 1em;
    align-self: center;
}

.card-upper-right {
    width: 45%;
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-content: center;
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
            programName: '',
            programType: '',
            meritPoint: '',
            fee: '',
            programs: [],
            selectedPrerequisites:[],
            programPrerequisites: [
                { id: 'inlineCheckbox1', value: 'Math3B', label: 'Math3B' },
                { id: 'inlineCheckbox2', value: 'Math4', label: 'Math4' },
                { id: 'inlineCheckbox3', value: 'Math5', label: 'Math5' },
                { id: 'inlineCheckbox4', value: 'Physics1A', label: 'Physics1A' },
                { id: 'inlineCheckbox5', value: 'Physics2', label: 'Physics2' },
                { id: 'inlineCheckbox6', value: 'Chemistry1', label: 'Chemistry1' },
                { id: 'inlineCheckbox7', value: 'Chemistry2', label: 'Chemistry2' },
                { id: 'inlineCheckbox8', value: 'Biology1', label: 'Biology1' },
                { id: 'inlineCheckbox9', value: 'Biology2', label: 'Biology2' },
                { id: 'inlineCheckbox10', value: 'Science2', label: 'Science2' },
                { id: 'inlineCheckbox11', value: 'Civics1B', label: 'Civics1B' },
                { id: 'inlineCheckbox12', value: 'History1B', label: 'History1B' },
                { id: 'inlineCheckbox13', value: 'Language3', label: 'Language3' },
                { id: 'inlineCheckbox15', value: 'SpecialRequirement', label: 'Special' }
            ]
        }
    },
    methods: {
        isliked(index) {
            return this.programs[index].userLiked
        },
        async search() {
            try 
            {
                 let response;

                 console.log(this.selectedPrerequisites)

                 if (!this.programName && !this.programType && !this.meritPoint && !this.fee && this.selectedPrerequisites.length === 0) {
                    response = await axios.get('http://localhost:3000/api/programs')
                 } else if (!this.programType && !this.meritPoint && !this.fee && this.selectedPrerequisites.length === 0) {
                    response = await axios.get(`http://localhost:3000/api/programs/name/${this.programName}`)
                 }

                 else 
                 {
                    const params = new URLSearchParams();

                    if (this.programName) {
                        params.append('programName', this.programName);
                    }
                    if (this.programType) {
                        params.append('programType', this.programType);
                    }
                    if (this.meritPoint) {
                        params.append('meritPoint', this.meritPoint);
                    }
                    if (this.fee) {
                        params.append('tuition', this.fee);
                    }
                    if (this.selectedPrerequisites.length > 0) {
                        this.selectedPrerequisites.forEach(prerequisite => {
                            params.append('prerequisites', prerequisite);
                        });
                    }

                    response = await axios.get(`http://localhost:3000/api/programs/search?${params.toString()}`);
                 }

                 if (response.data.programs) {
                    this.programs = response.data.programs.map(program => ({
                        name: program.name,
                        code: program.code,
                        university: program.universityName,
                        description: program.programDescription,
                        prerequisite: program.prerequisite,
                        tuition: program.tuitionFee,
                        type: program.type,
                        id: program._id,
                        likes: 0,
                        userLiked: false
                    }))
                 } else {
                    this.programs = [];
                 }

                 await this.getProgramLikes();

                 await this.checkLiked();

            } catch (err) {
                console.error(err);
            }        
        },
        async getProgramLikes() {
            try {
                const programNames = this.programs.map(program => program.name);
                const requests = programNames.map(async (programName) => {
                    try {
                        const encodedProgramName = encodeURIComponent(programName);
                        const response = await axios.get(`http://localhost:3000/api/programs/prospective/program?program=${encodedProgramName}`);
                        return { name: programName, likes: response.data.message };
                    } catch (err) {
                        console.error('Failed to fetch likes:', err)
                    }
                })

                const results = await Promise.all(requests);

                this.programs = this.programs.map(program => {
                    const likeData = results.find(result => result.name === program.name);
                    return { ...program, likes: likeData ? likeData.likes : 0};
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
                const response = await axios.get(`http://localhost:3000/api/users/${userId}/prospective/programs`);

                const likedPrograms = response.data.programs;

                this.programs = this.programs.map(program => {
                    const userLiked = likedPrograms.some(likedProgram => likedProgram.name === program.name);
                    return { ...program, userLiked: userLiked }
                })

            } catch (err) {
                console.error('error: ', err);
            }
        },
        async like(index) {
            try {
                const programId = this.programs[index].id;
                const currentLikeStatus = this.programs[index].userLiked;
                const userId = localStorage.getItem('userId');

                let response;
                
                if (currentLikeStatus) {
                    response = axios.delete(`http://localhost:3000/api/users/${userId}/programs`, 
                        {
                            data: {
                                programs: programId
                            }
                        }
                    )

                    this.getProgramLikes();

                    this.programs[index].userLiked = !currentLikeStatus;
                }

                else {
                    response = axios.post(`http://localhost:3000/api/users/${userId}/programs`, {
                        programs: programId
                    })

                    this.getProgramLikes();

                    this.programs[index].userLiked = !currentLikeStatus;
                }

            } catch (err) {
                console.error('An error occured:', err)
            }
        },
        pushToProgram(university, programName) {
            this.$router.push(`/program/${university}/${programName}`);
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