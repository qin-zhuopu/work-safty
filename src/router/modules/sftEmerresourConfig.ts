const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "Sft",
  component: Layout,
  redirect: "/sft/emerresour/config/index",
  meta: {
    icon: "ep:box",
    title: "应急资源管理",
    rank: 26
  },
  children: [
    {
      path: "/sft/emerresour/config/index",
      name: "SftEmerresourConfig",
      component: () => import("@/views/sft/emerresour/config/index.vue"),
      meta: {
        title: "维护记录配置台账",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
