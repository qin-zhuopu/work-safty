const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/risk/special",
  name: "SftRiskSpecial",
  component: Layout,
  redirect: "/sft/risk/special/index",
  meta: {
    icon: "ep:document",
    title: "专项检查任务",
    rank: 10
  },
  children: [
    {
      path: "/sft/risk/special/index",
      name: "SftRiskSpecialIndex",
      component: () => import("@/views/sft/risk/special/index.vue"),
      meta: {
        title: "专项检查任务",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
