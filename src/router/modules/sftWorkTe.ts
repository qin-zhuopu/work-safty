const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/work/te",
  name: "SftWorkTe",
  component: Layout,
  redirect: "/sft/work/te/index",
  meta: {
    icon: "ep:monitor",
    title: "检测设备台账",
    rank: 31
  },
  children: [
    {
      path: "/sft/work/te/index",
      name: "SftWorkTeIndex",
      component: () => import("@/views/sft/work/te/index.vue"),
      meta: {
        title: "检测设备台账",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
