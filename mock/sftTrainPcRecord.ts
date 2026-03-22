import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/train/pc/ibank/test/list.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: [
          {
            id: 11552,
            ptName: "危险化学品生产管理单位安全管理人员题库（1）",
            correct: 42,
            error: 8,
            accuracy: 83,
            createTime: 1730960990329
          },
          {
            id: 11553,
            ptName: "化工安全通用题库",
            correct: 35,
            error: 5,
            accuracy: 88,
            createTime: 1730970000000
          },
          {
            id: 11554,
            ptName: "特种作业人员安全技术题库",
            correct: 28,
            error: 12,
            accuracy: 70,
            createTime: 1730980000000
          },
          {
            id: 11555,
            ptName: "安全生产法律法规题库",
            correct: 45,
            error: 3,
            accuracy: 94,
            createTime: 1730990000000
          },
          {
            id: 11556,
            ptName: "职业健康管理制度题库",
            correct: 30,
            error: 10,
            accuracy: 75,
            createTime: 1731000000000
          }
        ]
      };
    }
  }
]);
