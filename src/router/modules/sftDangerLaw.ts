const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "Sft",
  component: Layout,
  redirect: "/sft/danger/law/index",
  meta: {
    icon: "ep:document",
    title: "法律法规",
    rank: 26
  },
  children: [
    {
      path: "/sft/danger/law/index",
      name: "SftDangerLaw",
      component: () => import("@/views/sft/danger/law/index.vue"),
      meta: {
        title: "法律法规",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
