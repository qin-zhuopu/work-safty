const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/danger/statistics",
  name: "SftDangerStatistics",
  component: Layout,
  redirect: "/sft/danger/statistics/index",
  meta: {
    icon: "ep:data-analysis",
    title: "隐患统计",
    rank: 27
  },
  children: [
    {
      path: "/sft/danger/statistics/index",
      name: "SftDangerStatisticsIndex",
      component: () => import("@/views/sft/danger/statistics/index.vue"),
      meta: {
        title: "隐患统计",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
