const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/am/as",
  name: "SftAmAs",
  component: Layout,
  redirect: "/sft/am/as/index",
  meta: {
    icon: "ep:document",
    title: "外部事故共享",
    rank: 17
  },
  children: [
    {
      path: "/sft/am/as/index",
      name: "SftAmAsIndex",
      component: () => import("@/views/sft/am/as/index.vue"),
      meta: {
        title: "外部事故共享管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
