import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  // 获取巡检记录列表
  {
    url: "/sft/insp/record/list",
    method: "get",
    response: ({ query }) => {
      const page = Number(query.page) || 1;
      const size = Number(query.size) || 20;

      // 模拟数据
      const mockData = [
        {
          etime: 1774195199000,
          exts: [
            {
              extData: "25.5",
              inspectionSiteQuota: {
                name: "温度",
                type: 1,
                min: 20,
                max: 30,
                ext: ""
              }
            },
            {
              extData: "是",
              inspectionSiteQuota: {
                name: "设备运行",
                type: 2,
                min: 0,
                max: 0,
                ext: ""
              }
            }
          ],
          id: 1,
          latitude: 0.0,
          longitude: 0.0,
          overdue: 2,
          pname: "制盐0米司泵巡检路线",
          ptime: 1774108800000,
          scode: "TA-ZY-007",
          sname: "7米真空泵",
          status: 1,
          stime: 1774191600000,
          teams: 4,
          tid: 125,
          tiid: 375,
          tname: "制盐0米司泵巡检路线",
          time: 1774192000000,
          uhow: "张三",
          remarks: "设备运行正常"
        },
        {
          etime: 1774191599000,
          exts: [
            {
              extData: "35.5",
              inspectionSiteQuota: {
                name: "温度",
                type: 1,
                min: 20,
                max: 30,
                ext: ""
              }
            }
          ],
          id: 2,
          latitude: 0.0,
          longitude: 0.0,
          overdue: 2,
          pname: "制盐0米司泵巡检路线",
          ptime: 1774108800000,
          scode: "TA-ZY-008",
          sname: "反应釜A",
          status: 2,
          stime: 1774188000000,
          teams: 3,
          tid: 125,
          tiid: 376,
          tname: "制盐0米司泵巡检路线",
          time: 1774189000000,
          uhow: "李四",
          remarks: "温度偏高，已调整"
        },
        {
          etime: 1774187999000,
          exts: [],
          id: 3,
          latitude: 0.0,
          longitude: 0.0,
          overdue: 1,
          pname: "早班巡检路线",
          ptime: 1774108800000,
          scode: "ZB-001",
          sname: "1号车间入口",
          status: 0,
          stime: 1774184400000,
          teams: 1,
          tid: 100,
          tiid: 200,
          tname: "早班巡检路线",
          remarks: "未巡检"
        },
        {
          etime: 1774184399000,
          exts: [
            {
              extData: "否",
              inspectionSiteQuota: {
                name: "是否有泄漏",
                type: 2,
                min: 0,
                max: 0,
                ext: ""
              }
            }
          ],
          id: 4,
          latitude: 0.0,
          longitude: 0.0,
          overdue: 2,
          pname: "中班巡检路线",
          ptime: 1774108800000,
          scode: "ZB-002",
          sname: "2号车间管道",
          status: 2,
          stime: 1774180800000,
          teams: 2,
          tid: 101,
          tiid: 201,
          tname: "中班巡检路线",
          time: 1774182000000,
          uhow: "王五",
          remarks: "发现泄漏隐患"
        },
        {
          etime: 1774180799000,
          exts: [
            {
              extData: "合格",
              inspectionSiteQuota: {
                name: "压力检查",
                type: 3,
                min: 0,
                max: 0,
                ext: "合格"
              }
            }
          ],
          id: 5,
          latitude: 0.0,
          longitude: 0.0,
          overdue: 2,
          pname: "晚班巡检路线",
          ptime: 1774108800000,
          scode: "WB-001",
          sname: "储罐区",
          status: 1,
          stime: 1774177200000,
          teams: 5,
          tid: 102,
          tiid: 202,
          tname: "晚班巡检路线",
          time: 1774178000000,
          uhow: "赵六",
          remarks: "压力正常"
        },
        {
          etime: 1774177199000,
          exts: [],
          id: 6,
          latitude: 0.0,
          longitude: 0.0,
          overdue: 0,
          pname: "早班巡检路线",
          ptime: 1774108800000,
          scode: "ZB-003",
          sname: "3号车间设备",
          status: 0,
          stime: 1774173600000,
          teams: 1,
          tid: 100,
          tiid: 203,
          tname: "早班巡检路线",
          remarks: ""
        },
        {
          etime: 1774173599000,
          exts: [
            {
              extData: "22.3",
              inspectionSiteQuota: {
                name: "温度",
                type: 1,
                min: 20,
                max: 30,
                ext: ""
              }
            },
            {
              extData: "0.5",
              inspectionSiteQuota: {
                name: "压力",
                type: 1,
                min: 0.3,
                max: 0.8,
                ext: ""
              }
            }
          ],
          id: 7,
          latitude: 0.0,
          longitude: 0.0,
          overdue: 2,
          pname: "制盐0米司泵巡检路线",
          ptime: 1774108800000,
          scode: "TA-ZY-009",
          sname: "冷却塔",
          status: 1,
          stime: 1774170000000,
          teams: 4,
          tid: 125,
          tiid: 377,
          tname: "制盐0米司泵巡检路线",
          time: 1774171000000,
          uhow: "张三",
          remarks: "各项参数正常"
        },
        {
          etime: 1774169999000,
          exts: [],
          id: 8,
          latitude: 0.0,
          longitude: 0.0,
          overdue: 1,
          pname: "夜班巡检路线",
          ptime: 1774108800000,
          scode: "YB-001",
          sname: "配电室",
          status: 0,
          stime: 1774166400000,
          teams: 3,
          tid: 103,
          tiid: 204,
          tname: "夜班巡检路线",
          remarks: "延期未巡检"
        },
        {
          etime: 1774166399000,
          exts: [
            {
              extData: "45.2",
              inspectionSiteQuota: {
                name: "温度",
                type: 1,
                min: 40,
                max: 50,
                ext: ""
              }
            }
          ],
          id: 9,
          latitude: 0.0,
          longitude: 0.0,
          overdue: 2,
          pname: "中班巡检路线",
          ptime: 1774108800000,
          scode: "ZB-004",
          sname: "加热炉",
          status: 1,
          stime: 1774162800000,
          teams: 2,
          tid: 101,
          tiid: 205,
          tname: "中班巡检路线",
          time: 1774163500000,
          uhow: "李四",
          remarks: "温度在正常范围内"
        },
        {
          etime: 1774162799000,
          exts: [
            {
              extData: "是",
              inspectionSiteQuota: {
                name: "安全阀检查",
                type: 2,
                min: 0,
                max: 0,
                ext: ""
              }
            },
            {
              extData: "正常",
              inspectionSiteQuota: {
                name: "压力表读数",
                type: 3,
                min: 0,
                max: 0,
                ext: "正常"
              }
            }
          ],
          id: 10,
          latitude: 0.0,
          longitude: 0.0,
          overdue: 2,
          pname: "早班巡检路线",
          ptime: 1774108800000,
          scode: "ZB-005",
          sname: "安全阀组",
          status: 1,
          stime: 1774159200000,
          teams: 1,
          tid: 100,
          tiid: 206,
          tname: "早班巡检路线",
          time: 1774160000000,
          uhow: "王五",
          remarks: "安全设施完好"
        }
      ];

      // 根据查询条件过滤
      let filteredData = [...mockData];

      // 状态过滤
      if (query.stat && query.stat !== "-1") {
        const stat = Number(query.stat);
        filteredData = filteredData.filter(item => {
          if (stat === 0) return item.status === 0;
          if (stat === 2) return item.status === 2;
          return true;
        });
      }

      // 班组过滤
      if (query.teams && query.teams !== "-1") {
        filteredData = filteredData.filter(
          item => item.teams === Number(query.teams)
        );
      }

      // 巡检线路过滤
      if (query.taskId && query.taskId !== "-1") {
        filteredData = filteredData.filter(
          item => item.tid === Number(query.taskId)
        );
      }

      const total = filteredData.length;
      const start = (page - 1) * size;
      const end = start + size;
      const content = filteredData.slice(start, end);

      return {
        success: true,
        t: {
          content,
          totalElements: total
        }
      };
    }
  },
  // 获取部门列表
  {
    url: "/sft/sys/dept/all.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: [
          {
            id: 1,
            name: "实华化工有限公司",
            value: 1,
            children: [
              {
                id: 2,
                name: "德州实华化工有限公司",
                value: 2,
                children: [
                  { id: 3, name: "公司领导", value: 3, children: [] },
                  {
                    id: 4,
                    name: "办公室（党委办公室）",
                    value: 4,
                    children: [
                      {
                        id: 2483,
                        name: "保卫管理办公室",
                        value: 2483,
                        children: []
                      },
                      {
                        id: 2484,
                        name: "后勤保障办公室",
                        value: 2484,
                        children: []
                      },
                      {
                        id: 2485,
                        name: "行政（党委）办公室",
                        value: 2485,
                        children: []
                      }
                    ]
                  },
                  { id: 5, name: "纪委办公室", value: 5, children: [] },
                  {
                    id: 6,
                    name: "党群工作部",
                    value: 6,
                    children: [
                      { id: 2490, name: "工会", value: 2490, children: [] },
                      {
                        id: 2491,
                        name: "党委工作部",
                        value: 2491,
                        children: []
                      }
                    ]
                  },
                  { id: 8, name: "人力资源部", value: 8, children: [] },
                  {
                    id: 9,
                    name: "HSE管理部",
                    value: 9,
                    children: [
                      {
                        id: 2486,
                        name: "安全管理办公室",
                        value: 2486,
                        children: []
                      },
                      {
                        id: 2487,
                        name: "环保管理办公室",
                        value: 2487,
                        children: []
                      }
                    ]
                  },
                  {
                    id: 11,
                    name: "运营管理部",
                    value: 11,
                    children: [
                      {
                        id: 10,
                        name: "设备管理办公室",
                        value: 10,
                        children: []
                      },
                      { id: 29, name: "生产运营办", value: 29, children: [] },
                      { id: 30, name: "调度", value: 30, children: [] },
                      {
                        id: 2497,
                        name: "专项工作办",
                        value: 2497,
                        children: []
                      }
                    ]
                  },
                  {
                    id: 19,
                    name: "聚氯乙烯车间",
                    value: 19,
                    children: [
                      { id: 47, name: "合成工段", value: 47, children: [] },
                      { id: 52, name: "聚合工段", value: 52, children: [] },
                      {
                        id: 62,
                        name: "聚氯乙烯维修工段",
                        value: 62,
                        children: []
                      },
                      { id: 63, name: "压滤工段", value: 63, children: [] },
                      { id: 64, name: "乙炔工段", value: 64, children: [] },
                      {
                        id: 2708,
                        name: "EDC VCM工段",
                        value: 2708,
                        children: []
                      },
                      {
                        id: 2832,
                        name: "聚氯乙烯车间管理组",
                        value: 2832,
                        children: []
                      }
                    ]
                  },
                  {
                    id: 20,
                    name: "电解车间",
                    value: 20,
                    children: [
                      { id: 75, name: "离子膜工段", value: 75, children: [] },
                      {
                        id: 76,
                        name: "氯氢处理及氯化氢工段",
                        value: 76,
                        children: []
                      },
                      { id: 77, name: "氯氢处理工段", value: 77, children: [] },
                      { id: 78, name: "浓固碱工段", value: 78, children: [] },
                      { id: 79, name: "电解维修工段", value: 79, children: [] },
                      { id: 80, name: "盐水工段", value: 80, children: [] },
                      { id: 81, name: "液氯工段", value: 81, children: [] },
                      {
                        id: 2833,
                        name: "电解车间管理组",
                        value: 2833,
                        children: []
                      }
                    ]
                  },
                  {
                    id: 21,
                    name: "机电仪车间",
                    value: 21,
                    children: [
                      { id: 83, name: "仪表工段", value: 83, children: [] },
                      { id: 2511, name: "管信工段", value: 2511, children: [] },
                      { id: 2814, name: "维修中心", value: 2814, children: [] },
                      {
                        id: 2836,
                        name: "机电仪车间管理组",
                        value: 2836,
                        children: []
                      }
                    ]
                  },
                  {
                    id: 22,
                    name: "热电车间",
                    value: 22,
                    children: [
                      { id: 84, name: "电气工段", value: 84, children: [] },
                      { id: 85, name: "供热工段", value: 85, children: [] },
                      { id: 86, name: "供水工段", value: 86, children: [] },
                      {
                        id: 87,
                        name: "热电车间管理组",
                        value: 87,
                        children: []
                      },
                      { id: 88, name: "锅炉工段", value: 88, children: [] },
                      { id: 89, name: "环保工段", value: 89, children: [] },
                      { id: 90, name: "汽机工段", value: 90, children: [] },
                      {
                        id: 91,
                        name: "热电车间维修工段",
                        value: 91,
                        children: []
                      },
                      { id: 92, name: "整流工段", value: 92, children: [] },
                      {
                        id: 2758,
                        name: "公用工程工段",
                        value: 2758,
                        children: []
                      }
                    ]
                  },
                  {
                    id: 23,
                    name: "双氧水车间",
                    value: 23,
                    children: [
                      {
                        id: 94,
                        name: "双氧水装置工段",
                        value: 94,
                        children: []
                      },
                      {
                        id: 2834,
                        name: "双氧水车间管理组",
                        value: 2834,
                        children: []
                      }
                    ]
                  }
                ]
              },
              {
                id: 24,
                name: "泰安分公司",
                value: 24,
                children: [
                  { id: 103, name: "电仪维工段", value: 103, children: [] },
                  {
                    id: 104,
                    name: "公用工程工段（泰安）",
                    value: 104,
                    children: []
                  },
                  {
                    id: 105,
                    name: "锅炉工段（泰安）",
                    value: 105,
                    children: []
                  },
                  { id: 108, name: "制盐工段", value: 108, children: [] },
                  { id: 2426, name: "办公室", value: 2426, children: [] }
                ]
              }
            ]
          }
        ]
      };
    }
  },
  // 获取巡检任务列表
  {
    url: "/sft/insp/task/all.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: [
          { id: 100, name: "早班巡检路线" },
          { id: 101, name: "中班巡检路线" },
          { id: 102, name: "晚班巡检路线" },
          { id: 103, name: "夜班巡检路线" },
          { id: 125, name: "制盐0米司泵巡检路线" },
          { id: 126, name: "电解车间巡检路线" },
          { id: 127, name: "热电车车巡检路线" },
          { id: 128, name: "双氧水车间巡检路线" }
        ]
      };
    }
  }
]);
