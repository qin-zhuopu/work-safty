import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/insp/task/list",
    method: "get",
    response: ({
      query
    }: {
      query: {
        page?: string;
        size?: string;
        name?: string;
        deptName?: string;
        deptName1?: string;
      };
    }) => {
      const page = Number(query.page) || 1;
      const size = Number(query.size) || 10;

      const allData = [
        {
          id: 3,
          name: "PVC空压站巡检",
          dept: "2758,22",
          startTeam: 2,
          remarks: "",
          createTime: 1736124095504,
          sysDept: { id: 2758, name: "热电车间" }
        },
        {
          id: 4,
          name: "冷冻站巡检",
          dept: "2758,22",
          startTeam: 2,
          remarks: "",
          createTime: 1736124095504,
          sysDept: { id: 2758, name: "热电车间" }
        },
        {
          id: 9,
          name: "整流工段巡检路线",
          dept: "92,22",
          startTeam: 1,
          remarks: "",
          createTime: 1736124095504,
          sysDept: { id: 92, name: "热电车间" }
        },
        {
          id: 10,
          name: "EDC干燥巡检计划",
          dept: "52,19",
          startTeam: 2,
          remarks: "",
          createTime: 1736124095504,
          sysDept: { id: 52, name: "聚氯乙烯车间" }
        },
        {
          id: 13,
          name: "EDC聚合回收气柜巡检",
          dept: "52,19",
          startTeam: 1,
          remarks: "",
          createTime: 1736124095504,
          sysDept: { id: 52, name: "聚氯乙烯车间" }
        },
        {
          id: 14,
          name: "VCM装置区巡检",
          dept: "52,19",
          startTeam: 3,
          remarks: "每日巡检",
          createTime: 1736124095504,
          sysDept: { id: 52, name: "聚氯乙烯车间" }
        },
        {
          id: 15,
          name: "液氯贮槽罐区巡检",
          dept: "100,22",
          startTeam: 4,
          remarks: "",
          createTime: 1736124095504,
          sysDept: { id: 100, name: "氯碱车间" }
        },
        {
          id: 16,
          name: "氯化氢合成巡检",
          dept: "100,22",
          startTeam: 1,
          remarks: "重点区域",
          createTime: 1736124095504,
          sysDept: { id: 100, name: "氯碱车间" }
        },
        {
          id: 17,
          name: "电解工段巡检路线",
          dept: "100,22",
          startTeam: 2,
          remarks: "",
          createTime: 1736124095504,
          sysDept: { id: 100, name: "氯碱车间" }
        },
        {
          id: 18,
          name: "双氧水装置巡检",
          dept: "200,22",
          startTeam: 5,
          remarks: "长白班巡检",
          createTime: 1736124095504,
          sysDept: { id: 200, name: "双氧水车间" }
        },
        {
          id: 19,
          name: "氢化塔巡检路线",
          dept: "200,22",
          startTeam: 1,
          remarks: "",
          createTime: 1736124095504,
          sysDept: { id: 200, name: "双氧水车间" }
        },
        {
          id: 20,
          name: "氧化塔巡检路线",
          dept: "200,22",
          startTeam: 2,
          remarks: "",
          createTime: 1736124095504,
          sysDept: { id: 200, name: "双氧水车间" }
        }
      ];

      // 简单的筛选逻辑
      let filteredData = allData;
      if (query.name) {
        filteredData = filteredData.filter(item =>
          item.name.includes(query.name)
        );
      }
      if (query.deptName) {
        filteredData = filteredData.filter(item =>
          item.sysDept?.name.includes(query.deptName)
        );
      }

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
