const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/work/special",
  name: "SftWorkSpecial",
  component: Layout,
  redirect: "/sft/work/special/index",
  meta: {
    icon: "ep:user",
    title: "特殊工管理",
    rank: 30
  },
  children: [
    {
      path: "/sft/work/special/index",
      name: "SftWorkSpecialIndex",
      component: () => import("@/views/sft/work/special/index.vue"),
      meta: {
        title: "特殊工管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
