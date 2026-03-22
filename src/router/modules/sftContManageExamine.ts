const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/cont/manage/examine",
  name: "SftContManageExamine",
  component: Layout,
  redirect: "/sft/cont/manage/examine/index",
  meta: {
    icon: "ep:document-checked",
    title: "承包商审核",
    rank: 16
  },
  children: [
    {
      path: "/sft/cont/manage/examine/index",
      name: "SftContManageExamineIndex",
      component: () => import("@/views/sft/cont/manage/examine/index.vue"),
      meta: {
        title: "承包商审核",
        showLink: true
      }
    },
    {
      path: "/sft/cont/manage/examinecont/index",
      name: "SftContManageExaminecont",
      component: () => import("@/views/sft/cont/manage/examinecont/index.vue"),
      meta: {
        title: "承包商审批",
        showLink: false
      }
    },
    {
      path: "/sft/cont/per/examineper/index",
      name: "SftContPerExamineper",
      component: () => import("@/views/sft/cont/per/examineper/index.vue"),
      meta: {
        title: "承包商人员审批",
        showLink: false
      }
    }
  ]
} satisfies RouteConfigsTable;
