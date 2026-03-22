const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "Sft",
  component: Layout,
  redirect: "/sft/insp/abnormal/index",
  meta: {
    icon: "ep:warning",
    title: "巡检管理",
    rank: 25
  },
  children: [
    {
      path: "/sft/insp/abnormal/index",
      name: "SftInspAbnormal",
      component: () => import("@/views/sft/insp/abnormal/index.vue"),
      meta: {
        title: "更换台账",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
