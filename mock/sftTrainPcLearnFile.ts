import { defineFakeRoute } from "vite-plugin-fake-server/client";

interface LearnFile {
  id: string;
  title: string;
  eduType: string;
  createTime: string;
  collectStatus: number;
  collectId: string;
}

const mockFiles: LearnFile[] = [
  {
    id: "1",
    title: "安全生产监督罚款管理暂行办法",
    eduType: "pdf",
    createTime: "2022-12-20 02:10:42",
    collectStatus: 0,
    collectId: ""
  },
  {
    id: "2",
    title: "危险化学品安全管理条例",
    eduType: "pdf",
    createTime: "2023-01-15 09:30:00",
    collectStatus: 1,
    collectId: "101"
  },
  {
    id: "3",
    title: "化工企业特殊作业安全规范",
    eduType: "ppt",
    createTime: "2023-02-10 14:20:30",
    collectStatus: 0,
    collectId: ""
  },
  {
    id: "4",
    title: "职业病防治法解读",
    eduType: "video",
    createTime: "2023-03-05 10:15:00",
    collectStatus: 1,
    collectId: "102"
  },
  {
    id: "5",
    title: "应急救援预案编制指南",
    eduType: "doc",
    createTime: "2023-04-20 16:45:20",
    collectStatus: 0,
    collectId: ""
  },
  {
    id: "6",
    title: "重大危险源辨识标准",
    eduType: "pdf",
    createTime: "2023-05-12 08:30:15",
    collectStatus: 0,
    collectId: ""
  },
  {
    id: "7",
    title: "安全生产标准化建设教程",
    eduType: "video",
    createTime: "2023-06-08 13:20:40",
    collectStatus: 1,
    collectId: "103"
  },
  {
    id: "8",
    title: "消防安全知识培训课件",
    eduType: "ppt",
    createTime: "2023-07-25 11:00:00",
    collectStatus: 0,
    collectId: ""
  }
];

export default defineFakeRoute([
  // 获取学习资料列表
  {
    url: "/sft/train/pc/edu/lists",
    method: "get",
    response: () => {
      return {
        success: true,
        t: mockFiles
      };
    }
  },
  // 添加收藏
  {
    url: "/sft/train/pc/collect/add/2/:id",
    method: "get",
    response: () => {
      // 返回收藏ID
      return {
        success: true,
        t: `collect_${Date.now()}`
      };
    }
  },
  // 取消收藏
  {
    url: "/sft/train/pc/collect/del/:collectId",
    method: "get",
    response: () => {
      return {
        success: true,
        t: null
      };
    }
  }
]);
