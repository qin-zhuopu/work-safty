const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/work/sheet/statistics",
  name: "SftWorkSheetStatistics",
  component: Layout,
  redirect: "/sft/work/sheet/statistics/index",
  meta: {
    icon: "ep:data-analysis",
    title: "派工单分析",
    rank: 31
  },
  children: [
    {
      path: "/sft/work/sheet/statistics/index",
      name: "SftWorkSheetStatisticsIndex",
      component: () => import("@/views/sft/work/sheet/statistics/index.vue"),
      meta: {
        title: "派工单分析",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
