const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/change",
  name: "SftChange",
  component: Layout,
  redirect: "/sft/change/index",
  meta: {
    icon: "ep:document",
    title: "变更管理",
    rank: 25
  },
  children: [
    {
      path: "/sft/change/index",
      name: "SftChangeIndex",
      component: () => import("@/views/sft/change/index.vue"),
      meta: {
        title: "变更管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
