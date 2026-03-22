const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/risk/target",
  name: "SftRiskTarget",
  component: Layout,
  redirect: "/sft/risk/target/index",
  meta: {
    icon: "ep:document",
    title: "装置停用记录",
    rank: 27
  },
  children: [
    {
      path: "/sft/risk/target/index",
      name: "SftRiskTargetIndex",
      component: () => import("@/views/sft/risk/target/index.vue"),
      meta: {
        title: "装置停用记录",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
