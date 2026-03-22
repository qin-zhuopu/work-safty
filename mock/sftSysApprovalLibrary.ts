import { defineFakeRoute } from "vite-plugin-fake-server/client";

// Mock 数据
const mockData = [
  {
    id: 1,
    type: 1,
    delFlag: 0,
    sysUser: {
      id: 139,
      ushow: "李辉",
      uname: "lihui",
      telephone: "15589162046",
      job: "HSE部长",
      status: 1
    },
    sysDept: {
      id: 9,
      name: "HSE管理部"
    }
  },
  {
    id: 2,
    type: 1,
    delFlag: 0,
    sysUser: {
      id: 1982,
      ushow: "王也",
      uname: "wangye",
      telephone: "17862157249",
      job: "HSE工程师",
      status: 1
    },
    sysDept: {
      id: 9,
      name: "HSE管理部"
    }
  },
  {
    id: 3,
    type: 1,
    delFlag: 0,
    sysUser: {
      id: 2014,
      ushow: "赵健",
      uname: "zhaojian",
      telephone: "15653808033",
      job: "安全管理员",
      status: 1
    },
    sysDept: {
      id: 2486,
      name: "安全管理办公室"
    }
  },
  {
    id: 4,
    type: 1,
    delFlag: 0,
    sysUser: {
      id: 1980,
      ushow: "马天宇",
      uname: "matianyu",
      telephone: "18615348089",
      job: "环保管理员",
      status: 1
    },
    sysDept: {
      id: 2487,
      name: "环保管理办公室"
    }
  },
  {
    id: 5,
    type: 2,
    delFlag: 0,
    sysUser: {
      id: 140,
      ushow: "张伟",
      uname: "zhangwei",
      telephone: "13800138000",
      job: "总经理",
      status: 1
    },
    sysDept: {
      id: 3,
      name: "公司领导"
    }
  },
  {
    id: 6,
    type: 2,
    delFlag: 0,
    sysUser: {
      id: 141,
      ushow: "郑刚",
      uname: "zhenggang",
      telephone: "13698765432",
      job: "副总经理",
      status: 1
    },
    sysDept: {
      id: 3,
      name: "公司领导"
    }
  },
  {
    id: 7,
    type: 1,
    delFlag: 0,
    sysUser: {
      id: 1981,
      ushow: "孙丽",
      uname: "sunli",
      telephone: "15853481234",
      job: "HSE专员",
      status: 2
    },
    sysDept: {
      id: 9,
      name: "HSE管理部"
    }
  },
  {
    id: 8,
    type: 2,
    delFlag: 0,
    sysUser: {
      id: 1976,
      ushow: "吴敏",
      uname: "wumin",
      telephone: "15066543210",
      job: "总工程师",
      status: 1
    },
    sysDept: {
      id: 3,
      name: "公司领导"
    }
  },
  {
    id: 9,
    type: 1,
    delFlag: 0,
    sysUser: {
      id: 2015,
      ushow: "冯涛",
      uname: "fengtao",
      telephone: "18765432109",
      job: "安全主管",
      status: 1
    },
    sysDept: {
      id: 9,
      name: "HSE管理部"
    }
  },
  {
    id: 10,
    type: 2,
    delFlag: 0,
    sysUser: {
      id: 1978,
      ushow: "陈静",
      uname: "chenjing",
      telephone: "15998765432",
      job: "安全总监",
      status: 3
    },
    sysDept: {
      id: 3,
      name: "公司领导"
    }
  },
  {
    id: 11,
    type: 1,
    delFlag: 0,
    sysUser: {
      id: 1979,
      ushow: "周强",
      uname: "zhouqiang",
      telephone: "13953456789",
      job: "环保工程师",
      status: 1
    },
    sysDept: {
      id: 2487,
      name: "环保管理办公室"
    }
  },
  {
    id: 12,
    type: 2,
    delFlag: 0,
    sysUser: {
      id: 1983,
      ushow: "黄磊",
      uname: "huanglei",
      telephone: "13567891234",
      job: "生产副总",
      status: 1
    },
    sysDept: {
      id: 3,
      name: "公司领导"
    }
  }
];

export default defineFakeRoute([
  {
    url: "/sft/sys/approval/library/list.json",
    method: "get",
    response: ({ query }) => {
      // 分页参数
      const page = parseInt(query.page as string) || 0;
      const size = parseInt(query.size as string) || 10;

      // 筛选条件
      const typeFilter = query.type;
      const userNameFilter = query.sysUserName as string;

      // 过滤数据
      let filteredData = [...mockData];

      if (typeFilter && typeFilter !== "-1") {
        filteredData = filteredData.filter(
          item => item.type === parseInt(typeFilter as string)
        );
      }

      if (userNameFilter) {
        filteredData = filteredData.filter(
          item =>
            item.sysUser.ushow?.includes(userNameFilter) ||
            item.sysUser.uname?.includes(userNameFilter)
        );
      }

      // 分页
      const totalElements = filteredData.length;
      const totalPages = Math.ceil(totalElements / size);
      const start = page * size;
      const end = start + size;
      const content = filteredData.slice(start, end);

      return {
        success: true,
        t: {
          content,
          totalElements,
          totalPages,
          size,
          number: page
        }
      };
    }
  }
]);
