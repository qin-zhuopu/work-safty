import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  // 部门列表接口
  {
    url: "/sft/sys/dept/all.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: [
          {
            id: 1,
            name: "德州实华化工有限公司",
            value: 2,
            children: [
              { id: 3, name: "公司领导", value: 3 },
              { id: 4, name: "办公室（党委办公室）", value: 4 },
              { id: 5, name: "纪委办公室", value: 5 },
              { id: 6, name: "党群工作部", value: 6 },
              { id: 8, name: "人力资源部", value: 8 },
              { id: 9, name: "HSE管理部", value: 9 },
              { id: 11, name: "运营管理部", value: 11 },
              { id: 13, name: "供应链管理部", value: 13 },
              { id: 14, name: "财务管理部", value: 14 },
              { id: 16, name: "法律合规部", value: 16 },
              { id: 19, name: "聚氯乙烯车间", value: 19 },
              { id: 20, name: "电解车间", value: 20 },
              { id: 21, name: "机电仪车间", value: 21 },
              { id: 22, name: "热电车间", value: 22 },
              { id: 23, name: "双氧水车间", value: 23 },
              { id: 47, name: "合成工段", value: 47 },
              { id: 52, name: "聚合工段", value: 52 },
              { id: 62, name: "聚氯乙烯维修工段", value: 62 },
              { id: 63, name: "压滤工段", value: 63 },
              { id: 64, name: "乙炔工段", value: 64 },
              { id: 75, name: "离子膜工段", value: 75 },
              { id: 76, name: "氯氢处理及氯化氢工段", value: 76 },
              { id: 77, name: "氯氢处理工段", value: 77 },
              { id: 78, name: "浓固碱工段", value: 78 },
              { id: 79, name: "电解维修工段", value: 79 },
              { id: 80, name: "盐水工段", value: 80 },
              { id: 81, name: "液氯工段", value: 81 },
              { id: 83, name: "仪表工段", value: 83 },
              { id: 84, name: "电气工段", value: 84 },
              { id: 85, name: "供热工段", value: 85 },
              { id: 86, name: "供水工段", value: 86 },
              { id: 87, name: "热电车间管理组", value: 87 },
              { id: 88, name: "锅炉工段", value: 88 },
              { id: 89, name: "环保工段", value: 89 },
              { id: 90, name: "汽机工段", value: 90 },
              { id: 91, name: "热电车间维修工段", value: 91 },
              { id: 92, name: "整流工段", value: 92 },
              { id: 94, name: "双氧水装置工段", value: 94 },
              { id: 103, name: "电仪维工段（泰安）", value: 103 },
              { id: 104, name: "公用工程工段（泰安）", value: 104 },
              { id: 105, name: "锅炉工段（泰安）", value: 105 },
              { id: 108, name: "制盐工段", value: 108 },
              { id: 355, name: "仓储物流办公室", value: 355 },
              { id: 777, name: "公用工程工段", value: 777 },
              { id: 907, name: "乙炔工段", value: 907 },
              { id: 1153, name: "氯氢处理及氯化氢工段", value: 1153 },
              { id: 1194, name: "离子膜工段", value: 1194 },
              { id: 1290, name: "液氯工段", value: 1290 },
              { id: 1631, name: "环保工段", value: 1631 },
              { id: 1692, name: "汽机工段", value: 1692 },
              { id: 1923, name: "锅炉工段（泰安环保）", value: 1923 },
              { id: 1939, name: "泰安环保", value: 1939 },
              { id: 2426, name: "办公室", value: 2426 },
              { id: 2599, name: "仓储办管理组", value: 2599 },
              { id: 2600, name: "备件工段", value: 2600 },
              { id: 2601, name: "成品工段", value: 2601 },
              { id: 2758, name: "公用工程工段", value: 2758 },
              { id: 5895, name: "卜令超", value: 5895 }
            ]
          },
          {
            id: 24,
            name: "泰安分公司",
            value: 24,
            children: [
              { id: 103, name: "电仪维工段", value: 103 },
              { id: 104, name: "公用工程工段（泰安）", value: 104 },
              { id: 105, name: "锅炉工段（泰安）", value: 105 },
              { id: 108, name: "制盐工段", value: 108 },
              { id: 2426, name: "办公室", value: 2426 }
            ]
          }
        ]
      };
    }
  },
  // 作业活动列表接口
  {
    url: "/sft/work/act/list.json",
    method: "get",
    response: ({ query }: { query: { page?: string; size?: string } }) => {
      const page = Number(query.page) || 0;
      const size = Number(query.size) || 10;

      const allData = [
        {
          beginTime: 1774175280000,
          content: "锅炉工段管道保温铁皮修复",
          dept: "锅炉工段（泰安）",
          doc: "GC",
          docs: "",
          endTime: 1775390400000,
          environment:
            "作业区域为非易燃易爆区，施工人员施工前已进行安全交底，熟悉现场情况。施工人员正确穿戴工作服安全帽劳保手套等劳保防护用品。如遇特殊情况，应立即停止作业，与工段人员联系。",
          fzUserId: "1939",
          fzUserName: "李强（泰安环保）",
          id: "14424",
          jsaNo: "DZSH--GLGDTA-20260322-001",
          jtSyncStatus: "未同步",
          measures:
            "施工现场拉设警戒线，严禁无关人员进入。施工人员正确穿戴工作服安全帽劳保手套等劳保防护用品。系挂好安全带，高挂低用。",
          operatUnit: "河南东泰建设工程有限公司",
          scopeLicense: "锅炉工段本体以及环保周围",
          status: "审核中",
          user: "孙振",
          userId: "1923"
        },
        {
          beginTime: 1774171380000,
          content: "环保工段属地保温及管道保温修复",
          dept: "环保工段",
          doc: "LD,GC,GCJS,JWX",
          docs: "临时,高处,高处,一般检维修作业",
          endTime: 1774965540000,
          environment:
            "环保属地脱硫塔附属管道及设备处，此处为非防爆区，可以作业，施工时注意物体打击机械伤害高处坠落",
          fzUserId: "1631",
          fzUserName: "王晓辉",
          id: "14423",
          jsaNo: "DZSH--RDCJ-HBGD-20260322-001",
          jtSyncStatus: "未同步",
          measures:
            "施工时施工人员劳保用品穿戴整齐且防护齐全。现场放置高危作业告示牌，禁止无关人员靠近，灭火器放置到位。施工人员系挂5点式双钩安全带。",
          nodeStatus: "施工竣工确认人-审批中",
          operatUnit: "丰邺建设有限公司",
          scopeLicense: "环保属地脱硫塔附属管道及设备处",
          status: "作业中",
          user: "王晓辉",
          userId: "1631"
        },
        {
          beginTime: 1774170900000,
          content: "蒸汽管道加盲板",
          dept: "液氯工段",
          doc: "MB,JWX",
          docs: "盲板,一般检维修作业",
          endTime: 1775217600000,
          environment:
            "非防爆区，蒸汽管道内介质为高温，作业前作业人员规范穿戴好劳保用品，确认阀门完全关闭不内漏，管道内无压力",
          fzUserId: "1290",
          fzUserName: "戎海臣",
          id: "14422",
          jsaNo: "DZSH--DJCJ-YLGD-20260322-001",
          jtSyncStatus: "未同步",
          measures:
            "作业人员规范穿戴好劳保用品，正确使用工器具，工器具贴有检验合格标签，蒸汽烫伤立即涂抹烫伤膏",
          nodeStatus: "作业执行人-审批中",
          operatUnit: "液氯工段、浓固碱工段",
          scopeLicense: "电解车间现场工段长办公室、巡检室、浓固碱空调室",
          status: "审核中",
          user: "周峰",
          userId: "1214"
        },
        {
          beginTime: 1774163820000,
          content: "电解氯氢处理及氯化氢工段暖气管道加盲板",
          dept: "氯氢处理及氯化氢工段",
          doc: "MB,JWX",
          docs: "盲板,一般检维修作业",
          endTime: 1775041140000,
          environment: "蒸汽管道，烫伤，机械伤害",
          fzUserId: "1153",
          fzUserName: "张东元",
          id: "14421",
          jsaNo: "DZSH--DJCJ-LQCLJLHQGD-20260322-002",
          jtSyncStatus: "未同步",
          measures: "加盲板处前阀门关闭，泄压。施工人员劳保用品佩戴齐全。",
          nodeStatus: "施工竣工确认人-审批中",
          operatUnit: "氯氢处理及氯化氢工段",
          scopeLicense: "氯氢处理及氯化氢工段现场及巡检室",
          status: "作业中",
          user: "张东元",
          userId: "1153"
        },
        {
          beginTime: 1774163280000,
          content: "聚合凉水塔改造",
          dept: "公用工程工段",
          doc: "DH,LD,GC,DZ,JWX",
          docs: ",一般检维修作业",
          endTime: 1775393940000,
          environment:
            "作业区域为非防爆环境，作业过程中带好安全帽，劳保手套，穿好工作服，工作鞋，系挂好五点式安全带，现场动火作业配备好灭火器，吊装作业禁止站在掉物下面，施工现场拉好警戒线，无关人员禁止入内监护人进行监护。",
          fzUserId: "777",
          fzUserName: "高帅",
          id: "14420",
          jsaNo: "DZSH--DZSHHGYXGS-RDCJ-20260322-001",
          jtSyncStatus: "未同步",
          measures:
            "作业过程中带好安全帽，劳保手套，穿好工作服，工作鞋，系挂好五点式安全带，现场动火作业配备好灭火器，吊装作业禁止站在掉物下面，施工现场拉好警戒线，无关人员禁止入内监护人进行监护。",
          nodeStatus: "JSA小组组长-审批中",
          operatUnit: "山东省显通安装有限公司",
          scopeLicense: "聚合凉水塔",
          status: "审核中",
          user: "高帅",
          userId: "777"
        },
        {
          beginTime: 1774161720000,
          content: "电解氯氢处理及氯化氢工段更换氯化氢管道",
          dept: "氯氢处理及氯化氢工段",
          doc: "DH,LD,GC,DZ,DL,JWX",
          docs: "动火,临时,高处,吊装,断路,一般检维修作业",
          endTime: 1775393940000,
          environment:
            "施工作业人员穿戴好劳保用品，专人监护现场，现场气体泄露，立即向上风向撤离。涉及动火、登高、用电、断路。高处坠落，火灾，触电，中毒。",
          fzUserId: "1153",
          fzUserName: "张东元",
          id: "14419",
          jsaNo: "DZSH--DJCJ-LQCLJLHQGD-20260322-001",
          jtSyncStatus: "未同步",
          measures:
            "出现气体泄露立即向上风方向撤离，专人监护，施工人员穿戴好劳保用品。穿戴五点式安全带，有漏电保护器，配备灭火器，配备防毒面具。",
          nodeStatus: "施工竣工确认人-审批中",
          operatUnit: "山东福源建设集团有限公司",
          scopeLicense: "电解540工序到合成工段",
          status: "作业中",
          user: "张东元",
          userId: "1153"
        },
        {
          beginTime: 1774161000000,
          content: "汽机外置油泵系统管道碰口及垫铁点焊",
          dept: "汽机工段",
          doc: "DH,LD,JWX",
          docs: "动火,一般检维修作业",
          endTime: 1774180740000,
          environment:
            "作业区域为非易燃区，施工区域周围拉好警戒线。注意事项:1.施工工具规范放置；2.施工现场必须办理相关作业票证后方可施工；3.施工过程注意保护周围设备和管道。",
          eval: 1,
          fzUserId: "1692",
          fzUserName: "杨明旭",
          id: "14418",
          jsaNo: "DZSH--RDCJ-QJGD-20260322-001",
          jtSyncStatus: "未同步",
          measures:
            "注意事项:1.按要求使用防爆工具，并良好接地。2.施工过程佩戴好安全帽，穿好工作服等防护用品。3.专人监护，监护人离开时停止施工。4.发现异常，立即撤离到安全地带。",
          nodeStatus: "审批结束",
          operatUnit: "山东鸿华建筑安装工程有限公司",
          passTime: 1774182000000,
          scopeLicense: "汽机北厂房区域",
          status: "已审核",
          user: "杨明旭",
          userId: "1692"
        },
        {
          beginTime: 1774225800000,
          content: "现场操作室暖气片加盲板",
          dept: "离子膜工段",
          doc: "MB,JWX",
          docs: "盲板,一般检维修作业",
          endTime: 1774871940000,
          environment: "注意暖气片进出口阀门全部关闭",
          fzUserId: "1194",
          fzUserName: "朱龙龙",
          id: "14417",
          jsaNo: "DZSH--DJCJ-LZMGD-20260322-001",
          jtSyncStatus: "未同步",
          measures: "穿戴好劳动防护用品做好个人防护",
          nodeStatus: "施工竣工确认人-审批中",
          operatUnit: "离子膜工段",
          scopeLicense: "电解车间现场操作室",
          status: "作业中",
          user: "朱龙龙",
          userId: "1194"
        },
        {
          beginTime: 1774153380000,
          content: "成品新盐酸罐配管",
          dept: "仓储物流办公室",
          doc: "DH,LD,GC,JWX",
          docs: "动火,临时,高处,一般检维修作业",
          endTime: 1775393940000,
          environment: "作业区域有管道及设备，注意避让",
          fzUserId: "355",
          fzUserName: "田昊",
          id: "14416",
          jsaNo: "DZSH--GYLGLB-CCWLBGS-20260322-001",
          jtSyncStatus: "未同步",
          measures: "施工人员正确穿戴劳保用品，出现异常立即停工",
          nodeStatus: "施工竣工确认人-审批中",
          operatUnit: "山东鸿华建筑安装工程有限公司",
          scopeLicense: "成品盐酸罐周边",
          status: "作业中",
          user: "田昊",
          userId: "355"
        },
        {
          beginTime: 1774148460000,
          content: "凉水塔检修搭架子",
          dept: "乙炔工段",
          doc: "SX,GC,GCJS,JWX",
          docs: "受限,高处,高处,一般检维修作业",
          endTime: 1775379540000,
          environment: "注意地面湿滑，施工人员穿戴好劳保用品及五点双挂式安全带",
          fzUserId: "907",
          fzUserName: "李超（乙炔）",
          id: "14415",
          jsaNo: "DZSH--JLYXCJ-YGGD-20260322-001",
          jtSyncStatus: "未同步",
          measures:
            "布置施工区域禁止无关人员进入，施工人员穿戴好劳保用品及五点双挂式安全带，搭建施工平台",
          nodeStatus: "施工竣工确认人-审批中",
          operatUnit: "德州正通市政公用工程有限公司",
          scopeLicense: "压滤清水泵区域",
          status: "作业中",
          user: "卜令超",
          userId: "5895"
        },
        {
          beginTime: 1774138000000,
          content: "液氯储罐区管道更换",
          dept: "液氯工段",
          doc: "DH,GC,MB",
          docs: "动火,高处,盲板",
          endTime: 1775300000000,
          environment: "易燃易爆区域，需办理特殊作业票",
          fzUserId: "1290",
          fzUserName: "戎海臣",
          id: "14414",
          jsaNo: "DZSH--DJCJ-LQGD-20260322-002",
          jtSyncStatus: "未同步",
          measures: "配备防毒面具，设置警戒线，专人监护",
          nodeStatus: "技术负责人-审批中",
          operatUnit: "液氯工段",
          scopeLicense: "液氯储罐区",
          status: "审核中",
          user: "周峰",
          userId: "1214"
        },
        {
          beginTime: 1774128000000,
          content: "聚合装置仪表检修",
          dept: "聚合工段",
          doc: "LD,JWX",
          docs: "临电,一般检维修作业",
          endTime: 1775250000000,
          environment: "非防爆区域，注意用电安全",
          eval: 1,
          fzUserId: "83",
          fzUserName: "仪表工段",
          id: "14413",
          jsaNo: "DZSH--JHGD-YBWX-20260322-001",
          jtSyncStatus: "未同步",
          measures: "使用漏电保护器，穿戴绝缘鞋",
          nodeStatus: "审批结束",
          operatUnit: "仪表工段",
          passTime: 1774150000000,
          scopeLicense: "聚合装置现场",
          status: "已审核",
          user: "仪表工段",
          userId: "83"
        }
      ];

      const start = page * size;
      const end = start + size;
      const content = allData.slice(start, end);

      return {
        success: true,
        t: {
          content,
          totalElements: allData.length,
          totalPages: Math.ceil(allData.length / size),
          number: page,
          size,
          first: page === 0,
          last: end >= allData.length,
          empty: content.length === 0
        }
      };
    }
  }
]);
