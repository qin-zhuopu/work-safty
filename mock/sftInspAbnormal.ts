import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 模拟数据
const mockData = [
  {
    id: 1,
    name: "测试",
    nodeName: "结束",
    status: "结束",
    field: "测试",
    addDate: 1696724684951,
    addUser: { id: 5219, ushow: "沈政" }
  },
  {
    id: 2,
    name: "设备异常",
    nodeName: "审批中",
    status: "审批中",
    field: "设备故障",
    addDate: 1696810800000,
    addUser: { id: 5220, ushow: "张三" }
  },
  {
    id: 3,
    name: "巡检点异常",
    nodeName: "审批驳回",
    status: "驳回",
    field: "巡检点损坏",
    addDate: 1696897200000,
    addUser: { id: 5221, ushow: "李四" }
  },
  {
    id: 4,
    name: "温度异常",
    nodeName: "待审批",
    status: "待审批",
    field: "温度超标",
    addDate: 1696983600000,
    addUser: { id: 5222, ushow: "王五" }
  },
  {
    id: 5,
    name: "压力异常",
    nodeName: "结束",
    status: "结束",
    field: "压力超标",
    addDate: 1697070000000,
    addUser: { id: 5223, ushow: "赵六" }
  },
  {
    id: 6,
    name: "液位异常",
    nodeName: "审批中",
    status: "审批中",
    field: "液位过高",
    addDate: 1697156400000,
    addUser: { id: 5224, ushow: "孙七" }
  },
  {
    id: 7,
    name: "流量异常",
    nodeName: "审批驳回",
    status: "驳回",
    field: "流量不足",
    addDate: 1697242800000,
    addUser: { id: 5225, ushow: "周八" }
  },
  {
    id: 8,
    name: "振动异常",
    nodeName: "结束",
    status: "结束",
    field: "振动超标",
    addDate: 1697329200000,
    addUser: { id: 5226, ushow: "吴九" }
  },
  {
    id: 9,
    name: "噪声异常",
    nodeName: "待审批",
    status: "待审批",
    field: "噪声超标",
    addDate: 1697415600000,
    addUser: { id: 5227, ushow: "郑十" }
  },
  {
    id: 10,
    name: "电气异常",
    nodeName: "结束",
    status: "结束",
    field: "电气故障",
    addDate: 1697502000000,
    addUser: { id: 5228, ushow: "冯十一" }
  },
  {
    id: 11,
    name: "仪表异常",
    nodeName: "审批中",
    status: "审批中",
    field: "仪表失灵",
    addDate: 1697588400000,
    addUser: { id: 5229, ushow: "陈十二" }
  },
  {
    id: 12,
    name: "阀门异常",
    nodeName: "审批驳回",
    status: "驳回",
    field: "阀门泄漏",
    addDate: 1697674800000,
    addUser: { id: 5230, ushow: "褚十三" }
  }
];

export default defineFakeRoute([
  {
    url: "/sft/insp/abnormal/list.json",
    method: "get",
    response: ({ query }) => {
      const page = Number(query.page) || 1;
      const size = Number(query.size) || 10;
      const name = query.name || "";

      // 过滤数据
      let filteredData = mockData;
      if (name) {
        filteredData = mockData.filter(
          item =>
            item.name.includes(name) ||
            item.field.includes(name) ||
            item.nodeName.includes(name)
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
