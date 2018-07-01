import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin'
import Subjects from '@/components/Subjects'

Vue.use(Router)

export default new Router({
  routes: [
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
