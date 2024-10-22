<template>
    <div class="section">
        <div class="search-section">
            <div class="search-bar">
                <input v-model="title" type="title" class="form-control" id="exampleFormControlInput1">
            </div>
            <button type="button" class="btn btn-secondary btn-sm">검색</button>
        </div>
        <div class="display-options">
            <button type="button" class="btn btn-link" style="color: black; text-decoration: none;">인기순</button>
            <button type="button" class="btn btn-link" style="color: black; text-decoration: none;">최신순</button>
        </div>

        <div class="post-section" style="background-color: transparent; font-weight: bold;">
            <div class="post-type" style="border-right: none">
                <h7>게시판</h7>
            </div>
            <div class="post-title" style="border-right: none">
                <h7>제목</h7>
            </div>
            <div class="post-date" style="border-right: none">
                <h7>시간</h7>
            </div>
            <div class="post-likes" style="border-right: none">
                <h7>좋아요</h7>
            </div>
            <div class="post-views">
                <h7>조회수</h7>
            </div>
        </div>

        <div class="post-wrapper">
            <div v-for="(post, index) in posts" :key="index">
                <div class="post-section" @click="pushToPost(post._id)">
                    <div class="post-type third-font">
                        <h7>{{ post.contentCategory }}</h7>
                    </div>
                    <div class="post-title">
                        <h7>{{ post.title }}</h7>
                    </div>
                    <div class="post-date">
                        <h7>{{ post.timeStamp }}</h7>
                    </div>
                    <div class="post-likes">
                        <h7>{{ post.likes }}</h7>
                    </div>
                    <div class="post-views">
                        <h7>{{ post.likes }}</h7>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.section {
    overflow-y: auto;
    justify-content: flex-start;
}

.search-section {
    width: 60em;
    height: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 1rem;
}

.search-bar {
    width: 60%;
}

.display-options {
    width: 42em;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
}

.post-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
    gap: 0.5rem;
}

.post-section {
    display: flex;
    flex-direction: row;
    width: 70em;
    height: 2.5em;
    border-radius: 0.5rem;
    background-color:#A4A9AE;
    justify-content: center;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;

}

.post-title {
    width: 35em;
    height: 2.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: solid #f8f9fa;
}

.post-type {
    width: 7em;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: solid #f8f9fa;
}

.post-date {
    width: 15em;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: solid #f8f9fa;
}

.post-likes {
    width: 6.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: solid #f8f9fa;
}

.post-views {
    width: 6.5em;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            posts: [],
            title: ''
        }
    },
    methods: {
        async fetchPosts() {
            try {
                const programName = this.$route.params.programName;
                const response = await axios.get(`https://swediversity.norwayeast.cloudapp.azure.com/api/posts/programPost?programName=${programName}`);
                
                this.posts = response.data.post;

                console.log(this.posts);

            } catch (err) {
                console.error(err);
            }
        },
        pushToPost(postId) {
            const uniName = this.$route.params.uniName;
            const programName = this.$route.params.programName;

            this.$router.push(`/university/${uniName}/${programName}/posts/${postId}`)
        }
    },
    created() {
        this.fetchPosts();
    }
}
</script>
