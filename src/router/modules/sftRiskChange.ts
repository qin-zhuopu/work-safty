const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/risk/change",
  name: "SftRiskChange",
  component: Layout,
  redirect: "/sft/risk/change/index",
  meta: {
    icon: "ep:document",
    title: "变更管理",
    rank: 26
  },
  children: [
    {
      path: "/sft/risk/change/index",
      name: "SftRiskChangeIndex",
      component: () => import("@/views/sft/risk/change/index.vue"),
      meta: {
        title: "变更管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
