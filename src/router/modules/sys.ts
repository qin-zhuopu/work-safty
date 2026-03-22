const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sys",
  name: "Sys",
  component: Layout,
  redirect: "/sys/acl/index",
  meta: {
    icon: "ep:setting",
    title: "系统管理",
    rank: 5
  },
  children: [
    {
      path: "/sys/acl/index",
      name: "SysAcl",
      component: () => import("@/views/sys/acl/index.vue"),
      meta: {
        title: "权限管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
