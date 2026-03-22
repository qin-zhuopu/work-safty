const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/hazard/statistics",
  name: "SftHazardStatistics",
  component: Layout,
  redirect: "/sft/hazard/statistics/index",
  meta: {
    icon: "ep:data-analysis",
    title: "隐患统计",
    rank: 26
  },
  children: [
    {
      path: "/sft/hazard/statistics/index",
      name: "SftHazardStatisticsIndex",
      component: () => import("@/views/sft/hazard/statistics/index.vue"),
      meta: {
        title: "隐患统计",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
