const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "SftHdRewardsRecord",
  component: Layout,
  redirect: "/sft/hd/rewards/record/index",
  meta: {
    icon: "ep:medal",
    title: "奖惩管理",
    rank: 20
  },
  children: [
    {
      path: "/sft/hd/rewards/record/index",
      name: "SftHdRewardsRecordIndex",
      component: () => import("@/views/sft/hd/rewards/record/index.vue"),
      meta: {
        title: "奖惩记录",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
