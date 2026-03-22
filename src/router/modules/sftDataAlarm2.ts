const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "Sft",
  component: Layout,
  redirect: "/sft/data/alarm2/index",
  meta: {
    icon: "ep:warning",
    title: "数据管理",
    rank: 25
  },
  children: [
    {
      path: "/sft/data/alarm2/index",
      name: "SftDataAlarm2",
      component: () => import("@/views/sft/data/alarm2/index.vue"),
      meta: {
        title: "视频报警管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
