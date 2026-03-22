import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/danger/plan/list",
    method: "get",
    response: ({
      query
    }: {
      query: { page?: string; size?: string; name?: string; type?: string };
    }) => {
      const page = Number(query.page) || 1;
      const size = Number(query.size) || 10;

      const allData = [
        {
          id: 1,
          name: "季节性排查",
          type: "季节性排查",
          cycle: "季度",
          beginTime: 1767196800000,
          endTime: 1798732799000,
          establish: 0,
          organizer: { id: 1, ushow: "张三" },
          ushows: "李四, 王五"
        },
        {
          id: 2,
          name: "设备专业性排查",
          type: "专业性排查",
          cycle: "月度",
          beginTime: 1767196800000,
          endTime: 1798732799000,
          establish: 1,
          organizer: { id: 2, ushow: "李四" },
          ushows: "张三, 王五, 赵六"
        },
        {
          id: 3,
          name: "节假日重点排查",
          type: "重点时段及节假日前排查",
          cycle: "年度",
          beginTime: 1767196800000,
          endTime: 1798732799000,
          establish: 0,
          organizer: { id: 3, ushow: "王五" },
          ushows: "张三, 李四"
        },
        {
          id: 4,
          name: "月度综合排查计划",
          type: "月度综合排查",
          cycle: "月度",
          beginTime: 1767196800000,
          endTime: 1798732799000,
          establish: 1,
          organizer: { id: 4, ushow: "赵六" },
          ushows: "张三, 李四, 王五"
        },
        {
          id: 5,
          name: "车间每周综合检查",
          type: "车间每周综合检查",
          cycle: "每周",
          beginTime: 1767196800000,
          endTime: 1798732799000,
          establish: 0,
          organizer: { id: 5, ushow: "孙七" },
          ushows: "张三, 李四"
        },
        {
          id: 6,
          name: "春季安全排查",
          type: "季节性排查",
          cycle: "季度",
          beginTime: 1767196800000,
          endTime: 1798732799000,
          establish: 0,
          organizer: { id: 6, ushow: "周八" },
          ushows: "李四, 王五, 赵六"
        },
        {
          id: 7,
          name: "电气专业性排查",
          type: "专业性排查",
          cycle: "月度",
          beginTime: 1767196800000,
          endTime: 1798732799000,
          establish: 1,
          organizer: { id: 7, ushow: "吴九" },
          ushows: "张三, 王五"
        },
        {
          id: 8,
          name: "夏季高温排查",
          type: "季节性排查",
          cycle: "季度",
          beginTime: 1767196800000,
          endTime: 1798732799000,
          establish: 0,
          organizer: { id: 8, ushow: "郑十" },
          ushows: "李四, 赵六"
        },
        {
          id: 9,
          name: "国庆节前排查",
          type: "重点时段及节假日前排查",
          cycle: "年度",
          beginTime: 1767196800000,
          endTime: 1798732799000,
          establish: 1,
          organizer: { id: 9, ushow: "刘一" },
          ushows: "张三, 李四, 王五, 赵六"
        },
        {
          id: 10,
          name: "化工工艺排查",
          type: "专业性排查",
          cycle: "月度",
          beginTime: 1767196800000,
          endTime: 1798732799000,
          establish: 0,
          organizer: { id: 10, ushow: "陈二" },
          ushows: "王五, 赵六"
        },
        {
          id: 11,
          name: "冬季防火排查",
          type: "季节性排查",
          cycle: "季度",
          beginTime: 1767196800000,
          endTime: 1798732799000,
          establish: 1,
          organizer: { id: 11, ushow: "杨三" },
          ushows: "张三, 李四"
        },
        {
          id: 12,
          name: "仪表专业性排查",
          type: "专业性排查",
          cycle: "月度",
          beginTime: 1767196800000,
          endTime: 1798732799000,
          establish: 0,
          organizer: { id: 12, ushow: "朱四" },
          ushows: "李四, 王五, 赵六"
        }
      ];

      // 简单的筛选逻辑
      let filteredData = allData;
      if (query.name) {
        filteredData = filteredData.filter(item =>
          item.name.includes(query.name)
        );
      }
      if (query.type) {
        filteredData = filteredData.filter(item => item.type === query.type);
      }

      const totalElements = filteredData.length;
      const start = (page - 1) * size;
      const end = start + size;
      const content = filteredData.slice(start, end);

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
