const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/cont/special",
  name: "SftContSpecial",
  component: Layout,
  redirect: "/sft/cont/special/index",
  meta: {
    icon: "ep:user",
    title: "承包商特殊工管理",
    rank: 30
  },
  children: [
    {
      path: "/sft/cont/special/index",
      name: "SftContSpecialIndex",
      component: () => import("@/views/sft/cont/special/index.vue"),
      meta: {
        title: "承包商特殊工管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
