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
            accuracy: 83,
            correct: 42,
            createTime: 1730960990329,
            error: 8,
            id: 11552,
            ptName: "危险化学品生产管理单位安全管理人员题库（1）"
          },
          {
            accuracy: 75,
            correct: 30,
            createTime: 1730950000000,
            error: 10,
            id: 11551,
            ptName: "危险化学品生产管理单位安全管理人员题库（2）"
          },
          {
            accuracy: 90,
            correct: 45,
            createTime: 1730940000000,
            error: 5,
            id: 11550,
            ptName: "化工安全管理制度题库"
          },
          {
            accuracy: 60,
            correct: 24,
            createTime: 1730930000000,
            error: 16,
            id: 11549,
            ptName: "安全生产法律法规题库"
          },
          {
            accuracy: 95,
            correct: 48,
            createTime: 1730920000000,
            error: 2,
            id: 11548,
            ptName: "应急救援知识题库"
          }
        ]
      };
    }
  }
]);
