import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 模拟数据
const mockData = [
  {
    id: 1,
    field: "生产区域A",
    startTime: 1696724684951,
    endTime: 1699316684951
  },
  {
    id: 2,
    field: "生产区域B",
    startTime: 1696810800000,
    endTime: 1699402800000
  },
  {
    id: 3,
    field: "仓储区域",
    startTime: 1696897200000,
    endTime: 1699489200000
  },
  {
    id: 4,
    field: "罐区C",
    startTime: 1696983600000,
    endTime: 1699575600000
  },
  {
    id: 5,
    field: "装卸区D",
    startTime: 1697070000000,
    endTime: 1699662000000
  },
  {
    id: 6,
    field: "控制室区域",
    startTime: 1697156400000,
    endTime: 1699748400000
  },
  {
    id: 7,
    field: "配电室区域",
    startTime: 1697242800000,
    endTime: 1699834800000
  },
  {
    id: 8,
    field: "化验室区域",
    startTime: 1697329200000,
    endTime: 1699921200000
  },
  {
    id: 9,
    field: "维修车间",
    startTime: 1697415600000,
    endTime: 1700007600000
  },
  {
    id: 10,
    field: "办公区域",
    startTime: 1697502000000,
    endTime: 1700094000000
  },
  {
    id: 11,
    field: "消防站区域",
    startTime: 1697588400000,
    endTime: 1700180400000
  },
  {
    id: 12,
    field: "污水处理区",
    startTime: 1697674800000,
    endTime: 1700266800000
  }
];

export default defineFakeRoute([
  {
    url: "/sft/data/silent/area/list.json",
    method: "get",
    response: ({ query }) => {
      const page = Number(query.page) || 1;
      const size = Number(query.size) || 10;
      const title = query.title || "";

      // 过滤数据
      let filteredData = mockData;
      if (title) {
        filteredData = mockData.filter(item => item.field.includes(title));
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
