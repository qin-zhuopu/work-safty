import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/risk/control/statistics.json",
    method: "get",
    response: ({ query }) => {
      const { startTime = "2026-03-01", endTime = "2026-03-31" } = query;

      return {
        success: true,
        t: {
          dateRange: `${startTime}至${endTime}`,
          summary:
            "2026年03月01日至2026年03月31日共下发隐患排查任务12533项，其中公司级排查任务2031项，车间级排查任务864项,处室级排查任务582项,工段班组岗位级排查任务9056项。",
          taskExecution: {
            summary:
              "2026年03月01日至2026年03月31日隐患排查任务12533项，其中已完成7891项，未完成4642项，已逾期0项，执行率62.96%",
            list: [
              {
                id: 1,
                type: "公司级",
                planCount: 2031,
                completed: 1361,
                overdue: 0,
                incomplete: 670,
                rate: "67.01%"
              },
              {
                id: 2,
                type: "工段班组岗位级",
                planCount: 9056,
                completed: 5560,
                overdue: 0,
                incomplete: 3496,
                rate: "61.40%"
              },
              {
                id: 3,
                type: "车间级",
                planCount: 864,
                completed: 568,
                overdue: 0,
                incomplete: 296,
                rate: "65.74%"
              },
              {
                id: 4,
                type: "处室级",
                planCount: 582,
                completed: 402,
                overdue: 0,
                incomplete: 180,
                rate: "69.07%"
              }
            ]
          },
          overdueTask: {
            summary:
              "2026年03月01日至2026年03月31日逾期未执行任务0项，其中，公司级排查任务逾期0项，车间级排查任务已逾期0项，处室级排查任务已逾期0项，工段班组岗位级排查任务已逾期0项。",
            list: []
          }
        }
      };
    }
  }
]);
