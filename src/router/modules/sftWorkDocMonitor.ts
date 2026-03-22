const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/work/doc",
  name: "SftWorkDoc",
  component: Layout,
  redirect: "/sft/work/doc/monitor",
  meta: {
    icon: "ep:video-camera",
    title: "特殊作业移动监测",
    rank: 31
  },
  children: [
    {
      path: "/sft/work/doc/monitor",
      name: "SftWorkDocMonitor",
      component: () => import("@/views/sft/work/doc/monitor/index.vue"),
      meta: {
        title: "特殊作业移动监测监控",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
