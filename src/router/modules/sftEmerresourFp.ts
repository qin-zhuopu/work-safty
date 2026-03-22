const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/emerresour",
  name: "SftEmerresourFp",
  component: Layout,
  redirect: "/sft/emerresour/fp/index",
  meta: {
    icon: "ep:box",
    title: "应急资源管理",
    rank: 26
  },
  children: [
    {
      path: "/sft/emerresour/fp/index",
      name: "SftEmerresourFpIndex",
      component: () => import("@/views/sft/emerresour/fp/index.vue"),
      meta: {
        title: "防汛物资台账",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
