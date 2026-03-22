const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/work/doccamera",
  name: "SftWorkDoccamera",
  component: Layout,
  redirect: "/sft/work/doccamera/index",
  meta: {
    icon: "ep:video-camera",
    title: "作业票证视频监控",
    rank: 31
  },
  children: [
    {
      path: "/sft/work/doccamera/index",
      name: "SftWorkDoccameraIndex",
      component: () => import("@/views/sft/work/doccamera/index.vue"),
      meta: {
        title: "作业票证视频监控",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
