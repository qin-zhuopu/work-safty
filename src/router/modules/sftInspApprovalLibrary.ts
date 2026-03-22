const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "Sft",
  component: Layout,
  redirect: "/sft/insp/approval/library/index",
  meta: {
    icon: "ep:document-checked",
    title: "审批库管理",
    rank: 27
  },
  children: [
    {
      path: "/sft/insp/approval/library/index",
      name: "SftInspApprovalLibrary",
      component: () => import("@/views/sft/insp/approval/library/index.vue"),
      meta: {
        title: "审批库管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
