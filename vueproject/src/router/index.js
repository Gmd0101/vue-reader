import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index.vue'
import Find from '@/pages/Find.vue'
import Person from '@/pages/Person.vue'
import Login from '@/pages/Login.vue'
import Write from '@/pages/Write.vue'
import ArticleDetail from '@/pages/ArticleDetail'
import CategoryList from '@/pages/CategoryList'
import Forget from '@/pages/Forget'
import PersonMsg from '@/pages/PersonMsg'
import EditMsg from '@/pages/EditMsg'
import test from '@/pages/test'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Index', component: Index },
    { path: '/find', name: 'Find', component: Find },
    { path: '/person/:id?', name: "Person", component: Person },
    { path: '/login', name: "Login", component: Login },
    { path: '/write', name: 'Write', component: Write },
    { path: '/articledetail/:id?', name: 'ArticleDetail', component: ArticleDetail },
    { path: '/categorylist/:id?', name: 'CategoryList', component: CategoryList },
    { path: '/forget', name: 'Forget', component: Forget },
    { path: '/personmsg', name: 'PersonMsg', component: PersonMsg },
    { path: '/editmsg', name: 'EditMsg', component: EditMsg },
    { path: '/test',name:'test', component: test }
  ]
})
