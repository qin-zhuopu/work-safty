import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/behavior/safe/frequency/list.json",
    method: "get",
    response: ({ query }: { query: Record<string, string> }) => {
      const page = parseInt(query.page || "1");
      const size = parseInt(query.size || "10");

      const allData = [
        { id: "1", ushow: "张三", num: 15 },
        { id: "2", ushow: "李四", num: 12 },
        { id: "3", ushow: "王五", num: 10 },
        { id: "4", ushow: "赵六", num: 8 },
        { id: "5", ushow: "刘七", num: 7 },
        { id: "6", ushow: "孙八", num: 6 },
        { id: "7", ushow: "周九", num: 5 },
        { id: "8", ushow: "吴十", num: 4 },
        { id: "9", ushow: "郑一", num: 3 },
        { id: "10", ushow: "王二", num: 2 },
        { id: "11", ushow: "冯三", num: 1 },
        { id: "12", ushow: "陈四", num: 1 }
      ];

      const start = (page - 1) * size;
      const end = start + size;
      const content = allData.slice(start, end);

      return {
        success: true,
        t: {
          content,
          totalElements: allData.length
        }
      };
    }
  }
]);
