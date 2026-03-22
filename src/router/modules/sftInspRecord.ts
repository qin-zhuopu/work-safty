const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "Sft",
  component: Layout,
  redirect: "/sft/insp/record/index",
  meta: {
    icon: "ep:document",
    title: "巡检管理",
    rank: 25
  },
  children: [
    {
      path: "/sft/insp/record/index",
      name: "SftInspRecord",
      component: () => import("@/views/sft/insp/record/index.vue"),
      meta: {
        title: "巡检记录管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
