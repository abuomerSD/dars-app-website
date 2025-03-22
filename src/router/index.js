import { createRouter, createWebHashHistory } from "vue-router";
import LectureView from "../views/LectureView.vue";
import LecturerView from "../views/LecturerView.vue";
import LoginView from "../views/LoginView.vue";

const routes = [
  {
    path: "/",
    redirect: '/lectures'
  },
  {
    path: "/lectures",
    name: "lectures",
    component: LectureView,
  },
  {
    path: "/lecturers",
    name: "lecturers",
    component: LecturerView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;