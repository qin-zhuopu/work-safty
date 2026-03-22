const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/behavior/safe",
  name: "SftBehaviorSafe",
  component: Layout,
  redirect: "/sft/behavior/safe/index",
  meta: {
    icon: "ep:view",
    title: "行为安全观察与沟通管理",
    rank: 40
  },
  children: [
    {
      path: "/sft/behavior/safe/index",
      name: "SftBehaviorSafeIndex",
      component: () => import("@/views/sft/behavior/safe/index.vue"),
      meta: {
        title: "行为安全观察与沟通管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
