import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/console/loadData.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: {
          address: "山东省德州市德城区实华南路6号",
          alarmStats: [
            { algorithmName: "安全帽检测", num: 5 },
            { algorithmName: "脱岗监测", num: 2 },
            { algorithmName: "口罩监测", num: 0 },
            { algorithmName: "入侵监测", num: 1 },
            { algorithmName: "打电话监测", num: 0 },
            { algorithmName: "火焰监测", num: 0 },
            { algorithmName: "烟雾监测", num: 0 }
          ],
          dangerAcceps: [],
          dangerDepts: [
            "电解车间",
            "热电车间",
            "PVC车间",
            "机电仪车间",
            "双氧水车间"
          ],
          dangerOvers: [],
          dangerRects: ["0", "0", "0", "0", "0"],
          dangerTos: ["3484", "10449", "8083", "2346", "2434"],
          dangerTotal: 0,
          dh: 1,
          dl: 0,
          docDepts: ["电解", "泰安分公司", "PVC一车间", "热电", "机电仪"],
          docDhs: ["0", "0", "0", "1", "0"],
          docDls: ["0", "0", "0", "0", "0"],
          docDts: ["1", "0", "0", "1", "0"],
          docDzs: ["0", "0", "0", "0", "0"],
          docGcs: ["3", "0", "4", "3", "0"],
          docLds: ["6", "1", "6", "4", "1"],
          docMbs: ["0", "0", "0", "0", "0"],
          docSxs: ["0", "0", "1", "0", "0"],
          dt: 2,
          dz: 0,
          field: 2,
          field1: 5,
          field2: 14,
          field3: 37,
          field4: 334,
          field5: 3619,
          field6: 0,
          gc: 10,
          hcDangers: ["0", "0", "0", "0", "0"],
          hcDepts: [
            "电解车间",
            "PVC一车间",
            "热电车间",
            "机电仪车间",
            "双氧水车间"
          ],
          hcNormals: ["401", "963", "239", "53", "88"],
          hcNos: ["0", "0", "0", "0", "0"],
          ld: 18,
          locData: [
            {
              areaName: "VCM中间罐区（禁止选择）",
              handleRemark: "确认人员没事儿",
              handleTime: 1774086685000,
              id: 11974,
              mac: "1918FF0715EC",
              name: "张洪祥",
              time: 1774086560000,
              type: "stillAlarm"
            }
          ],
          major: "李宝瑞",
          material: "电石和工业盐",
          mb: 0,
          noTotal: 0,
          normalTotal: 1744,
          phone: "0534-2622704",
          product: "PVC树脂，离子膜烧碱，液氯，双氧水",
          rectTotal: 105270,
          riskFive: 0,
          riskFour: 482,
          riskOne: 0,
          riskThree: 81,
          riskTwo: 0,
          risks: ["0", "0", "81", "482", "0"],
          sx: 1,
          technology: "离子膜烧碱、电石法PVC树脂、蒽醌法双氧水",
          toTotal: 31528
        }
      };
    }
  }
]);
