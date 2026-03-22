const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "Sft",
  component: Layout,
  redirect: "/sft/data/gds/index",
  meta: {
    icon: "ep:data-analysis",
    title: "监测管理",
    rank: 26
  },
  children: [
    {
      path: "/sft/data/gds/index",
      name: "SftDataGds",
      component: () => import("@/views/sft/data/gds/index.vue"),
      meta: {
        title: "监测报警数据",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
