
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', name: "home", component: () => import('pages/Index.vue'), meta: { authRequired: true } },
      { path: '/signin', name: "signin", component: () => import('pages/Login.vue'), meta: { authRequired: false } },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
