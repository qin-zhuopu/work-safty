const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "SftSys",
  component: Layout,
  redirect: "/sft/sys/approval/library/index",
  meta: {
    icon: "ep:document-checked",
    title: "施工作业方案审批库",
    rank: 28
  },
  children: [
    {
      path: "/sft/sys/approval/library/index",
      name: "SftSysApprovalLibrary",
      component: () => import("@/views/sft/sys/approval/library/index.vue"),
      meta: {
        title: "施工作业方案审批库管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
