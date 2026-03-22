const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/cont/assess",
  name: "SftContAssess",
  component: Layout,
  redirect: "/sft/cont/assess/index",
  meta: {
    icon: "ep:document",
    title: "承包商评估",
    rank: 35
  },
  children: [
    {
      path: "/sft/cont/assess/index",
      name: "SftContAssessIndex",
      component: () => import("@/views/sft/cont/assess/index.vue"),
      meta: {
        title: "承包商评估",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
