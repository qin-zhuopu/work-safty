import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  // 隐患排查清单列表接口
  {
    url: "/sft/danger/check/list.json",
    method: "get",
    response: ({ query }) => {
      const page = Number(query.page) || 0;
      const size = Number(query.size) || 10;

      const allData = [
        {
          beginTime: 1773590400000,
          controRank: "车间级",
          controlId: 424,
          controlName: "液氯槽车充装作业",
          cycle: "每周",
          deptName: "电解车间",
          dutier: "王振",
          endTime: 1774195199000,
          ifDanger: 1,
          inspKey: "",
          measureUuid: "1",
          taskContent:
            "1.配有防溜车装置；设有淋洗器，洗眼器；员工配备护目镜、防毒面具、空气呼吸器、防护服；2.装车区设有静电释放设施；设有氯气泄漏检测报警器；装车管线设有质量流量计、紧急切断阀；设有应急疏散滑道；设有防溜车装置；设有负压抽吸软管并接入尾气吸收系统；万向节充装；设有风向标；设有氯气捕消器；3.充装鹤管前设有真空表；现场设有氯气泄漏检测报警器；设有负压抽吸软管并接入尾气吸收系统",
          taskId: 742,
          user: "谢秀胜"
        },
        {
          beginTime: 1773590400000,
          controRank: "车间级",
          controlId: 424,
          controlName: "液氯槽车充装作业",
          cycle: "每周",
          deptName: "电解车间",
          dutier: "王振",
          endTime: 1774195199000,
          ifDanger: 1,
          inspKey: "",
          measureUuid: "1",
          taskContent: "员工培训合格后方可上岗；定期进行防护用品的穿戴培训",
          taskId: 744,
          user: "谢秀胜"
        },
        {
          beginTime: 1773590400000,
          controRank: "车间级",
          controlId: 424,
          controlName: "液氯槽车充装作业",
          cycle: "每周",
          deptName: "电解车间",
          dutier: "王振",
          endTime: 1774195199000,
          ifDanger: 1,
          inspKey: "",
          measureUuid: "1",
          taskContent:
            "泄漏氯气时迅速撤离至上风向，戴好防护器具抢救人员，夜间有应急照明",
          taskId: 746,
          user: "谢秀胜"
        },
        {
          beginTime: 1773590400000,
          controRank: "公司级",
          controlId: 416,
          controlName: "液氯储槽",
          cycle: "每周",
          deptName: "德州实华化工有限公司",
          dutier: "李宝瑞",
          endTime: 1774195199000,
          ifDanger: 1,
          inspKey: "",
          measureUuid: "1",
          taskContent:
            "1、佩戴安全帽、工作服、工作鞋、劳保手套；2.现场备用防毒面具、正压式空气呼吸器；3.有毒有害气体报警仪",
          taskId: 780,
          user: "刘东旭"
        },
        {
          beginTime: 1767196800000,
          controRank: "工段班组岗位级",
          controlId: 889,
          controlName: "蒸汽管道",
          cycle: "季度",
          deptName: "热电车间",
          dutier: "杨明旭",
          endTime: 1774972799000,
          ifDanger: 1,
          inspKey: "",
          measureUuid: "1",
          taskContent:
            "1、对比压力表是否发生损坏；2、定期校验/阀门，流量计定期检验",
          taskId: 968,
          user: "杨明旭"
        },
        {
          beginTime: 1767196800000,
          controRank: "工段班组岗位级",
          controlId: 889,
          controlName: "蒸汽管道",
          cycle: "半年",
          deptName: "热电车间",
          dutier: "杨明旭",
          endTime: 1782835199000,
          ifDanger: 0,
          inspKey: "",
          measureUuid: "1",
          taskContent: "定期培训考核合格后上岗/按时进行巡回检查",
          taskId: 969,
          user: "杨明旭"
        },
        {
          beginTime: 1772294400000,
          controRank: "工段班组岗位级",
          controlId: 889,
          controlName: "蒸汽管道",
          cycle: "每月",
          deptName: "热电车间",
          dutier: "杨明旭",
          endTime: 1774972799000,
          ifDanger: 1,
          inspKey: "",
          measureUuid: "1",
          taskContent: "个人PPE穿戴正常",
          taskId: 970,
          user: "金德盈"
        },
        {
          beginTime: 1772294400000,
          controRank: "工段班组岗位级",
          controlId: 889,
          controlName: "蒸汽管道",
          cycle: "每月",
          deptName: "热电车间",
          dutier: "杨明旭",
          endTime: 1774972799000,
          ifDanger: 4,
          inspKey: "",
          measureUuid: "1",
          taskContent: "紧急泄压，紧急停汽/更换",
          taskId: 971,
          user: "金德盈"
        },
        {
          beginTime: 1772294400000,
          controRank: "工段班组岗位级",
          controlId: 866,
          controlName: "启动汽轮机循环水泵",
          cycle: "每月",
          deptName: "汽机工段",
          dutier: "杨明旭",
          endTime: 1774972799000,
          ifDanger: 1,
          inspKey: "",
          measureUuid: "1",
          taskContent:
            '制定详实的检查规程制度，建立"定期盘车记录"和"检查确认记录"/签订风险预警分析报告，根据电流缓慢开启出口电动阀/定期维修专业巡检、加润滑油，建立"检查确认记录"',
          taskId: 1133,
          user: "崔吉豹"
        },
        {
          beginTime: 1773590400000,
          controRank: "工段班组岗位级",
          controlId: 472,
          controlName: "三氯化氮排污作业",
          cycle: "每周",
          deptName: "液氯工段",
          dutier: "戎海臣",
          endTime: 1774195199000,
          ifDanger: 2,
          inspKey: "",
          measureUuid: "1",
          taskContent:
            "1.相符合的材质；2.联轴器、增加防护罩；3.电解槽联锁控制；4.危险介质静密封点增加防护；5.变频启停；6.DCS电流显示。",
          taskId: 1249,
          user: "郭栋"
        },
        {
          beginTime: 1773590400000,
          controRank: "车间级",
          controlId: 424,
          controlName: "液氯槽车充装作业",
          cycle: "每周",
          deptName: "电解车间",
          dutier: "王振",
          endTime: 1774195199000,
          ifDanger: 1,
          inspKey: "",
          measureUuid: "1",
          taskContent:
            "1.配有防溜车装置；设有淋洗器，洗眼器；员工配备护目镜、防毒面具、空气呼吸器、防护服；2.装车区设有静电释放设施；设有氯气泄漏检测报警器；装车管线设有质量流量计、紧急切断阀；设有应急疏散滑道；设有防溜车装置；设有负压抽吸软管并接入尾气吸收系统；万向节充装；设有风向标；设有氯气捕消器；3.充装鹤管前设有真空表；现场设有氯气泄漏检测报警器；设有负压抽吸软管并接入尾气吸收系统",
          taskId: 743,
          user: "谢秀胜"
        },
        {
          beginTime: 1773590400000,
          controRank: "公司级",
          controlId: 416,
          controlName: "液氯储槽",
          cycle: "每周",
          deptName: "德州实华化工有限公司",
          dutier: "李宝瑞",
          endTime: 1774195199000,
          ifDanger: 3,
          inspKey: "",
          measureUuid: "1",
          taskContent:
            "1、佩戴安全帽、工作服、工作鞋、劳保手套；2.现场备用防毒面具、正压式空气呼吸器；3.有毒有害气体报警仪",
          taskId: 781,
          user: "刘东旭"
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
          totalElements,
          totalPages,
          number: page,
          size,
          first: page === 0,
          last: page >= totalPages - 1,
          empty: content.length === 0,
          pageable: {
            offset: start,
            pageNumber: page,
            pageSize: size,
            paged: true,
            sort: {
              empty: true,
              sorted: false,
              unsorted: true
            },
            unpaged: false
          },
          sort: {
            empty: true,
            sorted: false,
            unsorted: true
          }
        }
      };
    }
  },
  // 部门列表接口
  {
    url: "/sft/sys/dept/all.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: [
          {
            children: [
              {
                children: [
                  {
                    children: [],
                    id: 3,
                    name: "公司领导",
                    open: false,
                    parentName: "德州实华化工有限公司",
                    perId: 0,
                    value: 3
                  },
                  {
                    children: [],
                    id: 2483,
                    name: "保卫管理办公室",
                    open: false,
                    parentName: "办公室（党委办公室）",
                    perId: 0,
                    value: 2483
                  },
                  {
                    children: [],
                    id: 2484,
                    name: "后勤保障办公室",
                    open: false,
                    parentName: "办公室（党委办公室）",
                    perId: 0,
                    value: 2484
                  },
                  {
                    children: [],
                    id: 2485,
                    name: "行政（党委）办公室",
                    open: false,
                    parentName: "办公室（党委办公室）",
                    perId: 0,
                    value: 2485
                  }
                ],
                id: 4,
                name: "办公室（党委办公室）",
                open: false,
                parentName: "德州实华化工有限公司",
                perId: 0,
                value: 4
              },
              {
                children: [],
                id: 5,
                name: "纪委办公室",
                open: false,
                parentName: "德州实华化工有限公司",
                perId: 0,
                value: 5
              },
              {
                children: [],
                id: 8,
                name: "人力资源部",
                open: false,
                parentName: "德州实华化工有限公司",
                perId: 0,
                value: 8
              },
              {
                children: [
                  {
                    children: [],
                    id: 2486,
                    name: "安全管理办公室",
                    open: false,
                    parentName: "HSE管理部",
                    perId: 0,
                    value: 2486
                  },
                  {
                    children: [],
                    id: 2487,
                    name: "环保管理办公室",
                    open: false,
                    parentName: "HSE管理部",
                    perId: 0,
                    value: 2487
                  }
                ],
                id: 9,
                name: "HSE管理部",
                open: false,
                parentName: "德州实华化工有限公司",
                perId: 0,
                value: 9
              },
              {
                children: [
                  {
                    children: [],
                    id: 47,
                    name: "合成工段",
                    open: false,
                    parentName: "聚氯乙烯车间",
                    perId: 0,
                    value: 47
                  },
                  {
                    children: [],
                    id: 52,
                    name: "聚合工段",
                    open: false,
                    parentName: "聚氯乙烯车间",
                    perId: 0,
                    value: 52
                  },
                  {
                    children: [],
                    id: 62,
                    name: "聚氯乙烯维修工段",
                    open: false,
                    parentName: "聚氯乙烯车间",
                    perId: 0,
                    value: 62
                  },
                  {
                    children: [],
                    id: 63,
                    name: "压滤工段",
                    open: false,
                    parentName: "聚氯乙烯车间",
                    perId: 0,
                    value: 63
                  },
                  {
                    children: [],
                    id: 64,
                    name: "乙炔工段",
                    open: false,
                    parentName: "聚氯乙烯车间",
                    perId: 0,
                    value: 64
                  },
                  {
                    children: [],
                    id: 2832,
                    name: "聚氯乙烯车间管理组",
                    open: false,
                    parentName: "聚氯乙烯车间",
                    perId: 0,
                    value: 2832
                  }
                ],
                id: 19,
                name: "聚氯乙烯车间",
                open: false,
                parentName: "德州实华化工有限公司",
                perId: 0,
                value: 19
              },
              {
                children: [
                  {
                    children: [],
                    id: 75,
                    name: "离子膜工段",
                    open: false,
                    parentName: "电解车间",
                    perId: 0,
                    value: 75
                  },
                  {
                    children: [],
                    id: 76,
                    name: "氯氢处理及氯化氢工段",
                    open: false,
                    parentName: "电解车间",
                    perId: 0,
                    value: 76
                  },
                  {
                    children: [],
                    id: 77,
                    name: "氯氢处理工段",
                    open: false,
                    parentName: "电解车间",
                    perId: 0,
                    value: 77
                  },
                  {
                    children: [],
                    id: 78,
                    name: "浓固碱工段",
                    open: false,
                    parentName: "电解车间",
                    perId: 0,
                    value: 78
                  },
                  {
                    children: [],
                    id: 79,
                    name: "电解维修工段",
                    open: false,
                    parentName: "电解车间",
                    perId: 0,
                    value: 79
                  },
                  {
                    children: [],
                    id: 80,
                    name: "盐水工段",
                    open: false,
                    parentName: "电解车间",
                    perId: 0,
                    value: 80
                  },
                  {
                    children: [],
                    id: 81,
                    name: "液氯工段",
                    open: false,
                    parentName: "电解车间",
                    perId: 0,
                    value: 81
                  },
                  {
                    children: [],
                    id: 2833,
                    name: "电解车间管理组",
                    open: false,
                    parentName: "电解车间",
                    perId: 0,
                    value: 2833
                  }
                ],
                id: 20,
                name: "电解车间",
                open: false,
                parentName: "德州实华化工有限公司",
                perId: 0,
                value: 20
              },
              {
                children: [
                  {
                    children: [],
                    id: 84,
                    name: "电气工段",
                    open: false,
                    parentName: "热电车间",
                    perId: 0,
                    value: 84
                  },
                  {
                    children: [],
                    id: 85,
                    name: "供热工段",
                    open: false,
                    parentName: "热电车间",
                    perId: 0,
                    value: 85
                  },
                  {
                    children: [],
                    id: 86,
                    name: "供水工段",
                    open: false,
                    parentName: "热电车间",
                    perId: 0,
                    value: 86
                  },
                  {
                    children: [],
                    id: 87,
                    name: "热电车间管理组",
                    open: false,
                    parentName: "热电车间",
                    perId: 0,
                    value: 87
                  },
                  {
                    children: [],
                    id: 88,
                    name: "锅炉工段",
                    open: false,
                    parentName: "热电车间",
                    perId: 0,
                    value: 88
                  },
                  {
                    children: [],
                    id: 89,
                    name: "环保工段",
                    open: false,
                    parentName: "热电车间",
                    perId: 0,
                    value: 89
                  },
                  {
                    children: [],
                    id: 90,
                    name: "汽机工段",
                    open: false,
                    parentName: "热电车间",
                    perId: 0,
                    value: 90
                  },
                  {
                    children: [],
                    id: 91,
                    name: "热电车间维修工段",
                    open: false,
                    parentName: "热电车间",
                    perId: 0,
                    value: 91
                  },
                  {
                    children: [],
                    id: 92,
                    name: "整流工段",
                    open: false,
                    parentName: "热电车间",
                    perId: 0,
                    value: 92
                  }
                ],
                id: 22,
                name: "热电车间",
                open: false,
                parentName: "德州实华化工有限公司",
                perId: 0,
                value: 22
              },
              {
                children: [
                  {
                    children: [],
                    id: 94,
                    name: "双氧水装置工段",
                    open: false,
                    parentName: "双氧水车间",
                    perId: 0,
                    value: 94
                  },
                  {
                    children: [],
                    id: 2834,
                    name: "双氧水车间管理组",
                    open: false,
                    parentName: "双氧水车间",
                    perId: 0,
                    value: 2834
                  }
                ],
                id: 23,
                name: "双氧水车间",
                open: false,
                parentName: "德州实华化工有限公司",
                perId: 0,
                value: 23
              }
            ],
            id: 2,
            name: "德州实华化工有限公司",
            open: false,
            parentName: "实华化工有限公司",
            perId: 0,
            value: 2
          }
        ]
      };
    }
  }
]);
