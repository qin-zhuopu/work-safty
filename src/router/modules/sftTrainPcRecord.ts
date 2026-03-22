const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/train/pc/record",
  name: "SftTrainPcRecord",
  component: Layout,
  redirect: "/sft/train/pc/record/index",
  meta: {
    icon: "ep:document",
    title: "模拟答题记录",
    rank: 16
  },
  children: [
    {
      path: "/sft/train/pc/record/index",
      name: "SftTrainPcRecordIndex",
      component: () => import("@/views/sft/train/pc/record/index.vue"),
      meta: {
        title: "模拟答题记录",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
