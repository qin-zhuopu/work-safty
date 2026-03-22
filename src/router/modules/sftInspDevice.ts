const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/insp",
  name: "SftInsp",
  component: Layout,
  redirect: "/sft/insp/device/index",
  meta: {
    icon: "ep:monitor",
    title: "巡检管理",
    rank: 8
  },
  children: [
    {
      path: "/sft/insp/device/index",
      name: "SftInspDevice",
      component: () => import("@/views/sft/insp/device/index.vue"),
      meta: {
        title: "巡检设备清单管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
