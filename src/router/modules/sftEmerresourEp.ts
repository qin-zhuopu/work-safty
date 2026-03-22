const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "SftEmerresourEp",
  component: Layout,
  redirect: "/sft/emerresour/ep/index",
  meta: {
    icon: "ep:document",
    title: "应急预案台账",
    rank: 27
  },
  children: [
    {
      path: "/sft/emerresour/ep/index",
      name: "SftEmerresourEpIndex",
      component: () => import("@/views/sft/emerresour/ep/index.vue"),
      meta: {
        title: "应急预案台账",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
