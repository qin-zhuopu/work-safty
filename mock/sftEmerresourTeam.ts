import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/emerresour/team/list",
    method: "get",
    response: ({ query }) => {
      const page = parseInt(query.page as string) || 1;
      const size = parseInt(query.size as string) || 10;
      const field = (query.field as string) || "";

      const mockData = [
        {
          id: "1",
          field: "消防救援队",
          field1: "专业救援队",
          sysDeptName: "安全管理部",
          field2: "厂区北区",
          sysUserName: "张三",
          field3: "13800138000",
          field4: "25"
        },
        {
          id: "2",
          field: "医疗救护队",
          field1: "医疗救护",
          sysDeptName: "后勤保障部",
          field2: "厂区医院",
          sysUserName: "李四",
          field3: "13800138001",
          field4: "15"
        },
        {
          id: "3",
          field: "危化品处置队",
          field1: "专业救援队",
          sysDeptName: "生产管理部",
          field2: "化工园区",
          sysUserName: "王五",
          field3: "13800138002",
          field4: "30"
        },
        {
          id: "4",
          field: "电力抢险队",
          field1: "工程抢险",
          sysDeptName: "设备管理部",
          field2: "配电房旁",
          sysUserName: "赵六",
          field3: "13800138003",
          field4: "12"
        },
        {
          id: "5",
          field: "通讯保障队",
          field1: "后勤保障",
          sysDeptName: "信息技术部",
          field2: "办公楼",
          sysUserName: "孙七",
          field3: "13800138004",
          field4: "8"
        }
      ];

      let filteredData = mockData;
      if (field) {
        filteredData = mockData.filter(
          item => item.field.includes(field) || item.field1.includes(field)
        );
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
