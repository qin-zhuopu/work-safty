import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 模拟数据 - 变更管理
const mockData = [
  {
    id: "657",
    addDate: 1773805675111,
    name: "制盐工段6效加热室改造项目",
    field: "设备变更",
    field1: "一般变更",
    field2: "永久变更",
    field3: "增加5-6效二次蒸汽管道流通截面积，降低压差损失，提升热能回收利用率",
    remarks: "评估表及变更方案见附件",
    status: "审批中",
    file1: "ssc-dzsh/1/0cc0a2a72386446c9869b4a6643a2837.jpg",
    addUser: {
      id: 108,
      ushow: "赵健（泰安）",
      sysDept: {
        id: 108,
        name: "制盐工段"
      }
    }
  },
  {
    id: "656",
    addDate: 1772929899000,
    name: "气柜进口管道变更",
    field: "工艺变更",
    field1: "重要变更",
    field2: "永久变更",
    field3: "气柜进口管道由DN400改为DN500",
    remarks: "",
    status: "结束",
    field9: 1772617600000,
    file1: "",
    addUser: {
      id: 108,
      ushow: "赵健（泰安）",
      sysDept: {
        id: 108,
        name: "制盐工段"
      }
    }
  },
  {
    id: "655",
    addDate: 1767309188000,
    name: "新增2#聚合B系列热水泵",
    field: "设备变更",
    field1: "一般变更",
    field2: "永久变更",
    field3: "新增2#聚合B系列热水泵，型号IH150-125-315",
    remarks: "",
    status: "结束",
    field9: 1767196800000,
    file1: "",
    addUser: {
      id: 19,
      ushow: "张涛",
      sysDept: {
        id: 47,
        name: "合成工段"
      }
    }
  },
  {
    id: "654",
    addDate: 1765065991000,
    name: "新增聚合二期DCS控制系统",
    field: "设备变更",
    field1: "重要变更",
    field2: "永久变更",
    field3: "聚合二期DCS控制系统更新升级",
    remarks: "",
    status: "审批中",
    file1: "ssc-dzsh/1/abc123.jpg",
    addUser: {
      id: 19,
      ushow: "李明",
      sysDept: {
        id: 52,
        name: "聚合工段"
      }
    }
  },
  {
    id: "653",
    addDate: 1764979191000,
    name: "电解工段整流变压器冷却方式变更",
    field: "工艺变更",
    field1: "重要变更",
    field2: "临时变更",
    field3: "整流变压器冷却方式由风冷改为水冷",
    remarks: "临时变更，计划3个月后恢复",
    status: "审批中",
    field9: 1767840000000,
    file1: "",
    addUser: {
      id: 20,
      ushow: "王强",
      sysDept: {
        id: 75,
        name: "离子膜工段"
      }
    }
  },
  {
    id: "652",
    addDate: 1764205191000,
    name: "热电车锅炉给水泵变频改造",
    field: "设备变更",
    field1: "一般变更",
    field2: "永久变更",
    field3: "锅炉给水泵加装变频器，实现节能运行",
    remarks: "",
    status: "结束",
    field9: 1764115200000,
    file1: "",
    addUser: {
      id: 22,
      ushow: "刘伟",
      sysDept: {
        id: 88,
        name: "锅炉工段"
      }
    }
  },
  {
    id: "651",
    addDate: 1763422791000,
    name: "双氧水浓缩工段工艺参数调整",
    field: "工艺变更",
    field1: "一般变更",
    field2: "永久变更",
    field3: "调整浓缩工段温度、压力等工艺参数",
    remarks: "",
    status: "结束",
    file1: "",
    addUser: {
      id: 23,
      ushow: "陈静",
      sysDept: {
        id: 94,
        name: "双氧水装置工段"
      }
    }
  },
  {
    id: "650",
    addDate: 1762912791000,
    name: "VCM装置EDC精馏塔改造",
    field: "设备变更",
    field1: "重要变更",
    field2: "永久变更",
    field3: "EDC精馏塔内件更换，提高分离效率",
    remarks: "",
    status: "驳回",
    file1: "",
    addUser: {
      id: 19,
      ushow: "张涛",
      sysDept: {
        id: 2708,
        name: "EDC VCM工段"
      }
    }
  },
  {
    id: "649",
    addDate: 1762390391000,
    name: "机电仪车间DCS系统升级",
    field: "设备变更",
    field1: "重要变更",
    field2: "永久变更",
    field3: "DCS系统软硬件升级改造",
    remarks: "",
    status: "审批中",
    file1: "",
    addUser: {
      id: 21,
      ushow: "赵敏",
      sysDept: {
        id: 83,
        name: "仪表工段"
      }
    }
  },
  {
    id: "648",
    addDate: 1762140791000,
    name: "氯气液化工艺优化",
    field: "工艺变更",
    field1: "一般变更",
    field2: "永久变更",
    field3: "优化氯气液化工艺参数，提高液化效率",
    remarks: "",
    status: "结束",
    field9: 1762048000000,
    file1: "",
    addUser: {
      id: 20,
      ushow: "孙丽",
      sysDept: {
        id: 81,
        name: "液氯工段"
      }
    }
  }
];

export default defineFakeRoute([
  // 变更列表接口
  {
    url: "/sft/change/change/list.json",
    method: "get",
    response: ({ query }) => {
      const page = parseInt(query.page as string) || 1;
      const size = parseInt(query.size as string) || 10;
      const sysDeptId = (query.sysDeptId as string) || "";
      const addUserName = (query.addUserName as string) || "";
      const field = (query.field as string) || "";
      const field1 = (query.field1 as string) || "";
      const field2 = (query.field2 as string) || "";
      const status = (query.status as string) || "";
      const startTime = (query.startTime as string) || "";
      const endTime = (query.endTime as string) || "";

      // 过滤数据
      let filteredData = mockData;

      if (sysDeptId) {
        filteredData = filteredData.filter(
          item => item.addUser?.sysDept?.id === parseInt(sysDeptId)
        );
      }
      if (addUserName) {
        filteredData = filteredData.filter(item =>
          item.addUser?.ushow?.includes(addUserName)
        );
      }
      if (field) {
        filteredData = filteredData.filter(item => item.field === field);
      }
      if (field1) {
        filteredData = filteredData.filter(item => item.field1 === field1);
      }
      if (field2) {
        filteredData = filteredData.filter(item => item.field2 === field2);
      }
      if (status) {
        filteredData = filteredData.filter(item => item.status === status);
      }
      if (startTime) {
        const start = new Date(startTime).getTime();
        filteredData = filteredData.filter(item => item.addDate >= start);
      }
      if (endTime) {
        const end = new Date(endTime).getTime();
        filteredData = filteredData.filter(item => item.addDate <= end);
      }

      // 分页
      const start = (page - 1) * size;
      const end = start + size;
      const pageData = filteredData.slice(start, end);

      return {
        success: true,
        t: {
          content: pageData,
          totalElements: filteredData.length,
          pageable: {
            offset: 0,
            pageNumber: page - 1,
            pageSize: size,
            paged: true,
            sort: {
              empty: false,
              sorted: true,
              unsorted: false
            },
            unpaged: false
          },
          first: page === 1,
          last: end >= filteredData.length,
          number: page - 1,
          numberOfElements: pageData.length,
          size,
          sort: {
            empty: false,
            sorted: true,
            unsorted: false
          },
          empty: pageData.length === 0
        }
      };
    }
  },
  // 部门列表接口
  {
    url: "/sft/sys/dept/cjzr/all.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: [
          {
            children: [
              {
                children: [
                  {
                    children: [],
                    id: 3,
                    name: "公司领导",
                    open: false,
                    parentName: "德州实华化工有限公司",
                    perId: 0,
                    value: 3
                  },
                  {
                    children: [
                      {
                        children: [],
                        id: 2483,
                        name: "保卫管理办公室",
                        value: 2483
                      },
                      {
                        children: [],
                        id: 2484,
                        name: "后勤保障办公室",
                        value: 2484
                      },
                      {
                        children: [],
                        id: 2485,
                        name: "行政（党委）办公室",
                        value: 2485
                      }
                    ],
                    id: 4,
                    name: "办公室（党委办公室）",
                    value: 4
                  },
                  { children: [], id: 5, name: "纪委办公室", value: 5 },
                  {
                    children: [
                      { children: [], id: 2490, name: "工会", value: 2490 },
                      {
                        children: [],
                        id: 2491,
                        name: "党委工作部",
                        value: 2491
                      }
                    ],
                    id: 6,
                    name: "党群工作部",
                    value: 6
                  },
                  { children: [], id: 8, name: "人力资源部", value: 8 },
                  {
                    children: [
                      {
                        children: [],
                        id: 2486,
                        name: "安全管理办公室",
                        value: 2486
                      },
                      {
                        children: [],
                        id: 2487,
                        name: "环保管理办公室",
                        value: 2487
                      }
                    ],
                    id: 9,
                    name: "HSE管理部",
                    value: 9
                  },
                  {
                    children: [
                      {
                        children: [],
                        id: 10,
                        name: "设备管理办公室",
                        value: 10
                      },
                      { children: [], id: 29, name: "生产运营办", value: 29 },
                      { children: [], id: 30, name: "调度", value: 30 },
                      {
                        children: [],
                        id: 2497,
                        name: "专项工作办",
                        value: 2497
                      }
                    ],
                    id: 11,
                    name: "运营管理部",
                    value: 11
                  },
                  {
                    children: [
                      {
                        children: [],
                        id: 33,
                        name: "采购管理办公室",
                        value: 33
                      },
                      {
                        children: [],
                        id: 2495,
                        name: "市场营销办公室",
                        value: 2495
                      },
                      {
                        children: [
                          {
                            children: [],
                            id: 2599,
                            name: "仓储办管理组",
                            value: 2599
                          },
                          {
                            children: [],
                            id: 2600,
                            name: "备件工段",
                            value: 2600
                          },
                          {
                            children: [],
                            id: 2601,
                            name: "成品工段",
                            value: 2601
                          }
                        ],
                        id: 2496,
                        name: "仓储物流办公室",
                        value: 2496
                      }
                    ],
                    id: 13,
                    name: "供应链管理部",
                    value: 13
                  },
                  {
                    children: [
                      {
                        children: [],
                        id: 2488,
                        name: "财务管理办公室",
                        value: 2488
                      }
                    ],
                    id: 14,
                    name: "财务管理部",
                    value: 14
                  },
                  { children: [], id: 16, name: "法律合规部", value: 16 },
                  {
                    children: [
                      { children: [], id: 47, name: "合成工段", value: 47 },
                      { children: [], id: 52, name: "聚合工段", value: 52 },
                      {
                        children: [],
                        id: 62,
                        name: "聚氯乙烯维修工段",
                        value: 62
                      },
                      { children: [], id: 63, name: "压滤工段", value: 63 },
                      { children: [], id: 64, name: "乙炔工段", value: 64 },
                      {
                        children: [],
                        id: 2708,
                        name: "EDC VCM工段",
                        value: 2708
                      },
                      {
                        children: [],
                        id: 2832,
                        name: "聚氯乙烯车间管理组",
                        value: 2832
                      }
                    ],
                    id: 19,
                    name: "聚氯乙烯车间",
                    value: 19
                  },
                  {
                    children: [
                      { children: [], id: 75, name: "离子膜工段", value: 75 },
                      {
                        children: [],
                        id: 76,
                        name: "氯氢处理及氯化氢工段",
                        value: 76
                      },
                      { children: [], id: 77, name: "氯氢处理工段", value: 77 },
                      { children: [], id: 78, name: "浓固碱工段", value: 78 },
                      { children: [], id: 79, name: "电解维修工段", value: 79 },
                      { children: [], id: 80, name: "盐水工段", value: 80 },
                      { children: [], id: 81, name: "液氯工段", value: 81 },
                      {
                        children: [],
                        id: 2833,
                        name: "电解车间管理组",
                        value: 2833
                      }
                    ],
                    id: 20,
                    name: "电解车间",
                    value: 20
                  },
                  {
                    children: [
                      { children: [], id: 83, name: "仪表工段", value: 83 },
                      { children: [], id: 2511, name: "管信工段", value: 2511 },
                      { children: [], id: 2814, name: "维修中心", value: 2814 },
                      {
                        children: [],
                        id: 2836,
                        name: "机电仪车间管理组",
                        value: 2836
                      }
                    ],
                    id: 21,
                    name: "机电仪车间",
                    value: 21
                  },
                  {
                    children: [
                      { children: [], id: 84, name: "电气工段", value: 84 },
                      { children: [], id: 85, name: "供热工段", value: 85 },
                      { children: [], id: 86, name: "供水工段", value: 86 },
                      {
                        children: [],
                        id: 87,
                        name: "热电车间管理组",
                        value: 87
                      },
                      { children: [], id: 88, name: "锅炉工段", value: 88 },
                      { children: [], id: 89, name: "环保工段", value: 89 },
                      { children: [], id: 90, name: "汽机工段", value: 90 },
                      {
                        children: [],
                        id: 91,
                        name: "热电车间维修工段",
                        value: 91
                      },
                      { children: [], id: 92, name: "整流工段", value: 92 },
                      {
                        children: [],
                        id: 2758,
                        name: "公用工程工段",
                        value: 2758
                      }
                    ],
                    id: 22,
                    name: "热电车间",
                    value: 22
                  },
                  {
                    children: [
                      {
                        children: [],
                        id: 94,
                        name: "双氧水装置工段",
                        value: 94
                      },
                      {
                        children: [],
                        id: 2834,
                        name: "双氧水车间管理组",
                        value: 2834
                      }
                    ],
                    id: 23,
                    name: "双氧水车间",
                    value: 23
                  },
                  {
                    children: [
                      { children: [], id: 12, name: "氯碱研发中心", value: 12 },
                      {
                        children: [],
                        id: 2493,
                        name: "规划基建办",
                        value: 2493
                      },
                      {
                        children: [
                          {
                            children: [],
                            id: 2498,
                            name: "中控化验室",
                            value: 2498
                          },
                          {
                            children: [],
                            id: 2499,
                            name: "中心化验室",
                            value: 2499
                          }
                        ],
                        id: 2494,
                        name: "质检中心",
                        value: 2494
                      }
                    ],
                    id: 2492,
                    name: "研发中心",
                    value: 2492
                  }
                ],
                id: 2,
                name: "德州实华化工有限公司",
                value: 2
              },
              {
                children: [
                  { children: [], id: 103, name: "电仪维工段", value: 103 },
                  {
                    children: [],
                    id: 104,
                    name: "公用工程工段（泰安）",
                    value: 104
                  },
                  {
                    children: [],
                    id: 105,
                    name: "锅炉工段（泰安）",
                    value: 105
                  },
                  { children: [], id: 108, name: "制盐工段", value: 108 },
                  { children: [], id: 2426, name: "办公室", value: 2426 }
                ],
                id: 24,
                name: "泰安分公司",
                value: 24
              },
              { children: [], id: 2820, name: "离退休人员", value: 2820 }
            ],
            id: 1,
            name: "实华化工有限公司",
            value: 1
          }
        ]
      };
    }
  },
  // 删除接口
  {
    url: "/sft/change/change/del/:id",
    method: "get",
    response: () => {
      return { success: true, message: "删除成功" };
    }
  }
]);
