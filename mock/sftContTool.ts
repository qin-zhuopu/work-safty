import { defineFakeRoute } from "vite-plugin-fake-server/client";

interface UserInfo {
  id: number;
  ushow: string;
  cardNo: string;
  company: {
    id: number;
    name: string;
  };
}

interface ToolItem {
  id: number;
  field: string; // 序列号
  field1: string; // 名称
  field2: string; // 类别 (01-08)
  field3: string; // 型号
  field4: string; // 使用人
  field5: string; // 负责人
  field6: string; // 备注
  field7: string; // 审批状态
  field8: number; // 审批时间
  field9: {
    id: number;
    name: string;
  }; // 申请单位
  field10: UserInfo; // 申请人
  field11: number; // 申请时间
  field12: UserInfo; // 审批人
  pics: string[]; // 照片
}

const mockData: ToolItem[] = [
  {
    id: 1,
    field: "DZJD-20260321-08-001",
    field1: "汽油发电机",
    field2: "02",
    field3: "GF-3500",
    field4: "张三",
    field5: "李四",
    field6: "备用设备",
    field7: "合格",
    field8: 1742537600000,
    field9: { id: 1, name: "生产车间" },
    field10: {
      id: 10,
      ushow: "王五",
      cardNo: "123456",
      company: { id: 1, name: "公司" }
    },
    field11: 1742451200000,
    field12: {
      id: 5,
      ushow: "赵六",
      cardNo: "654321",
      company: { id: 1, name: "公司" }
    },
    pics: ["/uploads/tool/tool1.jpg"]
  },
  {
    id: 2,
    field: "DZJD-20260321-08-002",
    field1: "电焊机",
    field2: "04",
    field3: "ZX7-400",
    field4: "张三",
    field5: "李四",
    field6: "定期检查",
    field7: "合格",
    field8: 1742537600000,
    field9: { id: 2, name: "维修车间" },
    field10: {
      id: 11,
      ushow: "孙七",
      cardNo: "234567",
      company: { id: 1, name: "公司" }
    },
    field11: 1742364800000,
    field12: {
      id: 5,
      ushow: "赵六",
      cardNo: "654321",
      company: { id: 1, name: "公司" }
    },
    pics: ["/uploads/tool/tool2.jpg"]
  },
  {
    id: 3,
    field: "DZJD-20260321-08-003",
    field1: "配电箱",
    field2: "03",
    field3: "PZ-30",
    field4: "周八",
    field5: "李四",
    field6: "新购入",
    field7: "未审批",
    field8: 0,
    field9: { id: 3, name: "仓储部" },
    field10: {
      id: 12,
      ushow: "吴九",
      cardNo: "345678",
      company: { id: 1, name: "公司" }
    },
    field11: 1742278400000,
    field12: {} as any,
    pics: []
  },
  {
    id: 4,
    field: "DZJD-20260321-08-004",
    field1: "手拉葫芦",
    field2: "06",
    field3: "HSZ-2T",
    field4: "郑十",
    field5: "李四",
    field6: "",
    field7: "不合格",
    field8: 1742537600000,
    field9: { id: 1, name: "生产车间" },
    field10: {
      id: 13,
      ushow: "钱一",
      cardNo: "456789",
      company: { id: 1, name: "公司" }
    },
    field11: 1742192000000,
    field12: {
      id: 5,
      ushow: "赵六",
      cardNo: "654321",
      company: { id: 1, name: "公司" }
    },
    pics: ["/uploads/tool/tool4.jpg"]
  },
  {
    id: 5,
    field: "DZJD-20260321-08-005",
    field1: "梯子",
    field2: "01",
    field3: "TG-3M",
    field4: "孙二",
    field5: "李四",
    field6: "需更换",
    field7: "合格",
    field8: 1742537600000,
    field9: { id: 4, name: "质检部" },
    field10: {
      id: 14,
      ushow: "刘三",
      cardNo: "567890",
      company: { id: 1, name: "公司" }
    },
    field11: 1742105600000,
    field12: {
      id: 5,
      ushow: "赵六",
      cardNo: "654321",
      company: { id: 1, name: "公司" }
    },
    pics: ["/uploads/tool/tool5.jpg"]
  },
  {
    id: 6,
    field: "DZJD-20260321-08-006",
    field1: "等离子切割机",
    field2: "05",
    field3: "LGK-60",
    field4: "陈四",
    field5: "李四",
    field6: "",
    field7: "合格",
    field8: 1742537600000,
    field9: { id: 2, name: "维修车间" },
    field10: {
      id: 15,
      ushow: "杨五",
      cardNo: "678901",
      company: { id: 1, name: "公司" }
    },
    field11: 1742019200000,
    field12: {
      id: 5,
      ushow: "赵六",
      cardNo: "654321",
      company: { id: 1, name: "公司" }
    },
    pics: ["/uploads/tool/tool6.jpg"]
  },
  {
    id: 7,
    field: "DZJD-20260321-08-007",
    field1: "电动器具",
    field2: "07",
    field3: "DT-100",
    field4: "黄六",
    field5: "李四",
    field6: "备用",
    field7: "未审批",
    field8: 0,
    field9: { id: 5, name: "采购部" },
    field10: {
      id: 16,
      ushow: "朱七",
      cardNo: "789012",
      company: { id: 1, name: "公司" }
    },
    field11: 1741932800000,
    field12: {} as any,
    pics: []
  },
  {
    id: 8,
    field: "DZJD-20260321-08-008",
    field1: "其他类",
    field2: "08",
    field3: "QT-001",
    field4: "马八",
    field5: "李四",
    field6: "",
    field7: "合格",
    field8: 1742537600000,
    field9: { id: 1, name: "生产车间" },
    field10: {
      id: 17,
      ushow: "何九",
      cardNo: "890123",
      company: { id: 1, name: "公司" }
    },
    field11: 1741846400000,
    field12: {
      id: 5,
      ushow: "赵六",
      cardNo: "654321",
      company: { id: 1, name: "公司" }
    },
    pics: ["/uploads/tool/tool8.jpg"]
  }
];

export default defineFakeRoute([
  {
    url: "/sft/cont/tool/list",
    method: "get",
    response: ({ query }) => {
      const page = Number(query.page) || 1;
      const size = Number(query.size) || 10;
      const field1 = query.field1 || "";
      const field2 = query.field2 || "";
      const field3 = query.field3 || "";
      const field7 = query.field7 || "";

      // 过滤数据
      const filteredData = mockData.filter(item => {
        if (field1 && !item.field1.includes(field1)) return false;
        if (field2 && item.field2 !== field2) return false;
        if (
          field3 &&
          (!item.field9?.name || !item.field9.name.includes(field3))
        )
          return false;
        if (field7 && item.field7 !== field7) return false;
        return true;
      });

      const totalElements = filteredData.length;
      const startIndex = (page - 1) * size;
      const content = filteredData.slice(startIndex, startIndex + size);

      return {
        success: true,
        t: {
          content,
          totalElements,
          totalPages: Math.ceil(totalElements / size),
          size,
          number: page - 1
        }
      };
    }
  },
  {
    url: "/api/sft/cont/tool/del/:id",
    method: "delete",
    response: () => {
      return {
        success: true,
        message: "删除成功"
      };
    }
  }
]);
