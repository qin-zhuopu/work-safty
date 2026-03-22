import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 模拟数据 - 作业票证视频监控 (布控球设备)
const mockData = [
  {
    id: 778,
    name: "布控球_004",
    seno: "511d862a471e4d1e8930f228ef4ed43b",
    status: 1
  },
  {
    id: 779,
    name: "布控球_003",
    seno: "127a6ae0894a4b419d78fc1109117a91",
    status: 1
  },
  {
    id: 780,
    name: "布控球_009",
    seno: "296f4735db0d4642ac6cab5d04a01fce",
    status: 1
  },
  {
    id: 781,
    name: "布控球_010",
    seno: "f4085036612641d6a3f04f248ce2fc20",
    status: 1
  },
  {
    id: 782,
    name: "布控球_005",
    seno: "0bce047a09dd44e7ad9ab526433883ac",
    status: 1
  },
  {
    id: 783,
    name: "布控球_007",
    seno: "c9372340d17f4f65bb1dcf59ee4e2a32",
    status: 1
  },
  {
    id: 784,
    name: "布控球_008",
    seno: "f34bedf07315478e8ee22075b10a69ef",
    status: 1
  },
  {
    id: 785,
    name: "布控球_002",
    seno: "b7b26c2df29f405ba352ae1abb792a1d",
    status: 1
  },
  {
    id: 786,
    name: "布控球_006",
    seno: "eec6a73f645949a8b9cd6091c7347562",
    status: 1
  },
  {
    id: 812,
    name: "布控球_001",
    seno: "99a48f91d5a143848afe1282d5ad2716",
    status: 1
  }
];

export default defineFakeRoute([
  {
    url: "/sft/work/doccamera/list.json",
    method: "get",
    response: ({ query }) => {
      const page = parseInt(query.page as string) || 0;
      const size = parseInt(query.size as string) || 10;

      // 分页
      const start = page * size;
      const end = start + size;
      const pageData = mockData.slice(start, end);

      return {
        success: true,
        t: {
          content: pageData,
          totalElements: mockData.length,
          totalPages: 1,
          size,
          number: page,
          first: page === 0,
          last: end >= mockData.length,
          numberOfElements: pageData.length,
          empty: pageData.length === 0,
          pageable: {
            offset: 0,
            pageNumber: page,
            pageSize: size,
            paged: true,
            unpaged: false,
            sort: { empty: true, sorted: false, unsorted: true }
          },
          sort: { empty: true, sorted: false, unsorted: true }
        }
      };
    }
  }
]);
