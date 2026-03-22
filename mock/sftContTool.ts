import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/cont/tool/list.json",
    method: "get",
    response: ({ query }) => {
      const page = parseInt(query.page as string) || 0;
      const size = parseInt(query.size as string) || 10;

      const mockData = [
        {
          id: "1",
          field: "DZJD-20260321-08-001",
          field1: "汽油发电机1",
          field2: "01",
          field3: "T-2000",
          field4: "张三",
          field5: "李四",
          field6: "备用设备",
          field7: "合格",
          field8: "2026-03-15",
          field9: { name: "生产车间" },
          field10: { ushow: "张三" },
          field11: "2026-03-10",
          field12: { ushow: "管理员" },
          pics: []
        },
        {
          id: "2",
          field: "DZJD-20260321-08-002",
          field1: "汽油发电机3",
          field2: "01",
          field3: "T-3000",
          field4: "王五",
          field5: "赵六",
          field6: "",
          field7: "合格",
          field8: "2026-03-15",
          field9: { name: "维修车间" },
          field10: { ushow: "王五" },
          field11: "2026-03-11",
          field12: { ushow: "管理员" },
          pics: []
        },
        {
          id: "3",
          field: "DZJD-20260321-08-003",
          field1: "电钻",
          field2: "02",
          field3: "Z-100",
          field4: "孙七",
          field5: "周八",
          field6: "新购",
          field7: "未审批",
          field9: { name: "生产车间" },
          field10: { ushow: "孙七" },
          field11: "2026-03-12",
          pics: []
        },
        {
          id: "4",
          field: "DZJD-20260321-08-004",
          field1: "配电箱A",
          field2: "03",
          field3: "PDX-01",
          field4: "吴九",
          field5: "郑十",
          field6: "",
          field7: "不合格",
          field8: "2026-03-14",
          field9: { name: "动力车间" },
          field10: { ushow: "吴九" },
          field11: "2026-03-13",
          field12: { ushow: "管理员" },
          pics: []
        },
        {
          id: "5",
          field: "DZJD-20260321-08-005",
          field1: "电焊机1号",
          field2: "04",
          field3: "DHJ-200",
          field4: "钱一",
          field5: "刘二",
          field6: "定期检查",
          field7: "合格",
          field8: "2026-03-16",
          field9: { name: "焊接车间" },
          field10: { ushow: "钱一" },
          field11: "2026-03-14",
          field12: { ushow: "管理员" },
          pics: []
        },
        {
          id: "6",
          field: "DZJD-20260321-08-006",
          field1: "切割机A",
          field2: "05",
          field3: "CJ-500",
          field4: "陈三",
          field5: "杨四",
          field6: "备用",
          field7: "过期",
          field9: { name: "加工车间" },
          field10: { ushow: "陈三" },
          field11: "2026-02-20",
          pics: []
        },
        {
          id: "7",
          field: "DZJD-20260321-08-007",
          field1: "手拉葫芦1T",
          field2: "06",
          field3: "HL-1T",
          field4: "黄五",
          field5: "朱六",
          field6: "检测合格",
          field7: "合格",
          field8: "2026-03-15",
          field9: { name: "仓储部" },
          field10: { ushow: "黄五" },
          field11: "2026-03-15",
          field12: { ushow: "管理员" },
          pics: []
        },
        {
          id: "8",
          field: "DZJD-20260321-08-008",
          field1: "角磨机",
          field2: "07",
          field3: "JM-150",
          field4: "秦七",
          field5: "许八",
          field6: "",
          field7: "未审批",
          field9: { name: "维修车间" },
          field10: { ushow: "秦七" },
          field11: "2026-03-16",
          pics: []
        },
        {
          id: "9",
          field: "DZJD-20260321-08-009",
          field1: "测距仪",
          field2: "08",
          field3: "CJY-01",
          field4: "何九",
          field5: "吕十",
          field6: "精密仪器",
          field7: "合格",
          field8: "2026-03-17",
          field9: { name: "质检部" },
          field10: { ushow: "何九" },
          field11: "2026-03-16",
          field12: { ushow: "管理员" },
          pics: []
        },
        {
          id: "10",
          field: "DZJD-20260321-08-010",
          field1: "铝合金梯子",
          field2: "01",
          field3: "LH-3M",
          field4: "施一",
          field5: "张二",
          field6: "绝缘检测",
          field7: "合格",
          field8: "2026-03-17",
          field9: { name: "生产车间" },
          field10: { ushow: "施一" },
          field11: "2026-03-17",
          field12: { ushow: "管理员" },
          pics: []
        },
        {
          id: "11",
          field: "DZJD-20260321-08-011",
          field1: "冲击扳手",
          field2: "02",
          field3: "CB-18V",
          field4: "孔三",
          field5: "曹四",
          field6: "电池充电中",
          field7: "未审批",
          field9: { name: "装配车间" },
          field10: { ushow: "孔三" },
          field11: "2026-03-17",
          pics: []
        },
        {
          id: "12",
          field: "DZJD-20260321-08-012",
          field1: "临时配电箱",
          field2: "03",
          field3: "PDX-02",
          field4: "严五",
          field5: "华六",
          field6: "移动设备",
          field7: "合格",
          field8: "2026-03-18",
          field9: { name: "施工队" },
          field10: { ushow: "严五" },
          field11: "2026-03-18",
          field12: { ushow: "管理员" },
          pics: []
        }
      ];

      // 过滤
      let filteredData = mockData;
      if (query.field1) {
        filteredData = filteredData.filter(item =>
          item.field1.includes(query.field1 as string)
        );
      }
      if (query.field2) {
        filteredData = filteredData.filter(
          item => item.field2 === query.field2
        );
      }
      if (query.field3) {
        filteredData = filteredData.filter(
          item =>
            item.field3?.includes(query.field3 as string) ||
            item.field9?.name?.includes(query.field3 as string)
        );
      }
      if (query.field7) {
        filteredData = filteredData.filter(
          item => item.field7 === query.field7
        );
      }

      const total = filteredData.length;
      const start = page * size;
      const content = filteredData.slice(start, start + size);

      return {
        success: true,
        t: {
          content,
          totalElements: total
        }
      };
    }
  }
]);
