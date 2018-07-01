import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LessonComponent from '@/components/LessonComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/LessonComponent',
      name: 'LessonComponent',
      component: LessonComponent
    }
  ]
})
