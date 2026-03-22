import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/emerresour/fp/list",
    method: "get",
    response: ({ query }) => {
      const page = parseInt(query.page as string) || 1;
      const size = parseInt(query.size as string) || 10;
      const field = (query.field as string) || "";
      const deptId = (query.deptId as string) || "";
      // const startTime = query.startTime as string || "";
      // const endTime = query.endTime as string || "";

      const mockData = [
        {
          id: "1",
          field: "沙袋",
          field1: "70cm",
          field2: "1000",
          field3: "应急物资仓库1号库",
          field4: 1772598853506,
          next: "2026-04-01 - 2026-04-04",
          remarks: "防汛专用沙袋",
          scaleX: "",
          scaleY: "",
          sysDeptName: "安全管理部",
          sysDeptId: "1",
          sysUserName: "张三",
          addDate: 1770272781594
        },
        {
          id: "2",
          field: "抽水泵",
          field1: "Q=50m³/h",
          field2: "5",
          field3: "设备房A区",
          field4: 1772502453506,
          next: "2026-04-05 - 2026-04-08",
          remarks: "柴油驱动抽水泵",
          scaleX: "",
          scaleY: "",
          sysDeptName: "设备管理部",
          sysDeptId: "2",
          sysUserName: "李四",
          addDate: 1770186381594
        },
        {
          id: "3",
          field: "救生衣",
          field1: "XL",
          field2: "50",
          field3: "应急物资仓库2号库",
          field4: 1772416053506,
          next: "2026-03-25 - 2026-03-28",
          remarks: "成人救生衣",
          scaleX: "",
          scaleY: "",
          sysDeptName: "安全管理部",
          sysDeptId: "1",
          sysUserName: "王五",
          addDate: 1770100000000
        },
        {
          id: "4",
          field: "雨衣",
          field1: "L",
          field2: "100",
          field3: "应急物资仓库1号库",
          field4: 1772329653506,
          next: "2026-04-10 - 2026-04-13",
          remarks: "防水雨衣",
          scaleX: "",
          scaleY: "",
          sysDeptName: "后勤保障部",
          sysDeptId: "3",
          sysUserName: "赵六",
          addDate: 1770013600000
        },
        {
          id: "5",
          field: "应急照明灯",
          field1: "LED",
          field2: "30",
          field3: "设备房B区",
          field4: 1772243253506,
          next: "2026-03-20 - 2026-03-23",
          remarks: "手持式应急照明",
          scaleX: "",
          scaleY: "",
          sysDeptName: "设备管理部",
          sysDeptId: "2",
          sysUserName: "孙七",
          addDate: 1769927200000
        },
        {
          id: "6",
          field: "防汛铁锹",
          field1: "标准型",
          field2: "200",
          field3: "应急物资仓库3号库",
          field4: 1772156853506,
          next: "2026-04-15 - 2026-04-18",
          remarks: "加固防汛铁锹",
          scaleX: "",
          scaleY: "",
          sysDeptName: "安全管理部",
          sysDeptId: "1",
          sysUserName: "周八",
          addDate: 1769840800000
        },
        {
          id: "7",
          field: "防水布",
          field1: "5m×10m",
          field2: "50",
          field3: "应急物资仓库2号库",
          field4: 1772070453506,
          next: "2026-03-30 - 2026-04-02",
          remarks: "加厚防水布",
          scaleX: "",
          scaleY: "",
          sysDeptName: "后勤保障部",
          sysDeptId: "3",
          sysUserName: "吴九",
          addDate: 1769754400000
        },
        {
          id: "8",
          field: "橡胶手套",
          field1: "大号",
          field2: "300",
          field3: "应急物资仓库1号库",
          field4: 1771984053506,
          next: "2026-04-20 - 2026-04-23",
          remarks: "防水橡胶手套",
          scaleX: "",
          scaleY: "",
          sysDeptName: "后勤保障部",
          sysDeptId: "3",
          sysUserName: "郑十",
          addDate: 1769668000000
        },
        {
          id: "9",
          field: "急救包",
          field1: "标准型",
          field2: "20",
          field3: "医务室",
          field4: 1771897653506,
          next: "2026-03-28 - 2026-03-31",
          remarks: "基础医疗急救包",
          scaleX: "",
          scaleY: "",
          sysDeptName: "后勤保障部",
          sysDeptId: "3",
          sysUserName: "冯十一",
          addDate: 1769581600000
        },
        {
          id: "10",
          field: "防汛沙袋",
          field1: "60cm×40cm",
          field2: "500",
          field3: "应急物资仓库4号库",
          field4: 1771811253506,
          next: "2026-04-25 - 2026-04-28",
          remarks: "空沙袋，需现场装填",
          scaleX: "",
          scaleY: "",
          sysDeptName: "安全管理部",
          sysDeptId: "1",
          sysUserName: "陈十二",
          addDate: 1769495200000
        },
        {
          id: "11",
          field: "对讲机",
          field1: "5km",
          field2: "15",
          field3: "通讯室",
          field4: 1771724853506,
          next: "2026-04-12 - 2026-04-15",
          remarks: "防水对讲机",
          scaleX: "",
          scaleY: "",
          sysDeptName: "信息技术部",
          sysDeptId: "4",
          sysUserName: "褚十三",
          addDate: 1769408800000
        },
        {
          id: "12",
          field: "冲锋舟",
          field1: "6人座",
          field2: "3",
          field3: "码头仓库",
          field4: 1771638453506,
          next: "2026-03-22 - 2026-03-25",
          remarks: "玻璃钢冲锋舟",
          scaleX: "",
          scaleY: "",
          sysDeptName: "安全管理部",
          sysDeptId: "1",
          sysUserName: "卫十四",
          addDate: 1769322400000
        }
      ];

      let filteredData = mockData;
      if (field) {
        filteredData = filteredData.filter(item => item.field.includes(field));
      }
      if (deptId && deptId !== "-1") {
        filteredData = filteredData.filter(item => item.sysDeptId === deptId);
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
          number: page,
          first: page === 1,
          last: end >= filteredData.length
        }
      };
    }
  }
]);
