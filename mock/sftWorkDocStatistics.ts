import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/work/doc/statistics/list.json",
    method: "get",
    response: ({ query: _query }) => {
      return {
        success: true,
        t: {
          actList: [
            { deptName: "机电仪车间", num: 3 },
            { deptName: "聚氯乙烯车间", num: 11 },
            { deptName: "电解车间", num: 23 },
            { deptName: "热电车间", num: 78 },
            { deptName: "泰安分公司", num: 6 },
            { deptName: "双氧水车间", num: 3 }
          ],
          bbCount: 162,
          cbsCount: 312,
          docList: [
            { deptName: "电解车间", num: 104 },
            { deptName: "热电车间", num: 165 },
            { deptName: "泰安分公司", num: 31 },
            { deptName: "聚氯乙烯车间", num: 79 },
            { deptName: "双氧水车间", num: 16 },
            { deptName: "机电仪车间", num: 6 }
          ],
          docList1: [
            { bhgNum: 0, dtName: "一级动火", hgNum: 60 },
            { bhgNum: 1, dtName: "受限空间", hgNum: 65 },
            { bhgNum: 0, dtName: "高处架设作业", hgNum: 10 },
            { bhgNum: 0, dtName: "二级动火", hgNum: 76 },
            { bhgNum: 0, dtName: "断路作业", hgNum: 1 },
            { bhgNum: 0, dtName: "吊装作业", hgNum: 52 },
            { bhgNum: 0, dtName: "临时用电", hgNum: 61 },
            { bhgNum: 0, dtName: "盲板作业", hgNum: 28 },
            { bhgNum: 0, dtName: "特级动火", hgNum: 2 },
            { bhgNum: 0, dtName: "高处检维修作业", hgNum: 118 }
          ]
        }
      };
    }
  }
]);
