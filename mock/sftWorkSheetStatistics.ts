import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/work/sheet/statistics/list",
    method: "get",
    response: () => {
      return {
        success: true,
        t: {
          sqzList: [24, 21, 12, 39, 40, 36, 22, 34, 27, 19, 12, 39],
          spzList: [12, 9, 4, 24, 21, 16, 12, 17, 9, 6, 21, 16],
          yjsList: [19, 11, 8, 31, 25, 21, 14, 27, 17, 11, 11, 8],
          ybhList: [7, 4, 6, 14, 19, 21, 11, 15, 9, 4, 4, 6],
          jjtzList: [2, 0, 3, 7, 0, 2, 7, 0, 9, 0, 2, 7],
          sgdwList: [
            {
              deptName: "德州同升建筑工程有限公司",
              sqz: 24,
              spz: 12,
              yjs: 19,
              ybh: 7,
              jjtz: 2
            },
            {
              deptName: "济宁兰博生物科技有限公司",
              sqz: 21,
              spz: 9,
              yjs: 11,
              ybh: 4,
              jjtz: 0
            },
            {
              deptName: "德州汇邦机电设备安装工程有限公司",
              sqz: 12,
              spz: 4,
              yjs: 8,
              ybh: 6,
              jjtz: 3
            },
            {
              deptName: "河南东泰建设工程有限公司",
              sqz: 39,
              spz: 24,
              yjs: 31,
              ybh: 14,
              jjtz: 7
            },
            {
              deptName: "济南一诺振华防腐保温工程有限公司",
              sqz: 40,
              spz: 21,
              yjs: 25,
              ybh: 19,
              jjtz: 0
            },
            {
              deptName: "山东修能管道工程有限公司",
              sqz: 36,
              spz: 16,
              yjs: 21,
              ybh: 21,
              jjtz: 2
            },
            {
              deptName: "德州正通市政公用工程有限公司",
              sqz: 22,
              spz: 12,
              yjs: 14,
              ybh: 11,
              jjtz: 7
            },
            {
              deptName: "山东鸿华建筑安装工程有限公司",
              sqz: 34,
              spz: 17,
              yjs: 27,
              ybh: 15,
              jjtz: 0
            },
            {
              deptName: "山东省显通安装有限公司",
              sqz: 27,
              spz: 9,
              yjs: 17,
              ybh: 9,
              jjtz: 9
            },
            {
              deptName: "山东宏达建设工程有限公司",
              sqz: 19,
              spz: 6,
              yjs: 11,
              ybh: 4,
              jjtz: 0
            },
            {
              deptName: "山东九安特科技有限公司",
              sqz: 12,
              spz: 21,
              yjs: 11,
              ybh: 4,
              jjtz: 2
            },
            {
              deptName: "山东广帮建筑安装有限公司",
              sqz: 39,
              spz: 16,
              yjs: 8,
              ybh: 6,
              jjtz: 7
            },
            {
              deptName: "山东福源建设集团有限公司",
              sqz: 40,
              spz: 12,
              yjs: 31,
              ybh: 14,
              jjtz: 0
            },
            {
              deptName: "丰邺建设有限公司",
              sqz: 21,
              spz: 9,
              yjs: 11,
              ybh: 4,
              jjtz: 0
            },
            {
              deptName: "常兴集团有限公司",
              sqz: 12,
              spz: 4,
              yjs: 8,
              ybh: 6,
              jjtz: 3
            },
            {
              deptName: "德州恒顺市政公用工程有限公司",
              sqz: 39,
              spz: 24,
              yjs: 31,
              ybh: 14,
              jjtz: 7
            },
            {
              deptName: "山东英明耐火材料有限公司",
              sqz: 40,
              spz: 21,
              yjs: 25,
              ybh: 19,
              jjtz: 0
            },
            {
              deptName: "中科信达建工集团有限公司",
              sqz: 36,
              spz: 16,
              yjs: 21,
              ybh: 21,
              jjtz: 2
            },
            {
              deptName: "山东联兴建设集团有限责任公司",
              sqz: 22,
              spz: 12,
              yjs: 14,
              ybh: 11,
              jjtz: 7
            },
            {
              deptName: "德州宏宇无损检测有限公司",
              sqz: 34,
              spz: 17,
              yjs: 27,
              ybh: 15,
              jjtz: 0
            },
            {
              deptName: "浙江中天智汇安装工程有限公司",
              sqz: 27,
              spz: 9,
              yjs: 17,
              ybh: 9,
              jjtz: 9
            },
            {
              deptName: "中誉长青建设有限公司",
              sqz: 19,
              spz: 6,
              yjs: 11,
              ybh: 4,
              jjtz: 0
            },
            {
              deptName: "郑州正耐实业有限公司",
              sqz: 12,
              spz: 21,
              yjs: 11,
              ybh: 4,
              jjtz: 2
            },
            {
              deptName: "山东泰石建筑安装有限公司",
              sqz: 39,
              spz: 16,
              yjs: 8,
              ybh: 6,
              jjtz: 7
            },
            {
              deptName: "山东四方安装工程有限公司",
              sqz: 40,
              spz: 12,
              yjs: 31,
              ybh: 14,
              jjtz: 0
            },
            {
              deptName: "济宁嘉泰水处理有限公司",
              sqz: 21,
              spz: 9,
              yjs: 11,
              ybh: 4,
              jjtz: 0
            },
            {
              deptName: "山东鹏辉智能科技有限公司",
              sqz: 12,
              spz: 4,
              yjs: 8,
              ybh: 6,
              jjtz: 3
            },
            {
              deptName: "山东神腾电力建设有限公司",
              sqz: 39,
              spz: 24,
              yjs: 31,
              ybh: 14,
              jjtz: 7
            },
            {
              deptName: "德州远盛吊装有限公司",
              sqz: 40,
              spz: 21,
              yjs: 25,
              ybh: 19,
              jjtz: 0
            },
            {
              deptName: "德州凯恩机械设备租赁有限公司",
              sqz: 36,
              spz: 16,
              yjs: 21,
              ybh: 21,
              jjtz: 2
            },
            {
              deptName: "山东德兴集团建设工程有限公司",
              sqz: 22,
              spz: 12,
              yjs: 14,
              ybh: 11,
              jjtz: 7
            },
            {
              deptName: "德州德展装饰工程有限公司",
              sqz: 34,
              spz: 17,
              yjs: 27,
              ybh: 15,
              jjtz: 0
            }
          ]
        }
      };
    }
  }
]);
