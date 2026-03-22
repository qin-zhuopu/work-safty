const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/work/sheet",
  name: "SftWorkSheet",
  component: Layout,
  redirect: "/sft/work/sheet/index",
  meta: {
    icon: "ep:document-copy",
    title: "派工单管理",
    rank: 30
  },
  children: [
    {
      path: "/sft/work/sheet/index",
      name: "SftWorkSheetIndex",
      component: () => import("@/views/sft/work/sheet/index.vue"),
      meta: {
        title: "派工单管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
