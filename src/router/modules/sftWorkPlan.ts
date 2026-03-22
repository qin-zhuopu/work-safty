const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/work/plan",
  name: "SftWorkPlan",
  component: Layout,
  redirect: "/sft/work/plan/index",
  meta: {
    icon: "ep:document",
    title: "施工方案数据库",
    rank: 31
  },
  children: [
    {
      path: "/sft/work/plan/index",
      name: "SftWorkPlanIndex",
      component: () => import("@/views/sft/work/plan/index.vue"),
      meta: {
        title: "施工方案数据库",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
