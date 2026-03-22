const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "Sft",
  component: Layout,
  redirect: "/sft/insp/tl/index",
  meta: {
    icon: "ep:document",
    title: "巡检管理",
    rank: 25
  },
  children: [
    {
      path: "/sft/insp/tl/index",
      name: "SftInspTl",
      component: () => import("@/views/sft/insp/tl/index.vue"),
      meta: {
        title: "发放台账",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
