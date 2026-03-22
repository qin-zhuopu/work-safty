const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/work/doc",
  name: "SftWorkDocIndex",
  component: Layout,
  redirect: "/sft/work/doc/index",
  meta: {
    icon: "ep:document",
    title: "作业管理",
    rank: 31
  },
  children: [
    {
      path: "/sft/work/doc/index",
      name: "SftWorkDocIndexPage",
      component: () => import("@/views/sft/work/doc/index.vue"),
      meta: {
        title: "作业管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
