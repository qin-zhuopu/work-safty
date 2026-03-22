import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/danger/danger/analysis.json",
    method: "get",
    response: () => {
      return {
        code: 0,
        data: [
          { deptId: 3, deptName: "公司领导", parentId: -1, up: 18 },
          {
            deptId: 4,
            deptName: "办公室（党委办公室）",
            finish: 55,
            parentId: -1,
            rate: "88.71%",
            receive: 62,
            up: 74
          },
          { deptId: 8, deptName: "人力资源部", parentId: -1, up: 1 },
          {
            deptId: 9,
            deptName: "HSE管理部",
            finish: 1,
            parentId: -1,
            rate: "100.0%",
            receive: 1,
            up: 74
          },
          { deptId: 10, deptName: "设备管理办公室", parentId: 11, up: 12 },
          {
            deptId: 11,
            deptName: "运营管理部",
            finish: 1,
            parentId: -1,
            rate: "100.0%",
            receive: 1,
            up: 25
          },
          {
            deptId: 12,
            deptName: "氯碱研发中心",
            finish: 5,
            parentId: 2492,
            rate: "100.0%",
            receive: 5,
            up: 5
          },
          {
            deptId: 13,
            deptName: "供应链管理部",
            finish: 28,
            parentId: -1,
            rate: "73.68%",
            receive: 38,
            up: 32
          },
          {
            deptId: 14,
            deptName: "财务管理部",
            finish: 9,
            parentId: -1,
            rate: "90.0%",
            receive: 10,
            up: 10
          },
          {
            deptId: 19,
            deptName: "聚氯乙烯车间",
            finish: 278,
            parentId: -1,
            rate: "92.36%",
            receive: 301,
            up: 269
          },
          {
            deptId: 20,
            deptName: "电解车间",
            finish: 387,
            parentId: -1,
            rate: "94.85%",
            receive: 408,
            up: 387
          },
          {
            deptId: 21,
            deptName: "机电仪车间",
            finish: 76,
            parentId: -1,
            rate: "87.36%",
            receive: 87,
            up: 85
          },
          {
            deptId: 22,
            deptName: "热电车间",
            finish: 260,
            parentId: -1,
            rate: "83.6%",
            receive: 311,
            up: 286
          },
          {
            deptId: 23,
            deptName: "双氧水车间",
            finish: 248,
            parentId: -1,
            rate: "92.88%",
            receive: 267,
            up: 251
          },
          { deptId: 29, deptName: "生产运营办", parentId: 11, up: 5 },
          {
            deptId: 30,
            deptName: "调度",
            finish: 1,
            parentId: 11,
            rate: "100.0%",
            receive: 1,
            up: 3
          },
          {
            deptId: 47,
            deptName: "合成工段",
            finish: 40,
            parentId: 19,
            rate: "90.91%",
            receive: 44,
            up: 35
          },
          {
            deptId: 52,
            deptName: "聚合工段",
            finish: 90,
            parentId: 19,
            rate: "84.91%",
            receive: 106,
            up: 82
          },
          {
            deptId: 62,
            deptName: "聚氯乙烯维修工段",
            finish: 20,
            parentId: 19,
            rate: "100.0%",
            receive: 20,
            up: 20
          },
          {
            deptId: 64,
            deptName: "乙炔工段",
            finish: 128,
            parentId: 19,
            rate: "97.71%",
            receive: 131,
            up: 123
          },
          {
            deptId: 75,
            deptName: "离子膜工段",
            finish: 94,
            parentId: 20,
            rate: "95.92%",
            receive: 98,
            up: 89
          },
          {
            deptId: 76,
            deptName: "氯氢处理及氯化氢工段",
            finish: 109,
            parentId: 20,
            rate: "93.97%",
            receive: 116,
            up: 106
          },
          {
            deptId: 78,
            deptName: "浓固碱工段",
            finish: 25,
            parentId: 20,
            rate: "92.59%",
            receive: 27,
            up: 26
          },
          {
            deptId: 79,
            deptName: "电解维修工段",
            finish: 64,
            parentId: 20,
            rate: "100.0%",
            receive: 64,
            up: 70
          },
          {
            deptId: 80,
            deptName: "盐水工段",
            finish: 46,
            parentId: 20,
            rate: "86.79%",
            receive: 53,
            up: 46
          },
          {
            deptId: 81,
            deptName: "液氯工段",
            finish: 49,
            parentId: 20,
            rate: "98.0%",
            receive: 50,
            up: 50
          },
          {
            deptId: 83,
            deptName: "仪表工段",
            finish: 51,
            parentId: 21,
            rate: "83.61%",
            receive: 61,
            up: 59
          },
          {
            deptId: 84,
            deptName: "电气工段",
            finish: 57,
            parentId: 22,
            rate: "72.15%",
            receive: 79,
            up: 75
          },
          {
            deptId: 86,
            deptName: "供水工段",
            finish: 21,
            parentId: 22,
            rate: "95.45%",
            receive: 22,
            up: 15
          },
          { deptId: 87, deptName: "热电车间管理组", parentId: 22, up: 14 },
          {
            deptId: 88,
            deptName: "锅炉工段",
            finish: 60,
            parentId: 22,
            rate: "95.24%",
            receive: 63,
            up: 56
          },
          {
            deptId: 89,
            deptName: "环保工段",
            finish: 40,
            parentId: 22,
            rate: "76.92%",
            receive: 52,
            up: 32
          },
          {
            deptId: 90,
            deptName: "汽机工段",
            finish: 24,
            parentId: 22,
            rate: "75.0%",
            receive: 32,
            up: 29
          },
          {
            deptId: 91,
            deptName: "热电车间维修工段",
            finish: 1,
            parentId: 22,
            rate: "33.33%",
            receive: 3,
            up: 10
          },
          {
            deptId: 92,
            deptName: "整流工段",
            finish: 33,
            parentId: 22,
            rate: "100.0%",
            receive: 33,
            up: 33
          },
          {
            deptId: 94,
            deptName: "双氧水装置工段",
            finish: 237,
            parentId: 23,
            rate: "92.58%",
            receive: 256,
            up: 234
          },
          {
            deptId: 103,
            deptName: "电仪维工段",
            finish: 18,
            parentId: -1,
            rate: "94.74%",
            receive: 19,
            up: 20
          },
          {
            deptId: 104,
            deptName: "公用工程工段（泰安）",
            finish: 35,
            parentId: -1,
            rate: "100.0%",
            receive: 35,
            up: 37
          },
          {
            deptId: 105,
            deptName: "锅炉工段（泰安）",
            finish: 43,
            parentId: -1,
            rate: "97.73%",
            receive: 44,
            up: 42
          },
          {
            deptId: 108,
            deptName: "制盐工段",
            finish: 47,
            parentId: -1,
            rate: "100.0%",
            receive: 47,
            up: 40
          },
          {
            deptId: 2426,
            deptName: "办公室",
            finish: 6,
            parentId: -1,
            rate: "100.0%",
            receive: 6,
            up: 5
          },
          {
            deptId: 2483,
            deptName: "保卫管理办公室",
            finish: 27,
            parentId: 4,
            rate: "93.1%",
            receive: 29,
            up: 29
          },
          {
            deptId: 2484,
            deptName: "后勤保障办公室",
            finish: 23,
            parentId: 4,
            rate: "85.19%",
            receive: 27,
            up: 34
          },
          {
            deptId: 2485,
            deptName: "行政（党委）办公室",
            finish: 3,
            parentId: 4,
            rate: "100.0%",
            receive: 3,
            up: 10
          },
          { deptId: 2486, deptName: "安全管理办公室", parentId: 9, up: 31 },
          {
            deptId: 2488,
            deptName: "财务管理办公室",
            finish: 9,
            parentId: 14,
            rate: "90.0%",
            receive: 10,
            up: 10
          },
          {
            deptId: 2492,
            deptName: "研发中心",
            finish: 34,
            parentId: -1,
            rate: "85.0%",
            receive: 40,
            up: 47
          },
          {
            deptId: 2493,
            deptName: "规划基建办",
            finish: 0,
            parentId: 2492,
            rate: "0.0%",
            receive: 2,
            up: 3
          },
          {
            deptId: 2494,
            deptName: "质检中心",
            finish: 29,
            parentId: 2492,
            rate: "87.88%",
            receive: 33,
            up: 39
          },
          {
            deptId: 2496,
            deptName: "仓储物流办公室",
            finish: 28,
            parentId: 13,
            rate: "73.68%",
            receive: 38,
            up: 32
          },
          {
            deptId: 2498,
            deptName: "中控化验室",
            finish: 15,
            parentId: 2494,
            rate: "88.24%",
            receive: 17,
            up: 23
          },
          {
            deptId: 2499,
            deptName: "中心化验室",
            finish: 14,
            parentId: 2494,
            rate: "87.5%",
            receive: 16,
            up: 16
          },
          {
            deptId: 2511,
            deptName: "管信工段",
            finish: 13,
            parentId: 21,
            rate: "100.0%",
            receive: 13,
            up: 13
          },
          { deptId: 2599, deptName: "仓储办管理组", parentId: 2496, up: 5 },
          {
            deptId: 2601,
            deptName: "成品工段",
            finish: 1,
            parentId: 2496,
            rate: "100.0%",
            receive: 1,
            up: 2
          },
          {
            deptId: 2758,
            deptName: "公用工程工段",
            finish: 24,
            parentId: 22,
            rate: "88.89%",
            receive: 27,
            up: 22
          },
          {
            deptId: 2814,
            deptName: "维修中心",
            finish: 12,
            parentId: 21,
            rate: "92.31%",
            receive: 13,
            up: 13
          },
          { deptId: 2832, deptName: "聚氯乙烯车间管理组", parentId: 19, up: 6 },
          {
            deptId: 2834,
            deptName: "双氧水车间管理组",
            finish: 6,
            parentId: 23,
            rate: "100.0%",
            receive: 6,
            up: 12
          }
        ],
        msg: "ok"
      };
    }
  }
]);
