import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 模拟数据
const mockData = [
  {
    id: 1,
    name: "1#反应釜巡检点",
    field: "SB001",
    inspectionSite: { id: 1, name: "1#反应釜巡检点" },
    sysDept: { id: 1, name: "聚合车间" },
    dept: "10,20",
    field1: "P-101",
    field2: "反应釜",
    field3: "A001",
    field4: "1000L",
    field5: "某某化工设备厂",
    field6: 1,
    field7: "A区-01",
    field8: 1693291308971,
    field9: "ZC001",
    field10: "正常运行",
    field11: "张三",
    field12: "定期维护",
    addDate: 1693291308971,
    addUser: { id: 2, ushow: "admin" }
  },
  {
    id: 2,
    name: "2#反应釜巡检点",
    field: "SB002",
    inspectionSite: { id: 2, name: "2#反应釜巡检点" },
    sysDept: { id: 1, name: "聚合车间" },
    dept: "10",
    field1: "P-102",
    field2: "反应釜",
    field3: "A002",
    field4: "1000L",
    field5: "某某化工设备厂",
    field6: 1,
    field7: "A区-02",
    field8: 1693291308971,
    field9: "ZC002",
    field10: "正常运行",
    field11: "张三",
    field12: "定期维护",
    addDate: 1693291308971,
    addUser: { id: 2, ushow: "admin" }
  },
  {
    id: 3,
    name: "离心泵巡检点",
    field: "SB003",
    inspectionSite: { id: 3, name: "离心泵巡检点" },
    sysDept: { id: 2, name: "制冷车间" },
    dept: "30",
    field1: "P-201",
    field2: "离心泵",
    field3: "B001",
    field4: "50KW",
    field5: "某某泵业有限公司",
    field6: 2,
    field7: "B区-01",
    field8: 1693377708971,
    field9: "ZC003",
    field10: "正常运行",
    field11: "李四",
    field12: "",
    addDate: 1693377708971,
    addUser: { id: 2, ushow: "admin" }
  },
  {
    id: 4,
    name: "储罐区巡检点",
    field: "SB004",
    inspectionSite: { id: 4, name: "储罐区巡检点" },
    sysDept: { id: 3, name: "仓储车间" },
    dept: "40,50",
    field1: "T-301",
    field2: "储罐",
    field3: "C001",
    field4: "500m³",
    field5: "某某容器制造厂",
    field6: 4,
    field7: "C区-01",
    field8: 1693464108971,
    field9: "ZC004",
    field10: "正常运行",
    field11: "王五",
    field12: "注意保温",
    addDate: 1693464108971,
    addUser: { id: 2, ushow: "admin" }
  },
  {
    id: 5,
    name: "换热器巡检点",
    field: "SB005",
    inspectionSite: { id: 5, name: "换热器巡检点" },
    sysDept: { id: 1, name: "聚合车间" },
    dept: "10",
    field1: "E-101",
    field2: "换热器",
    field3: "A003",
    field4: "200m²",
    field5: "某某换热设备厂",
    field6: 1,
    field7: "A区-03",
    field8: 1693550508971,
    field9: "ZC005",
    field10: "维修中",
    field11: "赵六",
    field12: "计划3天后恢复",
    addDate: 1693550508971,
    addUser: { id: 2, ushow: "admin" }
  },
  {
    id: 6,
    name: "压缩机巡检点",
    field: "SB006",
    inspectionSite: { id: 6, name: "压缩机巡检点" },
    sysDept: { id: 2, name: "制冷车间" },
    dept: "30",
    field1: "C-201",
    field2: "压缩机",
    field3: "B002",
    field4: "100KW",
    field5: "某某压缩机有限公司",
    field6: 1,
    field7: "B区-02",
    field8: 1693636908971,
    field9: "ZC006",
    field10: "正常运行",
    field11: "孙七",
    field12: "",
    addDate: 1693636908971,
    addUser: { id: 2, ushow: "admin" }
  },
  {
    id: 7,
    name: "管道阀门巡检点",
    field: "SB007",
    inspectionSite: { id: 7, name: "管道阀门巡检点" },
    sysDept: { id: 4, name: "公用工程车间" },
    dept: "60",
    field1: "V-401",
    field2: "闸阀",
    field3: "D001",
    field4: "DN100",
    field5: "某某阀门厂",
    field6: 10,
    field7: "D区-01",
    field8: 1693723308971,
    field9: "ZC007",
    field10: "正常运行",
    field11: "周八",
    field12: "定期润滑",
    addDate: 1693723308971,
    addUser: { id: 2, ushow: "admin" }
  },
  {
    id: 8,
    name: "配电柜巡检点",
    field: "SB008",
    inspectionSite: { id: 8, name: "配电柜巡检点" },
    sysDept: { id: 5, name: "电气车间" },
    dept: "70",
    field1: "M-501",
    field2: "配电柜",
    field3: "E001",
    field4: "800A",
    field5: "某某电气设备厂",
    field6: 2,
    field7: "E区-01",
    field8: 1693809708971,
    field9: "ZC008",
    field10: "正常运行",
    field11: "吴九",
    field12: "注意防潮",
    addDate: 1693809708971,
    addUser: { id: 2, ushow: "admin" }
  },
  {
    id: 9,
    name: "输送泵巡检点",
    field: "SB009",
    inspectionSite: { id: 9, name: "输送泵巡检点" },
    sysDept: { id: 3, name: "仓储车间" },
    dept: "40",
    field1: "P-302",
    field2: "输送泵",
    field3: "C002",
    field4: "15KW",
    field5: "某某泵业有限公司",
    field6: 3,
    field7: "C区-02",
    field8: 1693896108971,
    field9: "ZC009",
    field10: "正常运行",
    field11: "郑十",
    field12: "",
    addDate: 1693896108971,
    addUser: { id: 2, ushow: "admin" }
  },
  {
    id: 10,
    name: "蒸馏塔巡检点",
    field: "SB010",
    inspectionSite: { id: 10, name: "蒸馏塔巡检点" },
    sysDept: { id: 1, name: "聚合车间" },
    dept: "10,20",
    field1: "T-102",
    field2: "蒸馏塔",
    field3: "A004",
    field4: "15米",
    field5: "某某化工设备厂",
    field6: 1,
    field7: "A区-04",
    field8: 1693982508971,
    field9: "ZC010",
    field10: "正常运行",
    field11: "陈十一",
    field12: "定期检查",
    addDate: 1693982508971,
    addUser: { id: 2, ushow: "admin" }
  },
  {
    id: 11,
    name: "冷凝器巡检点",
    field: "SB011",
    inspectionSite: { id: 11, name: "冷凝器巡检点" },
    sysDept: { id: 2, name: "制冷车间" },
    dept: "30",
    field1: "E-202",
    field2: "冷凝器",
    field3: "B003",
    field4: "150m²",
    field5: "某某换热设备厂",
    field6: 2,
    field7: "B区-03",
    field8: 1694068908971,
    field9: "ZC011",
    field10: "正常运行",
    field11: "褚十二",
    field12: "",
    addDate: 1694068908971,
    addUser: { id: 2, ushow: "admin" }
  },
  {
    id: 12,
    name: "安全阀巡检点",
    field: "SB012",
    inspectionSite: { id: 12, name: "安全阀巡检点" },
    sysDept: { id: 6, name: "安全环保部" },
    dept: "80",
    field1: "SV-601",
    field2: "安全阀",
    field3: "S001",
    field4: "DN50",
    field5: "某某安全阀厂",
    field6: 5,
    field7: "S区-01",
    field8: 1694155308971,
    field9: "ZC012",
    field10: "正常运行",
    field11: "卫十三",
    field12: "每年校验",
    addDate: 1694155308971,
    addUser: { id: 2, ushow: "admin" }
  }
];

export default defineFakeRoute([
  {
    url: "/sft/insp/device/list.json",
    method: "get",
    response: ({ query }) => {
      const page = Number(query.page) || 1;
      const size = Number(query.size) || 10;
      const name = query.name || "";
      const deptName = query.deptName || "";
      const field3 = query.field3 || "";

      // 过滤数据
      let filteredData = mockData;
      if (name) {
        filteredData = filteredData.filter(
          item =>
            item.inspectionSite?.name?.includes(name) ||
            item.field?.includes(name)
        );
      }
      if (deptName) {
        filteredData = filteredData.filter(item =>
          item.sysDept?.name?.includes(deptName)
        );
      }
      if (field3) {
        filteredData = filteredData.filter(item =>
          item.field3?.includes(field3)
        );
      }

      // 分页
      const totalElements = filteredData.length;
      const start = (page - 1) * size;
      const end = start + size;
      const content = filteredData.slice(start, end);

      return {
        success: true,
        t: {
          content,
          totalElements,
          totalPages: Math.ceil(totalElements / size),
          number: page - 1,
          size,
          first: page === 1,
          last: end >= totalElements,
          empty: content.length === 0
        }
      };
    }
  }
]);
