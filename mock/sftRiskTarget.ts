import { defineFakeRoute } from "vite-plugin-fake-server/client";

interface Creater {
  ushow: string;
}

interface _RiskTargetItem {
  id: number;
  name: string;
  hazardCode: string;
  type: number;
  creater: Creater;
}

export default defineFakeRoute([
  {
    url: "/sft/risk/target/list.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: {
          content: [
            {
              id: 219,
              name: "德州实华智慧HSE系统",
              hazardCode: "ZHHSE",
              type: 0,
              creater: { ushow: "耿傲" }
            },
            {
              id: 218,
              name: "液氯贮槽罐区单元",
              hazardCode: "YYLCG",
              type: 1,
              creater: { ushow: "张三" }
            },
            {
              id: 217,
              name: "氯乙烯聚合单元",
              hazardCode: "LYXJH",
              type: 1,
              creater: { ushow: "李四" }
            },
            {
              id: 216,
              name: "聚氯乙烯气柜区单元",
              hazardCode: "JLXQQ",
              type: 1,
              creater: { ushow: "王五" }
            },
            {
              id: 215,
              name: "氯乙烯贮槽罐区单元",
              hazardCode: "LYXGC",
              type: 1,
              creater: { ushow: "赵六" }
            },
            {
              id: 214,
              name: "电石料仓和罩棚单元",
              hazardCode: "DSLC",
              type: 0,
              creater: { ushow: "孙七" }
            },
            {
              id: 213,
              name: "产品罐区单元",
              hazardCode: "CPGQ",
              type: 0,
              creater: { ushow: "周八" }
            },
            {
              id: 212,
              name: "EDC罐区单元",
              hazardCode: "EDCGQ",
              type: 1,
              creater: { ushow: "吴九" }
            },
            {
              id: 211,
              name: "VCM装置单元",
              hazardCode: "VCMAZZ",
              type: 1,
              creater: { ushow: "郑十" }
            }
          ],
          totalElements: 9
        }
      };
    }
  }
]);
