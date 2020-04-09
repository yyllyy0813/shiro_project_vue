import Vue from 'vue'
import VueRouter from 'vue-router'
import EventAdd from "../views/EventAdd.vue"
import EventList from "../views/EventList.vue"
import EventSearch from "../views/EventSearch.vue"
import UserList from "../views/UserList.vue"
import UserRegister from "../views/UserRegister.vue"
import Index from "../views/Index"
import EventUpdate from "../views/EventUpdate";

Vue.use(VueRouter)


// 配置资源映射关系
const routes = [
  {
    path:"/",
    name:"用户管理",
    component:Index,
    redirect:"/userlist",
    show:true,
    children:[
      {
        path: '/userlist',
        name: '用户列表',
        component: UserList
      },
      {
        path: '/userregister',
        name: '用户注册',
        component: UserRegister
      }
    ]
  },
  {
    path:"/event",
    name:"事件管理",
    component:Index,
    show:true,
    children:[
      {
        path: '/eventlist',
        name: '事件列表',
        component: EventList
      },
      {
        path: '/eventadd',
        name: '事件增加',
        component: EventAdd
      },
      {
        path: '/eventsearch',
        name: '事件查询',
        component: EventSearch
      }
    ]
  },
  {
    path: '/eventupdate',
    component: EventUpdate,
    show:false
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
