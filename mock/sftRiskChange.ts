import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 模拟数据 - 风险变更管理
const mockData = [
  {
    id: "1",
    creater: {
      id: 108,
      ushow: "赵健",
      uname: "zhaojian"
    },
    createDate: 1704067200000,
    content: "制盐工段6效加热室改造项目变更申请",
    field: "制盐工段",
    checker: {
      id: 20,
      ushow: "王强",
      uname: "wangqiang"
    },
    checkerDate: 1704153600000,
    type: 1,
    status: "已审核",
    plan: {
      id: "101",
      name: "2024年度安全培训计划"
    },
    file1: "ssc-dzsh/1/0cc0a2a72386446c9869b4a6643a2837.jpg"
  },
  {
    id: "2",
    creater: {
      id: 19,
      ushow: "张涛",
      uname: "zhangtao"
    },
    createDate: 1703980800000,
    content: "气柜进口管道由DN400改为DN500",
    field: "合成工段",
    checker: {
      id: 21,
      ushow: "李明",
      uname: "liming"
    },
    checkerDate: 1704067200000,
    type: 2,
    status: "已审核",
    plan: {
      id: "102",
      name: "管道变更专项培训"
    },
    file1: ""
  },
  {
    id: "3",
    creater: {
      id: 23,
      ushow: "陈静",
      uname: "chenjing"
    },
    createDate: 1703894400000,
    content: "新增2#聚合B系列热水泵",
    field: "聚合工段",
    checker: null,
    checkerDate: null,
    type: 1,
    status: "未审核",
    plan: null,
    file1: "ssc-dzsh/1/doc1.pdf,ssc-dzsh/1/doc2.docx"
  },
  {
    id: "4",
    creater: {
      id: 20,
      ushow: "王强",
      uname: "wangqiang"
    },
    createDate: 1703808000000,
    content: "电解工段整流变压器冷却方式变更",
    field: "离子膜工段",
    checker: {
      id: 22,
      ushow: "刘伟",
      uname: "liuwei"
    },
    checkerDate: 1703894400000,
    type: 2,
    status: "已审核",
    plan: {
      id: "103",
      name: "电气设备变更培训"
    },
    file1: ""
  },
  {
    id: "5",
    creater: {
      id: 19,
      ushow: "张涛",
      uname: "zhangtao"
    },
    createDate: 1703721600000,
    content: "聚合二期DCS控制系统更新升级",
    field: "聚合工段",
    checker: null,
    checkerDate: null,
    type: 1,
    status: "已驳回",
    plan: null,
    file1: ""
  },
  {
    id: "6",
    creater: {
      id: 22,
      ushow: "刘伟",
      uname: "liuwei"
    },
    createDate: 1703635200000,
    content: "热电车锅炉给水泵变频改造",
    field: "锅炉工段",
    checker: {
      id: 108,
      ushow: "赵健",
      uname: "zhaojian"
    },
    checkerDate: 1703721600000,
    type: 2,
    status: "已审核",
    plan: {
      id: "104",
      name: "节能技术培训"
    },
    file1: ""
  },
  {
    id: "7",
    creater: {
      id: 21,
      ushow: "李明",
      uname: "liming"
    },
    createDate: 1703548800000,
    content: "双氧水浓缩工段工艺参数调整",
    field: "双氧水装置工段",
    checker: null,
    checkerDate: null,
    type: 1,
    status: "未审核",
    plan: null,
    file1: ""
  },
  {
    id: "8",
    creater: {
      id: 23,
      ushow: "陈静",
      uname: "chenjing"
    },
    createDate: 1703462400000,
    content: "VCM装置EDC精馏塔改造项目",
    field: "EDC VCM工段",
    checker: {
      id: 19,
      ushow: "张涛",
      uname: "zhangtao"
    },
    checkerDate: 1703548800000,
    type: 2,
    status: "已审核",
    plan: {
      id: "105",
      name: "精馏塔操作培训"
    },
    file1: "ssc-dzsh/1/equipment.jpg"
  },
  {
    id: "9",
    creater: {
      id: 20,
      ushow: "王强",
      uname: "wangqiang"
    },
    createDate: 1703376000000,
    content: "机电仪车间DCS系统软硬件升级",
    field: "仪表工段",
    checker: null,
    checkerDate: null,
    type: 1,
    status: "未审核",
    plan: null,
    file1: ""
  },
  {
    id: "10",
    creater: {
      id: 108,
      ushow: "赵健",
      uname: "zhaojian"
    },
    createDate: 1703289600000,
    content: "氯气液化工艺优化项目实施",
    field: "液氯工段",
    checker: {
      id: 23,
      ushow: "陈静",
      uname: "chenjing"
    },
    checkerDate: 1703376000000,
    type: 2,
    status: "已审核",
    plan: {
      id: "106",
      name: "氯气液化工艺培训"
    },
    file1: ""
  },
  {
    id: "11",
    creater: {
      id: 19,
      ushow: "张涛",
      uname: "zhangtao"
    },
    createDate: 1703203200000,
    content: "液氯贮槽罐区安全设施改造",
    field: "液氯工段",
    checker: null,
    checkerDate: null,
    type: 1,
    status: "未审核",
    plan: null,
    file1: ""
  },
  {
    id: "12",
    creater: {
      id: 22,
      ushow: "刘伟",
      uname: "liuwei"
    },
    createDate: 1703116800000,
    content: "氯乙烯聚合装置供料系统变更",
    field: "聚合工段",
    checker: {
      id: 20,
      ushow: "王强",
      uname: "wangqiang"
    },
    checkerDate: 1703203200000,
    type: 2,
    status: "已审核",
    plan: {
      id: "107",
      name: "聚合工艺变更培训"
    },
    file1: ""
  }
];

export default defineFakeRoute([
  // 变更列表接口
  {
    url: "/sft/risk/change/list.json",
    method: "get",
    response: ({ query }) => {
      const page = parseInt(query.page as string) || 1;
      const size = parseInt(query.size as string) || 10;
      const ushow = (query.ushow as string) || "";
      const content = (query.content as string) || "";

      // 过滤数据
      let filteredData = mockData;

      if (ushow) {
        filteredData = filteredData.filter(item =>
          item.creater?.ushow?.includes(ushow)
        );
      }
      if (content) {
        filteredData = filteredData.filter(item =>
          item.content?.includes(content)
        );
      }

      // 分页
      const start = (page - 1) * size;
      const end = start + size;
      const pageData = filteredData.slice(start, end);

      return {
        success: true,
        t: {
          content: pageData,
          totalElements: filteredData.length,
          pageable: {
            offset: 0,
            pageNumber: page - 1,
            pageSize: size,
            paged: true,
            sort: {
              empty: false,
              sorted: true,
              unsorted: false
            },
            unpaged: false
          },
          first: page === 1,
          last: end >= filteredData.length,
          number: page - 1,
          numberOfElements: pageData.length,
          size,
          total: filteredData.length,
          totalPages: Math.ceil(filteredData.length / size),
          sort: {
            empty: false,
            sorted: true,
            unsorted: false
          },
          empty: pageData.length === 0
        }
      };
    }
  },
  // 删除接口
  {
    url: "/sft/risk/change/del/:id",
    method: "get",
    response: () => {
      return { success: true, message: "删除成功" };
    }
  },
  // 导出接口
  {
    url: "/sft/risk/change/export",
    method: "get",
    response: () => {
      return { success: true, message: "导出成功" };
    }
  }
]);
