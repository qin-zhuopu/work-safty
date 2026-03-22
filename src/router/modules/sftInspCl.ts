const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "Sft",
  component: Layout,
  redirect: "/sft/insp/cl/index",
  meta: {
    icon: "ep:document",
    title: "巡检管理",
    rank: 25
  },
  children: [
    {
      path: "/sft/insp/cl/index",
      name: "SftInspCl",
      component: () => import("@/views/sft/insp/cl/index.vue"),
      meta: {
        title: "更换台账",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
