import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 模拟数据 - 施工方案数据库 (type=1)
const constructionPlanData = [
  {
    id: 8237,
    name: "锅炉工段管道保温铁皮修复",
    field: "清理现场",
    field1:
      "各工序完成后，将现场因施工造成的污染以及遗漏的杂物进行清理，做到工完、料净、场地清。",
    field2: "车速过快、未佩戴劳保用品。工器具未规范放置。",
    field3: "物体打击,机械伤害,车辆伤害",
    field4: "现场工器具规范放置，车辆在检验合格有效期内。",
    field5: "打扫卫生期间继续安全监护，车辆车速按要求行驶",
    field6: "对操作人员进行安全培训。",
    field7: "施工人员穿戴合格安全帽、工作服、劳保手套。",
    field8: "1.配备急救药箱清理伤害处2、及时送医",
    field9: "1",
    field10: "2",
    field11: "2",
    field12: "蓝色",
    field13: "工段班组级",
    addUser: { ushow: "孙振" },
    addDate: 1774172361540
  },
  {
    id: 8236,
    name: "锅炉工段管道保温铁皮修复",
    field: "作业过程监护",
    field1: "作业全过程安全监护",
    field2: "监护人员擅离职守，未及时发现作业过程中的安全隐患。",
    field3: "其他伤害",
    field4: "设置安全监护人，监护人必须持证上岗。",
    field5: "作业期间安全监护人不得从事与监护无关的工作，不得离开作业现场。",
    field6: "对监护人员进行安全培训，考核合格后方可上岗。",
    field7: "监护人员穿戴合格安全帽、工作服、劳保手套。",
    field8: "1.配备急救药箱清理伤害处2、及时送医",
    field9: "1",
    field10: "2",
    field11: "2",
    field12: "蓝色",
    field13: "工段班组级",
    addUser: { ushow: "孙振" },
    addDate: 1774172361000
  },
  {
    id: 8235,
    name: "锅炉工段管道保温铁皮修复",
    field: "施工过程",
    field1: "按照施工方案和技术要求进行施工作业。",
    field2:
      "高空作业时未系安全带或安全带使用不当；工具材料坠落；脚手架搭设不规范。",
    field3: "高处坠落,物体打击",
    field4:
      "脚手架搭设符合规范要求，经检验合格后方可使用；高空作业必须系好安全带。",
    field5: "加强现场安全检查，发现违章作业立即制止；设置安全警戒区域。",
    field6: "对作业人员进行高空作业安全培训和技术交底。",
    field7: "安全帽、安全带、防滑鞋、防护眼镜等个人防护用品。",
    field8: "立即停止作业，组织救援，保护现场，及时上报。",
    field9: "3",
    field10: "3",
    field11: "9",
    field12: "黄色",
    field13: "车间级",
    addUser: { ushow: "孙振" },
    addDate: 1774172360000
  },
  {
    id: 8234,
    name: "锅炉工段管道保温铁皮修复",
    field: "施工准备",
    field1:
      "1.编制施工方案，进行安全风险分析；2.办理作业许可；3.准备施工机具和材料；4.进行技术交底和安全交底。",
    field2: "作业许可未办理或未审批；施工方案未编制或未审批；安全交底不到位。",
    field3: "其他伤害",
    field4: "严格执行作业许可审批制度；施工方案必须经过审批后方可实施。",
    field5: "作业前进行安全技术交底，确认所有作业人员了解作业风险和控制措施。",
    field6: "对作业人员进行作业许可制度培训和安全技术交底培训。",
    field7: "安全帽、工作服、劳保手套等个人防护用品。",
    field8: "发现违章立即制止，发生事故立即启动应急预案。",
    field9: "2",
    field10: "2",
    field11: "4",
    field12: "蓝色",
    field13: "工段班组级",
    addUser: { ushow: "孙振" },
    addDate: 1774172359000
  },
  {
    id: 8233,
    name: "锅炉工段管道保温铁皮修复",
    field: "现场勘察",
    field1:
      "1.查看作业现场环境；2.识别作业风险；3.确定作业方法；4.制定控制措施。",
    field2: "现场勘察不彻底，风险识别不全面。",
    field3: "其他伤害",
    field4: "组织专业技术人员进行现场勘察，使用检查表确保风险识别全面。",
    field5: "建立现场勘察记录，明确勘察人员职责。",
    field6: "对勘察人员进行风险识别方法培训。",
    field7: "安全帽、工作服、劳保手套等个人防护用品。",
    field8: "发现新的风险及时补充控制措施。",
    field9: "1",
    field10: "2",
    field11: "2",
    field12: "蓝色",
    field13: "工段班组级",
    addUser: { ushow: "孙振" },
    addDate: 1774172358000
  },
  {
    id: 8232,
    name: "气化装置检修",
    field: "清理现场",
    field1:
      "各工序完成后，将现场因施工造成的污染以及遗漏的杂物进行清理，做到工完、料净、场地清。",
    field2: "车速过快、未佩戴劳保用品。工器具未规范放置。",
    field3: "物体打击,机械伤害,车辆伤害",
    field4: "现场工器具规范放置，车辆在检验合格有效期内。",
    field5: "打扫卫生期间继续安全监护，车辆车速按要求行驶",
    field6: "对操作人员进行安全培训。",
    field7: "施工人员穿戴合格安全帽、工作服、劳保手套。",
    field8: "1.配备急救药箱清理伤害处2、及时送医",
    field9: "1",
    field10: "2",
    field11: "2",
    field12: "蓝色",
    field13: "工段班组级",
    addUser: { ushow: "李明" },
    addDate: 1774100000000
  },
  {
    id: 8231,
    name: "气化装置检修",
    field: "作业过程监护",
    field1: "作业全过程安全监护",
    field2: "监护人员擅离职守，未及时发现作业过程中的安全隐患。",
    field3: "其他伤害",
    field4: "设置安全监护人，监护人必须持证上岗。",
    field5: "作业期间安全监护人不得从事与监护无关的工作，不得离开作业现场。",
    field6: "对监护人员进行安全培训，考核合格后方可上岗。",
    field7: "监护人员穿戴合格安全帽、工作服、劳保手套。",
    field8: "1.配备急救药箱清理伤害处2、及时送医",
    field9: "1",
    field10: "2",
    field11: "2",
    field12: "蓝色",
    field13: "工段班组级",
    addUser: { ushow: "李明" },
    addDate: 1774099900000
  },
  {
    id: 8230,
    name: "气化装置检修",
    field: "受限空间作业",
    field1:
      "1.办理受限空间作业许可证；2.进行气体检测；3.设置通风设备；4.设置监护人员；5.配备应急救援器材。",
    field2: "未办理作业许可证；气体检测不合格；通风不良；监护人不在场。",
    field3: "中毒和窒息,高处坠落",
    field4:
      "严格执行受限空间作业许可制度；作业前进行气体检测，氧气含量19.5%-23.5%，可燃气体为0；设置强制通风设备。",
    field5:
      "设置专职监护人，监护人不得离开作业现场；配备通讯设备，保持联络畅通。",
    field6: "对作业人员进行受限空间作业安全培训和应急救援培训。",
    field7: "安全帽、安全带、防毒面具、防护眼镜、防护服等。",
    field8: "立即启动受限空间应急救援预案，使用救援器材将人员救出，进行急救。",
    field9: "4",
    field10: "4",
    field11: "16",
    field12: "橙色",
    field13: "公司级",
    addUser: { ushow: "李明" },
    addDate: 1774099800000
  },
  {
    id: 8229,
    name: "气化装置检修",
    field: "动火作业",
    field1:
      "1.办理动火作业许可证；2.清理作业现场可燃物；3.配备灭火器材；4.设置监护人；5.进行气体检测。",
    field2: "未办理动火许可证；可燃气体未检测；灭火器材不足；监护人不在场。",
    field3: "火灾,爆炸,灼烫",
    field4:
      "严格执行动火作业许可制度；作业前清理可燃物；配备足够数量的灭火器材；可燃气体检测合格后方可作业。",
    field5: "设置专职监护人，监护人不得离开作业现场；作业期间保持通风。",
    field6: "对作业人员进行动火作业安全培训和消防知识培训。",
    field7: "安全帽、防护眼镜、防护手套、防护服等。",
    field8: "立即使用灭火器材灭火，启动火灾爆炸应急预案，组织人员疏散。",
    field9: "4",
    field10: "5",
    field11: "20",
    field12: "橙色",
    field13: "公司级",
    addUser: { ushow: "李明" },
    addDate: 1774099700000
  },
  {
    id: 8228,
    name: "气化装置检修",
    field: "设备隔离",
    field1:
      "1.关闭相关阀门；2.加装盲板；3.排空设备内物料；4.吹扫置换；5.上锁挂牌。",
    field2: "阀门未完全关闭；盲板未加装或加装不规范；物料未排空；未上锁挂牌。",
    field3: "火灾,爆炸,中毒和窒息",
    field4:
      "制定隔离方案，明确隔离点；使用合格的盲板；进行物料排空和吹扫置换；实施上锁挂牌制度。",
    field5:
      "执行隔离方案，逐项确认；进行气体检测，确认安全后方可作业；设置警示标识。",
    field6: "对作业人员进行设备隔离安全培训。",
    field7: "安全帽、防护眼镜、防护手套、防护服等。",
    field8: "立即停止作业，撤离人员，启动应急预案。",
    field9: "3",
    field10: "4",
    field11: "12",
    field12: "黄色",
    field13: "车间级",
    addUser: { ushow: "李明" },
    addDate: 1774099600000
  },
  {
    id: 8227,
    name: "气化装置检修",
    field: "施工准备",
    field1:
      "1.编制施工方案，进行安全风险分析；2.办理作业许可；3.准备施工机具和材料；4.进行技术交底和安全交底。",
    field2: "作业许可未办理或未审批；施工方案未编制或未审批；安全交底不到位。",
    field3: "其他伤害",
    field4: "严格执行作业许可审批制度；施工方案必须经过审批后方可实施。",
    field5: "作业前进行安全技术交底，确认所有作业人员了解作业风险和控制措施。",
    field6: "对作业人员进行作业许可制度培训和安全技术交底培训。",
    field7: "安全帽、工作服、劳保手套等个人防护用品。",
    field8: "发现违章立即制止，发生事故立即启动应急预案。",
    field9: "2",
    field10: "2",
    field11: "4",
    field12: "蓝色",
    field13: "工段班组级",
    addUser: { ushow: "李明" },
    addDate: 1774099500000
  },
  {
    id: 8226,
    name: "电气设备检修",
    field: "清理现场",
    field1:
      "各工序完成后，将现场因施工造成的污染以及遗漏的杂物进行清理，做到工完、料净、场地清。",
    field2: "车速过快、未佩戴劳保用品。工器具未规范放置。",
    field3: "物体打击,机械伤害,车辆伤害",
    field4: "现场工器具规范放置，车辆在检验合格有效期内。",
    field5: "打扫卫生期间继续安全监护，车辆车速按要求行驶",
    field6: "对操作人员进行安全培训。",
    field7: "施工人员穿戴合格安全帽、工作服、劳保手套。",
    field8: "1.配备急救药箱清理伤害处2、及时送医",
    field9: "1",
    field10: "2",
    field11: "2",
    field12: "蓝色",
    field13: "工段班组级",
    addUser: { ushow: "王强" },
    addDate: 1774000000000
  },
  {
    id: 8225,
    name: "电气设备检修",
    field: "送电试运行",
    field1:
      "1.检查接线；2.测量绝缘电阻；3.进行空载试验；4.进行负载试验；5.记录运行参数。",
    field2: "未检查接线就送电；绝缘电阻未测量；试验时人员未撤离。",
    field3: "触电,机械伤害",
    field4:
      "送电前检查接线是否正确；测量绝缘电阻是否符合要求；设置安全警戒区域。",
    field5: "送电前确认所有人员撤离到安全区域；专人监护，统一指挥。",
    field6: "对作业人员进行电气安全培训。",
    field7: "绝缘手套、绝缘鞋、绝缘垫等。",
    field8: "立即切断电源，进行急救，拨打120。",
    field9: "3",
    field10: "3",
    field11: "9",
    field12: "黄色",
    field13: "车间级",
    addUser: { ushow: "王强" },
    addDate: 1773999900000
  }
];

export default defineFakeRoute([
  {
    url: "/sft/work/plan/list.json",
    method: "get",
    response: ({ query }) => {
      const page = parseInt(query.page as string) || 1;
      const size = parseInt(query.size as string) || 10;
      const field = (query.field as string) || "";

      // 过滤数据
      let filteredData = constructionPlanData;
      if (field) {
        filteredData = constructionPlanData.filter(
          item => item.field && item.field.includes(field)
        );
      }

      // 分页
      const start = (page - 1) * size;
      const end = start + size;
      const pageData = filteredData.slice(start, end);

      return {
        success: true,
        t: {
          content: pageData,
          totalElements: filteredData.length,
          pageable: {
            offset: 0,
            pageNumber: page - 1,
            pageSize: size,
            paged: true,
            sort: {
              empty: false,
              sorted: true,
              unsorted: false
            },
            unpaged: false
          },
          first: page === 1,
          last: end >= filteredData.length,
          number: page - 1,
          numberOfElements: pageData.length,
          size,
          sort: {
            empty: false,
            sorted: true,
            unsorted: false
          },
          empty: pageData.length === 0
        }
      };
    }
  }
]);
