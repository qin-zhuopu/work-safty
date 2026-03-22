import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/danger/danger/statistics/list.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: {
          // 部门隐患统计
          hseCount: 74,
          hseJsCount: 2,
          hseZgCount: 2,
          hseWwcCount: 0,
          hseCqCount: 0,
          yyglCount: 25,
          yyglJsCount: 1,
          yyglZgCount: 1,
          yyglWwcCount: 0,
          yyglCqCount: 0,
          gylCount: 32,
          gylJsCount: 0,
          gylZgCount: 0,
          gylWwcCount: 0,
          gylCqCount: 0,
          jlyxCount: 269,
          jlyxJsCount: 0,
          jlyxZgCount: 0,
          jlyxWwcCount: 0,
          jlyxCqCount: 0,
          djcjCount: 387,
          djcjJsCount: 400,
          djcjZgCount: 400,
          djcjWwcCount: 0,
          djcjCqCount: 0,
          jdycjCount: 85,
          jdycjJsCount: 82,
          jdycjZgCount: 82,
          jdycjWwcCount: 0,
          jdycjCqCount: 0,
          rdcjCount: 286,
          rdcjJsCount: 265,
          rdcjZgCount: 265,
          rdcjWwcCount: 0,
          rdcjCqCount: 0,
          sysCount: 251,
          sysJsCount: 250,
          sysZgCount: 250,
          sysWwcCount: 0,
          sysCqCount: 0,
          taCount: 170,
          taJsCount: 168,
          taZgCount: 168,
          taWwcCount: 0,
          taCqCount: 0,
          // 原因统计
          sjyyCount: 16,
          sgyyCount: 77,
          whyyCount: 689,
          syyyCount: 473,
          cgyyCount: 2,
          qtyyCount: 414,
          // 隐患类型
          aqCount: 549,
          xfCount: 30,
          gyCount: 95,
          ztCount: 4,
          dqCount: 131,
          sbCount: 381,
          ybCount: 130,
          qtCount: 313,
          // 排查类型
          jclxCount: 1608,
          jclx1Count: 15,
          jclx2Count: 62,
          jclx3Count: 0,
          jclx4Count: 0,
          jclx5Count: 0,
          jclx6Count: 0,
          jclx7Count: 0,
          jclx8Count: 0,
          jclx9Count: 0,
          jclx10Count: 0,
          // 个人隐患上报
          list: [
            { addUserName: "宋小辉", yhCount: "30.0" },
            { addUserName: "颜世龙", yhCount: "9.6" },
            { addUserName: "周景", yhCount: "5.2" },
            { addUserName: "徐志", yhCount: "5.1" },
            { addUserName: "解建斌", yhCount: "5.0" },
            { addUserName: "杨艳华", yhCount: "4.6" },
            { addUserName: "赵伟（机电仪）", yhCount: "4.2" },
            { addUserName: "赵伟（锅炉）", yhCount: "3.5" },
            { addUserName: "袁长勇", yhCount: "2.5" },
            { addUserName: "曲立勇", yhCount: "2.1" }
          ]
        }
      };
    }
  }
]);
