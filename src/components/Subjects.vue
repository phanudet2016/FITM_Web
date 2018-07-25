<template>
  <div class="hello">
    <!-- <button class="btnStyle" @click="SignOut()">
      Sign Out
    </button>
    <br>
    {{email}} <br>
    {{displayName}} <br>
    <img :src="photoURL" style="border-radius:200px;width:200px;height:200px;"> -->
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
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <!-- <a class="nav-link" href="#" style="color:#fff;">current <span class="sr-only">(current)</span></a> -->
          </li>
        </ul>
        <span class="navbar-text">
          <button @click="showAddSubjectFc()" class="btn btn-outline-secondary" type="button" title="เพิ่มวิชา" style="color:#fff;border-color:#fff;">+</button>
        </span>
      </div>
    </nav>
    <br>
    <div class="input-group mb-3" v-if="showAddSubject === true" style="box-shadow: 0 1px 8px 0 rgba(0,0,0,0.2), 0 1px 10px 0 rgba(0,0,0,0.19);">
      <input v-model="subjectVal" @keydown.enter.prevent="addSubject()" type="text" class="form-control" placeholder="Add Subject..." aria-label="Recipient's username" aria-describedby="basic-addon2">
      <div class="input-group-append">
        <button @click="addSubject()" class="btn btn-outline-secondary" type="button" style="background-color:#fff;color:#3498db;border:1px solid #3498db;">+</button>
        <button @click="hideAddSubjectFc()" class="btn btn-outline-secondary" type="button" style="background-color:#fff;color:#3498db;border:1px solid #3498db;">x</button>
      </div>
    </div>

    <div class="my-3 p-3 bg-white rounded box-shadow" style="box-shadow: 0 1px 8px 0 rgba(0,0,0,0.2), 0 1px 10px 0 rgba(0,0,0,0.19);">
      <h6 class="border-bottom border-gray pb-2 mb-0 font-weight-bold" style="text-align:left;font-size:15px;"><a style="font-size:18px;">📗</a> SUBJECTS</h6>
      <div v-for="subject in subjects" :key="subject['.key']" class="media text-muted pt-3" style="text-align:left;">
        <router-link to="/lesson">
          <button @click="sendCookie(subject['.key'], subject.nameSubject, subject.backgroundColor)" type="button" class="btn btn-primary btn-sm mr-2 rounded font-weight-bold" :style="subject.backgroundColor" style="border:none;width: 40px; height: 40px;margin-top:-5px;">{{(subject.nameSubject.toUpperCase()).substring(0, 1)}}</button>
        </router-link>
        <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" style="height:40px;font-size:15px;">
          <strong class="d-block text-gray-dark">
            <router-link to="/lesson" style="text-decoration: none;color:inherit;">
              {{subject.nameSubject}}
            </router-link>
            <div style="text-align:right;">
              <!-- <button type="button" class="btn btn-primary btn-sm" style="background-color:#f1c40f;border:none;margin-top:-45px;"><a style="font-size:15px;">💾</a> Save</button> -->
              <router-link to="/score"><button @click="sendCookie(subject['.key'], subject.nameSubject, subject.backgroundColor)" type="button" class="btn btn-primary btn-sm" style="background-color:rgb(52, 152, 219);;border:none;margin-top:-45px;"><a style="font-size:15px;">🎯</a> Score</button></router-link>
              <button @click="deleteSubject(subject['.key'])" type="button" class="btn btn-primary btn-sm" style="background-color:#f1c40f;border:none;margin-top:-45px;"><a style="font-size:15px;">🗑️</a> Delete</button>
            </div>
          </strong>
        </p>
      </div>
    </div>

  </div>
</template>

<script>
import { subjectRef, FIREBASE_AUTH } from './firebase'

export default {
  name: 'subjects',
  data () {
    return {
      // data Auth
      email: '',
      displayName: '',
      photoURL: '',
      // -------------------------
      showAddSubject: false,

      subjectVal: ''
    }
  },
  mounted () {
    FIREBASE_AUTH.onAuthStateChanged((data) => {
      if (data) {
        console.log(data)
        this.email = data.email
        this.displayName = data.displayName
        this.photoURL = data.photoURL
      }
    })
  },
  computed: {
    color: function () {
      var num = Math.round(0xffffff * Math.random())
      var r = num >> 16
      var g = num >> 8 & 255
      var b = num & 255
      return `background: rgb(${r}, ${g}, ${b});`
    }
  },
  firebase: {
    subjects: subjectRef
  },
  methods: {
    sendCookie (keySubject, nameSubject, backgroundColor) {
      this.$cookie.set('keySubject', keySubject)
      this.$cookie.set('checkSubject', nameSubject)
      this.$cookie.set('checkBgColor', backgroundColor)
    },
    addSubject () {
      if (this.subjectVal !== '') {
        // random RGB
        let num = Math.round(0xffffff * Math.random())
        let r = num >> 16
        let g = num >> 8 & 255
        let b = num & 255
        let backgroundColor = `background: rgb(${r}, ${g}, ${b});`
        // *****************************************************

        subjectRef.push({
          nameSubject: this.subjectVal,
          backgroundColor: backgroundColor,
          teacherName: this.displayName
        })
      }
      this.subjectVal = ''
    },
    deleteSubject (key) {
      subjectRef.child(key).remove()
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
    },
    showAddSubjectFc () {
      this.showAddSubject = true
    },
    hideAddSubjectFc () {
      this.showAddSubject = false
    }
  }
}
</script>

<style scoped>
/* h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */

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

@media screen and (max-width: 800px) {
  .hello {
    width: 95%; /* เมื่อความกว้างน้อยกว้า 800px ขนาดความกว่างจะเป็น 95% */
    margin: auto;
  }
}
</style>
