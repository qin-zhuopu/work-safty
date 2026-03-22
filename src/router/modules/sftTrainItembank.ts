const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "SftTrainItembank",
  component: Layout,
  redirect: "/sft/train/itembank/index",
  meta: {
    icon: "ep:reading",
    title: "题库管理",
    rank: 14
  },
  children: [
    {
      path: "/sft/train/itembank/index",
      name: "SftTrainItembankIndex",
      component: () => import("@/views/sft/train/itembank/index.vue"),
      meta: {
        title: "题库管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
