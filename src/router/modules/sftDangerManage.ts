const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/danger/manage",
  name: "SftDangerManage",
  component: Layout,
  redirect: "/sft/danger/manage/index",
  meta: {
    icon: "ep:document",
    title: "管理制度",
    rank: 25
  },
  children: [
    {
      path: "/sft/danger/manage/index",
      name: "SftDangerManageIndex",
      component: () => import("@/views/sft/danger/manage/index.vue"),
      meta: {
        title: "管理制度",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
