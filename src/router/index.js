import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'


//createRouter 创建路由实例
//配置history模式
//1.history模式：createWebHistory 地址栏不带#
//2.hash模式：createWebHashHistory 地址栏带#
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue'),//登录页
    },
    {
      path:'/',
      component: () => import('@/views/layout/LayoutContainer.vue'),//布局架子
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue'),//文章管理
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue'),//频道管理
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue'),//个人信息
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue'),//更换头像
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue'),//更换密码
        },
      ]
    }
  ],
})
//路由守卫,判断是否有token,没有则跳转到登录页
router.beforeEach((to) => {
  const useStore = useUserStore()
  if(!useStore.token && to.path !== '/login'){
    return '/login'
  }
})

export default router
