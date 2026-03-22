import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 模拟数据 - 审验作业管理
const mockData = [
  {
    deptName: "热电车间",
    doc: {
      act: {
        id: "1001",
        jsaNo: "DH-2024-001",
        beginTime: 1735209600000,
        endTime: 1735213200000,
        status: 1,
        nodeStatus: 0,
        content: "锅炉检修动火作业",
        user: { ushow: "张三" },
        dept: { name: "热电车间" }
      }
    },
    endTime: 1735213200000,
    start_time: 1735209600000,
    sync: 0,
    zynr: "锅炉检修动火作业"
  },
  {
    deptName: "电解车间",
    doc: {
      act: {
        id: "1002",
        jsaNo: "SX-2024-002",
        beginTime: 1735216800000,
        endTime: 1735220400000,
        status: 2,
        nodeStatus: 1,
        content: "液氯储罐受限空间作业",
        user: { ushow: "李四" },
        dept: { name: "电解车间" }
      }
    },
    endTime: 1735220400000,
    start_time: 1735216800000,
    sync: 0,
    zynr: "液氯储罐受限空间作业"
  },
  {
    deptName: "聚氯乙烯车间",
    doc: {
      act: {
        id: "1003",
        jsaNo: "GD-2024-003",
        beginTime: 1735224000000,
        endTime: 1735227600000,
        status: 0,
        nodeStatus: 0,
        content: "高处管道检维修作业",
        user: { ushow: "王五" },
        dept: { name: "聚氯乙烯车间" }
      }
    },
    endTime: 1735227600000,
    start_time: 1735224000000,
    sync: 0,
    zynr: "高处管道检维修作业"
  },
  {
    deptName: "机电仪车间",
    doc: {
      act: {
        id: "1004",
        jsaNo: "DD-2024-004",
        beginTime: 1735231200000,
        endTime: 1735234800000,
        status: 3,
        nodeStatus: 0,
        content: "临时用电作业",
        user: { ushow: "赵六" },
        dept: { name: "机电仪车间" }
      }
    },
    endTime: 1735234800000,
    start_time: 1735231200000,
    sync: 0,
    zynr: "临时用电作业"
  },
  {
    deptName: "双氧水车间",
    doc: {
      act: {
        id: "1005",
        jsaNo: "MB-2024-005",
        beginTime: 1735238400000,
        endTime: 1735242000000,
        status: 1,
        nodeStatus: 0,
        content: "盲板抽堵作业",
        user: { ushow: "孙七" },
        dept: { name: "双氧水车间" }
      }
    },
    endTime: 1735242000000,
    start_time: 1735238400000,
    sync: 0,
    zynr: "盲板抽堵作业"
  },
  {
    deptName: "热电车间",
    doc: {
      act: {
        id: "1006",
        jsaNo: "DZ-2024-006",
        beginTime: 1735245600000,
        endTime: 1735249200000,
        status: 2,
        nodeStatus: 1,
        content: "设备吊装作业",
        user: { ushow: "周八" },
        dept: { name: "热电车间" }
      }
    },
    endTime: 1735249200000,
    start_time: 1735245600000,
    sync: 0,
    zynr: "设备吊装作业"
  },
  {
    deptName: "运营管理部",
    doc: {
      act: {
        id: "1007",
        jsaNo: "DT-2024-007",
        beginTime: 1735252800000,
        endTime: 1735256400000,
        status: 1,
        nodeStatus: 0,
        content: "动土作业",
        user: { ushow: "吴九" },
        dept: { name: "运营管理部" }
      }
    },
    endTime: 1735256400000,
    start_time: 1735252800000,
    sync: 0,
    zynr: "动土作业"
  },
  {
    deptName: "供应链管理部",
    doc: {
      act: {
        id: "1008",
        jsaNo: "DL-2024-008",
        beginTime: 1735260000000,
        endTime: 1735263600000,
        status: 2,
        nodeStatus: 1,
        content: "道路断路作业",
        user: { ushow: "郑十" },
        dept: { name: "供应链管理部" }
      }
    },
    endTime: 1735263600000,
    start_time: 1735260000000,
    sync: 0,
    zynr: "道路断路作业"
  },
  {
    deptName: "聚氯乙烯车间",
    doc: {
      act: {
        id: "1009",
        jsaNo: "GS-2024-009",
        beginTime: 1735267200000,
        endTime: 1735270800000,
        status: 0,
        nodeStatus: 0,
        content: "高处架设作业",
        user: { ushow: "钱一" },
        dept: { name: "聚氯乙烯车间" }
      }
    },
    endTime: 1735270800000,
    start_time: 1735267200000,
    sync: 0,
    zynr: "高处架设作业"
  },
  {
    deptName: "HSE管理部",
    doc: {
      act: {
        id: "1010",
        jsaNo: "DH-2024-010",
        beginTime: 1735274400000,
        endTime: 1735278000000,
        status: 2,
        nodeStatus: 1,
        content: "安全培训动火作业",
        user: { ushow: "刘二" },
        dept: { name: "HSE管理部" }
      }
    },
    endTime: 1735278000000,
    start_time: 1735274400000,
    sync: 0,
    zynr: "安全培训动火作业"
  },
  {
    deptName: "电解车间",
    doc: {
      act: {
        id: "1011",
        jsaNo: "SX-2024-011",
        beginTime: 1735281600000,
        endTime: 1735285200000,
        status: 1,
        nodeStatus: 0,
        content: "电解槽受限空间作业",
        user: { ushow: "陈三" },
        dept: { name: "电解车间" }
      }
    },
    endTime: 1735285200000,
    start_time: 1735281600000,
    sync: 0,
    zynr: "电解槽受限空间作业"
  },
  {
    deptName: "热电车间",
    doc: {
      act: {
        id: "1012",
        jsaNo: "GD-2024-012",
        beginTime: 1735288800000,
        endTime: 1735292400000,
        status: 3,
        nodeStatus: 0,
        content: "烟囱高处检维修作业",
        user: { ushow: "杨四" },
        dept: { name: "热电车间" }
      }
    },
    endTime: 1735292400000,
    start_time: 1735288800000,
    sync: 0,
    zynr: "烟囱高处检维修作业"
  }
];

export default defineFakeRoute([
  {
    url: "/sft/work/doc/fails.json",
    method: "get",
    response: ({ query }) => {
      const page = parseInt(query.page as string) || 1;
      const size = parseInt(query.size as string) || 10;
      const deptId = query.deptId as string;
      const _title = query.title as string;
      const _failType = query.failType as string;
      const name = query.name as string;

      // 过滤数据
      let filteredData = mockData;

      if (deptId && deptId !== "-1" && deptId !== "") {
        filteredData = filteredData.filter(item => {
          // 这里简单匹配，实际应根据部门ID匹配
          return item.deptName && item.deptName.length > 0;
        });
      }

      if (name) {
        filteredData = filteredData.filter(
          item =>
            item.zynr?.includes(name) || item.doc.act.content?.includes(name)
        );
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
