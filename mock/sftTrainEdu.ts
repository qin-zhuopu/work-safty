import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 列表数据
const listContent = [
  {
    id: 1071,
    title: "双重预防专项培训",
    field:
      "本培训围绕安全生产风险分级管控与隐患排查治理双重预防机制开展，帮助员工树立事前防控理念，掌握风险识别、评估、管控及隐患治理方法",
    field1: 4,
    field2: "安全",
    isOpen: 0,
    level: 1,
    type: 1,
    file1: "ssc-dzsh/1/740e8e0b0f6e467db6614bd8a890a2d2.mp4",
    file2: "",
    createTime: 1773886486861
  },
  {
    id: 1070,
    title: "两重点一重大专项培训",
    field:
      "1.简述两重点一重大的具体内容 2.介绍厂内重点监管危险化工工艺与重点监管化学品 3.介绍厂内重大危险源与各重大危险源的包保责任人",
    field1: 4,
    field2: "安全",
    isOpen: 0,
    level: 1,
    type: 1,
    file1: "ssc-dzsh/1/c68acc82c0334b3d84d7551cd290a268.mp4",
    file2: "",
    createTime: 1773811459787
  },
  {
    id: 1069,
    title: "电解车间工艺操作规程培训",
    field: "电解车间工艺流程、操作要点、安全注意事项",
    field1: 4,
    field2: "工艺",
    isOpen: 1,
    level: 2,
    type: 1,
    file1: "ssc-dzsh/1/electrolysis_process.mp4",
    file2: "",
    createTime: 1773648814099
  },
  {
    id: 1068,
    title: "聚氯乙烯车间三级教育（班组级）",
    field: "聚氯乙烯车间班组级安全操作规程、应急处置",
    field1: 3,
    field2: "安全",
    isOpen: 0,
    level: 3,
    type: 1,
    file1: "ssc-dzsh/1/pvc_team.mp4",
    file2: "",
    createTime: 1773648000000
  },
  {
    id: 1067,
    title: "新员工转岗培训",
    field: "针对新转岗员工进行的安全培训、设备操作培训",
    field1: 5,
    field2: "安全",
    isOpen: 0,
    level: 1,
    type: 2,
    file1: "",
    file2: "https://example.com/training/transfer",
    createTime: 1773647000000
  },
  {
    id: 1066,
    title: "3月安全生产月警示教育视频（赛科5.12爆炸）",
    field: "学习赛科警示教育视频",
    field1: 4,
    field2: "安全",
    isOpen: 0,
    level: 1,
    type: 1,
    file1: "ssc-dzsh/1/edb36878a1054c9191da1de0fa1e8033.mp4",
    file2: "",
    createTime: 1773648814099
  },
  {
    id: 1065,
    title: "3月安全生产月警示教育教育（金誉石化）",
    field: "学习金誉石化重大爆炸着火事故。",
    field1: 4,
    field2: "安全",
    isOpen: 0,
    level: 1,
    type: 1,
    file1: "ssc-dzsh/1/765493a657114b239d10f6b48b03cac9.mp4",
    file2: "",
    createTime: 1773648554977
  },
  {
    id: 1064,
    title: "复岗员工安全培训",
    field: "针对长时间离岗后复岗员工进行的安全再教育培训",
    field1: 6,
    field2: "安全",
    isOpen: 1,
    level: 1,
    type: 1,
    file1: "ssc-dzsh/1/reemployment.mp4",
    file2: "",
    createTime: 1773500000000
  },
  {
    id: 1063,
    title: "三级教育厂级培训",
    field: "企业安全生产方针、法律法规、规章制度",
    field1: 1,
    field2: "安全",
    isOpen: 0,
    level: 1,
    type: 1,
    file1: "ssc-dzsh/1/plant_level.mp4",
    file2: "",
    createTime: 1773400000000
  },
  {
    id: 1062,
    title: "三级教育车间级培训",
    field: "车间生产特点、危险源、安全操作规程",
    field1: 2,
    field2: "安全",
    isOpen: 0,
    level: 2,
    type: 1,
    file1: "ssc-dzsh/1/workshop_level.mp4",
    file2: "",
    createTime: 1773300000000
  },
  {
    id: 1061,
    title: "受限空间作业安全培训",
    field: "受限空间作业风险辨识、安全措施、应急处置",
    field1: 4,
    field2: "作业",
    isOpen: 0,
    level: 2,
    type: 2,
    file1: "",
    file2: "https://example.com/training/confined-space",
    createTime: 1773200000000
  },
  {
    id: 1060,
    title: "动火作业安全培训",
    field: "动火作业审批流程、安全措施、监护要求",
    field1: 4,
    field2: "作业",
    isOpen: 0,
    level: 2,
    type: 1,
    file1: "ssc-dzsh/1/hot_work.mp4",
    file2: "",
    createTime: 1773100000000
  }
];

export default defineFakeRoute([
  // 列表接口
  {
    url: "/sft/train/edu/list",
    method: "get",
    response: ({ query }) => {
      const page = parseInt(query.page as string) || 0;
      const size = parseInt(query.size as string) || 10;
      const title = (query.title as string) || "";

      // 筛选数据
      let filteredData = [...listContent];
      if (title) {
        filteredData = filteredData.filter(item => item.title.includes(title));
      }

      // 分页
      const totalElements = filteredData.length;
      const totalPages = Math.ceil(totalElements / size);
      const start = page * size;
      const content = filteredData.slice(start, start + size);

      return {
        success: true,
        t: {
          content,
          totalElements,
          totalPages,
          size,
          number: page,
          first: page === 0,
          last: page >= totalPages - 1,
          numberOfElements: content.length,
          empty: content.length === 0,
          pageable: {
            offset: start,
            pageNumber: page,
            pageSize: size,
            paged: true,
            unpaged: false,
            sort: { empty: true, sorted: false, unsorted: true }
          },
          sort: { empty: true, sorted: false, unsorted: true }
        }
      };
    }
  },
  // 删除接口
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
