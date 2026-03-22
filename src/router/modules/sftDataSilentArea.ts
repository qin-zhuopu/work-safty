const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "Sft",
  component: Layout,
  redirect: "/sft/data/silent/area/index",
  meta: {
    icon: "ep:data-analysis",
    title: "数据管理",
    rank: 30
  },
  children: [
    {
      path: "/sft/data/silent/area/index",
      name: "SftDataSilentArea",
      component: () => import("@/views/sft/data/silent/area/index.vue"),
      meta: {
        title: "静默区域",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
