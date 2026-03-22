const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "SftEmerresourWm",
  component: Layout,
  redirect: "/sft/emerresour/wm/index",
  meta: {
    icon: "ep:calendar",
    title: "排班管理",
    rank: 16
  },
  children: [
    {
      path: "/sft/emerresour/wm/index",
      name: "SftEmerresourWmIndex",
      component: () => import("@/views/sft/emerresour/wm/index.vue"),
      meta: {
        title: "排班管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
