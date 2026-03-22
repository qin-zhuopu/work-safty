const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/work/loc",
  name: "SftWorkLoc",
  component: Layout,
  redirect: "/sft/work/loc/index",
  meta: {
    icon: "ep:location",
    title: "特殊工管理",
    rank: 31
  },
  children: [
    {
      path: "/sft/work/loc/index",
      name: "SftWorkLocIndex",
      component: () => import("@/views/sft/work/loc/index.vue"),
      meta: {
        title: "特殊工管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
