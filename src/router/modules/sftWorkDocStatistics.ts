const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/work/doc/statistics",
  name: "SftWorkDocStatistics",
  component: Layout,
  redirect: "/sft/work/doc/statistics/index",
  meta: {
    icon: "ep:data-analysis",
    title: "特殊作业分析",
    rank: 30
  },
  children: [
    {
      path: "/sft/work/doc/statistics/index",
      name: "SftWorkDocStatisticsIndex",
      component: () => import("@/views/sft/work/doc/statistics.vue"),
      meta: {
        title: "特殊作业分析",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
