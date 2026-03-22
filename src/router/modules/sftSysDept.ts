const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "SftSysDept",
  component: Layout,
  redirect: "/sft/sys/dept/index",
  meta: {
    icon: "ep:office-building",
    title: "部门管理",
    rank: 10
  },
  children: [
    {
      path: "/sft/sys/dept/index",
      name: "SftSysDeptIndex",
      component: () => import("@/views/sft/sys/dept/index.vue"),
      meta: {
        title: "部门管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
