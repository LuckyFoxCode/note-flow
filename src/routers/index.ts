import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    meta: { requiresAuth: true },
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/auth',
    meta: { requiresGuest: true },
    component: () => import('@/views/AuthView.vue'),
    children: [
      {
        path: '',
        redirect: { name: 'SignUp' },
      },
      {
        path: 'register',
        name: 'SignUp',
        component: () => import('@/components/SignUp.vue'),
      },
      {
        path: 'login',
        name: 'SignIn',
        component: () => import('@/components/SignIn.vue'),
      },
    ],
  },
  {
    path: '/categories',
    name: 'Categories',
    meta: { requiresAuth: true },
    component: () => import('@/views/CategoriesView.vue'),
  },
  {
    path: '/categories/:slug',
    name: 'Category',
    props: true,
    meta: { requiresAuth: true },
    component: () => import('@/views/CategoryView.vue'),
  },
  {
    path: '/statistics',
    name: 'Statistics',
    meta: { requiresAuth: true },
    component: () => import('@/views/StatisticsView.vue'),
  },
  {
    path: '/archive',
    name: 'Archive',
    meta: { requiresAuth: true },
    component: () => import('@/views/ArchiveView.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    meta: { requiresAuth: true },
    component: () => import('@/views/SettingsView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest);

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'Auth' });
  } else if (requiresGuest && isAuthenticated) {
    next({ name: 'Home' });
  } else {
    next();
  }
});
