const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/work/monitor",
  name: "SftWorkMonitor",
  component: Layout,
  redirect: "/sft/work/monitor/detail",
  meta: {
    icon: "ep:video-camera",
    title: "特殊作业监控设备管理",
    rank: 35
  },
  children: [
    {
      path: "/sft/work/monitor/detail",
      name: "SftWorkMonitorDetail",
      component: () => import("@/views/sft/work/monitor/detail/index.vue"),
      meta: {
        title: "特殊作业监控设备管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
