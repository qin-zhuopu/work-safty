const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "Sft",
  component: Layout,
  redirect: "/sft/danger/plan/index",
  meta: {
    icon: "ep:document",
    title: "隐患排查计划",
    rank: 27
  },
  children: [
    {
      path: "/sft/danger/plan/index",
      name: "SftDangerPlan",
      component: () => import("@/views/sft/danger/plan/index.vue"),
      meta: {
        title: "隐患排查计划",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
