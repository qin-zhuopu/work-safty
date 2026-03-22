import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 模拟数据
const mockData = [
  {
    id: 131,
    name: "泰安-制盐0米司泵巡检路线",
    cycle: 4,
    cycleData: "",
    startTime: 1697040000000,
    endTime: 1760198400000,
    deptName: "化工一班",
    status: 2,
    inspectionTask: {
      id: 125,
      name: "制盐0米司泵巡检路线"
    }
  },
  {
    id: 144,
    name: "合成氯乙烯气柜巡检",
    cycle: 1,
    cycleData: "",
    startTime: 1703779200000,
    endTime: 1766937600000,
    deptName: "化工二班",
    status: 1,
    inspectionTask: {
      id: 138,
      name: "合成氯乙烯气柜巡检"
    }
  },
  {
    id: 152,
    name: "双氧水工段配制中间罐区巡检路线",
    cycle: 4,
    cycleData: "",
    startTime: 1705075200000,
    endTime: 1768233600000,
    deptName: "化工三班",
    status: 1,
    inspectionTask: {
      id: 146,
      name: "双氧水工段配制中间罐区巡检路线"
    }
  },
  {
    id: 153,
    name: "双氧水工段主装置一二楼巡检路线",
    cycle: 1,
    cycleData: "",
    startTime: 1705075200000,
    endTime: 1768233600000,
    deptName: "化工三班",
    status: 2,
    inspectionTask: {
      id: 147,
      name: "双氧水工段主装置一二楼巡检路线"
    }
  },
  {
    id: 154,
    name: "双氧水主装置区三四五楼巡检路线",
    cycle: 2,
    cycleData: "",
    startTime: 1705075200000,
    endTime: 1768233600000,
    deptName: "化工三班",
    status: 0,
    inspectionTask: {
      id: 148,
      name: "双氧水主装置区三四五楼巡检路线"
    }
  },
  {
    id: 155,
    name: "VCM装置区巡检路线",
    cycle: 1,
    cycleData: "",
    startTime: 1705161600000,
    endTime: 1768320000000,
    deptName: "电气班",
    status: 1,
    inspectionTask: {
      id: 149,
      name: "VCM装置区巡检路线"
    }
  },
  {
    id: 156,
    name: "聚合工段巡检路线",
    cycle: 3,
    cycleData: "",
    startTime: 1705248000000,
    endTime: 1768406400000,
    deptName: "仪表班",
    status: 2,
    inspectionTask: {
      id: 150,
      name: "聚合工段巡检路线"
    }
  },
  {
    id: 157,
    name: "干燥工段巡检路线",
    cycle: 1,
    cycleData: "",
    startTime: 1705334400000,
    endTime: 1768492800000,
    deptName: "供水班",
    status: 1,
    inspectionTask: {
      id: 151,
      name: "干燥工段巡检路线"
    }
  },
  {
    id: 158,
    name: "电石料仓和罩棚单元巡检",
    cycle: 4,
    cycleData: "",
    startTime: 1705420800000,
    endTime: 1768579200000,
    deptName: "化工一班",
    status: 0,
    inspectionTask: {
      id: 152,
      name: "电石料仓和罩棚单元巡检"
    }
  },
  {
    id: 159,
    name: "液氯贮槽罐区单元巡检",
    cycle: 2,
    cycleData: "",
    startTime: 1705507200000,
    endTime: 1768665600000,
    deptName: "化工二班",
    status: 2,
    inspectionTask: {
      id: 153,
      name: "液氯贮槽罐区单元巡检"
    }
  },
  {
    id: 160,
    name: "产品罐区单元巡检",
    cycle: 1,
    cycleData: "",
    startTime: 1705593600000,
    endTime: 1768752000000,
    deptName: "化工三班",
    status: 1,
    inspectionTask: {
      id: 154,
      name: "产品罐区单元巡检"
    }
  },
  {
    id: 161,
    name: "EDC罐区单元巡检",
    cycle: 3,
    cycleData: "",
    startTime: 1705680000000,
    endTime: 1768838400000,
    deptName: "电气班",
    status: 2,
    inspectionTask: {
      id: 155,
      name: "EDC罐区单元巡检"
    }
  }
];

export default defineFakeRoute([
  {
    url: "/sft/insp/plan/list.json",
    method: "get",
    response: ({ query }) => {
      const page = Number(query.page) || 1;
      const size = Number(query.size) || 10;
      const name = query.name || "";
      const startTime = query.startTime || "";
      const endTime = query.endTime || "";
      const deptName = query.deptName || "";

      // 过滤数据
      let filteredData = mockData;
      if (name) {
        filteredData = filteredData.filter(item => item.name.includes(name));
      }
      if (deptName) {
        filteredData = filteredData.filter(item =>
          item.deptName?.includes(deptName)
        );
      }
      if (startTime) {
        const start = new Date(startTime).getTime();
        filteredData = filteredData.filter(item => item.startTime >= start);
      }
      if (endTime) {
        const end = new Date(endTime).getTime();
        filteredData = filteredData.filter(item => item.endTime <= end);
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
