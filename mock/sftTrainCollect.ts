import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  // 学习资料列表
  {
    url: "/sft/train/collect/studyMaterials.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: [
          {
            id: 38020,
            name: "双重预防专项培训",
            url: "http://60.247.109.61:18880/ssc-dzsh/1/740e8e0b0f6e467db6614bd8a890a2d2.mp4",
            collectTime: "2026-03-19 10:14:46"
          },
          {
            id: 38021,
            name: "安全生产法培训",
            url: "http://60.247.109.61:18880/ssc-dzsh/1/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6.mp4",
            collectTime: "2026-03-18 14:30:22"
          },
          {
            id: 38022,
            name: "危化品安全管理培训",
            url: "http://60.247.109.61:18880/ssc-dzsh/1/x1y2z3a4b5c6d7e8f9g0h1i2j3k4l5m6.mp4",
            collectTime: "2026-03-17 09:15:33"
          }
        ]
      };
    }
  },
  // 考试题目列表
  {
    url: "/sft/train/collect/examQuestions.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: [
          {
            id: 45001,
            name: "安全生产法的立法目的是什么？",
            type: "单选题",
            options:
              "A.加强安全生产工作  B.防止和减少生产安全事故  C.保障人民群众生命和财产安全  D.以上都是",
            correctAnswer: "D"
          },
          {
            id: 45002,
            name: "危险化学品储存场所应当具备什么条件？",
            type: "单选题",
            options:
              "A.符合国家标准的设施  B.明显的安全警示标志  C.应急预案  D.以上都是",
            correctAnswer: "D"
          },
          {
            id: 45003,
            name: "以下哪些属于特种作业人员？",
            type: "多选题",
            options: "A.电工作业  B.焊接与热切割作业  C.高处作业  D.以上都是",
            correctAnswer: "D"
          }
        ]
      };
    }
  },
  // 取消收藏
  {
    url: "/sft/train/collect/del/:id",
    method: "get",
    response: ({ params }: any) => {
      console.log(`取消收藏 ID: ${params.id}`);
      return {
        success: true,
        message: "删除成功"
      };
    }
  }
]);
