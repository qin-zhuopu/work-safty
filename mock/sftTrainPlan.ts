import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 部门数据
const deptData = [
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
            children: [],
            id: 2483,
            name: "保卫管理办公室",
            open: false,
            parentName: "办公室（党委办公室）",
            perId: 0,
            value: 2483
          },
          {
            children: [],
            id: 2484,
            name: "后勤保障办公室",
            open: false,
            parentName: "办公室（党委办公室）",
            perId: 0,
            value: 2484
          },
          {
            children: [],
            id: 2485,
            name: "行政（党委）办公室",
            open: false,
            parentName: "办公室（党委办公室）",
            perId: 0,
            value: 2485
          }
        ],
        id: 4,
        name: "办公室（党委办公室）",
        open: false,
        parentName: "德州实华化工有限公司",
        perId: 0,
        value: 4
      },
      {
        children: [],
        id: 5,
        name: "纪委办公室",
        open: false,
        parentName: "德州实华化工有限公司",
        perId: 0,
        value: 5
      },
      {
        children: [
          {
            children: [],
            id: 2490,
            name: "工会",
            open: false,
            parentName: "党群工作部",
            perId: 0,
            value: 2490
          },
          {
            children: [],
            id: 2491,
            name: "党委工作部",
            open: false,
            parentName: "党群工作部",
            perId: 0,
            value: 2491
          }
        ],
        id: 6,
        name: "党群工作部",
        open: false,
        parentName: "德州实华化工有限公司",
        perId: 0,
        value: 6
      },
      {
        children: [],
        id: 8,
        name: "人力资源部",
        open: false,
        parentName: "德州实华化工有限公司",
        perId: 0,
        value: 8
      },
      {
        children: [
          {
            children: [],
            id: 2486,
            name: "安全管理办公室",
            open: false,
            parentName: "HSE管理部",
            perId: 0,
            value: 2486
          },
          {
            children: [],
            id: 2487,
            name: "环保管理办公室",
            open: false,
            parentName: "HSE管理部",
            perId: 0,
            value: 2487
          }
        ],
        id: 9,
        name: "HSE管理部",
        open: false,
        parentName: "德州实华化工有限公司",
        perId: 0,
        value: 9
      },
      {
        children: [
          {
            children: [],
            id: 10,
            name: "设备管理办公室",
            open: false,
            parentName: "运营管理部",
            perId: 0,
            value: 10
          },
          {
            children: [],
            id: 29,
            name: "生产运营办",
            open: false,
            parentName: "运营管理部",
            perId: 0,
            value: 29
          },
          {
            children: [],
            id: 30,
            name: "调度",
            open: false,
            parentName: "运营管理部",
            perId: 0,
            value: 30
          },
          {
            children: [],
            id: 2497,
            name: "专项工作办",
            open: false,
            parentName: "运营管理部",
            perId: 0,
            value: 2497
          }
        ],
        id: 11,
        name: "运营管理部",
        open: false,
        parentName: "德州实华化工有限公司",
        perId: 0,
        value: 11
      },
      {
        children: [
          {
            children: [],
            id: 33,
            name: "采购管理办公室",
            open: false,
            parentName: "供应链管理部",
            perId: 0,
            value: 33
          },
          {
            children: [],
            id: 2495,
            name: "市场营销办公室",
            open: false,
            parentName: "供应链管理部",
            perId: 0,
            value: 2495
          }
        ],
        id: 13,
        name: "供应链管理部",
        open: false,
        parentName: "德州实华化工有限公司",
        perId: 0,
        value: 13
      },
      {
        children: [],
        id: 14,
        name: "财务管理部",
        open: false,
        parentName: "德州实华化工有限公司",
        perId: 0,
        value: 14
      },
      {
        children: [],
        id: 16,
        name: "法律合规部",
        open: false,
        parentName: "德州实华化工有限公司",
        perId: 0,
        value: 16
      },
      {
        children: [
          {
            children: [],
            id: 47,
            name: "合成工段",
            open: false,
            parentName: "聚氯乙烯车间",
            perId: 0,
            value: 47
          },
          {
            children: [],
            id: 52,
            name: "聚合工段",
            open: false,
            parentName: "聚氯乙烯车间",
            perId: 0,
            value: 52
          },
          {
            children: [],
            id: 62,
            name: "聚氯乙烯维修工段",
            open: false,
            parentName: "聚氯乙烯车间",
            perId: 0,
            value: 62
          },
          {
            children: [],
            id: 63,
            name: "压滤工段",
            open: false,
            parentName: "聚氯乙烯车间",
            perId: 0,
            value: 63
          },
          {
            children: [],
            id: 64,
            name: "乙炔工段",
            open: false,
            parentName: "聚氯乙烯车间",
            perId: 0,
            value: 64
          }
        ],
        id: 19,
        name: "聚氯乙烯车间",
        open: false,
        parentName: "德州实华化工有限公司",
        perId: 0,
        value: 19
      },
      {
        children: [
          {
            children: [],
            id: 75,
            name: "离子膜工段",
            open: false,
            parentName: "电解车间",
            perId: 0,
            value: 75
          },
          {
            children: [],
            id: 76,
            name: "氯氢处理及氯化氢工段",
            open: false,
            parentName: "电解车间",
            perId: 0,
            value: 76
          },
          {
            children: [],
            id: 77,
            name: "氯氢处理工段",
            open: false,
            parentName: "电解车间",
            perId: 0,
            value: 77
          },
          {
            children: [],
            id: 78,
            name: "浓固碱工段",
            open: false,
            parentName: "电解车间",
            perId: 0,
            value: 78
          },
          {
            children: [],
            id: 79,
            name: "电解维修工段",
            open: false,
            parentName: "电解车间",
            perId: 0,
            value: 79
          }
        ],
        id: 20,
        name: "电解车间",
        open: false,
        parentName: "德州实华化工有限公司",
        perId: 0,
        value: 20
      },
      {
        children: [
          {
            children: [],
            id: 83,
            name: "仪表工段",
            open: false,
            parentName: "机电仪车间",
            perId: 0,
            value: 83
          }
        ],
        id: 21,
        name: "机电仪车间",
        open: false,
        parentName: "德州实华化工有限公司",
        perId: 0,
        value: 21
      },
      {
        children: [
          {
            children: [],
            id: 84,
            name: "电气工段",
            open: false,
            parentName: "热电车间",
            perId: 0,
            value: 84
          },
          {
            children: [],
            id: 85,
            name: "供热工段",
            open: false,
            parentName: "热电车间",
            perId: 0,
            value: 85
          },
          {
            children: [],
            id: 86,
            name: "供水工段",
            open: false,
            parentName: "热电车间",
            perId: 0,
            value: 86
          }
        ],
        id: 22,
        name: "热电车间",
        open: false,
        parentName: "德州实华化工有限公司",
        perId: 0,
        value: 22
      },
      {
        children: [],
        id: 23,
        name: "双氧水车间",
        open: false,
        parentName: "德州实华化工有限公司",
        perId: 0,
        value: 23
      }
    ],
    id: 2,
    name: "德州实华化工有限公司",
    open: false,
    parentName: "实华化工有限公司",
    perId: 0,
    value: 2
  },
  {
    children: [
      {
        children: [],
        id: 103,
        name: "电仪维工段",
        open: false,
        parentName: "泰安分公司",
        perId: 0,
        value: 103
      },
      {
        children: [],
        id: 104,
        name: "公用工程工段（泰安）",
        open: false,
        parentName: "泰安分公司",
        perId: 0,
        value: 104
      },
      {
        children: [],
        id: 105,
        name: "锅炉工段（泰安）",
        open: false,
        parentName: "泰安分公司",
        perId: 0,
        value: 105
      },
      {
        children: [],
        id: 108,
        name: "制盐工段",
        open: false,
        parentName: "泰安分公司",
        perId: 0,
        value: 108
      }
    ],
    id: 24,
    name: "泰安分公司",
    open: false,
    parentName: "实华化工有限公司",
    perId: 0,
    value: 24
  }
];

// 列表数据
const listContent = [
  {
    eRate: "0%",
    endTime: 1773936000000,
    epNum: "0",
    field: 1,
    field1: 1,
    field2: "是的是的",
    field3: "李",
    id: 884,
    ifTest: 1,
    name: "AI计划",
    planType: "2025机电仪培训-包装机相关知识",
    startTime: 1773849600000,
    sysDeptName: "公司领导",
    tRate: "0%",
    target: "人人会AI",
    tpNum: "0",
    userId: 112
  },
  {
    eRate: "80%",
    eaNum: "1190",
    endTime: 1774886400000,
    epNum: "1474",
    field: 1,
    field1: 4,
    field2:
      "双重预防机制定义、风险辨识方法、风险分级与管控措施、隐患排查流程、隐患整改与闭环管理、典型事故案例警示，提升全员安全防控能力。",
    field3: "刘鑫",
    id: 883,
    ifTest: 1,
    name: "双重预防专项培训",
    planType: "双重预防专项培训",
    startTime: 1773849600000,
    sysDeptName: "HSE管理部",
    tRate: "71%",
    taNum: "1047",
    target:
      "让参训人员理解机制核心内涵，熟练识别岗位风险，落实管控措施，杜绝隐患升级。",
    tpNum: "1474",
    userId: 191
  },
  {
    eRate: "83%",
    eaNum: "1230",
    endTime: 1774800000000,
    epNum: "1474",
    field: 1,
    field1: 4,
    field2:
      "1.简述两重点一重大的具体内容 2.介绍厂内重点监管危险化工工艺与重点监管化学品 3.介绍厂内重大危险源与各重大危险源的包保责任人",
    field3: "高嘉泽",
    id: 882,
    ifTest: 1,
    name: "两重点一重大专项培训",
    planType: "两重点一重大专项培训",
    startTime: 1773763200000,
    sysDeptName: "HSE管理部",
    tRate: "73%",
    taNum: "1077",
    target: "两重点一重大评价结果对于危险化学品的安全管理至关重要",
    tpNum: "1474",
    userId: 1611
  },
  {
    eRate: "0%",
    endTime: 1774886400000,
    epNum: "0",
    field: 1,
    field1: 3,
    field2: "针对新员工、转岗、复岗人员进行系统培训",
    field3: "刘永武",
    id: 880,
    ifTest: 1,
    name: "泰安分公司制盐工段三级培训教育（班组）",
    planType: "泰安分公司制盐工段三级培训教育（班组）",
    startTime: 1773676800000,
    sysDeptName: "制盐工段",
    tRate: "0%",
    target: "对制盐工段及生产运行操作进行培训讲解",
    tpNum: "0",
    userId: 2014
  },
  {
    eRate: "100%",
    eaNum: "1",
    endTime: 1774800000000,
    epNum: "1",
    field: 1,
    field1: 2,
    field2: "针对新入职员工、转岗、复岗员工进行的三级培训教育",
    field3: "赵健",
    id: 881,
    ifTest: 1,
    name: "泰安分公司制盐工段三级培训教育（车间）",
    planType: "泰安分公司制盐工段三级培训教育（车间）",
    startTime: 1773676800000,
    sysDeptName: "制盐工段",
    tRate: "100%",
    taNum: "1",
    target: "对制盐工段整体工艺生产及现场情况进行培训讲解",
    tpNum: "1",
    userId: 2014
  },
  {
    eRate: "100%",
    eaNum: "1",
    endTime: 1773676800000,
    epNum: "1",
    field: 1,
    field1: 6,
    field2:
      "1、仓库地磅的收发货运作；2物料的保管、储存、盘点；3.仓库地磅应急预案；4.SHE岗位职责；5、风险点及管控措施；6.事故案例分享",
    field3: "魏晓慧",
    id: 876,
    ifTest: 1,
    name: "仓库地磅三级教育培训",
    planType: "仓库地磅三级教育培训",
    startTime: 1773590400000,
    sysDeptName: "办公室",
    tRate: "100%",
    taNum: "1",
    target:
      "通过教育培训让员工知道并做到懂安全、会安全、能安全，从根本上预防事故。",
    tpNum: "1",
    userId: 5905
  },
  {
    eRate: "100%",
    eaNum: "1",
    endTime: 1774195200000,
    epNum: "1",
    field: 1,
    field1: 5,
    field2: "了解电解车间风险点",
    field3: "吕晨",
    id: 877,
    ifTest: 1,
    name: "电解车间员工转岗培训",
    planType: "电解车间员工复岗返岗培训",
    startTime: 1773590400000,
    sysDeptName: "电解车间",
    tRate: "100%",
    taNum: "1",
    target: "了解电解车间风险点",
    tpNum: "1",
    userId: 1399
  },
  {
    eRate: "93%",
    eaNum: "1381",
    endTime: 1774454400000,
    epNum: "1474",
    field: 1,
    field1: 4,
    field2: "学习警示金誉石化及赛科视频",
    field3: "刘晓颖",
    id: 878,
    ifTest: 1,
    name: "3月安全月警示教育视频",
    planType: "3月安全月警示教育视频",
    startTime: 1773590400000,
    sysDeptName: "德州实华化工有限公司",
    tRate: "88%",
    taNum: "1304",
    target:
      "通过观看警示教育视频，深刻认识违纪违法、安全事故、违规操作等问题的严重危害性",
    tpNum: "1474",
    userId: 2
  },
  {
    eRate: "94%",
    eaNum: "176",
    endTime: 1774800000000,
    epNum: "186",
    field: 1,
    field1: 4,
    field2: "1.培训核心目标 2.排污许可制度基础框架 3.排污许可证申领与变更流程",
    field3: "张立超",
    id: 879,
    ifTest: 1,
    name: "排污许可管理要求培训",
    planType: "排污许可管理要求的试题",
    startTime: 1773590400000,
    sysDeptName: "泰安分公司",
    tRate: "88%",
    taNum: "164",
    target: "让参训人员全面掌握排污许可制度的核心要求",
    tpNum: "186",
    userId: 1868
  },
  {
    eRate: "52%",
    eaNum: "356",
    endTime: 1774195200000,
    epNum: "672",
    field: 1,
    field1: 7,
    field2: "作业审批流程、风险管控措施、防护器材使用、现场监护要求",
    field3: "王占彪",
    id: 874,
    ifTest: 1,
    name: "承包商月度培训（3月）",
    planType: "承包商月度培训（3月）",
    startTime: 1773417600000,
    sysDeptName: "HSE管理部",
    tRate: "52%",
    taNum: "354",
    target: "让参训人员掌握作业风险辨识、安全操作规程及应急处置技能",
    tpNum: "672",
    userId: 191
  }
];

export default defineFakeRoute([
  // 列表接口
  {
    url: "/sft/train/plan/list.json",
    method: "get",
    response: ({ query }) => {
      const page = parseInt(query.page as string) || 0;
      const size = parseInt(query.size as string) || 10;
      const name = (query.name as string) || "";
      const field = query.field ? parseInt(query.field as string) : "";
      const field1 = query.field1 ? parseInt(query.field1 as string) : "";
      const sysDeptId = (query.sysDeptId as string) || "";

      // 筛选数据
      let filteredData = [...listContent];
      if (name) {
        filteredData = filteredData.filter(item => item.name.includes(name));
      }
      if (field !== "") {
        filteredData = filteredData.filter(item => item.field === field);
      }
      if (field1 !== "") {
        filteredData = filteredData.filter(item => item.field1 === field1);
      }
      if (sysDeptId && sysDeptId !== "-1") {
        filteredData = filteredData.filter(item =>
          item.sysDeptName.includes(sysDeptId)
        );
      }

      // 分页
      const totalElements = filteredData.length;
      const totalPages = Math.ceil(totalElements / size);
      const start = page * size;
      const content = filteredData.slice(start, start + size);

      return {
        success: true,
        t: {
          content,
          totalElements,
          totalPages,
          size,
          number: page,
          first: page === 0,
          last: page >= totalPages - 1,
          numberOfElements: content.length,
          empty: content.length === 0,
          pageable: {
            offset: start,
            pageNumber: page,
            pageSize: size,
            paged: true,
            unpaged: false,
            sort: { empty: true, sorted: false, unsorted: true }
          },
          sort: { empty: true, sorted: false, unsorted: true }
        }
      };
    }
  },
  // 部门接口
  {
    url: "/sft/sys/dept/all.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: deptData
      };
    }
  }
]);
