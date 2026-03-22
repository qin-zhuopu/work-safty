const Layout = () => import("@/layout/index.vue");

export default {
  path: "/train",
  name: "Train",
  component: Layout,
  redirect: "/train/plantype/index",
  meta: {
    icon: "ep:reading",
    title: "培训管理",
    rank: 20
  },
  children: [
    {
      path: "/train/plantype/index",
      name: "TrainPlantype",
      component: () => import("@/views/train/plantype/index.vue"),
      meta: {
        title: "培训类型管理",
        showLink: true
      }
    },
    {
      path: "/train/pc/record/learn/index",
      name: "TrainPcRecordLearn",
      component: () => import("@/views/train/pc/record/learn/index.vue"),
      meta: {
        title: "学习记录",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
