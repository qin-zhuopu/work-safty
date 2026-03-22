import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 模拟数据
const mockData = [
  {
    content:
      "岗位操作人员是否严格执行重大危险源安全生产规章制度和操作规程，是否严格遵守劳动纪律。",
    date: 1686240000427,
    id: 1,
    item: "1",
    measure: "严格执行重大危险源安全生产规章制度和操作规程",
    resum: {
      company: {
        id: 1,
        name: "德州实华化工有限公司"
      },
      id: 3,
      name: "操作负责人",
      type: 3
    },
    status: 1,
    type: "工程技术",
    type2: "关键设备/部件",
    type3: "/",
    user: {
      id: 1,
      uname: "admin"
    }
  },
  {
    content:
      "涉及重大危险源的特殊作业、检维修作业是否按规定办理作业票，监护人是否在场，作业过程有无违章，安全风险是否受控。",
    date: 1686240000427,
    id: 2,
    item: "2",
    measure: "按规定办理作业票",
    resum: {
      company: {
        id: 1,
        name: "德州实华化工有限公司"
      },
      id: 3,
      name: "操作负责人",
      type: 3
    },
    status: 1,
    type: "工程技术",
    type2: "安全附件",
    type3: "/",
    user: {
      id: 1,
      uname: "admin"
    }
  },
  {
    content: '重大危险源安全隐患是否整改到位，装置设备是否存在带"病"运行情形。',
    date: 1686240000427,
    id: 3,
    item: "3",
    measure: "装置设备不带病运行",
    resum: {
      company: {
        id: 1,
        name: "德州实华化工有限公司"
      },
      id: 3,
      name: "操作负责人",
      type: 3
    },
    status: 1,
    type: "维护保养",
    type2: "动设备",
    type3: "/",
    user: {
      id: 1,
      uname: "admin"
    }
  },
  {
    content: "涉及重大危险源的外来施工单位及人员是否存在无违章行为。",
    date: 1686240000427,
    id: 4,
    item: "4",
    measure: "外来施工单位及人员无违章行为",
    resum: {
      company: {
        id: 1,
        name: "德州实华化工有限公司"
      },
      id: 3,
      name: "操作负责人",
      type: 3
    },
    status: 1,
    type: "维护保养",
    type2: "静设备",
    type3: "/",
    user: {
      id: 1,
      uname: "admin"
    }
  },
  {
    content:
      "重大危险源的设备设施(包括动静设备、自控系统、安全设施等)是否完好。",
    date: 1686240000427,
    id: 5,
    item: "5",
    measure: "设备设施完好",
    resum: {
      company: {
        id: 1,
        name: "德州实华化工有限公司"
      },
      id: 3,
      name: "操作负责人",
      type: 3
    },
    status: 1,
    type: "操作行为",
    type2: "操作记录",
    type3: "/",
    user: {
      id: 1,
      uname: "admin"
    }
  },
  {
    content: "应急设施、应急装备、应急器材、消防设施是否完好。",
    date: 1686240000427,
    id: 6,
    item: "6",
    measure: "应急设施完好",
    resum: {
      company: {
        id: 1,
        name: "德州实华化工有限公司"
      },
      id: 3,
      name: "操作负责人",
      type: 3
    },
    status: 1,
    type: "操作行为",
    type2: "交接班",
    type3: "/",
    user: {
      id: 1,
      uname: "admin"
    }
  },
  {
    content: "现场监控设施是否完好，是否有效覆盖重大危险源区域。",
    date: 1686240000427,
    id: 7,
    item: "7",
    measure: "监控设施覆盖重大危险源区域",
    resum: {
      company: {
        id: 1,
        name: "德州实华化工有限公司"
      },
      id: 3,
      name: "操作负责人",
      type: 3
    },
    status: 1,
    type: "工程技术",
    type2: "其它",
    type3: "/",
    user: {
      id: 1,
      uname: "admin"
    }
  },
  {
    content:
      "现场可燃、有毒气体报警器和火灾报警器是否处于正常状态，报警信息是否及时处置。",
    date: 1686240000427,
    id: 8,
    item: "8",
    measure: "报警信息及时处置",
    resum: {
      company: {
        id: 1,
        name: "德州实华化工有限公司"
      },
      id: 3,
      name: "操作负责人",
      type: 3
    },
    status: 1,
    type: "应急措施",
    type2: "应急设施",
    type3: "/",
    user: {
      id: 1,
      uname: "admin"
    }
  },
  {
    content:
      "危险化学品安全生产风险监测预警系统，警示信息是否及时处置，系统是否正常运行。",
    date: 1686240000427,
    id: 9,
    item: "9",
    measure: "预警系统，警示信息及时处置",
    resum: {
      company: {
        id: 1,
        name: "德州实华化工有限公司"
      },
      id: 3,
      name: "操作负责人",
      type: 3
    },
    status: 1,
    type: "应急措施",
    type2: "应急预案",
    type3: "/",
    user: {
      id: 1,
      uname: "admin"
    }
  },
  {
    content:
      "现场隐患排查人员是否熟悉排查流程，是否运用移动终端开展隐患排查，并形成闭环管理。",
    date: 1686240000427,
    id: 10,
    item: "10",
    measure: "用移动终端开展隐患排查，并形成闭环管理",
    resum: {
      company: {
        id: 1,
        name: "德州实华化工有限公司"
      },
      id: 3,
      name: "操作负责人",
      type: 3
    },
    status: 1,
    type: "应急措施",
    type2: "其它",
    type3: "/",
    user: {
      id: 1,
      uname: "admin"
    }
  }
];

export default defineFakeRoute([
  {
    url: "/sft/resum/content/list.json",
    method: "get",
    response: ({ query }) => {
      const page = Number(query.page) || 0;
      const size = Number(query.size) || 10;
      const type = query.type || "";
      const content = query.content || "";

      // 过滤数据
      let filteredData = mockData;
      if (type) {
        filteredData = filteredData.filter(item =>
          item.resum.name?.includes(type)
        );
      }
      if (content) {
        filteredData = filteredData.filter(item =>
          item.content?.includes(content)
        );
      }

      // 分页
      const totalElements = filteredData.length;
      const start = page * size;
      const end = start + size;
      const pageContent = filteredData.slice(start, end);

      return {
        success: true,
        t: {
          content: pageContent,
          empty: pageContent.length === 0,
          first: page === 0,
          last: end >= totalElements,
          number: page,
          numberOfElements: pageContent.length,
          pageable: {
            offset: start,
            pageNumber: page,
            pageSize: size,
            paged: true,
            sort: {
              empty: true,
              sorted: false,
              unsorted: true
            },
            unpaged: false
          },
          size,
          sort: {
            empty: true,
            sorted: false,
            unsorted: true
          },
          totalElements,
          totalPages: Math.ceil(totalElements / size)
        }
      };
    }
  }
]);
