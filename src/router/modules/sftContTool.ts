const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/cont/tool",
  name: "SftContTool",
  component: Layout,
  redirect: "/sft/cont/tool/index",
  meta: {
    icon: "ep:tools",
    title: "工器具管理",
    rank: 8
  },
  children: [
    {
      path: "/sft/cont/tool/index",
      name: "SftContToolIndex",
      component: () => import("@/views/sft/cont/tool/index.vue"),
      meta: {
        title: "工器具管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
