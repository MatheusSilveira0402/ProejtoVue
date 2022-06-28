import Vue from 'vue'
import VueRouter from 'vue-router'

import ArticlesByCategory from '@/components/article/ArticlesByCategory'
import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import ArticleById from '@/components/article/ArticleById'
import Auth from '@/components/auth/Auth'

//import { userKey } from '@/global'


Vue.use(VueRouter)


const routes = [{
    name: 'home',
    path: '/',
    component: Home 
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta: { requiresAdmin: true }
}, {
    name: 'articlesByCategory',
    path: '/categories/:id/articles',
    component: ArticlesByCategory
},{
    name: 'articleById',
    path: '/articles/:id',
    component: ArticleById
},{
    name: 'auth',
    path: '/auth',
    component: Auth
}]

const router = new VueRouter({
    mode: 'history',
    root: '/',
    routes

}) 


export default router