const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/am/reward",
  name: "SftAmReward",
  component: Layout,
  redirect: "/sft/am/reward/index",
  meta: {
    icon: "ep:document",
    title: "事故奖惩",
    rank: 16
  },
  children: [
    {
      path: "/sft/am/reward/index",
      name: "SftAmRewardIndex",
      component: () => import("@/views/sft/am/reward/index.vue"),
      meta: {
        title: "事故奖惩",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
