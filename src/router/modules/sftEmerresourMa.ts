const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "Sft",
  component: Layout,
  redirect: "/sft/emerresour/ma/index",
  meta: {
    icon: "ep:box",
    title: "应急资源管理",
    rank: 26
  },
  children: [
    {
      path: "/sft/emerresour/ma/index",
      name: "SftEmerresourMa",
      component: () => import("@/views/sft/emerresour/ma/index.vue"),
      meta: {
        title: "医疗救护台账",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
