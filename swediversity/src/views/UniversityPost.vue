<template>
    <div class="section">
        <div class="container">
            <div class="container-header">
                <div class="container-header-left third-font">
                    <h6>게시판: {{ post.contentCategory }}</h6>
                    <h4>제목: {{ post.title }}</h4>
                    <h6>작성일: {{ post.timeStamp }}</h6>
                </div>
                <div class="container-header-right">
                    <h6>좋아요 수: {{ post.likes }}</h6>
                </div>
            </div>
            <div class="container-body">
                <div class="container-body-content">
                    <p v-html="post.content"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 90em;
    height: 50em;
    display: flex;
    flex-direction: column;
    border-radius: 0.5em;
    background-color: #A4A9AE;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
}

.container-header {
    height: 8em;
    border-bottom: solid #f8f9fa;
    display: flex;
    padding: 0.1em;
}

.container-header-left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 0.1em;
    width: 50%;
}

.container-header-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 0.1em;
    width: 50%;
}

.container-body {
    height: 40em;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container-body-content {
    height: auto;
    height: 38em;
    width: 95%;
    overflow-y: auto;
    background-color: #e9ecef;
    border-radius: 0.2em;
    display: flex;
    padding: 1em;
}
</style>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            post: '',
            title: '',
        }
    },
    methods: {
        async fetchPost() {
            try {
                const postId = this.$route.params.id;
                const response = await axios.get(`https://51.13.63.57/api/posts/contentId/${postId}`);
                
                this.post = response.data.post;

                console.log(this.post);

            } catch (err) {
                console.error(err);
            }
        },
        pushToPost(postId) {
            const uniName = this.$route.params.uniName;
            this.$router.push(`/university/${uniName}/posts/${postId}`)
        }
    },
    created() {
        this.fetchPost();
    }
}
</script>