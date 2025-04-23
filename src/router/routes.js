const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'camera/:id', name: 'CameraStreamPage', component: () => import('pages/CameraStreamPage.vue') },
      { path: ':catchAll(.*)*', component: () => import('pages/ErrorNotFound.vue') }
    ]
  },

  // {
  //   path: '/:catchAll(.*)*',
  //   component: () => import('pages/ErrorNotFound.vue')
  // },
  // {
  //   path: '/camera/:id',
  //   name: 'CameraStreamPage',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/CameraStreamPage.vue') }
  //   ]
  // }
]

export default routes
