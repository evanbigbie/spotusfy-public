import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6b7a4d22 = () => interopDefault(import('../pages/callback.vue' /* webpackChunkName: "pages/callback" */))
const _39c598bf = () => interopDefault(import('../pages/home/index.vue' /* webpackChunkName: "pages/home/index" */))
const _a9812c18 = () => interopDefault(import('../pages/session/_id.vue' /* webpackChunkName: "pages/session/_id" */))
const _7cb8bbc5 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/callback",
    component: _6b7a4d22,
    name: "callback"
  }, {
    path: "/home",
    component: _39c598bf,
    name: "home"
  }, {
    path: "/session/:id?",
    component: _a9812c18,
    name: "session-id"
  }, {
    path: "/",
    component: _7cb8bbc5,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
