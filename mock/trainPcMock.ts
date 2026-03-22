import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/train/pc/ibank/type.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: [
          { id: 1, name: "安全" },
          { id: 3, name: "测试" },
          { id: 5, name: "2月事故警示" },
          { id: 6, name: "JHA培训" },
          { id: 7, name: "工伤知识培训" },
          { id: 8, name: "受限空间作业" },
          { id: 9, name: "动火作业" },
          { id: 10, name: "高处作业" },
          { id: 11, name: "吊装作业" },
          { id: 12, name: "临时用电" },
          { id: 13, name: "动土作业" },
          { id: 14, name: "断路作业" },
          { id: 15, name: "设备检维修" },
          { id: 16, name: "危险化学品管理" },
          { id: 17, name: "应急救援知识" },
          { id: 18, name: "消防安全" },
          { id: 19, name: "环境保护" },
          { id: 20, name: "职业健康" }
        ]
      };
    }
  }
]);
