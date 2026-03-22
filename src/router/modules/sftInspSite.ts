const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "SftInspSite",
  component: Layout,
  redirect: "/sft/insp/site/index",
  meta: {
    icon: "ep:document",
    title: "巡检点管理",
    rank: 26
  },
  children: [
    {
      path: "/sft/insp/site/index",
      name: "SftInspSiteIndex",
      component: () => import("@/views/sft/insp/site/index.vue"),
      meta: {
        title: "巡检点管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
