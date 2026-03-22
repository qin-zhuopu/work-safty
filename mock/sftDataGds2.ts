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
            v: 25.5,
            gdsDevice: {
              type: "压力传感器",
              name: "管道压力监测器",
              addr: "PT-001",
              unit: "MPa"
            }
          },
          {
            id: 2,
            t: 1711084860000,
            status: 2,
            v: 0.8,
            gdsDevice: {
              type: "液位传感器",
              name: "储罐液位监测器",
              addr: "LT-001",
              unit: "m"
            }
          },
          {
            id: 3,
            t: 1711084920000,
            status: 3,
            v: 85.2,
            gdsDevice: {
              type: "温度传感器",
              name: "管道温度监测器",
              addr: "TT-001",
              unit: "℃"
            }
          },
          {
            id: 4,
            t: 1711084980000,
            status: 1,
            v: 1500,
            gdsDevice: {
              type: "流量传感器",
              name: "管道流量监测器",
              addr: "FT-001",
              unit: "m³/h"
            }
          },
          {
            id: 5,
            t: 1711085040000,
            status: 4,
            v: 0.2,
            gdsDevice: {
              type: "压力传感器",
              name: "管道压力监测器",
              addr: "PT-002",
              unit: "MPa"
            }
          },
          {
            id: 6,
            t: 1711085100000,
            status: 1,
            v: 45.8,
            gdsDevice: {
              type: "液位传感器",
              name: "储罐液位监测器",
              addr: "LT-002",
              unit: "m"
            }
          },
          {
            id: 7,
            t: 1711085160000,
            status: 5,
            v: 120.5,
            gdsDevice: {
              type: "温度传感器",
              name: "反应釜温度监测器",
              addr: "TT-002",
              unit: "℃"
            }
          },
          {
            id: 8,
            t: 1711085220000,
            status: 1,
            v: 2200,
            gdsDevice: {
              type: "流量传感器",
              name: "管道流量监测器",
              addr: "FT-002",
              unit: "m³/h"
            }
          }
        ]
      };
    }
  }
]);
