const Layout = () => import("@/layout/index.vue");

export default {
  path: "/emergency/drill",
  name: "EmergencyDrill",
  component: Layout,
  redirect: "/emergency/drill/index",
  meta: {
    icon: "ep:warning",
    title: "演练计划管理",
    rank: 15
  },
  children: [
    {
      path: "/emergency/drill/index",
      name: "EmergencyDrillIndex",
      component: () => import("@/views/emergency/drill/index.vue"),
      meta: {
        title: "演练计划管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
