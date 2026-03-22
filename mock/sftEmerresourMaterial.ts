import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/emerresour/material/list",
    method: "get",
    response: ({ query }) => {
      const page = parseInt(query.page as string) || 1;
      const size = parseInt(query.size as string) || 10;
      const field = (query.field as string) || "";
      const deptId = (query.deptId as string) || "";

      const mockData = [
        {
          id: 8005,
          cj: "研发中心",
          gd: "质检中心",
          field: "手提式二氧化碳灭火器",
          type: "二氧化碳灭火器",
          field1: "MT/7型",
          field2: "2",
          field3: "中化楼一楼大厅东侧",
          sysUser: "赵永超",
          field4: 1773642452983,
          cycle: "每半月",
          next: "2026-4-01 - 2026-4-04",
          field6: "徐州淮海消防器材有限公司",
          addUser: "陈威",
          addUserId: 152,
          addDate: 1774138743375,
          remarks: ""
        },
        {
          id: 8004,
          cj: "聚氯乙烯车间",
          gd: "合成工段",
          field: "应急冲淋洗眼器",
          type: "应急冲淋洗眼器",
          field1: "淋洗式",
          field2: "1",
          field3: "转化B1中东",
          sysUser: "高磊",
          field4: 1773642452983,
          cycle: "每周",
          next: "2026-03-16 - 2026-03-26",
          field6: "济南海安安环设备有限公司",
          addUser: "李波(合成)",
          addUserId: 6240,
          addDate: 1771896986958,
          remarks: "",
          scaleX: "0.4630",
          scaleY: "0.5667"
        },
        {
          id: 8003,
          cj: "聚氯乙烯车间",
          gd: "合成工段",
          field: "应急冲淋洗眼器",
          type: "应急冲淋洗眼器",
          field1: "淋洗式",
          field2: "1",
          field3: "转化B1东",
          sysUser: "高磊",
          field4: 1773642473742,
          cycle: "每周",
          next: "2026-03-16 - 2026-03-26",
          field6: "济南海安安环设备有限公司",
          addUser: "李波(合成)",
          addUserId: 6240,
          addDate: 1771896886737,
          remarks: "",
          scaleX: "0.4852",
          scaleY: "0.5648"
        },
        {
          id: 8002,
          cj: "聚氯乙烯车间",
          gd: "合成工段",
          field: "应急洗眼器",
          type: "应急冲淋洗眼器",
          field1: "淋洗式",
          field2: "1",
          field3: "精馏厂房北侧",
          sysUser: "刘建（合成）",
          field4: 1773627623352,
          cycle: "每周",
          next: "2026-03-16 - 2026-03-26",
          field6: "济南海安安环设备有限公司",
          addUser: "李波(合成)",
          addUserId: 6240,
          addDate: 1771896749942,
          remarks: "",
          scaleX: "0.5167",
          scaleY: "0.6407"
        },
        {
          id: 8001,
          cj: "热电车间",
          gd: "汽机工段",
          field: "手提式灭火器",
          type: "干粉灭火器",
          field1: "8kg",
          field2: "2",
          field3: "循环泵房内北侧",
          sysUser: "代可新",
          field4: 1773705628474,
          cycle: "每半月",
          next: "2026-4-01 - 2026-4-04",
          field6: "山东龙城消防科技股份有限公司",
          addUser: "彭敬宽",
          addUserId: 1463,
          addDate: 1767001652310,
          remarks: "",
          scaleX: "0.7667",
          scaleY: "0.6111"
        },
        {
          id: 8000,
          cj: "热电车间",
          gd: "汽机工段",
          field: "手提式灭火器",
          type: "干粉灭火器",
          field1: "8kg",
          field2: "2",
          field3: "循环水泵房内南侧",
          sysUser: "代可新",
          field4: 1773705611474,
          cycle: "每半月",
          next: "2026-4-01 - 2026-4-04",
          field6: "山东龙城消防科技股份有限公司",
          addUser: "彭敬宽",
          addUserId: 1463,
          addDate: 1767001577113,
          remarks: "",
          scaleX: "0.7389",
          scaleY: "0.6019"
        },
        {
          id: 7999,
          cj: "泰安分公司",
          gd: "制盐工段",
          field: "医疗药箱",
          type: "医疗药箱",
          field1: "多功能",
          field2: "2",
          field3: "制盐工段办公室",
          sysUser: "严凯",
          field4: 1772510263607,
          cycle: "每月",
          next: "2026-4-01 - 2026-4-04",
          field6: "/",
          addUser: "范正松",
          addUserId: 1805,
          addDate: 1765177083452,
          remarks: "",
          scaleX: "",
          scaleY: ""
        },
        {
          id: 7998,
          cj: "泰安分公司",
          gd: "锅炉工段（泰安）",
          field: "医疗药箱",
          type: "医疗药箱",
          field1: "多功能",
          field2: "2",
          field3: "锅炉工段办公室",
          sysUser: "孙振",
          field4: 1772341712478,
          cycle: "每月",
          next: "2026-4-01 - 2026-4-04",
          field6: "/",
          addUser: "范正松",
          addUserId: 1805,
          addDate: 1765177034807,
          remarks: "",
          scaleX: "",
          scaleY: ""
        },
        {
          id: 7997,
          cj: "泰安分公司",
          gd: "电仪维工段",
          field: "医疗药箱",
          type: "医疗药箱",
          field1: "多功能",
          field2: "1",
          field3: "电仪工段办公室",
          sysUser: "张波",
          field4: 1772415667443,
          cycle: "每月",
          next: "2026-4-01 - 2026-4-04",
          field6: "/",
          addUser: "范正松",
          addUserId: 1805,
          addDate: 1765176998776,
          remarks: "",
          scaleX: "",
          scaleY: ""
        },
        {
          id: 7996,
          cj: "泰安分公司",
          gd: "公用工程工段（泰安）",
          field: "医疗药箱",
          type: "医疗药箱",
          field1: "多功能",
          field2: "1",
          field3: "公用工程办公室",
          sysUser: "冉德伟",
          field4: 1772408460065,
          cycle: "每月",
          next: "2026-4-01 - 2026-4-04",
          field6: "/",
          addUser: "范正松",
          addUserId: 1805,
          addDate: 1766385345419,
          remarks: "",
          scaleX: "",
          scaleY: ""
        },
        {
          id: 7995,
          cj: "氯碱车间",
          gd: "电解工段",
          field: "正压式空气呼吸器",
          type: "呼吸器",
          field1: "RHFKF-1型",
          field2: "4",
          field3: "电解厂房北侧",
          sysUser: "周明",
          field4: 0,
          cycle: "每月",
          next: "2026-4-01 - 2026-4-05",
          field6: "上海代尔安全装备有限公司",
          addUser: "王强",
          addUserId: 1520,
          addDate: 1766385345419,
          remarks: "",
          scaleX: "",
          scaleY: ""
        },
        {
          id: 7994,
          cj: "氯碱车间",
          gd: "氯化工段",
          field: "应急照明灯",
          type: "照明设备",
          field1: "LED双头",
          field2: "6",
          field3: "氯气压缩厂房",
          sysUser: "李华",
          field4: 1772708460065,
          cycle: "每周",
          next: "2026-03-20 - 2026-03-27",
          field6: "中山市照明电器厂",
          addUser: "赵军",
          addUserId: 1880,
          addDate: 1765405345419,
          remarks: "",
          scaleX: "",
          scaleY: ""
        }
      ];

      let filteredData = mockData;

      if (field) {
        filteredData = filteredData.filter(
          item => item.field.includes(field) || item.type.includes(field)
        );
      }

      if (deptId && deptId !== "-1") {
        filteredData = filteredData.filter(item => item.cj === deptId);
      }

      const start = (page - 1) * size;
      const end = start + size;
      const paginatedData = filteredData.slice(start, end);

      return {
        success: true,
        t: {
          content: paginatedData,
          totalElements: filteredData.length,
          totalPages: Math.ceil(filteredData.length / size),
          size: size,
          number: page - 1,
          first: page === 1,
          last: end >= filteredData.length,
          empty: false
        }
      };
    }
  }
]);
