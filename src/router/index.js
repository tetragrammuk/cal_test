import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import calculator from '@/components/calculator'
import bind from '@/components/bind'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: '/cal/',
  routes: [
	{
		path: '',
		redirect: '/HelloWorld',
	},
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/bind/:id',
      name: 'bind',
      meta: {
        title: "會員綁定"
      },
      component: bind
    },
    {
      path: '/tool/:id?',
      name: 'calculator',
      meta: {
        title: "小工具"
      },
      component: calculator
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  } next()
})
export default router
