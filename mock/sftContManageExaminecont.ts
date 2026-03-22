import { defineFakeRoute } from "vite-plugin-fake-server/client";

interface ContManageItem {
  id: number;
  addDate: number;
  deleteFlag: number;
  field: string; // 承包商名称
  field1: string; // 对接部门
  field3: string; // 当前审批节点
  field4: string; // 下一审批节点
  field9?: string; // 备注
  field9Date?: number; // 备注日期
  examineDate?: number; // 审批日期
  hmdExamine: number; // 黑名单审核状态 (0-4)
  status: number; // 状态 (-1:填报, 0:审批中, 1:驳回, 2:通过, 3:删除, 4:结束)
  nodeId?: string; // 审批节点ID
}

const mockData: ContManageItem[] = [
  {
    id: 209,
    addDate: 1742807883146,
    deleteFlag: 1,
    field: "北京蓝星清洗有限公司",
    field1: "供应链管理部",
    field3: "物资处专工审批",
    field4: "提报",
    hmdExamine: 2,
    status: 1
  },
  {
    id: 203,
    addDate: 1739580284227,
    deleteFlag: 1,
    examineDate: 1744186872359,
    field: "江苏帝邦建设工程有限公司",
    field1: "供应链管理部",
    field3: "结束",
    field4: "结束",
    hmdExamine: 2,
    status: 4
  },
  {
    id: 201,
    addDate: 1736154330839,
    deleteFlag: 1,
    field: "江苏帝邦建设工程有限公司德州分公司",
    field1: "供应链管理部",
    hmdExamine: 3,
    status: -1
  },
  {
    id: 68,
    addDate: 1709016051303,
    deleteFlag: 1,
    examineDate: 1712030260040,
    field: "山东泰山行星环保科技有限公司",
    field1: "供应链管理部",
    field3: "结束",
    field4: "结束",
    field9: "测试",
    field9Date: 1740554836456,
    hmdExamine: 1,
    status: 4
  },
  {
    id: 53,
    addDate: 1705462447702,
    deleteFlag: 1,
    field: "山东安然建设工程有限公司",
    field1: "",
    hmdExamine: 2,
    status: -1
  },
  {
    id: 40,
    addDate: 1706061364283,
    deleteFlag: 1,
    examineDate: 1712132463766,
    field: "山东融盛建设有限公司",
    field1: "供应链管理部",
    field3: "结束",
    field4: "结束",
    field9: "4月30日承包商队伍施工时违反保命规则",
    field9Date: 1767671788332,
    hmdExamine: 1,
    status: 4
  },
  {
    id: 9,
    addDate: 1736408686291,
    deleteFlag: 1,
    examineDate: 1709201329894,
    field: "德州汇邦机电设备安装工程有限公司",
    field1: "供应链管理部",
    field3: "结束",
    field4: "结束",
    field9:
      "汇邦机电2025年4月份发生两起保命规则事故，承包商队伍以及全部人员拉黑",
    field9Date: 1745996932624,
    hmdExamine: 1,
    status: 4,
    nodeId: "node_001"
  },
  {
    id: 10,
    addDate: 1706000000000,
    deleteFlag: 1,
    field: "中建八局第一建设有限公司",
    field1: "工程管理部",
    field3: "安全审批",
    field4: "质量审批",
    hmdExamine: 0,
    status: 0,
    nodeId: "node_002"
  },
  {
    id: 11,
    addDate: 1706100000000,
    deleteFlag: 1,
    field: "山东电建建设公司",
    field1: "采购部",
    field3: "部门审批",
    field4: "总经理审批",
    hmdExamine: 0,
    status: 0
  },
  {
    id: 12,
    addDate: 1706200000000,
    deleteFlag: 1,
    examineDate: 1712200000000,
    field: "中国化学工程第三建设有限公司",
    field1: "安全环保部",
    field3: "结束",
    field4: "结束",
    hmdExamine: 1,
    status: 2
  }
];

export default defineFakeRoute([
  {
    url: "/sft/cont/manage/examine/list.json",
    method: "get",
    response: ({ query }) => {
      const page = Number(query.page) || 1;
      const size = Number(query.size) || 10;
      const field = query.field || "";
      const field1 = query.field1 || "";

      // 过滤数据
      const filteredData = mockData.filter(item => {
        if (field && !item.field.includes(field)) return false;
        if (field1 && !item.field1.includes(field1)) return false;
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
          number: page - 1,
          first: page === 1,
          last: startIndex + size >= totalElements,
          empty: content.length === 0,
          pageable: {
            offset: startIndex,
            pageNumber: page - 1,
            pageSize: size,
            paged: true,
            sort: { empty: true, sorted: false, unsorted: true },
            unpaged: false
          },
          sort: { empty: true, sorted: false, unsorted: true }
        }
      };
    }
  }
]);
