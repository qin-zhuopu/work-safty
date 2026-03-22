import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/resum/plan/statistics/user.json",
    method: "get",
    response: ({ query }) => {
      const page = Number(query.page || 0);
      const size = Number(query.size || 10);

      const allData = [
        {
          cycle: "主要负责人",
          rate: "83.00%",
          ushow: "李宝瑞",
          wxjCount: "143",
          yxjCount: "710",
          zCount: "853"
        },
        {
          cycle: "操作负责人",
          rate: "100.00%",
          ushow: "张海伟",
          wxjCount: "0",
          yxjCount: "330",
          zCount: "330"
        },
        {
          cycle: "技术负责人",
          rate: "100.00%",
          ushow: "周厂生",
          wxjCount: "0",
          yxjCount: "54",
          zCount: "54"
        },
        {
          cycle: "操作负责人",
          rate: "66.00%",
          ushow: "周先锋",
          wxjCount: "4000",
          yxjCount: "7860",
          zCount: "11860"
        },
        {
          cycle: "技术负责人",
          rate: "79.00%",
          ushow: "梁玉勇",
          wxjCount: "243",
          yxjCount: "927",
          zCount: "1170"
        },
        {
          cycle: "操作负责人",
          rate: "80.00%",
          ushow: "王振",
          wxjCount: "240",
          yxjCount: "990",
          zCount: "1230"
        },
        {
          cycle: "操作负责人",
          rate: "100.00%",
          ushow: "艾卫东",
          wxjCount: "0",
          yxjCount: "1440",
          zCount: "1440"
        },
        {
          cycle: "技术负责人",
          rate: "79.00%",
          ushow: "王硕",
          wxjCount: "54",
          yxjCount: "198",
          zCount: "252"
        },
        {
          cycle: "操作负责人",
          rate: "72.00%",
          ushow: "侯守慧",
          wxjCount: "1620",
          yxjCount: "4140",
          zCount: "5760"
        },
        {
          cycle: "操作负责人",
          rate: "63.00%",
          ushow: "杜朋",
          wxjCount: "900",
          yxjCount: "1500",
          zCount: "2400"
        },
        {
          cycle: "主要负责人",
          rate: "90.00%",
          ushow: "赵明",
          wxjCount: "50",
          yxjCount: "450",
          zCount: "500"
        },
        {
          cycle: "技术负责人",
          rate: "85.00%",
          ushow: "孙强",
          wxjCount: "30",
          yxjCount: "170",
          zCount: "200"
        },
        {
          cycle: "操作负责人",
          rate: "95.00%",
          ushow: "李华",
          wxjCount: "25",
          yxjCount: "475",
          zCount: "500"
        }
      ];

      const totalElements = allData.length;
      const totalPages = Math.ceil(totalElements / size);
      const start = page * size;
      const end = start + size;
      const content = allData.slice(start, end);

      return {
        success: true,
        t: {
          content,
          empty: false,
          first: page === 0,
          last: page >= totalPages - 1,
          number: page,
          numberOfElements: content.length,
          pageable: {
            offset: start,
            pageNumber: page,
            pageSize: size,
            paged: true,
            sort: { empty: true, sorted: false, unsorted: true },
            unpaged: false
          },
          size,
          sort: { empty: true, sorted: false, unsorted: true },
          totalElements,
          totalPages
        }
      };
    }
  }
]);
