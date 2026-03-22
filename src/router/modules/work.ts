const Layout = () => import("@/layout/index.vue");

export default {
  path: "/work",
  name: "Work",
  component: Layout,
  redirect: "/work/doccamera",
  meta: {
    icon: "ep:video-camera",
    title: "作业管理",
    rank: 11
  },
  children: [
    {
      path: "/work/doccamera",
      name: "WorkDoccamera",
      component: () => import("@/views/work/doccamera/index.vue"),
      meta: {
        title: "文档摄像头",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
