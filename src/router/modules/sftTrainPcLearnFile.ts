const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "SftTrainPcLearnFile",
  component: Layout,
  redirect: "/sft/train/pc/learn/file/index",
  meta: {
    icon: "ep:reading",
    title: "教育培训",
    rank: 15
  },
  children: [
    {
      path: "/sft/train/pc/learn/file/index",
      name: "SftTrainPcLearnFileIndex",
      component: () => import("@/views/sft/train/pc/learn/file/index.vue"),
      meta: {
        title: "学习资料",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
