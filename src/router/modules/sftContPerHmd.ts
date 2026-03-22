const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "SftContPerHmd",
  component: Layout,
  redirect: "/sft/cont/per/hmd/index",
  meta: {
    icon: "ep:user",
    title: "承包商管理",
    rank: 16
  },
  children: [
    {
      path: "/sft/cont/per/hmd/index",
      name: "SftContPerHmdIndex",
      component: () => import("@/views/sft/cont/per/hmd/index.vue"),
      meta: {
        title: "承包商人员黑名单",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
