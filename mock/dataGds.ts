import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/data/gds/data2.json",
    method: "get",
    response: () => {
      return {
        success: true,
        message: "操作成功",
        t: [
          {
            id: 1,
            t: 1711084800000,
            status: 1,
            v: 25.6,
            gdsDevice: {
              type: "压力变送器",
              name: "管道压力监测",
              addr: "PT-001",
              unit: "MPa"
            }
          },
          {
            id: 2,
            t: 1711084860000,
            status: 2,
            v: 12.3,
            gdsDevice: {
              type: "温度变送器",
              name: "管道温度监测",
              addr: "TT-001",
              unit: "℃"
            }
          },
          {
            id: 3,
            t: 1711084920000,
            status: 1,
            v: 156.8,
            gdsDevice: {
              type: "流量计",
              name: "管道流量监测",
              addr: "FT-001",
              unit: "m³/h"
            }
          },
          {
            id: 4,
            t: 1711084980000,
            status: 3,
            v: 2.5,
            gdsDevice: {
              type: "液位计",
              name: "储罐液位监测",
              addr: "LT-001",
              unit: "m"
            }
          },
          {
            id: 5,
            t: 1711085040000,
            status: 1,
            v: 0.8,
            gdsDevice: {
              type: "压力变送器",
              name: "管道压力监测",
              addr: "PT-002",
              unit: "MPa"
            }
          },
          {
            id: 6,
            t: 1711085100000,
            status: 4,
            v: 8.2,
            gdsDevice: {
              type: "温度变送器",
              name: "反应釜温度监测",
              addr: "TT-002",
              unit: "℃"
            }
          },
          {
            id: 7,
            t: 1711085160000,
            status: 1,
            v: 320.5,
            gdsDevice: {
              type: "流量计",
              name: "出口流量监测",
              addr: "FT-002",
              unit: "m³/h"
            }
          },
          {
            id: 8,
            t: 1711085220000,
            status: 5,
            v: 6.8,
            gdsDevice: {
              type: "液位计",
              name: "高位槽液位监测",
              addr: "LT-002",
              unit: "m"
            }
          },
          {
            id: 9,
            t: 1711085280000,
            status: 1,
            v: 1.2,
            gdsDevice: {
              type: "压力变送器",
              name: "进口压力监测",
              addr: "PT-003",
              unit: "MPa"
            }
          },
          {
            id: 10,
            t: 1711085340000,
            status: 2,
            v: 45.6,
            gdsDevice: {
              type: "温度变送器",
              name: "换热器温度监测",
              addr: "TT-003",
              unit: "℃"
            }
          }
        ]
      };
    }
  }
]);
