import { defineFakeRoute } from "vite-plugin-fake-server/client";

const allData = [
  {
    addDate: 1752131842620,
    field: "企业级事故",
    field1: "办公楼前楼梯",
    field10: "0",
    field11: "0",
    field12: "0",
    field13: "无",
    field14: "ssc-dzsh/1/f34cea96992a4aaeb3eca57db746e12f.docx",
    field15: "",
    field16: "20",
    field17: "王风新",
    field18: 2,
    field2:
      "2025年6月16日中午12:05分，我公司职工王风新在办公楼大厅点完名准备到食堂就餐，在下办公楼台阶过程中，不慎滑倒，左膝盖着地，当时不能自主起来，膝盖外观移位",
    field3:
      "1.强化员工安全意识与行为规范，开展专项安全教育：组织全体员工开展上下楼梯等日常行为安全专项培训",
    field4: "86",
    field44: "154,202",
    field44Str: "以前的伤病,投入培训的精力不足",
    field4Str: "注意力不集中/缺乏意识",
    field5: "安全类",
    field6: "轻伤",
    field7: "党群工作部",
    field8: "1",
    field9: "0",
    fieldDate: 1752076800000,
    id: 139,
    name: "德州实华6.16人身伤害企业级事故",
    status: 1
  },
  {
    addDate: 1752132043967,
    field: "企业级事故",
    field1: "泰安分公司卤水净化工段",
    field10: "0",
    field11: "0",
    field12: "0",
    field13: "无",
    field14: "",
    field15: "",
    field16: "",
    field18: 2,
    field2:
      "泰安分公司操作工王峰，2025年5月21日白班（08：00--17：30）。8：00，王峰上班后，根据工段安排进入沉降桶处进行施工准备",
    field3:
      "1.建议公司党委对泰安分公司党支部党员干部开展集体约谈。督促全体管理人员须深刻汲取教训，强化责任担当",
    field4: "56,68,69,130",
    field44: "155,188,207,274",
    field44Str: "疲劳,领导暗示快点干,领导不力,上下级间纵向沟通不够",
    field4Str: "个人违章,设备使用不当,工具使用不当,通道地面湿滑",
    field5: "安全类",
    field6: "轻伤",
    field7: "泰安分公司",
    field8: "1",
    field9: "0",
    fieldDate: 1752076800000,
    id: 138,
    name: "泰安分公司卤水净化工段5.21王峰摔伤事故",
    status: 1
  },
  {
    addDate: 1744179243032,
    field: "企业级事故",
    field1: "实华厂区活动场地",
    field10: "0",
    field11: "0",
    field12: "0",
    field13: "无",
    field14: "ssc-dzsh/1/e0842ab0e5174140be82fbec3ce2465e.doc",
    field15: "ssc-dzsh/1/babdb5feadbc4b109f5ed6601af2f3f8.pdf",
    field16: "7,423",
    field17: "王月城,曹晓佳",
    field18: 1,
    field2:
      "2024年11月15日16时10分许，德州实华化工有限公司员工曹晓佳参加实华厂区活动场地内拔河比赛活动时，胜利后坐倒地上，右膝盖感觉稍有疼痛",
    field3:
      "1.在今后组织各类活动前，务必对活动场地和器材进行更加细致严格的检查，确保场地安全、器材合格",
    field4: "60,61,77,78,89",
    field44: "163,193,192,200",
    field44Str:
      "协调差或反应时间问题,对所需技能评估不够,技能实践不足,知识传递不足",
    field4Str:
      "位置/姿势不当,用力过度,缺乏对存在危害的认识,没有使用个人防护设备",
    field5: "安全类",
    field6: "轻伤",
    field7: "实华厂区活动场地",
    field8: "1",
    field9: "0",
    fieldDate: 1744128000000,
    id: 137,
    name: "德州实华11.15人身伤害企业级事故",
    status: 1
  },
  {
    addDate: 1744179378925,
    field: "企业级事故",
    field1: "岔河西大道与实华南路交汇路口附近",
    field10: "0",
    field11: "0",
    field12: "0",
    field13: "无",
    field14: "ssc-dzsh/1/05082980dbe1413f9248adcad9b83394.docx",
    field15: "ssc-dzsh/1/7719f1ef45947a5af80083479863f44.pdf",
    field16: "1445",
    field17: "王宁（常白班）",
    field18: 1,
    field2:
      "德州实华化工有限公司员工吴磊于2024年09月25日07时50分许上班途中，德州实华化工有限公司员工王宁驾驶冀JFM361号小型轿车沿岔河西大道由南向北行驶至事故发生地时，其车与吴磊驾驶的电动自行车相撞",
    field3:
      "1.严查个人违章行为－针对上班路上违章行为严肃处理；组织开展不安全行为辨识及专项整治活动",
    field4: "56,77",
    field44: "161,163",
    field44Str: "判断失误,协调差或反应时间问题",
    field4Str: "个人违章,缺乏对存在危害的认识",
    field5: "安全类",
    field6: "轻伤",
    field7: "办公室后勤管理办（餐厅）",
    field8: "1",
    field9: "0",
    fieldDate: 1744128000000,
    id: 136,
    name: "德州实华9.25交通安全企业级事故",
    status: 1
  },
  {
    addDate: 1744167208571,
    field: "企业级事故",
    field1: "职工餐厅",
    field10: "0",
    field11: "0",
    field12: "0",
    field13: "无",
    field14: "",
    field15: "ssc-dzsh/1/b82b93b5fd0e4d2abbe4c484e3a47348.pptx",
    field16: "93,108,32",
    field17: "刘俊西,胡立强,张晓飞",
    field18: 1,
    field2:
      "德州实华化工有限责任公司办公室（党委办公室）面点工胡立强，2024年07月26日早上05时53分许，在职工食堂操作间从事切配工作时，因操作不当造成右手受伤",
    field3:
      "1.加强员工安全教育培训- 加强对操作工进行安全教育培训和操作规程培训，加强安全警示教育",
    field4: "56,69,71,77,78,79,87",
    field44: "184,186,192,196,207,209",
    field44Str:
      "没有识别关键的安全行为,冒险蛮干,对所需技能评估不够,技能实际操作培训不足",
    field4Str:
      "个人违章,工具使用不当,故意使用有缺陷的工具,缺乏对存在危害的认识",
    field5: "安全类",
    field6: "轻伤",
    field7: "办公室后勤管理办（餐厅）",
    field8: "1",
    field9: "0",
    fieldDate: 1744128000000,
    id: 135,
    name: "德州实华7.26人身伤害企业级事故",
    status: 1
  },
  {
    addDate: 1744179401574,
    field: "企业级事故",
    field1: "聚氯乙烯车间乙炔区域",
    field10: "0",
    field11: "0",
    field12: "0",
    field13: "无",
    field14: "ssc-dzsh/1/0deb72f122be465eaa0b597873a862d2.pptx",
    field15: "ssc-dzsh/1/f2db22e7ed4e40d49294a7fb0daaab7b.pdf",
    field16: "422,938,1532",
    field17: "周先锋,张力,谯廷华",
    field18: 1,
    field2:
      "德州实华化工有限责任公司PVC车间操作工张力，2024年7月14日上午9时29分许，在乙炔工段废渣池门外，当推手推车进入废渣池时，撞到废渣池门口墙上",
    field3:
      "1.员工培训- 对操作手推车的员工进行全面的安全培训，包括正确的操作方法、速度控制",
    field4: "60,61,62,98",
    field44: "184,193,192,200",
    field44Str:
      "没有识别关键的安全行为,对所需技能评估不够,技能实践不足,知识传递不足",
    field4Str: "位置/姿势不当,用力过度,工作或运动速度不当,防护或保护设施不足",
    field5: "安全类",
    field6: "轻伤",
    field7: "聚氯乙烯车间",
    field8: "1",
    field9: "0",
    fieldDate: 1744128000000,
    id: 134,
    name: "聚氯乙烯车间7.14人身伤害事故",
    status: 0
  },
  {
    addDate: 1744179329476,
    field: "企业级事故",
    field1: "聚氯乙烯车间聚合区域",
    field10: "0",
    field11: "0",
    field12: "0",
    field13: "无",
    field14: "ssc-dzsh/1/4066d62bafec4bff9668e0e12a91a7a1.docx",
    field15: "ssc-dzsh/1/55c701957704419fba7d4309971062b4.pdf",
    field16: "422,733",
    field17: "周先锋,冯建凯",
    field18: 1,
    field2:
      "PVC一车间聚合巡检工冯建凯2024年1月14号下午18点50分许，在聚合区域巡检工作时，因为吸入氯化氢气体，造成呼吸道受到伤害",
    field3:
      "1、事故防范：①次日于工段班前会通报此项事故，管理组对工段区域隐患进行全面排查",
    field4: "77,78,103,98,100",
    field44: "163",
    field44Str: "协调差或反应时间问题",
    field4Str: "缺乏对存在危害的认识,没有使用个人防护设备,防护或保护设施不足",
    field5: "安全类",
    field6: "轻伤",
    field7: "聚氯乙烯车间",
    field8: "1",
    field9: "0",
    fieldDate: 1744128000000,
    id: 133,
    name: "PVC一车间1.14呼吸道灼伤事故",
    status: 0
  },
  {
    addDate: 1705383687986,
    field: "未遂",
    field1: "未遂",
    field10: "0",
    field11: "0",
    field12: "0",
    field13: "0",
    field14: "",
    field15: "",
    field16: "654",
    field17: "王立亮",
    field18: 1,
    field2: "合成盐酸脱析区域",
    field3: "1、立即协调关闭阀门。2、加强现场班组长巡检人员安全意识和管理。",
    field4: "66",
    field44: "",
    field4Str: "其他",
    field5: "安全类",
    field6: "未遂",
    field7: "PVC一车间聚合工段",
    field8: "0",
    field9: "0",
    fieldDate: 1705334400000,
    id: 132,
    name: "合成转化盐酸管道脱析泄漏",
    status: 0
  },
  {
    addDate: 1698303610007,
    field: "未遂",
    field1: "供水工段陶瓷膜厂房",
    field10: "0",
    field11: "0",
    field12: "无",
    field13: "无",
    field14: "ssc-dzsh/1/0f3a993f795e483da332e55e8c9892ce.docx",
    field15: "",
    field16: "1519",
    field17: "张钊",
    field18: 1,
    field2:
      "10月24日中班，工段运行人员在巡检过程中，发现陶瓷膜壳体泄露。当班运行人员立即停止陶瓷膜，检查发现壳体卡子断裂",
    field3:
      ".立即整改，更换并重新紧固卡子。2.加强对员工日常巡检培训，提高巡检质量。3.排查装置所有卡子，更换锈蚀卡子。",
    field4: "111",
    field44: "259",
    field44Str: "调节/修理/维护不够",
    field4Str: "设备未准备就绪",
    field5: "设备类",
    field6: "未遂",
    field7: "热电车间",
    field8: "0",
    field9: "0",
    fieldDate: 1698076800000,
    id: 70,
    name: "热电车间供水工段陶瓷膜卡子断裂",
    status: 0
  },
  {
    addDate: 1698303411122,
    field: "未遂",
    field1: "6#炉给煤机厂房",
    field10: "0",
    field11: "0",
    field12: "无",
    field13: "无",
    field14: "ssc-dzsh/1/02365fab4fdc40c5b0bbb7f5e09ec876.docx",
    field15: "",
    field16: "1535",
    field17: "王健（锅炉）",
    field18: 1,
    field2:
      "10月17日中班，锅炉运行班组班长王德亮在巡检过程中，发现6#炉3#给煤机皮带存在跑偏情况",
    field3:
      "1.及时针对皮带传动相关设备举一反三，进行检查处理。2.巡检工巡检多注意皮带运转情况。",
    field4: "80",
    field44: "229",
    field44Str: "运行准备情况评估不足",
    field4Str: "维护带能量设备",
    field5: "设备类",
    field6: "未遂",
    field7: "热电车间",
    field8: "0",
    field9: "0",
    fieldDate: 1697472000000,
    id: 69,
    name: "6#炉3#给煤机皮带跑偏",
    status: 0
  }
];

export default defineFakeRoute([
  {
    url: "/sft/accident/list.json",
    method: "get",
    response: ({ query }: { query: Record<string, string> }) => {
      const page = parseInt(query.page || "0");
      const size = parseInt(query.size || "10");
      const name = query.name || "";
      const field5 = query.field5 || "";
      const field6 = query.field6 || "";
      const field17 = query.field17 || "";

      // Filter data
      let filteredData = [...allData];
      if (name) {
        filteredData = filteredData.filter(item =>
          item.name.toLowerCase().includes(name.toLowerCase())
        );
      }
      if (field5) {
        filteredData = filteredData.filter(item => item.field5 === field5);
      }
      if (field6) {
        filteredData = filteredData.filter(item => item.field6 === field6);
      }
      if (field17) {
        filteredData = filteredData.filter(item =>
          item.field17.toLowerCase().includes(field17.toLowerCase())
        );
      }

      const totalElements = filteredData.length;
      const startIndex = page * size;
      const endIndex = startIndex + size;
      const content = filteredData.slice(startIndex, endIndex);

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
