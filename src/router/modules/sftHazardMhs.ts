const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/hazard/mhs",
  name: "SftHazardMhs",
  component: Layout,
  redirect: "/sft/hazard/mhs/index",
  meta: {
    icon: "ep:warning-filled",
    title: "重大危险源管理",
    rank: 25
  },
  children: [
    {
      path: "/sft/hazard/mhs/index",
      name: "SftHazardMhsIndex",
      component: () => import("@/views/sft/hazard/mhs/index.vue"),
      meta: {
        title: "重大危险源管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
