const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "SftContManageExamine",
  component: Layout,
  redirect: "/sft/cont/manage/examinecont/index",
  meta: {
    icon: "ep:document-checked",
    title: "承包商审批",
    rank: 17
  },
  children: [
    {
      path: "/sft/cont/manage/examinecont/index",
      name: "SftContManageExamineIndex",
      component: () => import("@/views/sft/cont/manage/examinecont/index.vue"),
      meta: {
        title: "承包商审批",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
