import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/work/loc/list.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: {
          content: [
            {
              addDate: 1774179004204,
              alarmStatus: 2,
              id: 8715687,
              jhr: "路军",
              no: "1918FF018DEF",
              status: 10,
              time: 1774179004204
            },
            {
              addDate: 1774178524129,
              alarmStatus: 2,
              id: 8715678,
              jhr: "路军",
              no: "1918FF018DEF",
              status: 10,
              time: 1774178524129
            },
            {
              addDate: 1774178344196,
              alarmStatus: 2,
              id: 8715674,
              jhr: "路军",
              no: "1918FF018DEF",
              status: 10,
              time: 1774178344196
            },
            {
              addDate: 1774177864059,
              alarmStatus: 2,
              id: 8715665,
              no: "1918FF051CDF",
              status: 10,
              time: 1774177864059
            },
            {
              addDate: 1774177864040,
              alarmStatus: 2,
              id: 8715664,
              jhr: "刘琦",
              no: "1918FF040E73",
              status: 10,
              time: 1774177864040
            },
            {
              addDate: 1774177863954,
              alarmStatus: 2,
              id: 8715663,
              jhr: "郭荣峰",
              no: "1918FF040E4A",
              status: 10,
              time: 1774177863954
            },
            {
              addDate: 1774176903924,
              alarmStatus: 2,
              id: 8715646,
              no: "1918FF051CDF",
              status: 10,
              time: 1774176903924
            },
            {
              addDate: 1774176903904,
              alarmStatus: 2,
              id: 8715645,
              jhr: "刘琦",
              no: "1918FF040E73",
              status: 10,
              time: 1774176903904
            },
            {
              addDate: 1774176903814,
              alarmStatus: 2,
              id: 8715644,
              jhr: "郭荣峰",
              no: "1918FF040E4A",
              status: 10,
              time: 1774176903814
            },
            {
              addDate: 1774176664275,
              alarmStatus: 2,
              id: 8715639,
              jhr: "路军",
              no: "1918FF018DEF",
              status: 10,
              time: 1774176664275
            },
            {
              addDate: 1774176000000,
              alarmStatus: 1,
              id: 8715638,
              jhr: "张三",
              no: "1918FF020001",
              status: 5,
              time: 1774176000000
            },
            {
              addDate: 1774175000000,
              alarmStatus: 1,
              id: 8715637,
              jhr: "李四",
              no: "1918FF020002",
              status: 6,
              time: 1774175000000
            }
          ],
          empty: false,
          first: true,
          last: false,
          number: 0,
          numberOfElements: 10,
          pageable: {
            offset: 0,
            pageNumber: 0,
            pageSize: 10,
            paged: true,
            sort: { empty: false, sorted: true, unsorted: false },
            unpaged: false
          },
          size: 10,
          sort: { empty: false, sorted: true, unsorted: false },
          totalElements: 1358038,
          totalPages: 135804
        }
      };
    }
  }
]);
