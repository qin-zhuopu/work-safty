const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "SftConsole",
  component: Layout,
  redirect: "/sft/console/index",
  meta: {
    icon: "ep:odometer",
    title: "控制台",
    rank: 1
  },
  children: [
    {
      path: "/sft/console/index",
      name: "SftConsoleIndex",
      component: () => import("@/views/sft/console/index.vue"),
      meta: {
        title: "控制台",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
