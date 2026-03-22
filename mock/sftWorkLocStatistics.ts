import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/work/loc/statistics/list.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: {
          deptCountAll: 49349,
          deptCountList: [
            34, 7371, 6964, 2098, 105, 4046, 4189, 4461, 5948, 65, 10663, 1029,
            23, 2353
          ],
          deptCountStr:
            "按照属地分：公司领导34次、HSE管理部7371次、双氧水车间6964次、办公室(党委)2098次、运营管理部105次、PVC一车间4046次、供应链管理部4189次、电解车间4461次、研发中心5948次、财务管理部65次、机电仪车间10663次、承包商1029次、人力资源部23次、热电车间2353次",
          deptList: [
            "公司领导",
            "HSE管理部",
            "双氧水车间",
            "办公室(党委)",
            "运营管理部",
            "PVC一车间",
            "供应链管理部",
            "电解车间",
            "研发中心",
            "财务管理部",
            "机电仪车间",
            "承包商",
            "人力资源部",
            "热电车间"
          ],
          field: 34,
          field1: 7371,
          field2: 0,
          field3: 6964,
          field4: 2098,
          field5: 105,
          field6: 4046,
          field7: 0,
          field8: 0,
          field9: 4189,
          field10: 4461,
          field11: 5948,
          field12: 0,
          field13: 65,
          field14: 10663,
          field15: 1029,
          field16: 23,
          field17: 0,
          field18: 2353,
          field19: 155,
          field20: 0,
          field21: 0,
          field22: 0,
          field23: 1,
          field24: 5,
          field25: 0,
          field26: 52475,
          field27: 2,
          typeCountList: [155, 1, 5, 52475, 2],
          typeCountStr:
            "按照报警类型分：检修超员155次、一键报警 1次、静止预警5次、人员聚集52475次、越界报警2次、",
          typeList: ["检修超员", "一键报警", "静止预警", "人员聚集", "越界报警"]
        }
      };
    }
  }
]);
