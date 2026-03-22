const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft/work/doc/tmpl",
  name: "SftWorkDocTmpl",
  component: Layout,
  redirect: "/sft/work/doc/tmpl/index",
  meta: {
    icon: "ep:document-copy",
    title: "模板管理",
    rank: 32
  },
  children: [
    {
      path: "/sft/work/doc/tmpl/index",
      name: "SftWorkDocTmplPage",
      component: () => import("@/views/sft/work/doc/tmpl/index.vue"),
      meta: {
        title: "模板管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
