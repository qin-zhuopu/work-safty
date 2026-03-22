import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/insp/approval/library/list.json",
    method: "get",
    response: ({ query }) => {
      const { page = "0", size = "10", type = "", sysUserName = "" } = query;

      // 模拟数据
      const mockData = [
        {
          id: 1,
          sysUser: {
            id: 1,
            ushow: "张三",
            uname: "zhangsan",
            status: "1"
          },
          sysDept: {
            id: 2,
            name: "安全生产部"
          },
          type: "1",
          delFlag: 0
        },
        {
          id: 2,
          sysUser: {
            id: 2,
            ushow: "李四",
            uname: "lisi",
            status: "1"
          },
          sysDept: {
            id: 3,
            name: "设备管理部"
          },
          type: "2",
          delFlag: 0
        },
        {
          id: 3,
          sysUser: {
            id: 3,
            ushow: "王五",
            uname: "wangwu",
            status: "1"
          },
          sysDept: {
            id: 4,
            name: "生产调度部"
          },
          type: "3",
          delFlag: 0
        },
        {
          id: 4,
          sysUser: {
            id: 4,
            ushow: "赵六",
            uname: "zhaoliu",
            status: "1"
          },
          sysDept: {
            id: 5,
            name: "总经办"
          },
          type: "4",
          delFlag: 0
        },
        {
          id: 5,
          sysUser: {
            id: 5,
            ushow: "孙七",
            uname: "sunqi",
            status: "1"
          },
          sysDept: {
            id: 6,
            name: "机电仪车间"
          },
          type: "5",
          delFlag: 0
        },
        {
          id: 6,
          sysUser: {
            id: 6,
            ushow: "周八",
            uname: "zhouba",
            status: "2"
          },
          sysDept: {
            id: 2,
            name: "安全生产部"
          },
          type: "1",
          delFlag: 0
        },
        {
          id: 7,
          sysUser: {
            id: 7,
            ushow: "吴九",
            uname: "wujiu",
            status: "1"
          },
          sysDept: {
            id: 3,
            name: "设备管理部"
          },
          type: "2",
          delFlag: 0
        },
        {
          id: 8,
          sysUser: {
            id: 8,
            ushow: "郑十",
            uname: "zhengshi",
            status: "1"
          },
          sysDept: {
            id: 4,
            name: "生产调度部"
          },
          type: "3",
          delFlag: 0
        },
        {
          id: 9,
          sysUser: {
            id: 9,
            ushow: "钱十一",
            uname: "qianshiyi",
            status: "1"
          },
          sysDept: {
            id: 5,
            name: "总经办"
          },
          type: "4",
          delFlag: 0
        },
        {
          id: 10,
          sysUser: {
            id: 10,
            ushow: "陈十二",
            uname: "chenshier",
            status: "1"
          },
          sysDept: {
            id: 6,
            name: "机电仪车间"
          },
          type: "5",
          delFlag: 0
        },
        {
          id: 11,
          sysUser: {
            id: 11,
            ushow: "刘十三",
            uname: "liushisan",
            status: "3"
          },
          sysDept: {
            id: 2,
            name: "安全生产部"
          },
          type: "1",
          delFlag: 0
        },
        {
          id: 12,
          sysUser: {
            id: 12,
            ushow: "杨十四",
            uname: "yangshisi",
            status: "1"
          },
          sysDept: {
            id: 3,
            name: "设备管理部"
          },
          type: "2",
          delFlag: 0
        }
      ];

      // 过滤数据
      let filteredData = mockData;
      if (type && type !== "-1") {
        filteredData = filteredData.filter(item => item.type === type);
      }
      if (sysUserName) {
        filteredData = filteredData.filter(item =>
          item.sysUser.ushow.includes(sysUserName as string)
        );
      }

      // 分页
      const pageNum = parseInt(page as string);
      const pageSize = parseInt(size as string);
      const start = pageNum * pageSize;
      const end = start + pageSize;
      const paginatedData = filteredData.slice(start, end);

      return {
        success: true,
        t: {
          content: paginatedData,
          totalElements: filteredData.length,
          totalPages: Math.ceil(filteredData.length / pageSize),
          size: pageSize,
          number: pageNum,
          first: pageNum === 0,
          last: end >= filteredData.length
        }
      };
    }
  }
]);
