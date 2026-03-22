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
              count: 1,
              create_time: 1720166015902,
              id: 130,
              learnTimeValue: 0.0,
              name: "耿傲",
              setTimeValue: 0,
              time: 3,
              timeStr: "0时0分3秒",
              title: "作业审批人培训"
            },
            {
              count: 2,
              create_time: 1683550416831,
              id: 40,
              learnTimeValue: 0.0,
              name: "耿傲",
              setTimeValue: 0,
              time: 8,
              timeStr: "0时0分8秒",
              title: '"德州实华重要风险分布情况"明白纸'
            },
            {
              count: 1,
              create_time: 1674009537945,
              id: 5,
              learnTimeValue: 0.0,
              name: "耿傲",
              setTimeValue: 0,
              time: 6,
              timeStr: "0时0分6秒",
              title: "2023年一月事故分享中国中化FORUS宣传片"
            },
            {
              count: 1,
              create_time: 1670286156924,
              id: 2,
              learnTimeValue: 0.0,
              name: "耿傲",
              setTimeValue: 0,
              time: 2,
              timeStr: "0时0分2秒",
              title: "事故警示视频"
            },
            {
              count: 3,
              create_time: 1720166015902,
              id: 131,
              learnTimeValue: 0.0,
              name: "张三",
              setTimeValue: 0,
              time: 15,
              timeStr: "0时0分15秒",
              title: "安全生产法培训"
            },
            {
              count: 1,
              create_time: 1683550416831,
              id: 41,
              learnTimeValue: 0.0,
              name: "李四",
              setTimeValue: 0,
              time: 10,
              timeStr: "0时0分10秒",
              title: "特种设备安全操作规程"
            },
            {
              count: 2,
              create_time: 1674009537945,
              id: 6,
              learnTimeValue: 0.0,
              name: "王五",
              setTimeValue: 0,
              time: 25,
              timeStr: "0时0分25秒",
              title: "危险化学品安全管理培训"
            }
          ],
          zongTime: 69,
          zongTimeStr: "0时1分9秒"
        }
      };
    }
  }
]);
