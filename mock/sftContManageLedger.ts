import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/cont/manage/ledger/list.json",
    method: "get",
    response: ({ query }) => {
      const page = parseInt(query.page as string) || 0;
      const size = parseInt(query.size as string) || 10;
      const field = (query.field as string) || "";
      const field1 = (query.field1 as string) || "";
      const level = (query.level as string) || "";

      const mockData = [
        {
          id: 1,
          field: "德州中裕燃气有限公司",
          field1: "供应链管理部",
          field3: "部门经理审批",
          field4: "分管领导审批",
          status: 0,
          level: "常用",
          deleteFlag: 0,
          field10: "",
          hmdExamine: null,
          field9Date: null
        },
        {
          id: 2,
          field: "山东建设集团有限公司",
          field1: "工程管理部",
          field3: "安全总监审批",
          field4: "总经理审批",
          status: 2,
          level: "常用",
          deleteFlag: 0,
          field10: "",
          hmdExamine: null,
          field9Date: null
        },
        {
          id: 3,
          field: "青岛安装建设股份有限公司",
          field1: "设备动力部",
          field3: "",
          field4: "部门经理审批",
          status: -1,
          level: "备用",
          deleteFlag: 0,
          field10: null,
          hmdExamine: null,
          field9Date: null
        },
        {
          id: 4,
          field: "济南石化设备制造厂",
          field1: "生产技术部",
          field3: "技术总监审批",
          field4: "结束",
          status: 2,
          level: "设备厂家",
          deleteFlag: 0,
          field10: "",
          hmdExamine: null,
          field9Date: null
        },
        {
          id: 5,
          field: "潍坊环保工程有限公司",
          field1: "安全环保部",
          field3: "部门经理审批",
          field4: "安全总监审批",
          status: 1,
          level: "常用",
          deleteFlag: 0,
          field10: "资料不全，请补充",
          hmdExamine: null,
          field9Date: null
        },
        {
          id: 6,
          field: "烟台建筑工程公司",
          field1: "工程管理部",
          field3: "",
          field4: "部门经理审批",
          status: -1,
          level: "备用",
          deleteFlag: 0,
          field10: null,
          hmdExamine: null,
          field9Date: null
        },
        {
          id: 7,
          field: "淄博机电设备安装有限公司",
          field1: "设备动力部",
          field3: "分管领导审批",
          field4: "总经理审批",
          status: 0,
          level: "常用",
          deleteFlag: 0,
          field10: "",
          hmdExamine: null,
          field9Date: null
        },
        {
          id: 8,
          field: "临沂检测技术有限公司",
          field1: "质量管理部",
          field3: "技术总监审批",
          field4: "结束",
          status: 2,
          level: "设备厂家",
          deleteFlag: 0,
          field10: "",
          hmdExamine: null,
          field9Date: null
        },
        {
          id: 9,
          field: "东营石油化工工程有限公司",
          field1: "生产技术部",
          field3: "",
          field4: "部门经理审批",
          status: -1,
          level: "常用",
          deleteFlag: 0,
          field10: null,
          hmdExamine: null,
          field9Date: null
        },
        {
          id: 10,
          field: "某违规承包商有限公司",
          field1: "供应链管理部",
          field3: "总经理审批",
          field4: "结束",
          status: 2,
          level: "常用",
          deleteFlag: 1,
          field10: "",
          hmdExamine: 2,
          field9Date: "2026-03-15"
        },
        {
          id: 11,
          field: "泰安消防设施工程有限公司",
          field1: "安全环保部",
          field3: "安全总监审批",
          field4: "分管领导审批",
          status: 0,
          level: "备用",
          deleteFlag: 0,
          field10: "",
          hmdExamine: null,
          field9Date: null
        },
        {
          id: 12,
          field: "威海管道工程有限公司",
          field1: "工程管理部",
          field3: "",
          field4: "部门经理审批",
          status: -1,
          level: "常用",
          deleteFlag: 0,
          field10: null,
          hmdExamine: null,
          field9Date: null
        },
        {
          id: 13,
          field: "日照电气安装有限公司",
          field1: "设备动力部",
          field3: "技术总监审批",
          field4: "结束",
          status: 4,
          level: "备用",
          deleteFlag: 0,
          field10: "",
          hmdExamine: null,
          field9Date: null
        },
        {
          id: 14,
          field: "滨州防腐保温工程有限公司",
          field1: "生产技术部",
          field3: "部门经理审批",
          field4: "安全总监审批",
          status: 0,
          level: "常用",
          deleteFlag: 0,
          field10: "",
          hmdExamine: null,
          field9Date: null
        },
        {
          id: 15,
          field: "德州起重机械有限公司",
          field1: "设备动力部",
          field3: "分管领导审批",
          field4: "总经理审批",
          status: 2,
          level: "设备厂家",
          deleteFlag: 0,
          field10: "",
          hmdExamine: null,
          field9Date: null
        }
      ];

      // 过滤数据
      const filteredData = mockData.filter(item => {
        if (field && !item.field.includes(field)) {
          return false;
        }
        if (field1 && !item.field1.includes(field1)) {
          return false;
        }
        if (level && item.level !== level) {
          return false;
        }
        return true;
      });

      const totalElements = filteredData.length;
      const start = page * size;
      const content = filteredData.slice(start, start + size);

      return {
        success: true,
        t: {
          content,
          totalElements
        }
      };
    }
  }
]);
