const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "SftContManageHmd",
  component: Layout,
  redirect: "/sft/cont/manage/hmd/index",
  meta: {
    icon: "ep:document",
    title: "承包商管理",
    rank: 16
  },
  children: [
    {
      path: "/sft/cont/manage/hmd/index",
      name: "SftContManageHmdIndex",
      component: () => import("@/views/sft/cont/manage/hmd/index.vue"),
      meta: {
        title: "承包商黑名单",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
