const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "SftTrainEdu",
  component: Layout,
  redirect: "/sft/train/edu/index",
  meta: {
    icon: "ep:reading",
    title: "教育培训管理",
    rank: 17
  },
  children: [
    {
      path: "/sft/train/edu/index",
      name: "SftTrainEduIndex",
      component: () => import("@/views/sft/train/edu/index.vue"),
      meta: {
        title: "教育培训管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
