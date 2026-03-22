import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/danger/manage/list.json",
    method: "get",
    response: ({ query }) => {
      const page = Number(query.page) || 1;
      const size = Number(query.size) || 10;
      const field = query.field || "";
      const startTime = query.startTime || "";
      const endTime = query.endTime || "";

      const mockData = [
        {
          id: 1,
          name: "DZSH-HSE-BF-022-2022德州实华化工有限公司隐患排查与治理管理办法",
          field: "德州实华化工有限公司",
          field1: "ssc-dzsh/1/3a869bb0159344f3af7b4352d1d7b307.docx",
          addDate: 1695690547048,
          remarks: ""
        },
        {
          id: 2,
          name: "DZSH-HSE-BF-023-2022德州实华化工有限公司安全生产责任制管理办法",
          field: "德州实华化工有限公司",
          field1: "ssc-dzsh/1/4b869bb0159344f3af7b4352d1d7b308.pdf",
          addDate: 1695690577692,
          remarks: ""
        },
        {
          id: 3,
          name: "DZSH-HSE-BF-024-2022德州实华化工有限公司安全培训教育制度",
          field: "德州实华化工有限公司",
          field1:
            "ssc-dzsh/1/5c869bb0159344f3af7b4352d1d7b309.docx,ssc-dzsh/1/6d869bb0159344f3af7b4352d1d7b310.pdf",
          addDate: 1695690600000,
          remarks: ""
        },
        {
          id: 4,
          name: "DZSH-HSE-BF-025-2022德州实华化工有限公司安全检查及隐患治理制度",
          field: "德州实华化工有限公司",
          field1: "ssc-dzsh/1/7e869bb0159344f3af7b4352d1d7b311.xlsx",
          addDate: 1695690630000,
          remarks: ""
        },
        {
          id: 5,
          name: "DZSH-HSE-BF-026-2022德州实华化工有限公司特种作业人员管理制度",
          field: "德州实华化工有限公司",
          field1: "",
          addDate: 1695690660000,
          remarks: ""
        },
        {
          id: 6,
          name: "DZSH-HSE-BF-027-2022德州实华化工有限公司设备设施安全管理制度",
          field: "德州实华化工有限公司",
          field1: "ssc-dzsh/1/8f869bb0159344f3af7b4352d1d7b312.pdf",
          addDate: 1695690690000,
          remarks: ""
        },
        {
          id: 7,
          name: "DZSH-HSE-BF-028-2022德州实华化工有限公司作业安全管理制度",
          field: "德州实华化工有限公司",
          field1: "ssc-dzsh/1/9g869bb0159344f3af7b4352d1d7b313.docx",
          addDate: 1695690720000,
          remarks: ""
        },
        {
          id: 8,
          name: "DZSH-HSE-BF-029-2022德州实华化工有限公司消防安全管理制度",
          field: "德州实华化工有限公司",
          field1: "ssc-dzsh/1/0h869bb0159344f3af7b4352d1d7b314.pdf",
          addDate: 1695690750000,
          remarks: ""
        },
        {
          id: 9,
          name: "DZSH-HSE-BF-030-2022德州实华化工有限公司职业健康管理制度",
          field: "德州实华化工有限公司",
          field1:
            "ssc-dzsh/1/1i869bb0159344f3af7b4352d1d7b315.docx,ssc-dzsh/1/2j869bb0159344f3af7b4352d1d7b316.pdf",
          addDate: 1695690780000,
          remarks: ""
        },
        {
          id: 10,
          name: "DZSH-HSE-BF-031-2022德州实华化工有限公司应急管理规定",
          field: "德州实华化工有限公司",
          field1: "ssc-dzsh/1/3k869bb0159344f3af7b4352d1d7b317.xlsx",
          addDate: 1695690810000,
          remarks: ""
        },
        {
          id: 11,
          name: "DZSH-HSE-BF-032-2022德州实华化工有限公司事故报告和调查处理制度",
          field: "德州实华化工有限公司",
          field1: "",
          addDate: 1695690840000,
          remarks: ""
        },
        {
          id: 12,
          name: "DZSH-HSE-BF-033-2022德州实华化工有限公司安全绩效评定管理制度",
          field: "德州实华化工有限公司",
          field1: "ssc-dzsh/1/4l869bb0159344f3af7b4352d1d7b318.pdf",
          addDate: 1695690870000,
          remarks: ""
        }
      ];

      let filteredData = [...mockData];

      if (field) {
        filteredData = filteredData.filter(
          item => item.name.includes(field) || item.field.includes(field)
        );
      }

      if (startTime) {
        const start = new Date(startTime).getTime();
        filteredData = filteredData.filter(item => item.addDate >= start);
      }

      if (endTime) {
        const end = new Date(endTime).setHours(23, 59, 59, 999);
        filteredData = filteredData.filter(item => item.addDate <= end);
      }

      const totalElements = filteredData.length;
      const startIndex = (page - 1) * size;
      const endIndex = startIndex + size;
      const content = filteredData.slice(startIndex, endIndex);

      return {
        success: true,
        t: {
          content,
          totalElements
        }
      };
    }
  },
  {
    url: "/sft/danger/manage/del/:id",
    method: "get",
    response: () => {
      return {
        success: true,
        message: "删除成功"
      };
    }
  },
  {
    url: "/sft/danger/manage/delAll",
    method: "get",
    response: () => {
      return {
        success: true,
        message: "删除成功"
      };
    }
  }
]);
