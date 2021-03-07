const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Dashboard.vue'), meta: { title: 'Skills - MyApp', allowAnonymous: true }},
      {path: '/Login', component: () => import('pages/Login.vue'), meta: { title: 'Skills - MyApp', allowAnonymous: true }},
      {path: '/Register', component: () => import('pages/Register.vue'), meta: { title: 'Skills - MyApp', allowAnonymous: true }},
      {path: '/BmiCalculator', component: () => import('pages/BmiCalculator.vue'), meta: { title: 'Skills - MyApp', allowAnonymous: true }},
      {path: '/Chatroom', component: () => import('pages/Chatroom.vue'), meta: { title: 'Skills - MyApp', allowAnonymous: true }},
      {path: '/Periodtracker', component: () => import('pages/Periodtracker.vue'), meta: { title: 'Skills - MyApp', allowAnonymous: true }},
      {path: '/Covid', component: () => import('pages/Covid.vue'), meta: { title: 'Skills - MyApp', allowAnonymous: true }},
      {path: '/Dashboard2', component: () => import('pages/Dashboard2.vue'), meta: { title: 'Skills - MyApp', allowAnonymous: true }},
      {path: '/Profile', component: () => import('pages/UserProfile.vue'), meta: { title: 'Skills - MyApp', allowAnonymous: true }},
      {path: '/Map', component: () => import('pages/Map.vue'), meta: { title: 'Skills - MyApp', allowAnonymous: true }},
      {path: '/MapMarker', component: () => import('pages/MapMarker.vue'), meta: { title: 'Skills - MyApp', allowAnonymous: true }},
      {path: '/StreetView', component: () => import('pages/StreetView.vue'), meta: { title: 'Skills - MyApp', allowAnonymous: true }},
      {path: '/TreeTable', component: () => import('pages/TreeTable.vue'), meta: { title: 'Skills - MyApp', allowAnonymous: true }},
      {path: '/Charts', component: () => import('pages/Charts.vue'), meta: { title: 'Skills - MyApp', allowAnonymous: true }},
      {path: '/Cards', component: () => import('pages/Cards.vue')},
      {path: '/Tables', component: () => import('pages/Tables.vue')},
      {path: '/Contact', component: () => import('pages/Contact.vue'), meta: { title: 'Skills - MyApp', allowAnonymous: true }},
      {path: '/Checkout', component: () => import('pages/Checkout.vue')},
      {path: '/Calendar', component: () => import('pages/Calendar.vue')},
      {path: '/Pagination', component: () => import('pages/Pagination.vue')},
      {path: '/Taskboard', component: () => import('pages/TaskBoard.vue')},
      {path: '/Ecommerce', component: () => import('pages/ProductCatalogues.vue')},

    ]
  },
  {
    path: '/Lock',
    component: () => import('pages/LockScreen.vue')
  },
  {
    path: '/Maintenance',
    component: () => import('pages/Maintenance.vue')
  },
  {
    path: '/Pricing',
    component: () => import('pages/Pricing.vue')
  },
  {
    path: '/Login-1',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/Mail',
    component: () => import('layouts/Mail.vue')
  },
  {
    path: '/Lock-2',
    component: () => import('pages/LockScreen-2.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
