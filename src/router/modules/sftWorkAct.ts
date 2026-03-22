const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/work/act",
  name: "SftWorkAct",
  component: Layout,
  redirect: "/sft/work/act/index",
  meta: {
    icon: "ep:document",
    title: "作业活动",
    rank: 31
  },
  children: [
    {
      path: "/sft/work/act/index",
      name: "SftWorkActIndex",
      component: () => import("@/views/sft/work/act/index.vue"),
      meta: {
        title: "作业活动",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
