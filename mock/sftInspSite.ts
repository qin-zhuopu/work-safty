import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 模拟工段数据
const workDepts = [
  { id: 47, name: "合成工段" },
  { id: 52, name: "聚合工段" },
  { id: 62, name: "聚氯乙烯维修工段" },
  { id: 63, name: "压滤工段" },
  { id: 64, name: "乙炔工段" },
  { id: 75, name: "离子膜工段" },
  { id: 76, name: "氯氢处理及氯化氢工段" },
  { id: 77, name: "氯氢处理工段" },
  { id: 78, name: "浓固碱工段" },
  { id: 79, name: "电解维修工段" },
  { id: 80, name: "盐水工段" },
  { id: 81, name: "液氯工段" },
  { id: 83, name: "仪表工段" },
  { id: 84, name: "电气工段" },
  { id: 85, name: "供热工段" },
  { id: 86, name: "供水工段" },
  { id: 87, name: "热电车间管理组" },
  { id: 88, name: "锅炉工段" },
  { id: 89, name: "环保工段" },
  { id: 90, name: "汽机工段" },
  { id: 91, name: "热电车间维修工段" },
  { id: 92, name: "整流工段" },
  { id: 94, name: "双氧水装置工段" }
];

// 模拟巡检点数据
const mockSites = [
  {
    id: 1,
    name: "液氯贮槽区巡检点",
    code: "SYS-GYGC-001",
    dept: { id: 22, name: "热电车间" },
    work: { id: 88, name: "锅炉工段" },
    sysUser: { ushow: "张三" },
    remarks: "液氯贮槽区重点巡检点"
  },
  {
    id: 2,
    name: "聚合工段巡检点A",
    code: "SYS-JHGD-002",
    dept: { id: 19, name: "聚氯乙烯车间" },
    work: { id: 52, name: "聚合工段" },
    sysUser: { ushow: "李四" },
    remarks: "聚合工段关键设备巡检"
  },
  {
    id: 3,
    name: "离子膜工段巡检点",
    code: "SYS-LMJ-003",
    dept: { id: 20, name: "电解车间" },
    work: { id: 75, name: "离子膜工段" },
    sysUser: { ushow: "王五" },
    remarks: "离子膜电解槽巡检点"
  },
  {
    id: 4,
    name: "双氧水装置巡检点",
    code: "SYS-SYS-004",
    dept: { id: 23, name: "双氧水车间" },
    work: { id: 94, name: "双氧水装置工段" },
    sysUser: { ushow: "赵六" },
    remarks: "双氧水装置重点区域"
  },
  {
    id: 5,
    name: "乙炔工段巡检点B",
    code: "SYS-YQ-005",
    dept: { id: 19, name: "聚氯乙烯车间" },
    work: { id: 64, name: "乙炔工段" },
    sysUser: { ushow: "孙七" },
    remarks: "乙炔发生器区域"
  },
  {
    id: 6,
    name: "液氯工段巡检点",
    code: "SYS-LYG-006",
    dept: { id: 20, name: "电解车间" },
    work: { id: 81, name: "液氯工段" },
    sysUser: { ushow: "周八" },
    remarks: "液氯包装及储存区"
  },
  {
    id: 7,
    name: "汽机工段巡检点",
    code: "SYS-QJ-007",
    dept: { id: 22, name: "热电车间" },
    work: { id: 90, name: "汽机工段" },
    sysUser: { ushow: "吴九" },
    remarks: "汽轮发电机组巡检"
  },
  {
    id: 8,
    name: "仪表工段巡检点",
    code: "SYS-YB-008",
    dept: { id: 21, name: "机电仪车间" },
    work: { id: 83, name: "仪表工段" },
    sysUser: { ushow: "郑十" },
    remarks: "DCS控制系统巡检"
  },
  {
    id: 9,
    name: "电气工段巡检点",
    code: "SYS-DQ-009",
    dept: { id: 21, name: "机电仪车间" },
    work: { id: 84, name: "电气工段" },
    sysUser: { ushow: "刘十一" },
    remarks: "变配电系统巡检"
  },
  {
    id: 10,
    name: "盐水工段巡检点",
    code: "SYS-LS-010",
    dept: { id: 20, name: "电解车间" },
    work: { id: 80, name: "盐水工段" },
    sysUser: { ushow: "陈十二" },
    remarks: "盐水精制系统"
  },
  {
    id: 11,
    name: "压滤工段巡检点",
    code: "SYS-YL-011",
    dept: { id: 19, name: "聚氯乙烯车间" },
    work: { id: 63, name: "压滤工段" },
    sysUser: { ushow: "杨十三" },
    remarks: "压滤机区域巡检"
  },
  {
    id: 12,
    name: "浓固碱工段巡检点",
    code: "SYS-NGZ-012",
    dept: { id: 20, name: "电解车间" },
    work: { id: 78, name: "浓固碱工段" },
    sysUser: { ushow: "朱十四" },
    remarks: "固碱装置巡检点"
  }
];

export default defineFakeRoute([
  {
    url: "/sft/insp/site/list.json",
    method: "get",
    response: ({ query }) => {
      const page = Number(query.page || 0);
      const size = Number(query.size || 10);
      const name = query.name || "";
      const workId = query.workId ? Number(query.workId) : null;
      const sysUserName = query.sysUserName || "";

      let filteredData = [...mockSites];

      // 按巡检点名称筛选
      if (name) {
        filteredData = filteredData.filter(item => item.name.includes(name));
      }

      // 按工段筛选
      if (workId && workId !== -1) {
        filteredData = filteredData.filter(item => item.work?.id === workId);
      }

      // 按工段管理人员筛选
      if (sysUserName) {
        filteredData = filteredData.filter(item =>
          item.sysUser?.ushow?.includes(sysUserName)
        );
      }

      const total = filteredData.length;
      const start = page * size;
      const end = start + size;
      const content = filteredData.slice(start, end);

      return {
        success: true,
        t: {
          content,
          totalElements: total,
          totalPages: Math.ceil(total / size),
          number: page,
          size
        }
      };
    }
  },
  {
    url: "/sft/sys/dept/all.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: workDepts
      };
    }
  }
]);
