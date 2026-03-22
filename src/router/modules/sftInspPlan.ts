const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "Sft",
  component: Layout,
  redirect: "/sft/insp/plan/index",
  meta: {
    icon: "ep:document",
    title: "巡检管理",
    rank: 25
  },
  children: [
    {
      path: "/sft/insp/plan/index",
      name: "SftInspPlan",
      component: () => import("@/views/sft/insp/plan/index.vue"),
      meta: {
        title: "巡检计划管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
