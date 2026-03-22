import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  // 获取题库列表
  {
    url: "/sft/train/itembank/list.json",
    method: "get",
    response: ({ query }) => {
      const page = Number(query.page) || 0;
      const size = Number(query.size) || 10;
      const typeId = query.typeId ? Number(query.typeId) : -1;
      const title = query.title || "";

      // 模拟数据
      const allData = [
        {
          id: 14465,
          type: 1,
          title: "AI是不是可以代替人类",
          options: "是|否",
          answer: "否",
          planType: { id: 1, name: "双重预防专项培训" }
        },
        {
          id: 14466,
          type: 2,
          title: "四级（低）风险的标注颜色为（），代表该风险可容忍。",
          options: "A.红色|B.橙色|C.黄色|D.蓝色",
          answer: "D",
          planType: { id: 2, name: "两重点一重大专项培训" }
        },
        {
          id: 14467,
          type: 2,
          title: "风险管控的核心目的是消除、化解风险或把风险降低到（）水平。",
          options: "A.零|B.最低|C.可接受|D.中等",
          answer: "C",
          planType: { id: 1, name: "双重预防专项培训" }
        },
        {
          id: 14468,
          type: 2,
          title: "风险矩阵法中，风险的计算公式为（）",
          options:
            "A.风险=可能性×后果|B.风险=可能性+后果|C.风险=可能性-后果|D.风险=可能性/后果",
          answer: "A",
          planType: { id: 3, name: "安全用电教育培训" }
        },
        {
          id: 14469,
          type: 3,
          title: "风险消减优先次序中，排在首位的是（）",
          options: "A.工程控制|B.管理控制|C.个体防护|D.消除",
          answer: "D",
          planType: { id: 2, name: "两重点一重大专项培训" }
        },
        {
          id: 14470,
          type: 1,
          title: "特种作业人员必须持证上岗",
          options: "正确|错误",
          answer: "正确",
          planType: { id: 1, name: "双重预防专项培训" }
        },
        {
          id: 14471,
          type: 2,
          title: "危险化学品企业特殊作业包括（）",
          options: "A.动火作业|B.受限空间作业|C.高处作业|D.以上都是",
          answer: "D",
          planType: { id: 4, name: "危险化学品企业特殊作业管理GB-30871" }
        },
        {
          id: 14472,
          type: 3,
          title: "动火作业许可证的有效期为（）",
          options: "A.8小时|B.24小时|C.3天|D.1周",
          answer: "A",
          planType: { id: 4, name: "危险化学品企业特殊作业管理GB-30871" }
        },
        {
          id: 14473,
          type: 1,
          title: "受限空间作业必须先进行气体检测",
          options: "正确|错误",
          answer: "正确",
          planType: { id: 4, name: "危险化学品企业特殊作业管理GB-30871" }
        },
        {
          id: 14474,
          type: 2,
          title: "高处作业是指作业高度在（）以上",
          options: "A.1米|B.2米|C.3米|D.5米",
          answer: "B",
          planType: { id: 4, name: "危险化学品企业特殊作业管理GB-30871" }
        },
        {
          id: 14475,
          type: 3,
          title: "职业健康防护设施包括（）",
          options: "A.通风设施|B.除尘设施|C.降噪设施|D.以上都是",
          answer: "D",
          planType: { id: 5, name: "职业健康管理制度和操作规程培训" }
        },
        {
          id: 14476,
          type: 1,
          title: "劳动者有权拒绝违章指挥和强令冒险作业",
          options: "正确|错误",
          answer: "正确",
          planType: { id: 5, name: "职业健康管理制度和操作规程培训" }
        },
        {
          id: 14477,
          type: 2,
          title: "灭火器的压力表指针在（）区域表示正常",
          options: "A.红色|B.黄色|C.绿色|D.白色",
          answer: "C",
          planType: { id: 6, name: "3月安全月警示教育视频" }
        },
        {
          id: 14478,
          type: 3,
          title: "火灾逃生时应（）",
          options: "A.乘坐电梯|B.沿安全通道逃生|C.跳楼逃生|D.躲在柜子里",
          answer: "B",
          planType: { id: 6, name: "3月安全月警示教育视频" }
        },
        {
          id: 14479,
          type: 1,
          title: "电器火灾可以使用水扑灭",
          options: "正确|错误",
          answer: "错误",
          planType: { id: 6, name: "3月安全月警示教育视频" }
        }
      ];

      // 过滤
      let filteredData = allData;
      if (typeId !== -1) {
        filteredData = filteredData.filter(item => item.planType.id === typeId);
      }
      if (title) {
        filteredData = filteredData.filter(item => item.title.includes(title));
      }

      // 分页
      const start = page * size;
      const end = start + size;
      const content = filteredData.slice(start, end);

      return {
        success: true,
        t: {
          content,
          totalElements: filteredData.length,
          totalPages: Math.ceil(filteredData.length / size),
          size,
          number: page
        }
      };
    }
  },
  // 获取考试类型列表
  {
    url: "/sft/train/plantype/all.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: [
          { id: 1, name: "双重预防专项培训" },
          { id: 2, name: "两重点一重大专项培训" },
          { id: 3, name: "安全用电教育培训" },
          { id: 4, name: "危险化学品企业特殊作业管理GB-30871" },
          { id: 5, name: "职业健康管理制度和操作规程培训" },
          { id: 6, name: "3月安全月警示教育视频" },
          { id: 7, name: "3月警示教育" },
          { id: 8, name: "2026年开工第一课" }
        ]
      };
    }
  },
  // 删除单个题目
  {
    url: "/sft/train/itembank/del/:id.json",
    method: "get",
    response: () => {
      return { success: true };
    }
  },
  // 批量删除题目
  {
    url: "/sft/train/itembank/dels.json",
    method: "post",
    response: () => {
      return { success: true };
    }
  }
]);
