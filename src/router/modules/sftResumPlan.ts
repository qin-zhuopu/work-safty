const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "Sft",
  component: Layout,
  redirect: "/sft/resum/plan/index",
  meta: {
    icon: "ep:document",
    title: "安全管理",
    rank: 20
  },
  children: [
    {
      path: "/sft/resum/plan/index",
      name: "SftResumPlan",
      component: () => import("@/views/sft/resum/plan/index.vue"),
      meta: {
        title: "三类包保责任制履职排查计划",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
