const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "Sft",
  component: Layout,
  redirect: "/sft/insp/task/index",
  meta: {
    icon: "ep:document",
    title: "巡检线路管理",
    rank: 26
  },
  children: [
    {
      path: "/sft/insp/task/index",
      name: "SftInspTask",
      component: () => import("@/views/sft/insp/task/index.vue"),
      meta: {
        title: "巡检线路管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
