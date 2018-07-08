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
          <button @click="clearSelectFile(), clearUrlVdo()" class="btn btn-outline-secondary" type="button" title="เพิ่มวิชา" style="color:#fff;border-color:#fff;" data-toggle="modal" data-target="#exampleModalCenter">+</button>
        </span>
      </div>
    </nav>
    <br>

    <div v-for="subject in subjects" :key="subject['.key']" v-if="subject.nameSubject === checkSubject" class="my-3 p-3 bg-white rounded box-shadow" style="box-shadow: 0 1px 8px 0 rgba(0,0,0,0.2), 0 1px 10px 0 rgba(0,0,0,0.19);">
      <h6 class="border-bottom border-gray pb-2 mb-0 font-weight-bold" style="text-align:left;font-size:15px;"><a style="font-size:18px;">📗</a> LESSON</h6>
      <div v-for="(chapter, index) in subject.lesson" :key="chapter['.key']" class="media text-muted pt-3" style="text-align:left;">
        <router-link to="/createposts">
          <button @click="sendCookieToPosts(index, chapter.videoId)" type="button" class="btn btn-primary btn-sm mr-2 rounded font-weight-bold" :style="checkBgColor" style="border:none;width: 40px; height: 40px;">{{chapter.chapter.substring(8, 9)}}</button>
        </router-link>
        <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
          <strong class="d-block text-gray-dark" style="font-size:15px;">
            <router-link to="/createposts" style="text-decoration: none;color:inherit;" @click="sendCookieToPosts(index, chapter.videoId)">
              {{chapter.chapter}}
            </router-link>
            <div style="text-align:right;">
              <!-- <button type="button" class="btn btn-primary btn-sm" style="background-color:#f1c40f;border:none;margin-top:-45px;"><a style="font-size:15px;">✏️</a> Edit</button> -->
              <!-- <button @click="deleteSubject(subject['.key'])" type="button" class="btn btn-primary btn-sm" style="background-color:#f1c40f;border:none;margin-top:-45px;"><a style="font-size:15px;">🗑️</a> Delete</button> -->
            </div>
          </strong>
           {{chapter.posts}}
        </p>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header" style="background:#74b9ff;color:#fff;">
            <h5 class="modal-title" id="exampleModalCenterTitle">💬 Create Chapter</h5>
            <button type="button" data-dismiss="modal" aria-label="Close" style="color:#fff;background:#74b9ff;border:none;font-size:18px;">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default" style="background:#b2bec3;color:#fff;">Chapter</span>
              </div>
              <input v-model="chapterVal" type="text" placeholder="Chapter..." class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default" style="background:#b2bec3;color:#fff;">Topic</span>
              </div>
              <input v-model="topic" type="text" placeholder="Topic..." class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
            </div>

            <br>
            <div class="input-group mb-3" v-if="showInputFile">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default" style="background:#fff;border:none;">
                  <img src="../assets/fileIcon.png" style="height:28px;">
                </span>
              </div>
              <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" id="showFileName" disabled="disabled" style="background:#fff;border:none;">
              <div class="input-group-append">
                <button @click="clearSelectFile()" class="input-group-text" style="background:#fff;outline:none;border:none;"><b>x</b></button>
              </div>
            </div>
            <!-- Link Youtube -->
            <div class="input-group mb-3" v-if="showLinkYoutube">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default" style="background:#fff;border:none;">
                  <img src="../assets/vdoIcon.png" style="height:20px;">
                </span>
              </div>
              <input v-model="youtubeURL" type="text" placeholder="URL..." class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" id="showFileName" style="background:#fff;border:none;border-bottom: 1px solid black;">
              <div class="input-group-append">
                <button @click="clearUrlVdo()" class="input-group-text" style="background:#fff;outline:none;border:none;"><b>x</b></button>
              </div>
            </div>

            <h6 v-if="lableNotSelect" style="color:red;">*** Please select a file and input the chapter.</h6>

          </div>

          <div class="modal-footer">
            <progress v-if="showProgress" value="0" max="100" id="uploader">0%</progress>
            <div class="upload-btn-wrapper">
              <button class="btn" style="background:#fff;"><img src="../assets/uploadFileIcon.jpg" style="height:24px;"></button>
              <input @click="seen()" type="file" name="myfile" id="fileInput" v-on:change="onFileSelected()"/>
            </div>
            <button @click="showLinkVDO()" class="btn" style="background:#fff;"><img src="../assets/vdoIcon.jpg" style="height:24px;"></button>
            <button @click="onUpload()" type="button" class="btn btn-primary" style="background:#a29bfe;border:none;">💾 Save</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" style="background:#ff7675;border:none;">❎ Close</button>
            <i id="hideModel" data-dismiss="modal"/>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <!-- <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header" style="background:#74b9ff;color:#fff;">
            <h5 class="modal-title" id="exampleModalCenterTitle">📋 Add Chapter</h5>
            <button type="button" data-dismiss="modal" aria-label="Close" style="color:#fff;background:#74b9ff;border:none;font-size:18px;">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default" style="background:#b2bec3;color:#fff;">Chapter</span>
              </div>
              <input v-model="chapterVal" type="text" placeholder="Chapter..." class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
            </div>

            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" style="background:#b2bec3;color:#fff;">Posts</span>
              </div>
              <textarea v-model="posts" placeholder="Messages..." class="form-control" aria-label="With textarea"></textarea>
            </div>
          </div>

          <div class="modal-footer">
            <button @click="addChapter()" type="button" class="btn btn-primary" data-dismiss="modal" style="background:#a29bfe;border:none;">💾 Save</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" style="background:#ff7675;border:none;">❎ Close</button>
          </div>
        </div>
      </div>
    </div> -->

  </div>
</template>

<script>
import { subjectRef, FIREBASE_AUTH, FIREBASE_STORE } from './firebase'
import dateFormat from 'dateformat'

export default {
  name: 'subjects',
  data () {
    return {
      // data Auth
      email: '',
      displayName: '',
      photoURL: '',
      // -------------------------
      showAddChapter: false,
      chapterVal: '',
      topic: '',
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
    showLinkVDO () {
      this.showLinkYoutube = true
    },
    seen () {
      this.lableNotSelect = false
    },
    onFileSelected (e) {
      this.showInputFile = true
      this.selectFile = event.target.files[0]
      setTimeout(() => {
        let fileName = document.getElementById('fileInput').value.match(/[^/\\]+$/)
        document.getElementById('showFileName').value = fileName
      }, 600)
    },
    onUpload () {
      if (this.selectFile !== '' && this.chapterVal !== '') {
        this.showProgress = true
        const storeRef = FIREBASE_STORE.ref(`Subjects/${this.checkSubject}/${this.selectFile.name}`)
        let task = storeRef.put(this.selectFile)

        // state_changed
        task.on('state_changed',
          function progress (snapshot) {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            document.getElementById('uploader').value = percentage.toFixed(0)
            if (percentage === 100) {
              // task.then(snapshot => snapshot.ref.getDownloadURL()).then(url => console.log(url))
              // task.then(snapshot => snapshot.ref.getDownloadURL()).then(function (downloadURL) {})
              document.getElementById('hideModel').click()
            }
          }
        )

        let indexSubject = this.subjects.findIndex(subjects => subjects['.key'] === this.keySubject)
        let addLesson = this.subjects[indexSubject].lesson

        let key = this.keySubject
        let displayName = this.displayName
        let Chapter = `Chapter ${this.chapterVal}`
        let topic = this.topic === '' ? '-' : this.topic
        let fileName = document.getElementById('showFileName').value
        let photoURL = this.photoURL
        let youtubeURL = this.youtubeURL

        // Convert a youtube video url to embed
        let videoId = this.convertUrlToEmbed(youtubeURL)
        let youtubeUrlEmbed = `www.youtube.com/embed/${videoId}`

        task.then(snapshot => snapshot.ref.getDownloadURL()).then(function (downloadURL) {
          if (addLesson) {
            let insertLesson = {
              chapter: Chapter,
              posts: topic,
              sheetURL: downloadURL,
              fileName: fileName,
              youtubeURL: youtubeURL,
              youtubeUrlEmbed: youtubeUrlEmbed,
              videoId: videoId,
              displayName: displayName,
              photoURL: photoURL,
              datePosts: dateFormat(new Date(), 'dd mmmm yyyy')
            }
            addLesson.push(insertLesson)
            subjectRef.child(key).update({
              lesson: addLesson
            })
          } else {
            let arrayLesson = []
            let insertLesson = {
              chapter: Chapter,
              posts: topic,
              sheetURL: downloadURL,
              fileName: fileName,
              youtubeURL: youtubeURL,
              youtubeUrlEmbed: youtubeUrlEmbed,
              videoId: videoId,
              displayName: displayName,
              photoURL: photoURL,
              datePosts: dateFormat(new Date(), 'dd mmmm yyyy')
            }
            arrayLesson.push(insertLesson)
            subjectRef.child(key).update({
              lesson: arrayLesson
            })
          }
        })
      } else {
        this.lableNotSelect = true
      }
    },
    convertUrlToEmbed (youtubeURL) {
      // var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/    <=== ORIGINAL
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      var match = youtubeURL.match(regExp)
      if (match && match[2].length === 11) {
        return match[2]
      }
    },
    getFileName () {
      document.getElementById('fileInput').onchange = function () {
        document.getElementById('showFileName').value = this.value.match(/[^/\\]+$/)
      }
    },
    clearSelectFile () {
      this.selectFile = ''
      this.showProgress = false
      this.showInputFile = false
      this.chapterVal = ''
      this.topic = ''
      // document.getElementById('showFileName').value = ''
    },
    clearUrlVdo () {
      this.showLinkYoutube = false
      this.youtubeURL = ''
    },
    deleteChapter (key) {
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
