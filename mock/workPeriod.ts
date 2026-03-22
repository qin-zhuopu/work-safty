import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/work/period/list.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: {
          content: [
            {
              id: 2,
              beginDate: 1762617600000,
              bTime: "00:00:00",
              endDate: 1762617600000,
              eTime: "23:59:00",
              remark: ""
            },
            {
              id: 3,
              beginDate: 1762704000000,
              bTime: "00:00:00",
              endDate: 1762704000000,
              eTime: "23:59:00",
              remark: "节假日特殊时段"
            },
            {
              id: 4,
              beginDate: 1762790400000,
              bTime: "08:00:00",
              endDate: 1762790400000,
              eTime: "18:00:00",
              remark: "设备检修时段"
            },
            {
              id: 5,
              beginDate: 1762876800000,
              bTime: "00:00:00",
              endDate: 1762876800000,
              eTime: "23:59:00",
              remark: ""
            },
            {
              id: 6,
              beginDate: 1762963200000,
              bTime: "00:00:00",
              endDate: 1762963200000,
              eTime: "23:59:00",
              remark: "重大活动保障时段"
            },
            {
              id: 7,
              beginDate: 1763049600000,
              bTime: "06:00:00",
              endDate: 1763049600000,
              eTime: "22:00:00",
              remark: ""
            },
            {
              id: 8,
              beginDate: 1763136000000,
              bTime: "00:00:00",
              endDate: 1763136000000,
              eTime: "23:59:00",
              remark: "夜间巡查时段"
            },
            {
              id: 9,
              beginDate: 1763222400000,
              bTime: "00:00:00",
              endDate: 1763222400000,
              eTime: "23:59:00",
              remark: ""
            },
            {
              id: 10,
              beginDate: 1763308800000,
              bTime: "08:00:00",
              endDate: 1763308800000,
              eTime: "20:00:00",
              remark: "限产时段"
            },
            {
              id: 11,
              beginDate: 1763395200000,
              bTime: "00:00:00",
              endDate: 1763395200000,
              eTime: "23:59:00",
              remark: ""
            },
            {
              id: 12,
              beginDate: 1763481600000,
              bTime: "00:00:00",
              endDate: 1763481600000,
              eTime: "23:59:00",
              remark: "安全检查时段"
            },
            {
              id: 13,
              beginDate: 1763568000000,
              bTime: "00:00:00",
              endDate: 1763568000000,
              eTime: "23:59:00",
              remark: ""
            }
          ],
          totalElements: 12
        }
      };
    }
  }
]);
