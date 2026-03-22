import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/data/alarm2/list",
    method: "get",
    response: ({ query }) => {
      const page = Number(query.page || 0);
      const size = Number(query.size || 10);

      return {
        success: true,
        t: {
          content: [
            {
              id: 4776,
              algorithmName: "安全帽检测",
              cameraName: "中化楼闸机西上午",
              comId: 1,
              deviceIp: "10.32.174.218",
              deviceName: "测试机器",
              discernArea: "默认区域",
              pic_data:
                "ssc-dzsh/alarm/20231009/e71af72a-1699-44aa-b360-ca2c58a08a3c.jpeg",
              timeStamp: 1696843214147
            },
            {
              id: 4772,
              algorithmName: "安全帽检测",
              cameraName: "化工北门正西",
              channelCode: "f3ed38d75922424b98b78e0a0ac81566",
              comId: 1,
              deviceCode: "34020000001320000001",
              deviceIp: "10.32.174.218",
              deviceName: "测试机器",
              discernArea: "默认区域",
              pic_data:
                "ssc-dzsh/alarm/20231009/8bd2ea74-7648-423c-a89a-3f9083e08614.jpeg",
              timeStamp: 1696840101425
            },
            {
              id: 4762,
              algorithmName: "安全帽检测",
              cameraName: "化工北门正西",
              comId: 1,
              deviceIp: "10.32.174.218",
              deviceName: "测试机器",
              discernArea: "默认区域",
              pic_data:
                "ssc-dzsh/alarm/20231009/edebe533-d0fc-4994-8329-a55843c9b011.jpeg",
              timeStamp: 1696834361997
            },
            {
              id: 4721,
              algorithmName: "安全帽检测",
              cameraName: "化工北门正西",
              comId: 1,
              deviceIp: "10.32.174.218",
              deviceName: "测试机器",
              discernArea: "默认区域",
              pic_data:
                "ssc-dzsh/alarm/20230928/f1321398-498d-460f-9dda-7447d62d19ff.jpeg",
              timeStamp: 1695855037239
            },
            {
              id: 4720,
              algorithmName: "安全帽检测",
              cameraName: "化工北门正西",
              comId: 1,
              deviceIp: "10.32.174.218",
              deviceName: "测试机器",
              discernArea: "默认区域",
              pic_data:
                "ssc-dzsh/alarm/20230928/70d7939e-2c9f-4b04-b7ff-8e9dc04c7b28.jpeg",
              timeStamp: 1695834645941
            },
            {
              id: 4711,
              algorithmName: "安全帽检测",
              cameraName: "化工北门正南",
              comId: 1,
              deviceIp: "10.32.174.218",
              deviceName: "测试机器",
              discernArea: "默认区域",
              pic_data:
                "ssc-dzsh/alarm/20230927/541d466b-6983-4012-8150-d32133356554.jpeg",
              timeStamp: 1695800660165
            },
            {
              id: 4694,
              algorithmName: "安全帽检测",
              cameraName: "化工北门正西",
              channelCode: "f3ed38d75922424b98b78e0a0ac81566",
              comId: 1,
              deviceCode: "34020000001320000001",
              deviceIp: "10.32.174.218",
              deviceName: "测试机器",
              discernArea: "默认区域",
              pic_data:
                "ssc-dzsh/alarm/20230926/d514172e-f11a-49ee-ac84-88b02ee02439.jpeg",
              timeStamp: 1695725902241
            },
            {
              id: 4671,
              algorithmName: "安全帽检测",
              cameraName: "化工北门正西",
              comId: 1,
              deviceIp: "10.32.174.218",
              deviceName: "测试机器",
              discernArea: "默认区域",
              pic_data:
                "ssc-dzsh/alarm/20230926/c7ab605b-9da7-4e0f-9e31-46fe8fd7dfda.jpeg",
              timeStamp: 1695707118400
            },
            {
              id: 4664,
              algorithmName: "安全帽检测",
              cameraName: "化工北门正南",
              comId: 1,
              deviceIp: "10.32.174.218",
              deviceName: "测试机器",
              discernArea: "默认区域",
              pic_data:
                "ssc-dzsh/alarm/20230926/e0ee5725-cc63-4a13-8dc8-73094aa3d4dc.jpeg",
              timeStamp: 1695684182988
            },
            {
              id: 4646,
              algorithmName: "安全帽检测",
              cameraName: "化工北门正南",
              comId: 1,
              deviceIp: "10.32.174.218",
              deviceName: "测试机器",
              discernArea: "默认区域",
              pic_data:
                "ssc-dzsh/alarm/20230925/43f0118f-6a85-4efd-8888-5b4922cfd6f1.jpeg",
              timeStamp: 1695615275190
            }
          ],
          empty: false,
          first: true,
          last: false,
          number: page,
          numberOfElements: 10,
          pageable: {
            offset: page * size,
            pageNumber: page,
            pageSize: size,
            paged: true,
            sort: {
              empty: false,
              sorted: true,
              unsorted: false
            },
            unpaged: false
          },
          size: size,
          sort: {
            empty: false,
            sorted: true,
            unsorted: false
          },
          totalElements: 361,
          totalPages: 37
        }
      };
    }
  },
  {
    url: "/sft/data/alarm2/del/:id",
    method: "get",
    response: () => {
      return { success: true };
    }
  },
  {
    url: "/sft/data/alarm2/dels",
    method: "post",
    response: () => {
      return { success: true };
    }
  },
  {
    url: "/sft/data/alarm2/send/:id",
    method: "get",
    response: () => {
      return { success: true };
    }
  }
]);
