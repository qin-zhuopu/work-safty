const Layout = () => import("@/layout/index.vue");

export default {
  path: "/data",
  name: "Data",
  component: Layout,
  redirect: "/data/gds/index2",
  meta: {
    icon: "ep:data-line",
    title: "数据监测",
    rank: 11
  },
  children: [
    {
      path: "/data/gds/index2",
      name: "DataGdsIndex2",
      component: () => import("@/views/data/gds/index2.vue"),
      meta: {
        title: "管道设备监测",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
