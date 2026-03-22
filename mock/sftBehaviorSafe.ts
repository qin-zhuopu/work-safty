import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 模拟部门数据
const mockDepts = [
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
          { id: 3, name: "公司领导", value: 3 },
          {
            id: 4,
            name: "办公室（党委办公室）",
            value: 4,
            children: [
              { id: 2483, name: "保卫管理办公室", value: 2483 },
              { id: 2484, name: "后勤保障办公室", value: 2484 },
              { id: 2485, name: "行政（党委）办公室", value: 2485 }
            ]
          },
          { id: 5, name: "纪委办公室", value: 5 },
          {
            id: 6,
            name: "党群工作部",
            value: 6,
            children: [
              { id: 2490, name: "工会", value: 2490 },
              { id: 2491, name: "党委工作部", value: 2491 }
            ]
          },
          { id: 8, name: "人力资源部", value: 8 },
          {
            id: 9,
            name: "HSE管理部",
            value: 9,
            children: [
              { id: 2486, name: "安全管理办公室", value: 2486 },
              { id: 2487, name: "环保管理办公室", value: 2487 }
            ]
          },
          {
            id: 11,
            name: "运营管理部",
            value: 11,
            children: [
              { id: 10, name: "设备管理办公室", value: 10 },
              { id: 29, name: "生产运营办", value: 29 },
              { id: 30, name: "调度", value: 30 }
            ]
          },
          {
            id: 13,
            name: "供应链管理部",
            value: 13,
            children: [
              { id: 33, name: "采购管理办公室", value: 33 },
              { id: 2495, name: "市场营销办公室", value: 2495 },
              {
                id: 2496,
                name: "仓储物流办公室",
                value: 2496,
                children: [
                  { id: 2599, name: "仓储办管理组", value: 2599 },
                  { id: 2600, name: "备件工段", value: 2600 },
                  { id: 2601, name: "成品工段", value: 2601 }
                ]
              }
            ]
          },
          {
            id: 14,
            name: "财务管理部",
            value: 14,
            children: [{ id: 2488, name: "财务管理办公室", value: 2488 }]
          },
          { id: 16, name: "法律合规部", value: 16 },
          {
            id: 19,
            name: "聚氯乙烯车间",
            value: 19,
            children: [
              { id: 47, name: "合成工段", value: 47 },
              { id: 52, name: "聚合工段", value: 52 },
              { id: 62, name: "聚氯乙烯维修工段", value: 62 },
              { id: 63, name: "压滤工段", value: 63 },
              { id: 64, name: "乙炔工段", value: 64 }
            ]
          },
          {
            id: 20,
            name: "电解车间",
            value: 20,
            children: [
              { id: 75, name: "离子膜工段", value: 75 },
              { id: 76, name: "氯氢处理及氯化氢工段", value: 76 },
              { id: 77, name: "氯氢处理工段", value: 77 },
              { id: 78, name: "浓固碱工段", value: 78 },
              { id: 79, name: "电解维修工段", value: 79 },
              { id: 80, name: "盐水工段", value: 80 },
              { id: 81, name: "液氯工段", value: 81 }
            ]
          },
          {
            id: 21,
            name: "机电仪车间",
            value: 21,
            children: [
              { id: 83, name: "仪表工段", value: 83 },
              { id: 2511, name: "管信工段", value: 2511 }
            ]
          },
          {
            id: 22,
            name: "热电车间",
            value: 22,
            children: [
              { id: 84, name: "电气工段", value: 84 },
              { id: 85, name: "供热工段", value: 85 },
              { id: 86, name: "供水工段", value: 86 },
              { id: 87, name: "热电车间管理组", value: 87 },
              { id: 88, name: "锅炉工段", value: 88 },
              { id: 89, name: "环保工段", value: 89 },
              { id: 90, name: "汽机工段", value: 90 },
              { id: 91, name: "热电车间维修工段", value: 91 },
              { id: 92, name: "整流工段", value: 92 }
            ]
          },
          {
            id: 23,
            name: "双氧水车间",
            value: 23,
            children: [
              { id: 94, name: "双氧水装置工段", value: 94 },
              { id: 2834, name: "双氧水车间管理组", value: 2834 }
            ]
          },
          {
            id: 24,
            name: "泰安分公司",
            value: 24,
            children: [
              { id: 103, name: "电仪维工段", value: 103 },
              { id: 104, name: "公用工程工段（泰安）", value: 104 },
              { id: 105, name: "锅炉工段（泰安）", value: 105 },
              { id: 108, name: "制盐工段", value: 108 }
            ]
          },
          {
            id: 2434,
            name: "承包商",
            value: 2434,
            children: [
              { id: 2459, name: "济宁兰博生物科技有限公司", value: 2459 },
              { id: 2460, name: "沧州市瑞星清洗防腐有限公司", value: 2460 },
              {
                id: 2463,
                name: "德州汇邦机电设备安装工程有限公司",
                value: 2463
              }
            ]
          }
        ]
      }
    ]
  }
];

// 模拟行为安全观察数据
const mockSafeData = [
  {
    id: "1740012300001",
    addUser: {
      id: "100",
      uname: "zhangsan",
      ushow: "张三"
    },
    field2: {
      id: "101",
      uname: "lisi",
      ushow: "李四"
    },
    field: {
      id: 64,
      name: "乙炔工段"
    },
    field1: 1740448000000,
    field5: {
      id: "102",
      uname: "wangwu",
      ushow: "王五"
    },
    field6: 1740534400000,
    field8: 1740707200000,
    field11: 1740793600000,
    status: 5
  },
  {
    id: "1740012300002",
    addUser: {
      id: "103",
      uname: "admin",
      ushow: "管理员"
    },
    field2: {
      id: "104",
      uname: "zhaoliu",
      ushow: "赵六"
    },
    field: {
      id: 75,
      name: "离子膜工段"
    },
    field1: 1740361600000,
    field5: {
      id: "105",
      uname: "sunqi",
      ushow: "孙七"
    },
    field6: 1740448000000,
    field8: 1740620800000,
    field11: 1740707200000,
    status: 5
  },
  {
    id: "1740012300003",
    addUser: {
      id: "106",
      uname: "tester",
      ushow: "测试员"
    },
    field2: {
      id: "107",
      uname: "zhouba",
      ushow: "周八"
    },
    field: {
      id: 88,
      name: "锅炉工段"
    },
    field1: 1740275200000,
    field5: {
      id: "108",
      uname: "wujiu",
      ushow: "吴九"
    },
    field6: 1740361600000,
    field8: 1740534400000,
    field11: 1740620800000,
    status: 5
  },
  {
    id: "1740012300004",
    addUser: {
      id: "109",
      uname: "operator",
      ushow: "操作员"
    },
    field2: {
      id: "110",
      uname: "zhengshi",
      ushow: "郑十"
    },
    field: {
      id: 94,
      name: "双氧水装置工段"
    },
    field1: 1740188800000,
    field5: {
      id: "111",
      uname: "fengshiyi",
      ushow: "冯十一"
    },
    field6: 1740275200000,
    field8: 1740448000000,
    status: 3
  },
  {
    id: "1740012300005",
    addUser: {
      id: "112",
      uname: "worker",
      ushow: "作业人员"
    },
    field2: {
      id: "113",
      uname: "chenshier",
      ushow: "陈十二"
    },
    field: {
      id: 83,
      name: "仪表工段"
    },
    field1: 1740102400000,
    field5: {
      id: "114",
      uname: "chushisan",
      ushow: "褚十三"
    },
    field6: 1740188800000,
    status: 1
  },
  {
    id: "1740012300006",
    addUser: {
      id: "115",
      uname: "supervisor",
      ushow: "主管"
    },
    field2: {
      id: "116",
      uname: "weishisi",
      ushow: "卫十四"
    },
    field: {
      id: 47,
      name: "合成工段"
    },
    field1: 1740016000000,
    field5: {
      id: "117",
      uname: "shiwu",
      ushow: "十五"
    },
    field6: 1740102400000,
    field8: 1740275200000,
    status: 3
  },
  {
    id: "1740012300007",
    addUser: {
      id: "118",
      uname: "manager",
      ushow: "经理"
    },
    field2: {
      id: "119",
      uname: "shiliu",
      ushow: "十六"
    },
    field: {
      id: 52,
      name: "聚合工段"
    },
    field1: 1739929600000,
    field5: {
      id: "120",
      uname: "shiqi",
      ushow: "十七"
    },
    field6: 1740016000000,
    status: 1
  },
  {
    id: "1740012300008",
    addUser: {
      id: "121",
      uname: "leader",
      ushow: "领导"
    },
    field2: {
      id: "122",
      uname: "shiba",
      ushow: "十八"
    },
    field: {
      id: 81,
      name: "液氯工段"
    },
    field1: 1739843200000,
    field5: {
      id: "123",
      uname: "shijiu",
      ushow: "十九"
    },
    field6: 1739929600000,
    field8: 1740102400000,
    field11: 1740188800000,
    status: 5
  },
  {
    id: "1740012300009",
    addUser: {
      id: "124",
      uname: "safety",
      ushow: "安全员"
    },
    field2: {
      id: "125",
      uname: "ershi",
      ushow: "二十"
    },
    field: {
      id: 2486,
      name: "安全管理办公室"
    },
    field1: 1739756800000,
    field5: {
      id: "126",
      uname: "eryi",
      ushow: "二十一"
    },
    field6: 1739843200000,
    status: 1
  },
  {
    id: "1740012300010",
    addUser: {
      id: "127",
      uname: "driver",
      ushow: "司机"
    },
    field2: {
      id: "128",
      uname: "erer",
      ushow: "二十二"
    },
    field: {
      id: 2496,
      name: "仓储物流办公室"
    },
    field1: 1739670400000,
    field5: {
      id: "129",
      uname: "ersan",
      ushow: "二十三"
    },
    field6: 1739756800000,
    field8: 1739929600000,
    status: 3
  },
  {
    id: "1740012300011",
    addUser: {
      id: "130",
      uname: "guard",
      ushow: "保安"
    },
    field2: {
      id: "131",
      uname: "ersi",
      ushow: "二十四"
    },
    field: {
      id: 2483,
      name: "保卫管理办公室"
    },
    field1: 1739584000000,
    field5: {
      id: "132",
      uname: "erwu",
      ushow: "二十五"
    },
    field6: 1739670400000,
    field8: 1739843200000,
    field11: 1739929600000,
    status: 5
  },
  {
    id: "1740012300012",
    addUser: {
      id: "133",
      uname: "cleaner",
      ushow: "清洁工"
    },
    field2: {
      id: "134",
      uname: "erliu",
      ushow: "二十六"
    },
    field: {
      id: 2484,
      name: "后勤保障办公室"
    },
    field1: 1739497600000,
    field5: {
      id: "135",
      uname: "erqi",
      ushow: "二十七"
    },
    field6: 1739584000000,
    status: 1
  }
];

export default defineFakeRoute([
  {
    url: "/sft/sys/dept/all.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: mockDepts
      };
    }
  },
  {
    url: "/sft/behavior/safe/list.json",
    method: "get",
    response: ({ query }) => {
      const page = parseInt(query.page as string) || 1;
      const size = parseInt(query.size as string) || 10;
      const addUserName = (query.addUserName as string) || "";
      const field2Name = (query.field2Name as string) || "";
      const field5Name = (query.field5Name as string) || "";
      const status = (query.status as string) || "";
      const startTime = (query.startTime as string) || "";
      const endTime = (query.endTime as string) || "";
      const startTime1 = (query.startTime1 as string) || "";
      const endTime1 = (query.endTime1 as string) || "";
      const startTime2 = (query.startTime2 as string) || "";
      const endTime2 = (query.endTime2 as string) || "";
      const fieldId = (query.fieldId as string) || "-1";

      // 过滤数据
      let filteredData = [...mockSafeData];

      if (addUserName) {
        filteredData = filteredData.filter(item =>
          item.addUser?.ushow?.includes(addUserName)
        );
      }

      if (field2Name) {
        filteredData = filteredData.filter(item =>
          item.field2?.ushow?.includes(field2Name)
        );
      }

      if (field5Name) {
        filteredData = filteredData.filter(item =>
          item.field5?.ushow?.includes(field5Name)
        );
      }

      if (status && status !== "-1") {
        filteredData = filteredData.filter(
          item => item.status?.toString() === status
        );
      }

      if (fieldId && fieldId !== "-1") {
        filteredData = filteredData.filter(
          item => item.field?.id?.toString() === fieldId
        );
      }

      if (startTime) {
        const start = new Date(startTime).getTime();
        filteredData = filteredData.filter(item =>
          item.field1 ? item.field1 >= start : false
        );
      }

      if (endTime) {
        const end = new Date(endTime).getTime() + 86400000 - 1;
        filteredData = filteredData.filter(item =>
          item.field1 ? item.field1 <= end : false
        );
      }

      if (startTime1) {
        const start = new Date(startTime1).getTime();
        filteredData = filteredData.filter(item =>
          item.field6 ? item.field6 >= start : false
        );
      }

      if (endTime1) {
        const end = new Date(endTime1).getTime() + 86400000 - 1;
        filteredData = filteredData.filter(item =>
          item.field6 ? item.field6 <= end : false
        );
      }

      if (startTime2) {
        const start = new Date(startTime2).getTime();
        filteredData = filteredData.filter(item =>
          item.field8 ? item.field8 >= start : false
        );
      }

      if (endTime2) {
        const end = new Date(endTime2).getTime() + 86400000 - 1;
        filteredData = filteredData.filter(item =>
          item.field8 ? item.field8 <= end : false
        );
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
  {
    url: "/sft/behavior/safe/del/:id",
    method: "get",
    response: () => {
      return {
        success: true,
        message: "删除成功"
      };
    }
  },
  {
    url: "/sft/behavior/safe/delAll",
    method: "get",
    response: () => {
      return {
        success: true,
        message: "删除成功"
      };
    }
  }
]);
