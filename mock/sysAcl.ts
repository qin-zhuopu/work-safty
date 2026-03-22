import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/sys/acl/list.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: [
          {
            id: 1,
            name: "系统管理",
            code: "sys",
            type: "menu",
            url: "/sys",
            parentId: 0,
            addDate: 1678905600000,
            children: [
              {
                id: 11,
                name: "用户管理",
                code: "sys:user",
                type: "menu",
                url: "/sys/user",
                parentId: 1,
                addDate: 1678905601000
              },
              {
                id: 12,
                name: "角色管理",
                code: "sys:role",
                type: "menu",
                url: "/sys/role",
                parentId: 1,
                addDate: 1678905602000
              },
              {
                id: 13,
                name: "权限管理",
                code: "sys:acl",
                type: "menu",
                url: "/sys/acl",
                parentId: 1,
                addDate: 1678905603000
              }
            ]
          },
          {
            id: 2,
            name: "履职管理",
            code: "resum",
            type: "menu",
            url: "/resum",
            parentId: 0,
            addDate: 1678905604000,
            children: [
              {
                id: 21,
                name: "排查计划",
                code: "resum:plan",
                type: "menu",
                url: "/resum/plan",
                parentId: 2,
                addDate: 1678905605000
              },
              {
                id: 22,
                name: "隐患排查",
                code: "resum:danger",
                type: "menu",
                url: "/resum/danger",
                parentId: 2,
                addDate: 1678905606000
              }
            ]
          },
          {
            id: 3,
            name: "培训管理",
            code: "train",
            type: "menu",
            url: "/train",
            parentId: 0,
            addDate: 1678905607000,
            children: [
              {
                id: 31,
                name: "培训类型",
                code: "train:plantype",
                type: "menu",
                url: "/train/plantype",
                parentId: 3,
                addDate: 1678905608000
              },
              {
                id: 32,
                name: "培训记录",
                code: "train:record",
                type: "menu",
                url: "/train/record",
                parentId: 3,
                addDate: 1678905609000
              }
            ]
          },
          {
            id: 4,
            name: "数据管理",
            code: "data",
            type: "menu",
            url: "/data",
            parentId: 0,
            addDate: 1678905610000,
            children: [
              {
                id: 41,
                name: "GDS数据",
                code: "data:gds",
                type: "menu",
                url: "/data/gds",
                parentId: 4,
                addDate: 1678905611000
              }
            ]
          },
          {
            id: 5,
            name: "作业管理",
            code: "work",
            type: "menu",
            url: "/work",
            parentId: 0,
            addDate: 1678905612000,
            children: [
              {
                id: 51,
                name: "文档摄像头",
                code: "work:doccamera",
                type: "menu",
                url: "/work/doccamera",
                parentId: 5,
                addDate: 1678905613000
              }
            ]
          }
        ]
      };
    }
  }
]);
