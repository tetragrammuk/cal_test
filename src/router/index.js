import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import startTable from '@/components/startTable'
import accounting from '@/components/accounting'
import calculator from '@/components/calculator'
import bind from '@/components/bind'
import WinningPercentage from '@/components/WinningPercentage'


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
			path: '/startTable',
			name: 'startTable',
			component: startTable
		},
		{
			path: '/accounting',
			name: 'accounting',
			component: accounting
		},
		{
			path: '/WinningPercentage',
			name: '勝率計算機',
			meta: {
				title: "勝率計算機"
			},
			component: WinningPercentage
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
				title: "設定追蹤清單"
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
