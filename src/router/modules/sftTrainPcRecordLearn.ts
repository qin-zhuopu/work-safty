const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/train/pc/record/learn",
  name: "SftTrainPcRecordLearn",
  component: Layout,
  redirect: "/sft/train/pc/record/learn/index",
  meta: {
    icon: "ep:document",
    title: "学习记录",
    rank: 17
  },
  children: [
    {
      path: "/sft/train/pc/record/learn/index",
      name: "SftTrainPcRecordLearnIndex",
      component: () => import("@/views/sft/train/pc/record/learn/index.vue"),
      meta: {
        title: "学习记录",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
