const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/work/data",
  name: "SftWorkData",
  component: Layout,
  redirect: "/sft/work/data/index",
  meta: {
    icon: "ep:document",
    title: "应急处置措施数据库",
    rank: 30
  },
  children: [
    {
      path: "/sft/work/data/index",
      name: "SftWorkDataIndex",
      component: () => import("@/views/sft/work/data/index.vue"),
      meta: {
        title: "应急处置措施数据库",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
