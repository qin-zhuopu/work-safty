const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "Sft",
  component: Layout,
  redirect: "/sft/danger/danger/index",
  meta: {
    icon: "ep:warning",
    title: "巡检管理",
    rank: 25
  },
  children: [
    {
      path: "/sft/danger/danger/index",
      name: "SftDanger",
      component: () => import("@/views/sft/danger/danger/index.vue"),
      meta: {
        title: "隐患",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
