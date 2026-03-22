const Layout = () => import("@/layout/index.vue");

export default {
  path: "/sft",
  name: "SftContManageLedger",
  component: Layout,
  redirect: "/sft/cont/manage/ledger/index",
  meta: {
    icon: "ep:document",
    title: "承包商台账",
    rank: 16
  },
  children: [
    {
      path: "/sft/cont/manage/ledger/index",
      name: "SftContManageLedgerIndex",
      component: () => import("@/views/sft/cont/manage/ledger/index.vue"),
      meta: {
        title: "承包商台账",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
