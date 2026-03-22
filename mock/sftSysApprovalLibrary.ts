import { defineFakeRoute } from "vite-plugin-fake-server/client";

// Mock 数据
const mockData = [
  {
    id: 35,
    type: 6,
    delFlag: 0,
    sysUser: {
      id: 139,
      ushow: "李辉",
      uname: "15589162046",
      telephone: "15589162046",
      job: "副处长",
      status: 1
    },
    sysDept: {
      id: 2,
      name: "德州实华化工有限公司"
    }
  },
  {
    id: 36,
    type: 3,
    delFlag: 0,
    sysUser: {
      id: 1982,
      ushow: "王也",
      uname: "17862157249",
      telephone: "17862157249",
      job: "",
      status: 1
    },
    sysDept: {
      id: 24,
      name: "泰安分公司"
    }
  },
  {
    id: 37,
    type: 3,
    delFlag: 0,
    sysUser: {
      id: 2014,
      ushow: "赵健（泰安）",
      uname: "15653808033",
      telephone: "15653808033",
      job: "制盐工段长",
      status: 1
    },
    sysDept: {
      id: 24,
      name: "泰安分公司"
    }
  },
  {
    id: 38,
    type: 4,
    delFlag: 0,
    sysUser: {
      id: 1980,
      ushow: "马天宇",
      uname: "18615348089",
      telephone: "18615348089",
      job: "工艺员",
      status: 1
    },
    sysDept: {
      id: 11,
      name: "运营管理部"
    }
  },
  {
    id: 39,
    type: 5,
    delFlag: 0,
    sysUser: {
      id: 1975,
      ushow: "刘芳",
      uname: "15965993759",
      telephone: "15965993759",
      job: "技术员",
      status: 1
    },
    sysDept: {
      id: 10,
      name: "设备管理办公室"
    }
  },
  {
    id: 40,
    type: 6,
    delFlag: 0,
    sysUser: {
      id: 140,
      ushow: "张伟",
      uname: "13800138000",
      telephone: "13800138000",
      job: "主任",
      status: 1
    },
    sysDept: {
      id: 3,
      name: "生产部"
    }
  },
  {
    id: 41,
    type: 3,
    delFlag: 0,
    sysUser: {
      id: 1981,
      ushow: "孙丽",
      uname: "15853481234",
      telephone: "15853481234",
      job: "安全员",
      status: 1
    },
    sysDept: {
      id: 25,
      name: "安环部"
    }
  },
  {
    id: 42,
    type: 4,
    delFlag: 0,
    sysUser: {
      id: 1979,
      ushow: "周强",
      uname: "13953456789",
      telephone: "13953456789",
      job: "HSE工程师",
      status: 1
    },
    sysDept: {
      id: 25,
      name: "安环部"
    }
  },
  {
    id: 43,
    type: 5,
    delFlag: 0,
    sysUser: {
      id: 1976,
      ushow: "吴敏",
      uname: "15066543210",
      telephone: "15066543210",
      job: "专业负责人",
      status: 1
    },
    sysDept: {
      id: 12,
      name: "技术部"
    }
  },
  {
    id: 44,
    type: 6,
    delFlag: 0,
    sysUser: {
      id: 141,
      ushow: "郑刚",
      uname: "13698765432",
      telephone: "13698765432",
      job: "部长",
      status: 1
    },
    sysDept: {
      id: 12,
      name: "技术部"
    }
  },
  {
    id: 45,
    type: 3,
    delFlag: 0,
    sysUser: {
      id: 2015,
      ushow: "冯涛",
      uname: "18765432109",
      telephone: "18765432109",
      job: "车间主任",
      status: 1
    },
    sysDept: {
      id: 26,
      name: "氯碱车间"
    }
  },
  {
    id: 46,
    type: 4,
    delFlag: 0,
    sysUser: {
      id: 1978,
      ushow: "陈静",
      uname: "15998765432",
      telephone: "15998765432",
      job: "HSE专员",
      status: 1
    },
    sysDept: {
      id: 26,
      name: "氯碱车间"
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
