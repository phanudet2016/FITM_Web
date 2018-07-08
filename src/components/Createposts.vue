<template>
  <div class="hello">
    <div class="card">
      <div class="card-body" style="text-align:right;">
        <a class="navbar-brand">
          {{displayName}}<br>
          <button @click="SignOut()" type="button" class="btn btn-primary btn-sm" style="background-color:#f1c40f;border:none;">sign out</button>
        </a>
        <img :src="photoURL" style="border-radius:60px;width:60px;height:60px;margin-top:-30px;">
      </div>
    </div>

    <nav class="navbar navbar-expand-lg navbar-light" style="background-color:#3498db;">
      <router-link to="/subjects">
        <a class="navbar-brand" style="color:#fff;">Classroom 4U 😊🕒</a>
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </nav>
    <br>

    <!-- <div v-for="subject in subjects" :key="subject['.key']" v-if="subject.nameSubject === checkSubject" class="my-3 p-3 bg-white rounded box-shadow" style="box-shadow: 0 1px 8px 0 rgba(0,0,0,0.2), 0 1px 10px 0 rgba(0,0,0,0.19);">
      <h6 class="border-bottom border-gray pb-2 mb-0 font-weight-bold" style="text-align:left;font-size:15px;"><a style="font-size:18px;">💬</a> POSTS</h6>
      <div v-for="chapter in subject.lesson" :key="chapter['.key']" class="media text-muted pt-3" style="text-align:left;">
        <button type="button" class="btn btn-primary btn-sm mr-2 rounded font-weight-bold" :style="checkBgColor" style="border:none;width: 40px; height: 40px;">{{chapter.chapter.substring(8, 9)}}</button>
        <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
          <strong class="d-block text-gray-dark" style="font-size:15px;">
            {{chapter.chapter}}
            <div style="text-align:right;">
              <button type="button" class="btn btn-primary btn-sm" style="background-color:#f1c40f;border:none;margin-top:-45px;"><a style="font-size:15px;">✏️</a> Edit</button>
              <button @click="deleteSubject(subject['.key'])" type="button" class="btn btn-primary btn-sm" style="background-color:#f1c40f;border:none;margin-top:-45px;"><a style="font-size:15px;">🗑️</a> Delete</button>
            </div>
          </strong>
           {{chapter.posts}}
        </p>
      </div>
    </div> -->

    <!-- Card -->
    <div v-for="subject in subjects" :key="subject['.key']" v-if="subject.nameSubject === checkSubject">
    <div class="card" v-for="(chapter, index) in subject.lesson" :key="chapter['.key']" v-if="index === indexChapter">
      <div class="card-header" style="background:#fff;text-align:left;font-size:14px;">
        <img :src="chapter.photoURL" style="border-radius:35px;width:35px;height:35px;">
        <div style="margin-left:48px;margin-top:-38px;">
          <span>{{chapter.displayName}}</span>
        </div>
        <div style="margin-left:48px;margin-top:-2px;color:#2D9A8C;">
          <span>{{chapter.datePosts}}</span>
        </div>
      </div>
      <div class="card-body" style="background:#fff;text-align:left;">
        <!-- <h5 class="card-title">Special title treatment</h5> -->
        <p class="card-text">{{chapter.posts}}</p>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default" style="background:#fff;border:none;">
              <a :href="chapter.sheetURL"><img src="../assets/fileIcon.png" style="height:28px;"></a>
            </span>
          </div>
          <a :href="chapter.sheetURL"><input type="text" class="form-control" aria-label="Default" :value="chapter.fileName" aria-describedby="inputGroup-sizing-default" id="showFileName" disabled="disabled" style="background:#fff;border:none;"></a>
          <!-- <div class="input-group-append">
            <button @click="clearSelectFile()" class="input-group-text" style="background:#fff;outline:none;border:none;"><b>x</b></button>
          </div> -->
        </div>
        <div class="embed-responsive embed-responsive-16by9">
          <iframe class="embed-responsive-item" :src="urlVDO" allowfullscreen></iframe>
        </div>
        <!-- <a class="btn btn-primary">Go somewhere</a> -->
      </div>
    </div>
    </div>

  </div>
</template>

<script>
import { FIREBASE_AUTH, subjectRef } from './firebase'
// import dateFormat from 'dateformat'

export default {
  name: 'createposts',
  data () {
    return {
      // data Auth
      email: '',
      displayName: '',
      photoURL: '',
      // -------------------------
      showAddChapter: false,
      chapterVal: '',
      posts: '',
      // variable Cookie
      keySubject: '',
      checkSubject: '',
      indexChapter: '',
      youtubeUrlEmbed: ''
      // Hide
    }
  },
  computed: {
    urlVDO: function () {
      var link = `https://www.youtube.com/embed/${this.youtubeUrlEmbed}`
      return link
    }
  },
  mounted () {
    FIREBASE_AUTH.onAuthStateChanged((data) => {
      if (data) {
        // console.log(data)
        this.email = data.email
        this.displayName = data.displayName
        this.photoURL = data.photoURL
      }
    })
  },
  created () {
    // get Cookie
    this.getCookie()
  },
  firebase: {
    subjects: subjectRef
  },
  methods: {
    deleteChapter (key) {
    },
    getCookie () {
      this.keySubject = this.$cookie.get('keySubject')
      this.checkSubject = this.$cookie.get('checkSubject')
      this.checkBgColor = this.$cookie.get('checkBgColor')
      this.indexChapter = +this.$cookie.get('indexChapter')
      this.youtubeUrlEmbed = this.$cookie.get('youtubeUrlEmbed')
      // console.log(this.checkSubject)
      // console.log(this.checkBgColor)
    },
    deleteCookie () {
      this.$cookie.delete('keySubject')
      this.$cookie.delete('checkSubject')
      this.$cookie.delete('checkBgColor')
      this.$cookie.delete('indexChapter')
      this.$cookie.delete('youtubeUrlEmbed')
    },
    SignOut () {
      FIREBASE_AUTH.signOut().then(function () {
        console.log('signOut sucess')
      })
      this.email = ''
      this.displayName = ''
      this.photoURL = ''
      this.$router.push('/')

      // Delete Cookle
      this.deleteCookie()
    }
  }
}
</script>

<style scoped>
.btnStyle {
  background-color: #4285f4;
  border: #4285f4 1px solid;
  color: white;
  height: 58px;
  width: 255px;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
}

.btnStyle:hover {
  box-shadow: 0 1px 8px 0 rgba(0,0,0,0.2), 0 1px 10px 0 rgba(0,0,0,0.19);
}

.hello {
  width: 1000px;
  margin: auto;
}

.card {
  box-shadow: 0 1px 8px 0 rgba(0,0,0,0.2), 0 1px 10px 0 rgba(0,0,0,0.19);
}
.navbar {
  box-shadow: 0 1px 8px 0 rgba(0,0,0,0.2), 0 1px 10px 0 rgba(0,0,0,0.19);
}

/* #uploader {
  -webkit-appearance: none;
  width: 50%;
} */

progress {
  display: block; /* default: inline-block */
  width: 170px;
  height: 5px;
  margin: 2em auto;
  /* padding: 4px; */
  border: 0 none;
  background: #ccc;
  border-radius: 0px;
  /* box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,0.2); */
}
progress::-moz-progress-bar {
  border-radius: 0px;
  background: #74b9ff;
  box-shadow: inset 0 -2px 4px rgba(0,0,0,0.4), 0 2px 5px 0px rgba(0,0,0,0.3);
}
progress::-webkit-progress-bar {
    background: transparent;
}
progress::-webkit-progress-value {
  border-radius: 0px;
  background: #0984e3;
}
progress:after {
  content: attr(value)'%';
}

.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.upload-btn-wrapper input[type=file] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

@media screen and (max-width: 800px) {
  .hello {
    width: 95%; /* เมื่อความกว้างน้อยกว้า 800px ขนาดความกว่างจะเป็น 95% */
    margin: auto;
  }
}
</style>
