import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/cont/manage/examine/list.json",
    method: "get",
    response: ({ query }) => {
      const page = Number(query.page) || 1;
      const size = Number(query.size) || 10;
      const field = query.field || "";
      const field1 = query.field1 || "";

      // 模拟数据
      const allData = [
        {
          id: "1",
          field: "中建八局第一建设有限公司",
          status: 0,
          field1: "工程管理部",
          field3: "部门审批",
          field4: "分管领导审批",
          nodeId: "node001",
          hmdExamine: -1
        },
        {
          id: "2",
          field: "山东电力建设第三工程公司",
          status: 2,
          field1: "安全管理部",
          field3: "已完成",
          field4: "-",
          nodeId: undefined,
          hmdExamine: -1
        },
        {
          id: "3",
          field: "中国化学工程第三建设有限公司",
          status: 0,
          field1: "设备管理部",
          field3: "部门审批",
          field4: "分管领导审批",
          nodeId: "node003",
          hmdExamine: -1
        },
        {
          id: "4",
          field: "中石化第四建设公司",
          status: 1,
          field1: "生产运营部",
          field3: "驳回修改",
          field4: "部门审批",
          nodeId: "node004",
          hmdExamine: -1
        },
        {
          id: "5",
          field: "中国核工业二三建设有限公司",
          status: 2,
          field1: "工程管理部",
          field3: "已完成",
          field4: "-",
          nodeId: undefined,
          hmdExamine: 0
        },
        {
          id: "6",
          field: "中国建筑第二工程局有限公司",
          status: 0,
          field1: "安全管理部",
          field3: "部门审批",
          field4: "分管领导审批",
          nodeId: "node006",
          hmdExamine: -1
        },
        {
          id: "7",
          field: "中国石油天然气第七建设公司",
          status: -1,
          field1: "设备管理部",
          field3: "待提交",
          field4: "部门审批",
          nodeId: undefined,
          hmdExamine: -1
        },
        {
          id: "8",
          field: "中交第二航务工程局有限公司",
          status: 2,
          field1: "工程管理部",
          field3: "已完成",
          field4: "-",
          nodeId: undefined,
          hmdExamine: -1
        },
        {
          id: "9",
          field: "中国水利水电第八工程局",
          status: 0,
          field1: "生产运营部",
          field3: "部门审批",
          field4: "分管领导审批",
          nodeId: "node009",
          hmdExamine: -1
        },
        {
          id: "10",
          field: "中国机械工业第一建设有限公司",
          status: 2,
          field1: "安全管理部",
          field3: "已完成",
          field4: "-",
          nodeId: undefined,
          hmdExamine: 2
        },
        {
          id: "11",
          field: "中建三局第二建设工程有限责任公司",
          status: 0,
          field1: "设备管理部",
          field3: "部门审批",
          field4: "分管领导审批",
          nodeId: "node011",
          hmdExamine: -1
        },
        {
          id: "12",
          field: "中国石化第十建设公司",
          status: 1,
          field1: "工程管理部",
          field3: "驳回修改",
          field4: "部门审批",
          nodeId: "node012",
          hmdExamine: -1
        }
      ];

      // 过滤数据
      let filteredData = allData;
      if (field) {
        filteredData = filteredData.filter(item => item.field.includes(field));
      }
      if (field1) {
        filteredData = filteredData.filter(item =>
          item.field1.includes(field1)
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
          totalElements,
          content
        }
      };
    }
  }
]);
