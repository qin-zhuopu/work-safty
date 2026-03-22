import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/sys/role/list.json",
    method: "get",
    response: ({ query }: { query: { page?: string; size?: string } }) => {
      const page = Number(query.page) || 0;
      const size = Number(query.size) || 10;

      const allRoles = [
        { id: 1, name: "管理员", remark: "系统管理员", status: 1, type: 1 },
        {
          id: 2,
          name: "企业管理员",
          remark: "各企业管理员",
          status: 1,
          type: 1
        },
        { id: 3, name: "员工", remark: "普通员工", status: 1, type: 2 },
        { id: 4, name: "车间管理员", remark: "", status: 1, type: 2 },
        {
          id: 5,
          name: "承包商员工",
          remark: "承包商员工专用",
          status: 1,
          type: 2
        },
        {
          id: 9,
          name: "承包商管理",
          remark: "管理承包商专用",
          status: 1,
          type: 1
        },
        { id: 10, name: "监管全厂作业票", remark: "", status: 1, type: 1 },
        { id: 11, name: "设备处监管", remark: "", status: 1, type: 1 },
        {
          id: 12,
          name: "技术研发（变更）",
          remark: "看变更",
          status: 1,
          type: 1
        },
        { id: 14, name: "巡检查询", remark: "", status: 1, type: 1 },
        { id: 15, name: "安全管理员", remark: "安全管理", status: 1, type: 1 },
        { id: 16, name: "质量检查员", remark: "质量检查", status: 1, type: 2 },
        { id: 17, name: "设备维护员", remark: "设备维护", status: 1, type: 2 },
        { id: 18, name: "仓库管理员", remark: "仓库管理", status: 1, type: 2 },
        { id: 19, name: "采购员", remark: "采购管理", status: 1, type: 2 },
        { id: 20, name: "销售员", remark: "销售管理", status: 1, type: 2 },
        { id: 21, name: "财务人员", remark: "财务管理", status: 1, type: 2 },
        { id: 22, name: "人事专员", remark: "人事管理", status: 1, type: 2 },
        { id: 23, name: "生产主管", remark: "生产管理", status: 1, type: 1 },
        { id: 24, name: "技术主管", remark: "技术管理", status: 1, type: 1 },
        { id: 25, name: "项目经理", remark: "项目管理", status: 1, type: 1 },
        { id: 26, name: "班组长", remark: "班组管理", status: 1, type: 2 },
        { id: 27, name: "调度员", remark: "调度管理", status: 1, type: 2 },
        { id: 28, name: "统计员", remark: "统计分析", status: 1, type: 2 },
        { id: 29, name: "安保人员", remark: "安保管理", status: 1, type: 2 }
      ];

      const totalElements = allRoles.length;
      const totalPages = Math.ceil(totalElements / size);
      const content = allRoles.slice(page * size, (page + 1) * size);

      return {
        success: true,
        t: {
          content,
          empty: false,
          first: page === 0,
          last: page === totalPages - 1,
          number: page,
          numberOfElements: content.length,
          pageable: {
            offset: page * size,
            pageNumber: page,
            pageSize: size,
            paged: true,
            sort: {
              empty: true,
              sorted: false,
              unsorted: true
            },
            unpaged: false
          },
          size,
          sort: {
            empty: true,
            sorted: false,
            unsorted: true
          },
          totalElements,
          totalPages
        }
      };
    }
  }
]);
