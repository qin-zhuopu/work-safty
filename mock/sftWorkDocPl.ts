import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 模拟数据 - 人员库管理
const mockData = [
  {
    id: "1",
    type: "1",
    docType: "1",
    validDate: 1735689600000,
    sysUser: {
      id: "101",
      ushow: "张三",
      status: "1",
      sysDept: {
        name: "生产部"
      }
    },
    addUser: {
      ushow: "管理员"
    },
    addDate: 1704067200000
  },
  {
    id: "2",
    type: "2",
    docType: "2",
    validDate: 1738368000000,
    sysUser: {
      id: "102",
      ushow: "李四",
      status: "1",
      sysDept: {
        name: "安环部"
      }
    },
    addUser: {
      ushow: "管理员"
    },
    addDate: 1704153600000
  },
  {
    id: "3",
    type: "1",
    docType: "3",
    validDate: 1740796800000,
    sysUser: {
      id: "103",
      ushow: "王五",
      status: "1",
      sysDept: {
        name: "设备部"
      }
    },
    addUser: {
      ushow: "张经理"
    },
    addDate: 1704240000000
  },
  {
    id: "4",
    type: "1",
    docType: "4",
    validDate: 1743475200000,
    sysUser: {
      id: "104",
      ushow: "赵六",
      status: "2",
      sysDept: {
        name: "生产部"
      }
    },
    addUser: {
      ushow: "管理员"
    },
    addDate: 1704326400000
  },
  {
    id: "5",
    type: "2",
    docType: "5",
    validDate: 1746153600000,
    sysUser: {
      id: "105",
      ushow: "孙七",
      status: "1",
      sysDept: {
        name: "质检部"
      }
    },
    addUser: {
      ushow: "李经理"
    },
    addDate: 1704412800000
  },
  {
    id: "6",
    type: "1",
    docType: "6",
    validDate: 1748745600000,
    sysUser: {
      id: "106",
      ushow: "周八",
      status: "1",
      sysDept: {
        name: "生产部"
      }
    },
    addUser: {
      ushow: "管理员"
    },
    addDate: 1704499200000
  },
  {
    id: "7",
    type: "2",
    docType: "7",
    validDate: 1751337600000,
    sysUser: {
      id: "107",
      ushow: "吴九",
      status: "1",
      sysDept: {
        name: "安环部"
      }
    },
    addUser: {
      ushow: "王主管"
    },
    addDate: 1704585600000
  },
  {
    id: "8",
    type: "1",
    docType: "8",
    validDate: 1754016000000,
    sysUser: {
      id: "108",
      ushow: "郑十",
      status: "3",
      sysDept: {
        name: "设备部"
      }
    },
    addUser: {
      ushow: "管理员"
    },
    addDate: 1704672000000
  },
  {
    id: "9",
    type: "1",
    docType: "9",
    validDate: 1756694400000,
    sysUser: {
      id: "109",
      ushow: "刘十一",
      status: "1",
      sysDept: {
        name: "生产部"
      }
    },
    addUser: {
      ushow: "赵经理"
    },
    addDate: 1704758400000
  },
  {
    id: "10",
    type: "2",
    docType: "10",
    validDate: 1759286400000,
    sysUser: {
      id: "110",
      ushow: "陈十二",
      status: "1",
      sysDept: {
        name: "质检部"
      }
    },
    addUser: {
      ushow: "管理员"
    },
    addDate: 1704844800000
  },
  {
    id: "11",
    type: "1",
    docType: "1",
    validDate: 1761964800000,
    sysUser: {
      id: "111",
      ushow: "杨十三",
      status: "1",
      sysDept: {
        name: "生产部"
      }
    },
    addUser: {
      ushow: "李经理"
    },
    addDate: 1704931200000
  },
  {
    id: "12",
    type: "2",
    docType: "2",
    validDate: 1764556800000,
    sysUser: {
      id: "112",
      ushow: "黄十四",
      status: "2",
      sysDept: {
        name: "安环部"
      }
    },
    addUser: {
      ushow: "管理员"
    },
    addDate: 1705017600000
  }
];

export default defineFakeRoute([
  {
    url: "/sft/work/doc/pl/list.json",
    method: "get",
    response: ({ query }) => {
      const page = parseInt(query.page as string) || 1;
      const size = parseInt(query.size as string) || 10;
      const type = (query.type as string) || "";
      const docType = (query.docType as string) || "";
      const dept = (query.dept as string) || "";
      const name = (query.name as string) || "";

      // 过滤数据
      let filteredData = mockData;
      if (type) {
        filteredData = filteredData.filter(item => item.type === type);
      }
      if (docType) {
        filteredData = filteredData.filter(item => item.docType === docType);
      }
      if (dept) {
        filteredData = filteredData.filter(item =>
          item.sysUser?.sysDept?.name?.includes(dept)
        );
      }
      if (name) {
        filteredData = filteredData.filter(item =>
          item.sysUser?.ushow?.includes(name)
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
