const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/danger/danger",
  name: "SftDangerDanger",
  component: Layout,
  redirect: "/sft/danger/danger/index",
  meta: {
    icon: "ep:warning",
    title: "隐患管理",
    rank: 24
  },
  children: [
    {
      path: "/sft/danger/danger/index",
      name: "SftDangerDangerIndex",
      component: () => import("@/views/sft/danger/danger/index.vue"),
      meta: {
        title: "隐患管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
