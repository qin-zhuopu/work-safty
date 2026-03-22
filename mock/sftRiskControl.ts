import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  // 风险管控列表
  {
    url: "/sft/risk/control/list.json",
    method: "get",
    response: ({ query }) => {
      const page = Number(query.page) || 1;
      const size = Number(query.size) || 10;

      const mockData = [
        {
          id: 1165,
          name: "鹤管",
          type: "设备设施类",
          eventName: "其他伤害、高处坠落",
          evalMethod: "LS",
          address: "储运处成品工段",
          evaLevel: "四级",
          fixedLevel: "三级",
          controLevel: "蓝",
          controRank: "工段班组岗位级",
          target: {
            id: "155",
            name: "仓储管理办-580成品工段"
          },
          dept: {
            id: "2496",
            name: "仓储物流办公室"
          },
          ushow: "田昊",
          pointsName: ""
        },
        {
          id: 1166,
          name: "装车台",
          type: "设备设施类",
          eventName: "火灾、其他伤害",
          evalMethod: "LS",
          address: "储运处成品工段",
          evaLevel: "三级",
          fixedLevel: "二级",
          controLevel: "黄",
          controRank: "车间级",
          target: {
            id: "155",
            name: "仓储管理办-580成品工段"
          },
          dept: {
            id: "2496",
            name: "仓储物流办公室"
          },
          ushow: "李明",
          pointsName: ""
        },
        {
          id: 1167,
          name: "储罐区",
          type: "设备设施类",
          eventName: "火灾、爆炸",
          evalMethod: "LS",
          address: "储运处原料工段",
          evaLevel: "二级",
          fixedLevel: "一级",
          controLevel: "橙",
          controRank: "处室级",
          target: {
            id: "156",
            name: "仓储管理办-原料工段"
          },
          dept: {
            id: "2496",
            name: "仓储物流办公室"
          },
          ushow: "王强",
          pointsName: ""
        },
        {
          id: 1168,
          name: "反应釜操作",
          type: "作业活动类",
          eventName: "中毒、灼烫",
          evalMethod: "JHA",
          address: "聚合车间",
          evaLevel: "一级",
          fixedLevel: "一级",
          controLevel: "红",
          controRank: "公司级",
          target: {
            id: "157",
            name: "聚合车间"
          },
          dept: {
            id: "2500",
            name: "聚合车间"
          },
          ushow: "张伟",
          pointsName: ""
        },
        {
          id: 1169,
          name: "巡检作业",
          type: "作业活动类",
          eventName: "高处坠落、物体打击",
          evalMethod: "JHA",
          address: "氯乙烯车间",
          evaLevel: "三级",
          fixedLevel: "三级",
          controLevel: "黄",
          controRank: "车间级",
          target: {
            id: "158",
            name: "氯乙烯车间"
          },
          dept: {
            id: "2501",
            name: "氯乙烯车间"
          },
          ushow: "刘洋",
          pointsName: ""
        },
        {
          id: 1170,
          name: "阀门检修",
          type: "作业活动类",
          eventName: "灼烫、其他伤害",
          evalMethod: "JHA",
          address: "烧碱车间",
          evaLevel: "四级",
          fixedLevel: "四级",
          controLevel: "蓝",
          controRank: "工段班组岗位级",
          target: {
            id: "159",
            name: "烧碱车间"
          },
          dept: {
            id: "2502",
            name: "烧碱车间"
          },
          ushow: "陈静",
          pointsName: ""
        },
        {
          id: 1171,
          name: "装卸作业",
          type: "作业活动类",
          eventName: "车辆伤害、物体打击",
          evalMethod: "JHA",
          address: "储运处",
          evaLevel: "三级",
          fixedLevel: "二级",
          controLevel: "黄",
          controRank: "车间级",
          target: {
            id: "160",
            name: "储运处"
          },
          dept: {
            id: "2496",
            name: "仓储物流办公室"
          },
          ushow: "赵敏",
          pointsName: ""
        },
        {
          id: 1172,
          name: "受限空间作业",
          type: "作业活动类",
          eventName: "中毒、窒息",
          evalMethod: "JHA",
          address: "设备车间",
          evaLevel: "一级",
          fixedLevel: "一级",
          controLevel: "红",
          controRank: "公司级",
          target: {
            id: "161",
            name: "设备车间"
          },
          dept: {
            id: "2503",
            name: "设备车间"
          },
          ushow: "孙磊",
          pointsName: ""
        },
        {
          id: 1173,
          name: "管道巡检",
          type: "作业活动类",
          eventName: "火灾、爆炸",
          evalMethod: "JHA",
          address: "公用工程车间",
          evaLevel: "二级",
          fixedLevel: "二级",
          controLevel: "橙",
          controRank: "处室级",
          target: {
            id: "162",
            name: "公用工程车间"
          },
          dept: {
            id: "2504",
            name: "公用工程车间"
          },
          ushow: "周杰",
          pointsName: ""
        },
        {
          id: 1174,
          name: "配电室操作",
          type: "作业活动类",
          eventName: "触电、火灾",
          evalMethod: "JHA",
          address: "电气车间",
          evaLevel: "二级",
          fixedLevel: "一级",
          controLevel: "橙",
          controRank: "处室级",
          target: {
            id: "163",
            name: "电气车间"
          },
          dept: {
            id: "2505",
            name: "电气车间"
          },
          ushow: "吴涛",
          pointsName: ""
        },
        {
          id: 1175,
          name: "压力容器",
          type: "设备设施类",
          eventName: "爆炸、容器破裂",
          evalMethod: "SCL",
          address: "动力车间",
          evaLevel: "一级",
          fixedLevel: "一级",
          controLevel: "红",
          controRank: "公司级",
          target: {
            id: "164",
            name: "动力车间"
          },
          dept: {
            id: "2506",
            name: "动力车间"
          },
          ushow: "郑平",
          pointsName: ""
        },
        {
          id: 1176,
          name: "吊装作业",
          type: "作业活动类",
          eventName: "起重伤害、物体打击",
          evalMethod: "JHA",
          address: "维修车间",
          evaLevel: "三级",
          fixedLevel: "三级",
          controLevel: "黄",
          controRank: "车间级",
          target: {
            id: "165",
            name: "维修车间"
          },
          dept: {
            id: "2507",
            name: "维修车间"
          },
          ushow: "冯超",
          pointsName: ""
        }
      ];

      // 简单过滤
      let filteredData = mockData;
      if (query.name) {
        filteredData = filteredData.filter(item =>
          item.name.includes(query.name)
        );
      }
      if (query.type1) {
        filteredData = filteredData.filter(item => item.type === query.type1);
      }
      if (query.controRank) {
        filteredData = filteredData.filter(
          item => item.controRank === query.controRank
        );
      }
      if (query.target) {
        filteredData = filteredData.filter(item =>
          item.target?.name.includes(query.target)
        );
      }

      const total = filteredData.length;
      const start = (page - 1) * size;
      const content = filteredData.slice(start, start + size);

      return {
        success: true,
        t: {
          content,
          totalElements: total,
          total,
          pageable: {
            pageNumber: page - 1,
            pageSize: size
          }
        }
      };
    }
  },
  // 部门列表
  {
    url: "/sft/sys/dept/top.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: [
          {
            id: "1",
            name: "实华化工有限公司",
            type: 0,
            children: [
              {
                id: "2",
                name: "德州实华化工有限公司",
                type: 1,
                children: [
                  {
                    id: "13",
                    name: "供应链管理部",
                    type: 1,
                    children: [
                      {
                        id: "2496",
                        name: "仓储物流办公室",
                        type: 2
                      },
                      {
                        id: "2497",
                        name: "采购部",
                        type: 2
                      },
                      {
                        id: "2498",
                        name: "销售部",
                        type: 2
                      }
                    ]
                  },
                  {
                    id: "14",
                    name: "生产管理部",
                    type: 1,
                    children: [
                      {
                        id: "2500",
                        name: "聚合车间",
                        type: 2
                      },
                      {
                        id: "2501",
                        name: "氯乙烯车间",
                        type: 2
                      },
                      {
                        id: "2502",
                        name: "烧碱车间",
                        type: 2
                      },
                      {
                        id: "2503",
                        name: "设备车间",
                        type: 2
                      },
                      {
                        id: "2504",
                        name: "公用工程车间",
                        type: 2
                      },
                      {
                        id: "2505",
                        name: "电气车间",
                        type: 2
                      },
                      {
                        id: "2506",
                        name: "动力车间",
                        type: 2
                      },
                      {
                        id: "2507",
                        name: "维修车间",
                        type: 2
                      }
                    ]
                  },
                  {
                    id: "15",
                    name: "安全管理部",
                    type: 1,
                    children: [
                      {
                        id: "2510",
                        name: "安全科",
                        type: 2
                      },
                      {
                        id: "2511",
                        name: "环保科",
                        type: 2
                      }
                    ]
                  },
                  {
                    id: "16",
                    name: "技术质量部",
                    type: 1,
                    children: [
                      {
                        id: "2520",
                        name: "技术科",
                        type: 2
                      },
                      {
                        id: "2521",
                        name: "质检科",
                        type: 2
                      }
                    ]
                  },
                  {
                    id: "17",
                    name: "人力资源部",
                    type: 1,
                    children: [
                      {
                        id: "2530",
                        name: "人事科",
                        type: 2
                      },
                      {
                        id: "2531",
                        name: "培训科",
                        type: 2
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      };
    }
  }
]);
