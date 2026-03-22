import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 模拟数据 - 作业票证视频监控
const mockData = [
  {
    id: "1",
    name: "一号车间摄像头01",
    location: "一号车间-作业区域A",
    status: "online",
    createTime: 1709171832000
  },
  {
    id: "2",
    name: "一号车间摄像头02",
    location: "一号车间-作业区域B",
    status: "online",
    createTime: 1709085432000
  },
  {
    id: "3",
    name: "二号车间摄像头01",
    location: "二号车间-入口",
    status: "online",
    createTime: 1708999032000
  },
  {
    id: "4",
    name: "二号车间摄像头02",
    location: "二号车间-作业区域A",
    status: "offline",
    createTime: 1708912632000
  },
  {
    id: "5",
    name: "三号车间摄像头01",
    location: "三号车间-原料区",
    status: "online",
    createTime: 1708826232000
  },
  {
    id: "6",
    name: "三号车间摄像头02",
    location: "三号车间-成品区",
    status: "online",
    createTime: 1708739832000
  },
  {
    id: "7",
    name: "储罐区摄像头01",
    location: "储罐区-1号罐",
    status: "online",
    createTime: 1708653432000
  },
  {
    id: "8",
    name: "储罐区摄像头02",
    location: "储罐区-2号罐",
    status: "offline",
    createTime: 1708567032000
  },
  {
    id: "9",
    name: "装卸区摄像头01",
    location: "装卸区-1号装卸台",
    status: "online",
    createTime: 1708480632000
  },
  {
    id: "10",
    name: "装卸区摄像头02",
    location: "装卸区-2号装卸台",
    status: "online",
    createTime: 1708394232000
  },
  {
    id: "11",
    name: "实验室摄像头01",
    location: "实验室-分析室",
    status: "online",
    createTime: 1708307832000
  },
  {
    id: "12",
    name: "控制室摄像头01",
    location: "控制室-主控台",
    status: "online",
    createTime: 1708221432000
  }
];

export default defineFakeRoute([
  {
    url: "/sft/work/doccamera/list.json",
    method: "get",
    response: ({ query }) => {
      const page = parseInt(query.page as string) || 1;
      const size = parseInt(query.size as string) || 10;

      // 分页
      const start = (page - 1) * size;
      const end = start + size;
      const pageData = mockData.slice(start, end);

      return {
        success: true,
        t: {
          content: pageData,
          totalElements: mockData.length,
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
          last: end >= mockData.length,
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
