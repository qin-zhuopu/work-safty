import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/train/pc/edu/my/record",
    method: "get",
    response: () => {
      return {
        success: true,
        t: {
          list1: [
            {
              name: "张三",
              title: "安全生产法律法规培训",
              create_time: 1710979200000,
              timeStr: "2小时30分",
              count: 3
            },
            {
              name: "李四",
              title: "危险化学品安全管理培训",
              create_time: 1710892800000,
              timeStr: "1小时45分",
              count: 2
            },
            {
              name: "王五",
              title: "消防知识培训",
              create_time: 1710806400000,
              timeStr: "3小时15分",
              count: 5
            },
            {
              name: "赵六",
              title: "应急救援演练培训",
              create_time: 1710720000000,
              timeStr: "2小时00分",
              count: 1
            },
            {
              name: "孙七",
              title: "职业健康培训",
              create_time: 1710633600000,
              timeStr: "1小时30分",
              count: 2
            },
            {
              name: "周八",
              title: "特种设备安全操作培训",
              create_time: 1710547200000,
              timeStr: "4小时00分",
              count: 4
            },
            {
              name: "吴九",
              title: "环境保护与污染防治培训",
              create_time: 1710460800000,
              timeStr: "2小时45分",
              count: 3
            },
            {
              name: "郑十",
              title: "双重预防机制培训",
              create_time: 1710374400000,
              timeStr: "3小时30分",
              count: 6
            }
          ]
        }
      };
    }
  }
]);
