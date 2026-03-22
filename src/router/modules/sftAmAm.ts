const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/accident",
  name: "SftAccident",
  component: Layout,
  redirect: "/sft/accident/index",
  meta: {
    icon: "ep:document",
    title: "事故管理",
    rank: 16
  },
  children: [
    {
      path: "/sft/accident/index",
      name: "SftAccidentIndex",
      component: () => import("@/views/sft/accident/index.vue"),
      meta: {
        title: "事故管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
