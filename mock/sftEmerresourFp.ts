import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 部门数据（简化版）
const deptData = [
  {
    id: 2,
    name: "德州实华化工有限公司",
    parentName: "实华化工有限公司",
    perId: 0,
    value: 2,
    children: [
      {
        id: 19,
        name: "聚氯乙烯车间",
        parent: { id: 2, name: "德州实华化工有限公司" },
        children: []
      },
      {
        id: 20,
        name: "电解车间",
        parent: { id: 2, name: "德州实华化工有限公司" },
        children: []
      },
      {
        id: 21,
        name: "机电仪车间",
        parent: { id: 2, name: "德州实华化工有限公司" },
        children: []
      },
      {
        id: 22,
        name: "热电车间",
        parent: { id: 2, name: "德州实华化工有限公司" },
        children: []
      },
      {
        id: 23,
        name: "双氧水车间",
        parent: { id: 2, name: "德州实华化工有限公司" },
        children: []
      }
    ]
  },
  {
    id: 24,
    name: "泰安分公司",
    parentName: "实华化工有限公司",
    perId: 0,
    value: 24,
    children: [
      {
        id: 103,
        name: "电仪维工段",
        parent: { id: 24, name: "泰安分公司" },
        children: []
      },
      {
        id: 104,
        name: "公用工程工段（泰安）",
        parent: { id: 24, name: "泰安分公司" },
        children: []
      },
      {
        id: 105,
        name: "锅炉工段（泰安）",
        parent: { id: 24, name: "泰安分公司" },
        children: []
      },
      {
        id: 108,
        name: "制盐工段",
        parent: { id: 24, name: "泰安分公司" },
        children: []
      }
    ]
  }
];

// 防汛物资台账数据
const mockData = [
  {
    id: "1",
    field: "沙袋",
    field1: "70cm",
    field2: "10",
    field3: "废水池",
    field4: 1772598853506,
    next: "2026-4-01 - 2026-4-04",
    remarks: "",
    sysDept: {
      id: 108,
      name: "制盐工段",
      parent: { id: 24, name: "泰安分公司" }
    },
    sysUser: { id: 6788, ushow: "严凯" },
    config: { id: 33, field: "防汛物资", cycle: "每月" }
  },
  {
    id: "2",
    field: "抽水泵",
    field1: "Q=50m³/h",
    field2: "5",
    field3: "设备房A区",
    field4: 1772502453506,
    next: "2026-4-05 - 2026-4-08",
    remarks: "柴油驱动抽水泵",
    sysDept: {
      id: 47,
      name: "合成工段",
      parent: { id: 19, name: "聚氯乙烯车间" }
    },
    sysUser: { id: 112, ushow: "张三" },
    config: { id: 33, field: "防汛物资", cycle: "每月" }
  },
  {
    id: "3",
    field: "救生衣",
    field1: "XL",
    field2: "50",
    field3: "应急物资仓库2号库",
    field4: 1772416053506,
    next: "2026-3-25 - 2026-3-28",
    remarks: "成人救生衣",
    sysDept: {
      id: 75,
      name: "离子膜工段",
      parent: { id: 20, name: "电解车间" }
    },
    sysUser: { id: 113, ushow: "李四" },
    config: { id: 33, field: "防汛物资", cycle: "每月" }
  },
  {
    id: "4",
    field: "雨衣",
    field1: "L",
    field2: "100",
    field3: "应急物资仓库1号库",
    field4: 1772329653506,
    next: "2026-4-10 - 2026-4-13",
    remarks: "防水雨衣",
    sysDept: {
      id: 83,
      name: "仪表工段",
      parent: { id: 21, name: "机电仪车间" }
    },
    sysUser: { id: 114, ushow: "王五" },
    config: { id: 33, field: "防汛物资", cycle: "每月" }
  },
  {
    id: "5",
    field: "应急照明灯",
    field1: "LED",
    field2: "30",
    field3: "设备房B区",
    field4: 1772243253506,
    next: "2026-3-20 - 2026-3-23",
    remarks: "手持式应急照明",
    sysDept: {
      id: 84,
      name: "电气工段",
      parent: { id: 22, name: "热电车间" }
    },
    sysUser: { id: 115, ushow: "赵六" },
    config: { id: 28, field: "应急照明灯", cycle: "每月" }
  },
  {
    id: "6",
    field: "防汛铁锹",
    field1: "标准型",
    field2: "200",
    field3: "应急物资仓库3号库",
    field4: 1772156853506,
    next: "2026-4-15 - 2026-4-18",
    remarks: "加固防汛铁锹",
    sysDept: {
      id: 94,
      name: "双氧水装置工段",
      parent: { id: 23, name: "双氧水车间" }
    },
    sysUser: { id: 116, ushow: "孙七" },
    config: { id: 33, field: "防汛物资", cycle: "每月" }
  },
  {
    id: "7",
    field: "防水布",
    field1: "5m×10m",
    field2: "50",
    field3: "应急物资仓库2号库",
    field4: 1772070453506,
    next: "2026-3-30 - 2026-4-02",
    remarks: "加厚防水布",
    sysDept: {
      id: 52,
      name: "聚合工段",
      parent: { id: 19, name: "聚氯乙烯车间" }
    },
    sysUser: { id: 117, ushow: "周八" },
    config: { id: 33, field: "防汛物资", cycle: "每月" }
  },
  {
    id: "8",
    field: "橡胶手套",
    field1: "大号",
    field2: "300",
    field3: "应急物资仓库1号库",
    field4: 1771984053506,
    next: "2026-4-20 - 2026-4-23",
    remarks: "防水橡胶手套",
    sysDept: {
      id: 76,
      name: "氯氢处理及氯化氢工段",
      parent: { id: 20, name: "电解车间" }
    },
    sysUser: { id: 118, ushow: "吴九" },
    config: { id: 33, field: "防汛物资", cycle: "每月" }
  },
  {
    id: "9",
    field: "急救包",
    field1: "标准型",
    field2: "20",
    field3: "医务室",
    field4: 1771897653506,
    next: "2026-3-28 - 2026-3-31",
    remarks: "基础医疗急救包",
    sysDept: {
      id: 2511,
      name: "管信工段",
      parent: { id: 21, name: "机电仪车间" }
    },
    sysUser: { id: 119, ushow: "郑十" },
    config: { id: 29, field: "医疗药箱", cycle: "每月" }
  },
  {
    id: "10",
    field: "防汛沙袋",
    field1: "60cm×40cm",
    field2: "500",
    field3: "应急物资仓库4号库",
    field4: 1771811253506,
    next: "2026-4-25 - 2026-4-28",
    remarks: "空沙袋，需现场装填",
    sysDept: {
      id: 85,
      name: "供热工段",
      parent: { id: 22, name: "热电车间" }
    },
    sysUser: { id: 120, ushow: "陈十二" },
    config: { id: 33, field: "防汛物资", cycle: "每月" }
  },
  {
    id: "11",
    field: "对讲机",
    field1: "5km",
    field2: "15",
    field3: "通讯室",
    field4: 1771724853506,
    next: "2026-4-12 - 2026-4-15",
    remarks: "防水对讲机",
    sysDept: {
      id: 2814,
      name: "维修中心",
      parent: { id: 21, name: "机电仪车间" }
    },
    sysUser: { id: 121, ushow: "褚十三" },
    config: { id: 33, field: "防汛物资", cycle: "每月" }
  },
  {
    id: "12",
    field: "冲锋舟",
    field1: "6人座",
    field2: "3",
    field3: "码头仓库",
    field4: 1771638453506,
    next: "2026-3-22 - 2026-3-25",
    remarks: "玻璃钢冲锋舟",
    sysDept: {
      id: 103,
      name: "电仪维工段",
      parent: { id: 24, name: "泰安分公司" }
    },
    sysUser: { id: 122, ushow: "卫十四" },
    config: { id: 33, field: "防汛物资", cycle: "每月" }
  }
];

export default defineFakeRoute([
  // 部门列表接口
  {
    url: "/sft/sys/dept/all",
    method: "get",
    response: () => {
      return {
        success: true,
        t: deptData
      };
    }
  },
  // 防汛物资列表接口
  {
    url: "/sft/emerresour/fp/list",
    method: "get",
    response: ({ query }) => {
      const page = parseInt(query.page as string) || 0;
      const size = parseInt(query.size as string) || 10;
      const field = (query.field as string) || "";
      const deptId = (query.deptId as string) || "";
      const _beginTime = (query.beginTime as string) || "";
      const _endTime = (query.endTime as string) || "";

      let filteredData = mockData;

      if (field) {
        filteredData = filteredData.filter(item => item.field.includes(field));
      }

      if (deptId && deptId !== "-1") {
        filteredData = filteredData.filter(
          item =>
            item.sysDept?.id === parseInt(deptId) ||
            item.sysDept?.parent?.id === parseInt(deptId)
        );
      }

      // 日期过滤（可根据需要实现）
      if (_beginTime || _endTime) {
        // TODO: 实现日期范围过滤逻辑
      }

      const start = page * size;
      const end = start + size;
      const content = filteredData.slice(start, end);

      return {
        success: true,
        t: {
          content,
          totalElements: filteredData.length,
          totalPages: Math.ceil(filteredData.length / size),
          size: size,
          number: page,
          first: page === 0,
          last: end >= filteredData.length
        }
      };
    }
  },
  // 删除单条记录
  {
    url: "/sft/emerresour/fp/del/:id",
    method: "get",
    response: () => {
      return {
        success: true,
        message: "删除成功！"
      };
    }
  },
  // 批量删除
  {
    url: "/sft/emerresour/fp/delAll",
    method: "get",
    response: () => {
      return {
        success: true,
        message: "删除成功！"
      };
    }
  },
  // 导出接口
  {
    url: "/sft/emerresour/fp/export",
    method: "get",
    response: () => {
      return {
        success: true,
        message: "导出成功"
      };
    }
  }
]);
