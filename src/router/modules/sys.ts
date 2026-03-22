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
    },
    {
      path: "/sys/role/index",
      name: "SysRole",
      component: () => import("@/views/sys/role/index.vue"),
      meta: {
        title: "角色管理",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
