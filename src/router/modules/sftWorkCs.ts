const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/work/cs",
  name: "SftWorkCs",
  component: Layout,
  redirect: "/sft/work/cs/index",
  meta: {
    icon: "ep:document",
    title: "施工方案",
    rank: 31
  },
  children: [
    {
      path: "/sft/work/cs/index",
      name: "SftWorkCsIndex",
      component: () => import("@/views/sft/work/cs/index.vue"),
      meta: {
        title: "施工方案",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
