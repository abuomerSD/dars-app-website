import { createRouter, createWebHistory } from "vue-router";
import LectureView from "../views/LectureView.vue";
import LecturerView from "../views/LecturerView.vue";
import LoginView from "../views/LoginView.vue";

const routes = [
  {
    path: "/",
    redirect: '/login'
  },
  {
    name: 'home',
    path: "/home",
    redirect: '/lectures',
    meta: {requiresAuth: true},
  },
  {
    path: "/lectures",
    name: "lectures",
    component: LectureView,
    meta: {requiresAuth: true},
  },
  {
    path: "/lecturers",
    name: "lecturers",
    component: LecturerView,
    meta: {requiresAuth: true},
  },
  {
    path: "/login",
    name: "login",
    component: LoginView
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next('/');
  } else {
    next();
  }
});

export default router;