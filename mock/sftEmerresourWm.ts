import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/emerresour/wm/list.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: {
          content: [
            {
              addDate: 1684629137970,
              addUser: {
                id: 109,
                uname: "admin",
                ushow: "管理员"
              },
              cycle: "每天",
              delFlag: 0,
              endTime: 1738368000000,
              field: "白班",
              field1: "日常值班",
              id: 1,
              perNum: 3,
              status: 1,
              startTime: 1735689600000
            },
            {
              addDate: 1684715537000,
              addUser: {
                id: 109,
                uname: "admin",
                ushow: "管理员"
              },
              cycle: "每天",
              delFlag: 0,
              endTime: 1738454400000,
              field: "夜班",
              field1: "夜间值班",
              id: 2,
              perNum: 2,
              status: 1,
              startTime: 1735776000000
            },
            {
              addDate: 1684801938000,
              addUser: {
                id: 109,
                uname: "admin",
                ushow: "管理员"
              },
              cycle: "每周",
              delFlag: 0,
              endTime: 1738540800000,
              field: "周末值班",
              field1: "周末应急值守",
              id: 3,
              perNum: 4,
              status: 2,
              startTime: 1735862400000
            },
            {
              addDate: 1684888339000,
              addUser: {
                id: 109,
                uname: "admin",
                ushow: "管理员"
              },
              cycle: "节假日",
              delFlag: 0,
              endTime: 1738627200000,
              field: "节假日值班",
              field1: "节假日应急值守",
              id: 4,
              perNum: 5,
              status: 1,
              startTime: 1735948800000
            },
            {
              addDate: 1684974740000,
              addUser: {
                id: 109,
                uname: "admin",
                ushow: "管理员"
              },
              cycle: "每天",
              delFlag: 0,
              endTime: 1738713600000,
              field: "应急值班A组",
              field1: "应急处置",
              id: 5,
              perNum: 3,
              status: 2,
              startTime: 1736035200000
            },
            {
              addDate: 1685061141000,
              addUser: {
                id: 109,
                uname: "admin",
                ushow: "管理员"
              },
              cycle: "每天",
              delFlag: 0,
              endTime: 1738800000000,
              field: "应急值班B组",
              field1: "应急处置",
              id: 6,
              perNum: 3,
              status: 1,
              startTime: 1736121600000
            },
            {
              addDate: 1685147542000,
              addUser: {
                id: 109,
                uname: "admin",
                ushow: "管理员"
              },
              cycle: "每周",
              delFlag: 0,
              endTime: 1738886400000,
              field: "周三值班",
              field1: "周三例行检查",
              id: 7,
              perNum: 2,
              status: 1,
              startTime: 1736208000000
            },
            {
              addDate: 1685233943000,
              addUser: {
                id: 109,
                uname: "admin",
                ushow: "管理员"
              },
              cycle: "每月",
              delFlag: 0,
              endTime: 1738972800000,
              field: "月末值班",
              field1: "月末汇总值班",
              id: 8,
              perNum: 4,
              status: 1,
              startTime: 1736294400000
            }
          ],
          totalElements: 8
        }
      };
    }
  }
]);
