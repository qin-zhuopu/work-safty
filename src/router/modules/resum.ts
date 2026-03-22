const Layout = () => import("@/layout/index.vue");

export default {
  path: "/resum",
  name: "Resum",
  component: Layout,
  redirect: "/resum/plan/stat",
  meta: {
    icon: "ep:data-analysis",
    title: "履职管理",
    rank: 10
  },
  children: [
    {
      path: "/resum/plan/stat",
      name: "ResumPlanStat",
      component: () => import("@/views/resum/plan/stat/index.vue"),
      meta: {
        title: "排查计划统计",
        showLink: true
      }
    },
    {
      path: "/resum/content",
      name: "ResumContent",
      component: () => import("@/views/resum/content/index.vue"),
      meta: {
        title: "履职排查内容",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
