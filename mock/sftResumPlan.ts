import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 模拟数据
const mockData = [
  {
    id: 130,
    name: "过氧化氢主装置稀品和浓品工段单元操作负责人履职",
    type: "操作负责人",
    cycle: "每周",
    status: 1,
    beginTime: 1770566400000,
    endTime: 1798732799000,
    company: {
      id: 1,
      name: "德州实华化工有限公司"
    },
    hazard: {
      id: 154,
      name: "过氧化氢主装置稀品和浓品工段单元"
    },
    user: {
      id: 1,
      uname: "admin",
      ushow: "操作负责人"
    },
    pointsName: "主装置稀品工段"
  },
  {
    id: 131,
    name: "液氯贮槽罐区单元操作负责人履职排查",
    type: "操作负责人",
    cycle: "每日",
    status: 2,
    beginTime: 1770480000000,
    endTime: 1798646399000,
    company: {
      id: 1,
      name: "德州实华化工有限公司"
    },
    hazard: {
      id: 416,
      name: "液氯贮槽罐区单元"
    },
    user: {
      id: 2,
      uname: "operator1",
      ushow: "操作负责人"
    },
    pointsName: "液氯贮槽罐区"
  },
  {
    id: 132,
    name: "氯乙烯聚合单元技术负责人履职计划",
    type: "技术负责人",
    cycle: "每周",
    status: 0,
    beginTime: 1770652800000,
    endTime: 1798819199000,
    company: {
      id: 1,
      name: "德州实华化工有限公司"
    },
    hazard: {
      id: 732,
      name: "氯乙烯聚合（含供料及回收）单元"
    },
    user: {
      id: 3,
      uname: "tech1",
      ushow: "技术负责人"
    },
    pointsName: "聚合工段"
  },
  {
    id: 133,
    name: "聚氯乙烯气柜区单元主要负责人履职",
    type: "主要负责人",
    cycle: "每月",
    status: 1,
    beginTime: 1770307200000,
    endTime: 1798473599000,
    company: {
      id: 1,
      name: "德州实华化工有限公司"
    },
    hazard: {
      id: 730,
      name: "聚氯乙烯气柜区单元"
    },
    user: {
      id: 4,
      uname: "main1",
      ushow: "主要负责人"
    },
    pointsName: "气柜区"
  },
  {
    id: 134,
    name: "氯乙烯贮槽罐区单元操作负责人履职",
    type: "操作负责人",
    cycle: "每日",
    status: 2,
    beginTime: 1770393600000,
    endTime: 1798559999000,
    company: {
      id: 1,
      name: "德州实华化工有限公司"
    },
    hazard: {
      id: 731,
      name: "氯乙烯贮槽罐区单元"
    },
    user: {
      id: 5,
      uname: "operator2",
      ushow: "操作负责人"
    },
    pointsName: "氯乙烯贮槽罐区"
  },
  {
    id: 135,
    name: "电石料仓和罩棚单元技术负责人履职",
    type: "技术负责人",
    cycle: "每周",
    status: 0,
    beginTime: 1770739200000,
    endTime: 1798905599000,
    company: {
      id: 1,
      name: "德州实华化工有限公司"
    },
    hazard: {
      id: 728,
      name: "电石料仓和罩棚单元"
    },
    user: {
      id: 6,
      uname: "tech2",
      ushow: "技术负责人"
    },
    pointsName: "电石料仓"
  },
  {
    id: 136,
    name: "产品罐区单元主要负责人履职计划",
    type: "主要负责人",
    cycle: "每月",
    status: 1,
    beginTime: 1770825600000,
    endTime: 1798991999000,
    company: {
      id: 1,
      name: "德州实华化工有限公司"
    },
    hazard: {
      id: 167,
      name: "产品罐区单元"
    },
    user: {
      id: 7,
      uname: "main2",
      ushow: "主要负责人"
    },
    pointsName: "产品罐区"
  },
  {
    id: 137,
    name: "EDC罐区单元操作负责人履职排查",
    type: "操作负责人",
    cycle: "每日",
    status: 2,
    beginTime: 1770912000000,
    endTime: 1799078399000,
    company: {
      id: 1,
      name: "德州实华化工有限公司"
    },
    hazard: {
      id: 943,
      name: "EDC罐区单元"
    },
    user: {
      id: 8,
      uname: "operator3",
      ushow: "操作负责人"
    },
    pointsName: "EDC罐区"
  },
  {
    id: 138,
    name: "VCM装置单元技术负责人履职",
    type: "技术负责人",
    cycle: "每周",
    status: 0,
    beginTime: 1770998400000,
    endTime: 1799164799000,
    company: {
      id: 1,
      name: "德州实华化工有限公司"
    },
    hazard: {
      id: 961,
      name: "VCM装置单元"
    },
    user: {
      id: 9,
      uname: "tech3",
      ushow: "技术负责人"
    },
    pointsName: "VCM装置区"
  },
  {
    id: 139,
    name: "聚氯乙烯装置单元主要负责人履职",
    type: "主要负责人",
    cycle: "每月",
    status: 1,
    beginTime: 1771084800000,
    endTime: 1799251199000,
    company: {
      id: 1,
      name: "德州实华化工有限公司"
    },
    hazard: {
      id: 962,
      name: "聚氯乙烯装置单元（含VCM储存）"
    },
    user: {
      id: 10,
      uname: "main3",
      ushow: "主要负责人"
    },
    pointsName: "聚氯乙烯装置"
  }
];

export default defineFakeRoute([
  {
    url: "/sft/resum/plan/list.json",
    method: "get",
    response: ({ query }) => {
      const page = Number(query.page) || 1;
      const size = Number(query.size) || 10;
      const type = query.type || "";
      const name = query.name || "";
      const hazard = query.hazard || "";

      // 过滤数据
      let filteredData = mockData;
      if (type) {
        filteredData = filteredData.filter(item => item.type === type);
      }
      if (name) {
        filteredData = filteredData.filter(item => item.name.includes(name));
      }
      if (hazard) {
        filteredData = filteredData.filter(item =>
          item.hazard?.name?.includes(hazard)
        );
      }

      // 分页
      const totalElements = filteredData.length;
      const start = (page - 1) * size;
      const end = start + size;
      const content = filteredData.slice(start, end);

      return {
        success: true,
        t: {
          content,
          totalElements
        }
      };
    }
  }
]);
