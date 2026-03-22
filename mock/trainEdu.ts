import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 模拟数据
const mockData = [
  {
    id: 1071,
    title: "双重预防专项培训",
    field:
      "本培训围绕安全生产风险分级管控与隐患排查治理双重预防机制开展，帮助员工树立事前防控理念，掌握风险识别、评估、管控及隐患治理方法",
    field1: 4,
    isOpen: 0,
    field2: "安全",
    level: 1,
    type: 1,
    createTime: 1773886486861,
    file1: "ssc-dzsh/1/740e8e0b0f6e467db6614bd8a890a2d2.mp4",
    file2: ""
  },
  {
    id: 1070,
    title: "两重点一重大专项培训",
    field:
      "1.简述两重点一重大的具体内容 2.介绍厂内重点监管危险化工工艺与重点监管化学品 3.介绍厂内重大危险源与各重大危险源的包保责任人",
    field1: 4,
    isOpen: 0,
    field2: "安全",
    level: 1,
    type: 1,
    createTime: 1773811459787,
    file1: "ssc-dzsh/1/c68acc82c0334b3d84d7551cd290a268.mp4",
    file2: ""
  },
  {
    id: 1066,
    title: "3月安全生产月警示教育视频（赛科5.12爆炸）",
    field: "学习赛科警示教育视频",
    field1: 4,
    isOpen: 0,
    field2: "安全",
    level: 1,
    type: 1,
    createTime: 1773648814099,
    file1: "ssc-dzsh/1/edb36878a1054c9191da1de0fa1e8033.mp4",
    file2: ""
  },
  {
    id: 1065,
    title: "3月安全生产月警示教育教育（金誉石化）",
    field: "学习金誉石化重大爆炸着火事故。",
    field1: 4,
    isOpen: 0,
    field2: "安全",
    level: 1,
    type: 1,
    createTime: 1773648554977,
    file1: "ssc-dzsh/1/765493a657114b239d10f6b48b03cac9.mp4",
    file2: ""
  },
  {
    id: 1062,
    title: "泰安分公司2026年应急预案培训",
    field: "泰安分公司2026年应急预案培训",
    field1: 4,
    isOpen: 0,
    field2: "安全",
    level: 2,
    type: 1,
    createTime: 1773472064171,
    file1: "ssc-dzsh/1/0b2deba3b11a42de8d4ca94e59b24394.mp4",
    file2: ""
  },
  {
    id: 1061,
    title: "三级安全教育-厂级",
    field: "新员工入厂必须接受厂级安全教育培训",
    field1: 1,
    isOpen: 1,
    field2: "安全",
    level: 1,
    type: 1,
    createTime: 1773300000000,
    file1: "ssc-dzsh/1/aaa.mp4",
    file2: ""
  },
  {
    id: 1060,
    title: "三级安全教育-车间级",
    field: "车间级安全教育培训内容",
    field1: 2,
    isOpen: 0,
    field2: "安全",
    level: 2,
    type: 1,
    createTime: 1773200000000,
    file1: "ssc-dzsh/1/bbb.mp4",
    file2: ""
  },
  {
    id: 1059,
    title: "三级安全教育-班组级",
    field: "班组级安全教育培训内容",
    field1: 3,
    isOpen: 0,
    field2: "安全",
    level: 3,
    type: 1,
    createTime: 1773100000000,
    file1: "ssc-dzsh/1/ccc.mp4",
    file2: ""
  },
  {
    id: 1058,
    title: "转岗培训-特种设备操作",
    field: "转岗人员特种设备操作培训",
    field1: 5,
    isOpen: 0,
    field2: "技能",
    level: 2,
    type: 2,
    createTime: 1773000000000,
    file1: "",
    file2: "https://example.com/training/transfer"
  },
  {
    id: 1057,
    title: "复岗培训-安全规程",
    field: "复岗人员安全规程培训",
    field1: 6,
    isOpen: 0,
    field2: "安全",
    level: 1,
    type: 1,
    createTime: 1772900000000,
    file1: "ssc-dzsh/1/ddd.mp4",
    file2: ""
  }
];

export default defineFakeRoute([
  {
    url: "/sft/train/edu/list",
    method: "get",
    response: ({
      query
    }: {
      query: { page?: string; size?: string; title?: string };
    }) => {
      const page = parseInt(query.page || "0");
      const size = parseInt(query.size || "10");
      const title = query.title || "";

      // 过滤数据
      let filteredData = mockData;
      if (title) {
        filteredData = mockData.filter(item => item.title.includes(title));
      }

      // 分页
      const start = page * size;
      const end = start + size;
      const pageData = filteredData.slice(start, end);

      return {
        success: true,
        t: {
          content: pageData,
          totalElements: filteredData.length,
          total: filteredData.length,
          totalPages: Math.ceil(filteredData.length / size)
        }
      };
    }
  },
  {
    url: "/sft/train/edu/del/:id",
    method: "get",
    response: () => {
      return {
        success: true,
        message: "删除成功"
      };
    }
  }
]);
