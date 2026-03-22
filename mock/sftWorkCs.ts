import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 模拟数据 - 施工方案数据
const mockData = [
  {
    id: "3400",
    name: "消防栓迁移",
    addDate: 1774174456143,
    field1: { id: 2470, name: "德州正通市政公用工程有限公司" },
    field2:
      "双氧水工段装卸站北侧两个消防栓位于硬化路面中央，需向东迁移至路边花砖处，空压站西侧一个消防栓位于两台设备中间，需向南迁移五米。",
    field3: "动火,临电,动土",
    field19Str: "孔令玺",
    field20Str: "坊亮",
    field21Str: "曲兆杰",
    field22Str: "李柠",
    nodeName: "JSA审定人审批-杜朋-杜朋,韩松,周景新,郭荣峰",
    status: "审批"
  },
  {
    id: "3375",
    name: "580工段北侧管廊增加照明安装",
    addDate: 1774087456143,
    field1: { id: 2471, name: "电气工段" },
    field2:
      "580工段北侧马路照明不足，车辆运输过程中，存在安全隐患，现计划于580工段装车平台北侧马路照明3台。涉及二级动火，二级高处作业。",
    field3: "动火,临电,高处检维修",
    field19Str: "孟超,孙奉棉",
    field20Str: "白海斌",
    field21Str: "孙鑫",
    field22Str: "孟超,孙奉棉",
    nodeName: "安全施工方案乙方负责人签字-孙奉棉-孙奉棉",
    status: "审批"
  },
  {
    id: "3374",
    name: "VCM装置二三期冷凝器更换",
    addDate: 1774000456143,
    field1: { id: 2472, name: "维修中心" },
    field2:
      "VCM装置二三期冷凝器由于使用年限较长，换热效率下降，需要更换新的冷凝器。",
    field3: "吊装,动火,受限",
    field19Str: "张三",
    field20Str: "李四",
    field21Str: "王五",
    field22Str: "赵六",
    nodeName: "技术方案审批",
    status: "已审核"
  },
  {
    id: "3373",
    name: "液氯储罐区管道更换",
    addDate: 1773913456143,
    field1: { id: 2473, name: "设备部" },
    field2: "液氯储罐区部分管道腐蚀严重，需要更换新管道。",
    field3: "动火,受限,盲板",
    field19Str: "刘七",
    field20Str: "陈八",
    field21Str: "周九",
    field22Str: "吴十",
    nodeName: "安全方案审批",
    status: "审批"
  },
  {
    id: "3372",
    name: "聚合厂房彩钢板更换",
    addDate: 1773826456143,
    field1: { id: 2474, name: "建筑公司" },
    field2: "聚合厂房部分彩钢板老化损坏，需要更换新彩钢板。",
    field3: "高处架设,动火,临电",
    field19Str: "郑一",
    field20Str: "孙二",
    field21Str: "钱三",
    field22Str: "李四",
    nodeName: "施工方案审批",
    status: "已审核"
  },
  {
    id: "3371",
    name: "废水池清理作业",
    addDate: 1773740456143,
    field1: { id: 2475, name: "环保车间" },
    field2: "废水池淤积严重，需要进行清理作业。",
    field3: "受限,动火",
    field19Str: "周五",
    field20Str: "吴六",
    field21Str: "郑七",
    field22Str: "王八",
    nodeName: "作业方案审批",
    status: "审批"
  },
  {
    id: "3370",
    name: "DCS系统升级改造",
    addDate: 1773654456143,
    field1: { id: 2476, name: "仪表车间" },
    field2: "DCS系统版本较老，需要进行升级改造。",
    field3: "临电,检维修",
    field19Str: "冯九",
    field20Str: "陈十",
    field21Str: "褚一",
    field22Str: "卫二",
    nodeName: "技术改造方案审批",
    status: "已审核"
  },
  {
    id: "3369",
    name: "电气柜除尘保养",
    addDate: 1773568456143,
    field1: { id: 2477, name: "电气车间" },
    field2: "各车间电气柜需要定期除尘保养。",
    field3: "临电,检维修",
    field19Str: "蒋三",
    field20Str: "沈四",
    field21Str: "韩五",
    field22Str: "杨六",
    nodeName: "保养计划审批",
    status: "审批"
  },
  {
    id: "3368",
    name: "反应釜内衬修复",
    addDate: 1773482456143,
    field1: { id: 2478, name: "检修车间" },
    field2: "聚合反应釜内衬有损坏，需要进行修复。",
    field3: "受限,动火,高处检维修",
    field19Str: "朱七",
    field20Str: "秦八",
    field21Str: "尤九",
    field22Str: "许十",
    nodeName: "检修方案审批",
    status: "已驳回"
  },
  {
    id: "3367",
    name: "消防管道试压",
    addDate: 1773396456143,
    field1: { id: 2479, name: "消防队" },
    field2: "新安装的消防管道需要进行试压测试。",
    field3: "动火,临电",
    field19Str: "何一",
    field20Str: "吕二",
    field21Str: "施三",
    field22Str: "张四",
    nodeName: "试压方案审批",
    status: "审批"
  },
  {
    id: "3366",
    name: "安全阀校验",
    addDate: 1773310456143,
    field1: { id: 2480, name: "质检部" },
    field2: "各装置安全阀需要定期校验。",
    field3: "检维修",
    field19Str: "孔五",
    field20Str: "曹六",
    field21Str: "严七",
    field22Str: "华八",
    nodeName: "校验计划审批",
    status: "已审核"
  },
  {
    id: "3365",
    name: "压力容器检测",
    addDate: 1773224456143,
    field1: { id: 2481, name: "设备部" },
    field2: "年度压力容器定期检测。",
    field3: "检维修",
    field19Str: "金九",
    field20Str: "魏十",
    field21Str: "陶一",
    field22Str: "姜二",
    nodeName: "检测方案审批",
    status: "审批"
  }
];

export default defineFakeRoute([
  {
    url: "/sft/work/cs/list",
    method: "get",
    response: ({ query }) => {
      const page = parseInt(query.page as string) || 0;
      const size = parseInt(query.size as string) || 10;
      const operatUnit = (query.operatUnit as string) || "";

      // 过滤数据
      let filteredData = mockData;
      if (operatUnit) {
        filteredData = mockData.filter(
          item => item.name && item.name.includes(operatUnit)
        );
      }

      // 分页
      const start = page * size;
      const end = start + size;
      const pageData = filteredData.slice(start, end);

      return {
        success: true,
        t: {
          content: pageData,
          totalElements: filteredData.length,
          pageable: {
            offset: 0,
            pageNumber: page,
            pageSize: size,
            paged: true,
            sort: {
              empty: false,
              sorted: true,
              unsorted: false
            },
            unpaged: false
          },
          first: page === 0,
          last: end >= filteredData.length,
          number: page,
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
  },
  {
    url: "/sft/work/cs/del/:id",
    method: "get",
    response: () => {
      return {
        success: true,
        message: "删除成功"
      };
    }
  }
]);
