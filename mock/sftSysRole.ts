import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/sys/role/list.json",
    method: "get",
    response: ({
      query
    }: {
      query: {
        page?: string;
        size?: string;
      };
    }) => {
      const page = Number(query.page) || 0;
      const size = Number(query.size) || 10;

      const allRoles = [
        { id: 1, name: "管理员", remark: "系统管理员", status: 1, type: 0 },
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
        { id: 15, name: "安全员", remark: "安全管理", status: 1, type: 2 },
        { id: 16, name: "质检员", remark: "质量管理", status: 1, type: 2 },
        { id: 17, name: "设备管理员", remark: "设备管理", status: 1, type: 2 },
        { id: 18, name: "仓库管理员", remark: "仓库管理", status: 1, type: 2 },
        { id: 19, name: "财务人员", remark: "财务管理", status: 1, type: 2 },
        { id: 20, name: "人事专员", remark: "人事管理", status: 1, type: 2 },
        { id: 21, name: "采购员", remark: "采购管理", status: 1, type: 2 },
        { id: 22, name: "销售员", remark: "销售管理", status: 1, type: 2 },
        { id: 23, name: "维修工", remark: "设备维修", status: 1, type: 2 },
        { id: 24, name: "操作工", remark: "生产操作", status: 1, type: 2 },
        { id: 25, name: "班组长", remark: "班组管理", status: 1, type: 2 },
        { id: 26, name: "技术员", remark: "技术支持", status: 1, type: 2 },
        { id: 27, name: "质检主管", remark: "质检部门", status: 1, type: 1 },
        { id: 28, name: "生产主管", remark: "生产部门", status: 1, type: 1 }
      ];

      const totalElements = allRoles.length;
      const start = page * size;
      const content = allRoles.slice(start, start + size);
      const totalPages = Math.ceil(totalElements / size);

      return {
        success: true,
        t: {
          content,
          totalElements,
          totalPages,
          number: page,
          size,
          first: page === 0,
          last: page >= totalPages - 1
        }
      };
    }
  }
]);
