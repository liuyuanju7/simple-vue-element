import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from "@/components/HelloWorld";
// import Index from "@/views/index"
// 路由懒加载的方式 使用时才会 加载对应组建
// todo 页面多的时候 在开发模式下代码热更新会很慢，可以重新封装import方法， 只在正式环境才使用懒加载
const HelloWorld = resolve => require(['@/components/HelloWorld'], resolve)
const Index = () => import('@/views/index')
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HelloWorld
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    }
  ]
})

export default router
