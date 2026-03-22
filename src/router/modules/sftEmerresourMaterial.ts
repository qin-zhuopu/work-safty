const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "SftEmerresourMaterial",
  component: Layout,
  redirect: "/sft/emerresour/material/index",
  meta: {
    icon: "ep:box",
    title: "应急物资台账",
    rank: 27
  },
  children: [
    {
      path: "/sft/emerresour/material/index",
      name: "SftEmerresourMaterialIndex",
      component: () => import("@/views/sft/emerresour/material/index.vue"),
      meta: {
        title: "应急物资台账",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
