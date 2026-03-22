const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "SftRisk",
  component: Layout,
  redirect: "/sft/risk/control/index",
  meta: {
    icon: "ep:warning",
    title: "风险管理",
    rank: 20
  },
  children: [
    {
      path: "/sft/risk/control/index",
      name: "SftRiskControl",
      component: () => import("@/views/sft/risk/control/index.vue"),
      meta: {
        title: "风险分级管控",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
