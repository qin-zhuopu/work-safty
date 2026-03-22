const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "SftTrainPlanArchives",
  component: Layout,
  redirect: "/sft/train/plan/archives/index",
  meta: {
    icon: "ep:document",
    title: "培训档案",
    rank: 16
  },
  children: [
    {
      path: "/sft/train/plan/archives/index",
      name: "SftTrainPlanArchivesIndex",
      component: () => import("@/views/sft/train/plan/archives/index.vue"),
      meta: {
        title: "培训档案归档",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
