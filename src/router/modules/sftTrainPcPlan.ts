const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "SftTrainPcPlan",
  component: Layout,
  redirect: "/sft/train/pc/plan/index",
  meta: {
    icon: "ep:reading",
    title: "教育培训",
    rank: 15
  },
  children: [
    {
      path: "/sft/train/pc/plan/index",
      name: "SftTrainPcPlanIndex",
      component: () => import("@/views/sft/train/pc/plan/index.vue"),
      meta: {
        title: "培训计划",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
