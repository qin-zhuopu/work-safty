const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/danger/check",
  name: "SftDangerCheck",
  component: Layout,
  redirect: "/sft/danger/check/index",
  meta: {
    icon: "ep:document",
    title: "隐患排查清单",
    rank: 28
  },
  children: [
    {
      path: "/sft/danger/check/index",
      name: "SftDangerCheckIndex",
      component: () => import("@/views/sft/danger/check/index.vue"),
      meta: {
        title: "隐患排查清单",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
