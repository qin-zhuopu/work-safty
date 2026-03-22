const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/risk/control/statistics",
  name: "SftRiskControlStatistics",
  component: Layout,
  redirect: "/sft/risk/control/statistics/index",
  meta: {
    icon: "ep:data-analysis",
    title: "隐患排查治理统计",
    rank: 30
  },
  children: [
    {
      path: "/sft/risk/control/statistics/index",
      name: "SftRiskControlStatisticsIndex",
      component: () => import("@/views/sft/risk/control/statistics/index.vue"),
      meta: {
        title: "隐患排查及治理情况报告",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
