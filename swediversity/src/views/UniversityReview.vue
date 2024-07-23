<template>
    <div :style="{ backgroundImage: `url(${imageUrl})` }" class="photo-section">
        <h1 class="main-font">{{ universityName }}</h1>
        <div class="button-wrapper">
            <button type="button" class="btn btn-secondary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLeft" aria-controls="offcanvasExample" @click="writeReview">리뷰 작성하기</button>
            <button class="btn btn-secondary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">작성한 리뷰</button>
          </div>
        <div class="offcanvas offcanvas-start w-75" tabindex="-1" id="offcanvasLeft" aria-labelledby="offcanvasExampleLabel">
            <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">대학교 리뷰</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <h2 class="third-font">대학교 리뷰 작성하기</h2>
            <div class="caption-font">
                현재 재학중이거나 이미 졸업한 스웨덴 대학교에 대한 리뷰를 남겨주세요. <br>
                작성된 리뷰는 스웨덴 대학교에 지원 예정인 후배들에게 큰 도움이 됩니다!!
            </div>
            <div class="post-wrapper">
                <div class="post-header">
                    <h4 class="third-font">게시판을 선택해주세요</h4>
                    <select v-model="postType" class="form-select" aria-label="Default select example" style="width: 60%;">
                        <option selected>게시판</option>
                        <option v-for="postType in postTypes" :key="postType" :value="postType">{{ postType }}</option>
                    </select>
                </div>
                <div class="post-body">
                  <input v-model="contentTitle" class="form-control" type="text" placeholder="제목을 입력해주세요" aria-label="default input example" style="width: 90%; margin: 1em;"> 
                  <div v-if="editor">
                      <div class="markdown-edit">
                      <button class="btn btn-outline-dark btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        글꼴
                      </button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">제목</a></li>
                        <li><a class="dropdown-item" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">부제</a></li>
                        <li><a class="dropdown-item" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">소제</a></li>
                        <li><a class="dropdown-item" @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">문단</a></li>
                      </ul>

                      <button class="btn btn-outline-dark btn-sm" @click="editor.chain().focus().toggleBold().run()" :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
                        Bold
                      </button>

                      <button class="btn btn-outline-dark btn-sm" @click="editor.chain().focus().toggleItalic().run()" :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
                        Italic
                      </button>

                      <button class="btn btn-outline-dark btn-sm" @click="editor.chain().focus().toggleStrike().run()" :disabled="!editor.can().chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
                        Strike
                      </button>

                      <button class="btn btn-outline-dark btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        정렬
                      </button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" @click="editor.chain().focus().setTextAlign('justify').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }">왼쪽</a></li>
                        <li><a class="dropdown-item" @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">가운데</a></li>
                        <li><a class="dropdown-item" @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">오른쪽</a></li>
                      </ul>
                      </div>
                  </div>
                  <div class="editor-content">
                    <EditorContent :editor="editor" />
                  </div>
                </div>
                <button type="button" class="btn btn-secondary" @click="postContent()">작성</button>
            </div>
        </div>
    </div>
    <div class="offcanvas offcanvas-end w-75" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasRightLabel">작성한 리뷰</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <h2 class="third-font">대학교 리뷰 작성하기</h2>
        <div class="caption-font">
          현재까지 작성하신 모든 게시물을 조회할 수 있습니다. <br>
        </div>
        <div class="bottom-part">
                <div v-for="(content, index) in contents" :key="index">
                    <div class="content-box">
                      <div class="content-box-header">
                        <h1>{{ content.title }}</h1>
                        <h6>작성일: {{ content.timeStamp }}</h6>
                      </div>
                      <div class="content-box-body">
                        <p v-html="content.content"></p>
                      </div>
                      <div class="content-box-footer">
                        <button type="button" class="btn btn-lg" @click="deletePost(content._id)">
                          <fa :icon="['fas', 'trash-can']" />
                        </button>
                      </div>
                    </div>
                 </div>
                </div>
            </div>
      </div>
    </div>
</template>

<style scoped>
.photo-section {
  background-size: cover;
  background-position: center;
  padding: 20px;
  text-align: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.button-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 20%;
}

.offcanvas-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    max-height: 100vh; 
}

.post-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    height: 75%;
}

.post-header {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 80%;
    height: 15%;
    margin: 1em;
    padding: 1em;
    background-color: grey;
    border-radius: 1em;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.post-body {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 80%;
    height: 60%;
    margin: 1em;
    background-color: grey;
    border-radius: 1em;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.editor-content {
  margin: 1em;
  height: 50%;
  width: 80%;
  overflow-y: auto;
  background-color: white;
  border-radius: 0.2em;
  position: relative;
  top: 0;
}

.markdown-edit {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.bottom-part {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin: 1rem;
    width: 100%;
}

.content-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40em;
  height: 20em;
  border-radius: 1em;
  background-color: grey;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
}

.content-box-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 4.5em;
  width: 100%;
  border-bottom-style: solid;
  border-bottom-color: white;
}

.content-box-body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 12.5em;
  width: 100%;
  border-bottom-style: solid;
  border-bottom-color: white;
  overflow: hidden;
}

.content-box-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3em;
}

h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }

</style>

<script>
import axios from "axios";

import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'


import { defineComponent, onBeforeUnmount, ref, watch } from 'vue';

import GUImage from '../assets/gothenburg_explain.jpg';
import StockholmImage from '../assets/stockholm_explain.jpg';
import KTHImage from '../assets/KTH_explain.jpg';
import LundImage from '../assets/lund_explain.jpg';
import UppsalaImage from '../assets/uppsala_explain.jpg';

export default {
  name: 'University',
  components: {
    EditorContent,
  },
  setup() {
    const contentBody = ref('');
    const editor = useEditor({
      extensions: [
        TextStyle.configure({ types: [ListItem.name] }),
        StarterKit,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
      ],
      content: '',
      onUpdate({ editor }) {
        contentBody.value = editor.getHTML();
      },
    })

    return {
      editor,
      contentBody
    }
  },
  data: function () {
    return {
      universityName: '',
      backendIdentifier: '',
      imageUrl: '',
      contentTitle: '',
      postType: '',
      postTypes: ['대학생활', '학업', '학생문화'],
      contents: []
    }
  },
  methods: {
    async getUniName() {
        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`http://localhost:3000/api/users/id/${userId}`);

            const university = response.data.studyingUniversity;

            if (!university) {
                this.$router.push('/my-page/account')
            } else {
                this.universityName = university;
            }

        } catch (err) {
          console.error(err);
        }
    },

    async postContent() {
      try {
        const userId = localStorage.getItem('userId');
        const response = axios.post(`http://localhost:3000/api/posts/contentType/universityReview/userId/${userId}`,
          {
            title: this.contentTitle,
            category: this.postType,
            content: this.contentBody
          }
        )

        await this.getContents();

        console.log(response);
      } catch (err) {
        console.error(err);
      }
    },

    async getContents() {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:3000/api/posts/userId/${userId}?type=universityReview`)

        const contents = response.data.contents

        console.log(contents)

        this.contents = contents;
      } catch (err) {
        console.error(err);
      }
    },

    async deletePost(contentId) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/posts/contentId/${contentId}`)

        await this.getContents();
      } catch (err) {
        console.error(err);
      }
    }

  },
  async created() {
    await this.getUniName();
    await this.getContents();

    const universityMap = {
      'University of Gothenburg': { universityName: '예테보리 대학교', image: GUImage },
      'University of Stockholm': { universityName: '스톡홀름 대학교', image: StockholmImage },
      'KTH': { universityName: '왕립 공과대학교', backend: 'KTH', image: KTHImage },
      'Lund University': { universityName: '룬드 대학교', image: LundImage },
      'Uppsala University': { universityName: '웁살라 대학교', image: UppsalaImage },
    }

    if (universityMap[this.universityName]) {
      this.imageUrl = universityMap[this.universityName].image;
      this.universityName = universityMap[this.universityName].universityName;
    }
    else {
      console.error('존재하지 않는 대학교:', uniName);
      this.alertMessage = `${uniName}는 아직 시스템에 등록되지 않은 대학교입니다`
      this.isAlertvisible = true;
    }
  }
}
</script>