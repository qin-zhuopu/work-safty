const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "Sft",
  component: Layout,
  redirect: "/sft/emerresour/team/index",
  meta: {
    icon: "ep:box",
    title: "应急资源管理",
    rank: 26
  },
  children: [
    {
      path: "/sft/emerresour/team/index",
      name: "SftEmerresourTeam",
      component: () => import("@/views/sft/emerresour/team/index.vue"),
      meta: {
        title: "应急队伍台账",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
