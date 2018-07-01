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
        <a class="navbar-brand">{{displayName}}</a>
        <img :src="photoURL" style="border-radius:50px;width:50px;height:50px;">
      </div>
    </div>

    <nav class="navbar navbar-expand-lg navbar-light" style="background-color:#4285f4;">
      <a class="navbar-brand" style="color:#fff;">Home</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#" style="color:#fff;">current <span class="sr-only">(current)</span></a>
          </li>
        </ul>
        <span class="navbar-text">
          <button @click="showAddSubjectFc()" class="btn btn-outline-secondary" type="button" title="เพิ่มวิชา" style="color:#fff;border-color:#fff;">+</button>
        </span>
      </div>
    </nav>

    <br>
    <div class="input-group mb-3" v-if="showAddSubject === true">
      <input type="text" class="form-control" placeholder="เพิ่มวิชา" aria-label="Recipient's username" aria-describedby="basic-addon2">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button">+</button>
        <button @click="hideAddSubjectFc()" class="btn btn-outline-secondary" type="button">x</button>
      </div>
    </div>
    <div class="card" style="width: 18rem;">
      <div class="card-header">Featured</div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Cras justo odio</li>
        <li class="list-group-item">Dapibus ac facilisis in</li>
        <li class="list-group-item">Vestibulum at eros</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ItemsRef, FIREBASE_AUTH } from './firebase'

export default {
  name: 'subjects',
  data () {
    return {
      // data Auth
      email: '',
      displayName: '',
      photoURL: '',
      // -------------------------
      showAddSubject: false
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
  firebase: {
    items: ItemsRef
  },
  methods: {
    SignOut () {
      FIREBASE_AUTH.signOut().then(function () {
        console.log('signOut sucess')
      })
      this.email = ''
      this.displayName = ''
      this.photoURL = ''
      this.$router.push('/')
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
</style>
