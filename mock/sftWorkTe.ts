import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 模拟数据 - 检测设备台账
const mockData: {
  id: string;
  field: string;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string;
  field7: number;
  field8: number;
  field9: string;
  field10: string;
  field11: string;
}[] = [
  {
    id: "1",
    field: "TE-001",
    field1: "气体检测仪",
    field2: "GT-2000",
    field3: "YQ2023001",
    field4: "可燃气体",
    field5: "某某仪器仪表有限公司",
    field6: "12",
    field7: 1672531200000,
    field8: 1704067200000,
    field9: "1.0级",
    field10: "安全部",
    field11: "德州实华化工有限公司"
  },
  {
    id: "2",
    field: "TE-002",
    field1: "压力表",
    field2: "Y-100",
    field3: "YL2023002",
    field4: "压力",
    field5: "某某仪表厂",
    field6: "6",
    field7: 1680307200000,
    field8: 1711843200000,
    field9: "1.6级",
    field10: "生产部",
    field11: "德州实华化工有限公司"
  },
  {
    id: "3",
    field: "TE-003",
    field1: "温度计",
    field2: "WSS-411",
    field3: "WD2023003",
    field4: "温度",
    field5: "某某自动化仪表厂",
    field6: "12",
    field7: 1690848000000,
    field9: "1.0级",
    field10: "质检部",
    field11: "德州实华化工有限公司"
  },
  {
    id: "4",
    field: "TE-004",
    field1: "流量计",
    field2: "LWGY-15",
    field3: "LL2023004",
    field4: "液体流量",
    field5: "某某流量仪表有限公司",
    field6: "24",
    field7: 1693526400000,
    field8: 1764556800000,
    field9: "0.5级",
    field10: "生产部",
    field11: "德州实华化工有限公司"
  },
  {
    id: "5",
    field: "TE-005",
    field1: "液位计",
    field2: "UHZ-517",
    field3: "YW2023005",
    field4: "液位",
    field5: "某某物位仪表厂",
    field6: "12",
    field7: 1701388800000,
    field8: 1732924800000,
    field9: "1.0级",
    field10: "储运部",
    field11: "德州实华化工有限公司"
  },
  {
    id: "6",
    field: "TE-006",
    field1: "PH计",
    field2: "PH-818",
    field3: "PH2023006",
    field4: "PH值",
    field5: "某某分析仪器厂",
    field6: "6",
    field7: 1704067200000,
    field8: 1711929600000,
    field9: "0.1级",
    field10: "质检部",
    field11: "德州实华化工有限公司"
  },
  {
    id: "7",
    field: "TE-007",
    field1: "电导率仪",
    field2: "DDS-307",
    field3: "DD2023007",
    field4: "电导率",
    field5: "某某分析仪器有限公司",
    field6: "12",
    field7: 1696118400000,
    field8: 1727654400000,
    field9: "1.0级",
    field10: "质检部",
    field11: "德州实华化工有限公司"
  },
  {
    id: "8",
    field: "TE-008",
    field1: "浊度仪",
    field2: "WGZ-200",
    field3: "ZD2023008",
    field4: "浊度",
    field5: "某某光学仪器厂",
    field6: "12",
    field7: 1706745600000,
    field8: 1738281600000,
    field9: "2.0级",
    field10: "环保部",
    field11: "德州实华化工有限公司"
  },
  {
    id: "9",
    field: "TE-009",
    field1: "溶氧仪",
    field2: "DO-500",
    field3: "RY2023009",
    field4: "溶解氧",
    field5: "某某环境监测仪器厂",
    field6: "6",
    field7: 1711929600000,
    field8: 1722470400000,
    field9: "0.5级",
    field10: "环保部",
    field11: "德州实华化工有限公司"
  },
  {
    id: "10",
    field: "TE-010",
    field1: "声级计",
    field2: "AWA6228",
    field3: "YJ2023010",
    field4: "噪声",
    field5: "某某声学仪器厂",
    field6: "12",
    field7: 1698796800000,
    field8: 1730332800000,
    field9: "2型",
    field10: "安全部",
    field11: "德州实华化工有限公司"
  },
  {
    id: "11",
    field: "TE-011",
    field1: "照度计",
    field2: "TES-1339R",
    field3: "ZD2023011",
    field4: "照度",
    field5: "某某电子仪器厂",
    field6: "12",
    field7: 1701388800000,
    field8: 1732924800000,
    field9: "3级",
    field10: "安全部",
    field11: "德州实华化工有限公司"
  },
  {
    id: "12",
    field: "TE-012",
    field1: "辐射检测仪",
    field2: "RAM-I",
    field3: "FS2023012",
    field4: "电离辐射",
    field5: "某某核仪器厂",
    field6: "24",
    field7: 1693526400000,
    field8: 1756636800000,
    field9: "2.5级",
    field10: "安全部",
    field11: "德州实华化工有限公司"
  },
  {
    id: "13",
    field: "TE-013",
    field1: "振动测量仪",
    field2: "VM-6360",
    field3: "ZD2023013",
    field4: "振动",
    field5: "某某测控仪器厂",
    field6: "12",
    field7: 1714521600000,
    field8: 1746057600000,
    field9: "5%",
    field10: "设备部",
    field11: "德州实华化工有限公司"
  },
  {
    id: "14",
    field: "TE-014",
    field1: "转速表",
    field2: "DM6236P",
    field3: "ZS2023014",
    field4: "转速",
    field5: "某某电子工具厂",
    field6: "6",
    field7: 1706745600000,
    field8: 1717193600000,
    field9: "0.05%",
    field10: "设备部",
    field11: "德州实华化工有限公司"
  },
  {
    id: "15",
    field: "TE-015",
    field1: "测厚仪",
    field2: "TT220",
    field3: "CH2023015",
    field4: "厚度",
    field5: "某某无损检测仪器厂",
    field6: "12",
    field7: 1698796800000,
    field8: 1730332800000,
    field9: "±(1%+0.1)",
    field10: "质检部",
    field11: "德州实华化工有限公司"
  }
];

export default defineFakeRoute([
  {
    url: "/sft/work/te/list.json",
    method: "get",
    response: ({ query }) => {
      const page = parseInt(query.page as string) || 1;
      const size = parseInt(query.size as string) || 10;
      const field1 = (query.field1 as string) || "";
      const startTime = (query.startTime as string) || "";
      const endTime = (query.endTime as string) || "";
      const startTime1 = (query.startTime1 as string) || "";
      const endTime1 = (query.endTime1 as string) || "";

      // 过滤数据
      let filteredData = mockData;

      if (field1) {
        filteredData = filteredData.filter(
          item => item.field1 && item.field1.includes(field1)
        );
      }

      if (startTime) {
        const start = new Date(startTime).getTime();
        filteredData = filteredData.filter(item => item.field7 >= start);
      }

      if (endTime) {
        const end = new Date(endTime).getTime();
        filteredData = filteredData.filter(item => item.field7 <= end);
      }

      if (startTime1) {
        const start = new Date(startTime1).getTime();
        filteredData = filteredData.filter(item => item.field8 >= start);
      }

      if (endTime1) {
        const end = new Date(endTime1).getTime();
        filteredData = filteredData.filter(item => item.field8 <= end);
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
