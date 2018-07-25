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
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
          </li>
        </ul>
        <span class="navbar-text">
          <button @click="clear()" class="btn btn-outline-secondary" type="button" title="เพิ่มวิชา" style="color:#fff;border-color:#fff;" data-toggle="modal" data-target="#exampleModalCenter">+</button>
        </span>
      </div>
    </nav>
    <br>

    <div v-for="subject in subjects" :key="subject['.key']" v-if="subject.nameSubject === checkSubject" class="my-3 p-3 bg-white rounded box-shadow" style="box-shadow: 0 1px 8px 0 rgba(0,0,0,0.2), 0 1px 10px 0 rgba(0,0,0,0.19);">
      <h6 class="border-bottom border-gray pb-2 mb-0 font-weight-bold" style="text-align:left;font-size:15px;"><a style="font-size:18px;">🎯</a> SCORE</h6>
      <div v-for="(score) in subject.score" :key="score['.key']" class="media text-muted pt-3" style="text-align:left;">
        <button type="button" class="btn btn-primary btn-sm mr-2 rounded font-weight-bold" :style="checkBgColor" style="border:none;width: 40px; height: 40px;margin-top:-5px;">{{(score.firstname.toUpperCase()).substring(0, 1)}}</button>
        <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" style="height:40px;font-size:15px;">
          <strong class="d-block text-gray-dark">
            <router-link to="/lesson" style="text-decoration: none;color:inherit;">
              {{score.firstname}} {{score.lastname}}
            </router-link>
            <div style="text-align:right;">
              <button type="button" class="btn btn-primary btn-sm" style="background-color:rgb(52, 152, 219);;border:none;margin-top:-45px;width:30px;">{{score.score}}</button>
            </div>
          </strong>
        </p>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header" style="background:#74b9ff;color:#fff;">
            <h5 class="modal-title" id="exampleModalCenterTitle">🎯 Input Score</h5>
            <button type="button" data-dismiss="modal" aria-label="Close" style="color:#fff;background:#74b9ff;border:none;font-size:18px;">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default" style="background:#b2bec3;color:#fff;">Firstname</span>
              </div>
              <input v-model="firstnameVal" type="text" placeholder="Firstname..." class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default" style="background:#b2bec3;color:#fff;">Lastname</span>
              </div>
              <input v-model="lastnameVal" type="text" placeholder="Lastname..." class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default" style="background:#b2bec3;color:#fff;">Score</span>
              </div>
              <input v-model="scoreVal" type="number" placeholder="Score..." class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
            </div>
            <br>
            <h6 v-if="lableNotSelect" style="color:red;">*** Please input the information.</h6>
          </div>

          <div class="modal-footer">
            <button @click="saveScore()" type="button" class="btn btn-primary" style="background:#a29bfe;border:none;">💾 Save</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" style="background:#ff7675;border:none;">❎ Close</button>
            <i id="hideModel" data-dismiss="modal"/>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { subjectRef, FIREBASE_AUTH } from './firebase'

export default {
  name: 'score',
  data () {
    return {
      // data Auth
      email: '',
      displayName: '',
      photoURL: '',
      // -------------------------
      showAddChapter: false,
      firstnameVal: '',
      lastnameVal: '',
      scoreVal: '',
      // variable Cookie
      keySubject: '',
      checkSubject: '',
      checkBgColor: '',
      // Upload File
      selectFile: '',
      sheetURL: '',
      youtubeURL: '',
      // Hide
      showProgress: false,
      showInputFile: false,
      showLinkYoutube: false,
      lableNotSelect: false
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
  created () {
    // get Cookie
    this.getCookie()
  },
  firebase: {
    subjects: subjectRef
  },
  methods: {
    saveScore () {
      if (this.scoreVal !== '' && this.firstnameVal !== '' && this.lastnameVal !== '') {
        let indexSubject = this.subjects.findIndex(subjects => subjects['.key'] === this.keySubject)
        let addScore = this.subjects[indexSubject].score

        if (addScore) {
          let insertScore = {
            firstname: this.firstnameVal,
            lastname: this.lastnameVal,
            score: +this.scoreVal
          }
          addScore.push(insertScore)
          subjectRef.child(this.keySubject).update({
            score: addScore
          })
          document.getElementById('hideModel').click()
        } else {
          let addScore = []
          let insertScore = {
            firstname: this.firstnameVal,
            lastname: this.lastnameVal,
            score: +this.scoreVal
          }
          addScore.push(insertScore)
          subjectRef.child(this.keySubject).update({
            score: addScore
          })
          document.getElementById('hideModel').click()
        }
      } else {
        this.lableNotSelect = true
      }
    },
    seen () {
      this.lableNotSelect = false
    },
    clear () {
      this.firstnameVal = ''
      this.lastnameVal = ''
      this.scoreVal = ''
      this.lableNotSelect = false
    },
    sendCookieToPosts (index, videoId) {
      this.$cookie.set('youtubeUrlEmbed', videoId)
      this.$cookie.set('indexChapter', index)
    },
    getCookie () {
      this.keySubject = this.$cookie.get('keySubject')
      this.checkSubject = this.$cookie.get('checkSubject')
      this.checkBgColor = this.$cookie.get('checkBgColor')
      console.log(this.keySubject)
      console.log(this.checkSubject)
      console.log(this.checkBgColor)
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
