const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "Sft",
  component: Layout,
  redirect: "/sft/danger/analysis/index",
  meta: {
    icon: "ep:warning",
    title: "巡检管理",
    rank: 25
  },
  children: [
    {
      path: "/sft/danger/analysis/index",
      name: "SftDangerAnalysis",
      component: () => import("@/views/sft/danger/analysis/index.vue"),
      meta: {
        title: "隐患统计分析",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
