<template>
  <div class="hello">
    <button class="btnStyle" @click="SignOut()">
      Sign Out
    </button>
    <br>
    {{email}} <br>
    {{displayName}} <br>
    <img :src="photoURL" style="border-radius:200px;width:200px;height:200px;">
  </div>
</template>

<script>
import { ItemsRef, FIREBASE_AUTH } from './firebase'

export default {
  name: 'LessonComponent',
  data () {
    return {
      email: '',
      displayName: '',
      photoURL: ''
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
    }
  }
}
</script>

<style scoped>
h1, h2 {
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
}

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

</style>
