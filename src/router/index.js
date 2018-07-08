import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin'
import Subjects from '@/components/Subjects'
import Lesson from '@/components/Lesson'
import Createposts from '@/components/Createposts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/createposts',
      name: 'createposts',
      component: Createposts
    },
    {
      path: '/lesson',
      name: 'lesson',
      component: Lesson
    },
    {
      path: '/',
      name: 'signin',
      component: Signin
    },
    {
      path: '/subjects',
      name: 'subjects',
      component: Subjects
    }
  ]
})
