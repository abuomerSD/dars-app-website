import { createRouter, createWebHashHistory } from "vue-router";
import LectureView from "../views/LectureView.vue";
import LecturerView from "../views/LecturerView.vue";

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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;