const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "SftTrainPlan",
  component: Layout,
  redirect: "/sft/train/plan/index",
  meta: {
    icon: "ep:reading",
    title: "计划管理",
    rank: 16
  },
  children: [
    {
      path: "/sft/train/plan/index",
      name: "SftTrainPlanIndex",
      component: () => import("@/views/sft/train/plan/index.vue"),
      meta: {
        title: "培训计划管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
