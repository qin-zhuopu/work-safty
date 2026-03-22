const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/work/doc/fail",
  name: "SftWorkDocFail",
  component: Layout,
  redirect: "/sft/work/doc/fail/index",
  meta: {
    icon: "ep:document",
    title: "审验作业管理",
    rank: 31
  },
  children: [
    {
      path: "/sft/work/doc/fail/index",
      name: "SftWorkDocFailIndex",
      component: () => import("@/views/sft/work/doc/fail/index.vue"),
      meta: {
        title: "审验作业管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
