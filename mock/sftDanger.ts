import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/danger/danger/list.json",
    method: "get",
    response: ({
      query
    }: {
      query: {
        page?: string;
        size?: string;
        name?: string;
        status?: string;
        dangerType?: string;
        classify1?: string;
        level?: string;
        checkType?: string;
      };
    }) => {
      const page = Number(query.page) || 1;
      const size = Number(query.size) || 10;

      const allData = [
        {
          id: 146266,
          name: "办公室职工食堂一楼操作间大灶点化器老化，易泄露回火，引起火灾",
          status: "审批中",
          addDate: 1774168251587,
          dangerType: "安全",
          classify1: "物的不安全状态",
          level: "四级",
          checkType: "日常排查",
          typed: 2,
          addDept: { id: 4, name: "办公室（党委办公室）" },
          addUser: { id: 166, ushow: "蒋树怀" }
        },
        {
          id: 146265,
          name: "热电车间环保工段六号炉四组皮带托辊螺丝掉落，造成安全隐患。安全红丝带隐患已排除",
          status: "提交",
          addDate: 1774167779897,
          dangerType: "",
          classify1: "",
          level: "",
          checkType: "日常排查",
          addDept: { id: 22, name: "热电车间" },
          addUser: { id: 140, ushow: "李文锴" }
        },
        {
          id: 146264,
          name: "聚氯乙烯车间聚合三线操作室应急柜摆放碘伏",
          status: "提交",
          addDate: 1774167316957,
          dangerType: "",
          classify1: "",
          level: "",
          checkType: "专业性排查",
          addDept: { id: 9, name: "HSE管理部" },
          addUser: { id: 159, ushow: "马绪勇" }
        },
        {
          id: 146263,
          name: "供水工段化工区黄河水操作室南侧药剂存放室应急灯不亮",
          status: "提交",
          addDate: 1774167015857,
          dangerType: "",
          classify1: "",
          level: "",
          checkType: "专业性排查",
          addDept: { id: 9, name: "HSE管理部" },
          addUser: { id: 159, ushow: "马绪勇" }
        },
        {
          id: 146262,
          name: "供水工段化工区黄河水操作室北侧室外消火栓蜘蛛网较多，卫生差",
          status: "提交",
          addDate: 1774166743317,
          dangerType: "",
          classify1: "",
          level: "",
          checkType: "专业性排查",
          addDept: { id: 9, name: "HSE管理部" },
          addUser: { id: 159, ushow: "马绪勇" }
        },
        {
          id: 146261,
          name: "双氧水车间双氧水装置工段现场西侧应急柜内消防水带接口卡扣锈蚀",
          status: "整改中",
          addDate: 1774086967327,
          dangerType: "消防",
          classify1: "物的不安全状态",
          level: "四级",
          checkType: "日常排查",
          typed: 1,
          addDept: { id: 23, name: "双氧水车间" },
          addUser: { id: 140, ushow: "李文锴" }
        },
        {
          id: 146260,
          name: "电解车间液氯工段液氯充装平台北侧一报警器无防雨罩",
          status: "完成",
          addDate: 1774084747007,
          dangerType: "电气",
          classify1: "物的不安全状态",
          level: "三级",
          checkType: "季节性排查",
          typed: 2,
          addDept: { id: 20, name: "电解车间" },
          addUser: { id: 166, ushow: "蒋树怀" }
        },
        {
          id: 146259,
          name: "聚氯乙烯车间压滤工段压滤厂房二楼配电柜前绝缘胶垫破损老化",
          status: "超期",
          addDate: 1774080907567,
          dangerType: "电气",
          classify1: "物的不安全状态",
          level: "二级",
          checkType: "专业性排查",
          typed: 2,
          addDept: { id: 19, name: "聚氯乙烯车间" },
          addUser: { id: 159, ushow: "马绪勇" }
        },
        {
          id: 146258,
          name: "机电仪车间仪表工段DCS机柜间应急照明灯具损坏",
          status: "驳回",
          addDate: 1774079795477,
          dangerType: "安全",
          classify1: "管理的缺陷",
          level: "四级",
          checkType: "车间每周综合检查",
          typed: 1,
          addDept: { id: 21, name: "机电仪车间" },
          addUser: { id: 140, ushow: "李文锴" }
        },
        {
          id: 146257,
          name: "热电车间锅炉工段四号炉给粉机平台防护栏杆松动",
          status: "审批中",
          addDate: 1774078805087,
          dangerType: "设备",
          classify1: "物的不安全状态",
          level: "三级",
          checkType: "重点时段及节假日前排查",
          typed: 2,
          addDept: { id: 22, name: "热电车间" },
          addUser: { id: 159, ushow: "马绪勇" }
        },
        {
          id: 146256,
          name: "HSE管理部安全管理办公室消防器材检查记录不规范",
          status: "提交",
          addDate: 1774077195737,
          dangerType: "安全",
          classify1: "管理的缺陷",
          level: "四级",
          checkType: "综合性排查",
          addDept: { id: 9, name: "HSE管理部" },
          addUser: { id: 166, ushow: "蒋树怀" }
        },
        {
          id: 146255,
          name: "运营管理部生产运营办调度室应急药品过期",
          status: "整改中",
          addDate: 1774076403577,
          dangerType: "职业健康",
          classify1: "环境的不安全因素",
          level: "四级",
          checkType: "日常排查",
          typed: 1,
          addDept: { id: 11, name: "运营管理部" },
          addUser: { id: 140, ushow: "李文锴" }
        },
        {
          id: 146254,
          name: "办公室行政（党委）办公室档案室灭火器压力不足",
          status: "完成",
          addDate: 1774075684067,
          dangerType: "消防",
          classify1: "物的不安全状态",
          level: "四级",
          checkType: "巡检隐患",
          typed: 1,
          addDept: { id: 4, name: "办公室（党委办公室）" },
          addUser: { id: 159, ushow: "马绪勇" }
        },
        {
          id: 146253,
          name: "质检中心中心化验室废液存放间通风不良",
          status: "提交",
          addDate: 1774074922337,
          dangerType: "环保",
          classify1: "环境的不安全因素",
          level: "三级",
          checkType: "专业性排查",
          addDept: { id: 2492, name: "研发中心" },
          addUser: { id: 166, ushow: "蒋树怀" }
        },
        {
          id: 146252,
          name: "供应链管理部市场营销办公室仓库货物堆放过高",
          status: "审批中",
          addDate: 1774073845137,
          dangerType: "安全",
          classify1: "人的不安全行为",
          level: "四级",
          checkType: "事故类比排查",
          typed: 2,
          addDept: { id: 13, name: "供应链管理部" },
          addUser: { id: 140, ushow: "李文锴" }
        },
        {
          id: 146251,
          name: "财务管理部财务管理办公室财务档案室消防通道堵塞",
          status: "超期",
          addDate: 1774072507777,
          dangerType: "消防",
          classify1: "管理的缺陷",
          level: "二级",
          checkType: "监管部门监督检查",
          typed: 2,
          addDept: { id: 14, name: "财务管理部" },
          addUser: { id: 159, ushow: "马绪勇" }
        },
        {
          id: 146250,
          name: "人力资源部培训档案不完善，缺少部分培训记录",
          status: "整改中",
          addDate: 1774071795817,
          dangerType: "安全",
          classify1: "管理的缺陷",
          level: "四级",
          checkType: "外聘专家诊断式排查",
          typed: 2,
          addDept: { id: 8, name: "人力资源部" },
          addUser: { id: 166, ushow: "蒋树怀" }
        },
        {
          id: 146249,
          name: "电解车间氯氢处理及氯化氢工段现场安全警示标识模糊不清",
          status: "完成",
          addDate: 1774071083857,
          dangerType: "安全",
          classify1: "物的不安全状态",
          level: "三级",
          checkType: "重大危险源排查",
          typed: 1,
          addDept: { id: 20, name: "电解车间" },
          addUser: { id: 140, ushow: "李文锴" }
        },
        {
          id: 146248,
          name: "聚氯乙烯车间乙炔工段发生器平台护栏高度不符合标准",
          status: "提交",
          addDate: 1774070218097,
          dangerType: "设备",
          classify1: "物的不安全状态",
          level: "二级",
          checkType: "复产复工前排查",
          addDept: { id: 19, name: "聚氯乙烯车间" },
          addUser: { id: 159, ushow: "马绪勇" }
        },
        {
          id: 146247,
          name: "热电车间汽机工段润滑油站消防沙箱沙量不足",
          status: "审批中",
          addDate: 1774069352337,
          dangerType: "消防",
          classify1: "物的不安全状态",
          level: "三级",
          checkType: "季节性排查",
          typed: 2,
          addDept: { id: 22, name: "热电车间" },
          addUser: { id: 166, ushow: "蒋树怀" }
        }
      ];

      // 筛选逻辑
      let filteredData = allData;
      if (query.name) {
        filteredData = filteredData.filter(item =>
          item.name.includes(query.name)
        );
      }
      if (query.status) {
        filteredData = filteredData.filter(
          item => item.status === query.status
        );
      }
      if (query.dangerType) {
        filteredData = filteredData.filter(
          item => item.dangerType === query.dangerType
        );
      }
      if (query.classify1) {
        filteredData = filteredData.filter(
          item => item.classify1 === query.classify1
        );
      }
      if (query.level) {
        filteredData = filteredData.filter(item => item.level === query.level);
      }
      if (query.checkType) {
        filteredData = filteredData.filter(
          item => item.checkType === query.checkType
        );
      }

      const totalElements = filteredData.length;
      const start = (page - 1) * size;
      const end = start + size;
      const content = filteredData.slice(start, end);

      return {
        success: true,
        t: {
          content,
          totalElements
        }
      };
    }
  }
]);
