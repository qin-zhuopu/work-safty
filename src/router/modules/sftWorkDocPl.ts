const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/work/doc/pl",
  name: "SftWorkDocPl",
  component: Layout,
  redirect: "/sft/work/doc/pl/index",
  meta: {
    icon: "ep:user",
    title: "人员库管理",
    rank: 10
  },
  children: [
    {
      path: "/sft/work/doc/pl/index",
      name: "SftWorkDocPlIndex",
      component: () => import("@/views/sft/work/doc/pl/index.vue"),
      meta: {
        title: "人员库管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
