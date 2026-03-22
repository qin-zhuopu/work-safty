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

// 模拟派工单数据
const mockSheetData = [
  {
    id: "1740061234567",
    addUser: {
      id: "100",
      uname: "zhangsan",
      ushow: "张三",
      sysDept: { id: 64, name: "乙炔工段" }
    },
    addDate: 1740061234567,
    field1: "凉水塔检修搭架子",
    field8Str: "德州汇邦机电设备安装工程有限公司",
    field9Str: "李四, 王五, 赵六",
    field10: 1740064800000,
    field11: 1740100800000,
    field12Str: "乙炔工段凉水塔区域",
    field16: "生产区域",
    field13: {
      id: "101",
      uname: "lisi",
      ushow: "李经理"
    },
    field14: {
      id: "102",
      uname: "wangwu",
      ushow: "王主管"
    },
    field5: "动火作业",
    workType: "非常规作业",
    fixedh: 0,
    dhLevel: "二级",
    gcLevel: "",
    dzLevel: "",
    count: 5,
    involves: "HSE管理部,运营管理部",
    remain: "2天",
    status: "申请",
    remarks: "",
    act: {
      dept: { id: 19, name: "聚氯乙烯车间" },
      operatUnit: "德州汇邦机电设备安装工程有限公司"
    }
  },
  {
    id: "1740062234567",
    addUser: {
      id: "103",
      uname: "admin",
      ushow: "管理员",
      sysDept: { id: 9, name: "HSE管理部" }
    },
    addDate: 1740062234567,
    field1: "管道焊接作业",
    field8Str: "山东修能管道工程有限公司",
    field9Str: "孙七, 周八",
    field10: 1740072000000,
    field11: 1740090000000,
    field12Str: "电解车间离子膜工段",
    field16: "生产区域",
    field13: {
      id: "104",
      uname: "sunqi",
      ushow: "孙主任"
    },
    field14: {
      id: "105",
      uname: "zhouba",
      ushow: "周工"
    },
    field5: "动火作业,高处作业",
    workType: "特殊作业",
    fixedh: 1,
    dhLevel: "一级",
    gcLevel: "二级",
    dzLevel: "",
    count: 3,
    involves: "HSE管理部",
    remain: "1天",
    status: "审批",
    remarks: "",
    act: {
      dept: { id: 20, name: "电解车间" },
      operatUnit: "山东修能管道工程有限公司"
    }
  },
  {
    id: "1740063234567",
    addUser: {
      id: "106",
      uname: "test",
      ushow: "测试员",
      sysDept: { id: 22, name: "热电车间" }
    },
    addDate: 1740063234567,
    field1: "锅炉检修",
    field8Str: "山东高速德建集团有限公司",
    field9Str: "吴九, 郑十",
    field10: 1740080000000,
    field11: 1740150000000,
    field12Str: "热电车间锅炉工段",
    field16: "生产区域",
    field13: {
      id: "107",
      uname: "wujiu",
      ushow: "吴班长"
    },
    field14: {
      id: "108",
      uname: "zhengshi",
      ushow: "郑技师"
    },
    field5: "吊装作业",
    workType: "常规作业",
    fixedh: 0,
    dhLevel: "",
    gcLevel: "",
    dzLevel: "三级",
    count: 4,
    involves: "HSE管理部,设备管理办公室",
    remain: "3天",
    status: "结束",
    remarks: "",
    act: {
      dept: { id: 22, name: "热电车间" },
      operatUnit: "山东高速德建集团有限公司"
    }
  },
  {
    id: "1740064234567",
    addUser: {
      id: "109",
      uname: "operator",
      ushow: "操作员",
      sysDept: { id: 23, name: "双氧水车间" }
    },
    addDate: 1740064234567,
    field1: "储罐清洗作业",
    field8Str: "山东东恒无损检测有限公司",
    field9Str: "冯十一, 陈十二",
    field10: 1740096000000,
    field11: 1740120000000,
    field12Str: "双氧水车间装置区",
    field16: "生产区域",
    field13: {
      id: "110",
      uname: "fengshiyi",
      ushow: "冯工"
    },
    field14: {
      id: "111",
      uname: "chenshier",
      ushow: "陈主管"
    },
    field5: "受限空间作业",
    workType: "特殊作业",
    fixedh: 0,
    dhLevel: "",
    gcLevel: "三级",
    dzLevel: "",
    count: 6,
    involves: "HSE管理部",
    remain: "0.5天",
    status: "驳回",
    remarks: "安全措施不完善",
    act: {
      dept: { id: 23, name: "双氧水车间" },
      operatUnit: "山东东恒无损检测有限公司"
    }
  },
  {
    id: "1740065234567",
    addUser: {
      id: "112",
      uname: "worker",
      ushow: "作业人员",
      sysDept: { id: 21, name: "机电仪车间" }
    },
    addDate: 1740065234567,
    field1: "仪表校验",
    field8Str: "泰安分公司",
    field9Str: "褚十三, 卫十四",
    field10: 1740100000000,
    field11: 1740110000000,
    field12Str: "机电仪车间仪表工段",
    field16: "生产区域",
    field13: {
      id: "113",
      uname: "chushisan",
      ushow: "褚班长"
    },
    field14: {
      id: "114",
      uname: "weishisi",
      ushow: "卫技师"
    },
    field5: "",
    workType: "常规作业",
    fixedh: 0,
    dhLevel: "",
    gcLevel: "",
    dzLevel: "",
    count: 2,
    involves: "",
    remain: "4小时",
    status: "紧急停止",
    remarks: "发现隐患立即停止",
    act: {
      dept: { id: 21, name: "机电仪车间" },
      operatUnit: "泰安分公司"
    }
  }
];

export default defineFakeRoute([
  {
    url: "/sft/sys/dept/cjzr/all.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: mockDepts
      };
    }
  },
  {
    url: "/sft/work/sheet/list.json",
    method: "get",
    response: ({ query }) => {
      const page = parseInt(query.page as string) || 1;
      const size = parseInt(query.size as string) || 10;
      const deptId = (query.deptId as string) || "";
      const field8 = (query.field8 as string) || "";
      const field12Str = (query.field12Str as string) || "";
      const status = (query.status as string) || "";
      const ssd = (query.ssd as string) || "";
      const user = (query.user as string) || "";

      // 过滤数据
      let filteredData = mockSheetData;

      if (deptId && deptId !== "-1") {
        filteredData = filteredData.filter(
          item => item.act?.dept?.id?.toString() === deptId
        );
      }

      if (field8) {
        filteredData = filteredData.filter(item =>
          item.field8Str?.includes(field8)
        );
      }

      if (field12Str) {
        filteredData = filteredData.filter(item =>
          item.field12Str?.includes(field12Str)
        );
      }

      if (status) {
        filteredData = filteredData.filter(item => item.status === status);
      }

      if (ssd) {
        filteredData = filteredData.filter(item =>
          item.act?.dept?.name?.includes(ssd)
        );
      }

      if (user) {
        filteredData = filteredData.filter(item =>
          item.addUser?.ushow?.includes(user)
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
  }
]);
