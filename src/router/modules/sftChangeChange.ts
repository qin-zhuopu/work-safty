const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/change/change",
  name: "SftChangeChange",
  component: Layout,
  redirect: "/sft/change/change/index",
  meta: {
    icon: "ep:document",
    title: "变更管理",
    rank: 25
  },
  children: [
    {
      path: "/sft/change/change/index",
      name: "SftChangeChangeIndex",
      component: () => import("@/views/sft/change/change/index.vue"),
      meta: {
        title: "变更管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
